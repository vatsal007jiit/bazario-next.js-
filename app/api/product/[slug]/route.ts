import slugInterface from "@/interface/slug.interface";
import serverCatchError from "@/lib/server-catch-Error";
import ProductModel from "@/models/product.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";
import path from "path";
import fs from "fs"
import {v4 as uuid} from "uuid"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

mongoose.connect(process.env.DB!)

export const GET = async (req: NextRequest, context: slugInterface) =>{
    try{
        const {slug} = await context.params
        const product = await ProductModel.findOne({slug})
        
        if(!product)
            return res.json({message: "Product not found with slug"},{status: 404})

        return res.json({product})
    }
    catch(error){
       return serverCatchError(error)
    }
}

// export const PUT = async (req: NextRequest, context: slugInterface) =>{
//     try{
//         const {slug: id} = await context.params // so we will send id from frontend in slug variable here we are aliasing it. We can do similar in delete also
//         const body = await req.json()
//         const product = await ProductModel.findByIdAndUpdate(id, body, {new: true})
        
//         if(!product)
//             return res.json({message: "Product not found with slug"},{status: 404})

//         return res.json({product})
//     }
//     catch(error){
//         serverCatchError(error)
//     }
// } // this method does not handle image -handling form in json format

export const PUT = async (req: NextRequest, context: slugInterface) =>
{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !=="admin")
        {
            return res.json({message:"Unauthorised User"},{status: 401})
        }
        const {slug: id} = await context.params // so we will send id from frontend in slug variable here we are aliasing it. We can do similar in delete also
        const body = await req.formData()

        const payload: any = {
            title: body.get("title"),
            description: body.get("description"),
            price: body.get("price"),
            discount: body.get("discount"),
            quantity: body.get("quantity")
        }
        const file = body.get('image') as File | null

        if(file)
        {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const ext = file.type.split("/").pop()

            const root = process.cwd()
            const folder = path.join(root, "public", "products")
            const fileName = `${uuid()}.${ext}`
            const filePath = path.join(folder, fileName)

            fs.writeFileSync(filePath, buffer)
            payload.image = `/products/${fileName}`
        }
        payload.slug = payload.title.toLowerCase().split(" ").join("-"); // To update slug
        const product = await ProductModel.findByIdAndUpdate(id, payload, {new:true})
        

        if(!product)
            res.json({message: "Product not found"}, {status: 404})
        return res.json({product})
    } 
    catch (error) {
       return serverCatchError(error)
    }
}

export const DELETE = async (req: NextRequest, context: slugInterface) =>{
    try{
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !=="admin")
        {
            return res.json({message:"Unauthorised User"},{status: 401})
        }
        
        const {slug} = await context.params
        const result = await ProductModel.deleteOne({slug})
        
        if(result.deletedCount === 0)
            return res.json({message: "Product not found with slug"},{status: 404})

        return res.json({message: "Product deleted successfully"})
    }
    catch(error){
       return serverCatchError(error)
    }
}