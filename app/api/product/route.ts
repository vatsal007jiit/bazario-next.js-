import serverCatchError from "@/lib/server-catch-Error";
import ProductModel from "@/models/product.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";
import path from "path"
import fs from "fs"
import {v4 as uuid} from "uuid"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

mongoose.connect(process.env.DB!)

export const POST = async (req: NextRequest) =>{
    try {

        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !=="admin")
        {
            return res.json({message:"Unauthorised User"},{status: 401})
        }


        const body = await req.formData()
        const file = body.get('image') as File | null

        if(!file){
           return res.json({message:"Image file not sent"},{status: 400})
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const ext = file.type.split("/").pop()

        const root = process.cwd()
        const folder = path.join(root, "public", "products")
        const fileName = `${uuid()}.${ext}`
        const filePath = path.join(folder, fileName)

        fs.writeFileSync(filePath, buffer)


        const payload = {
            title: body.get("title"),
            description: body.get("description"),
            price: body.get("price"),
            discount: body.get("discount"),
            quantity: body.get("quantity"),
            image: `/products/${fileName}`,
        }

        const product = await ProductModel.create(payload)
        return res.json(product)
    } 
    catch (error) {
      return  serverCatchError(error)
    }
}

export const GET = async (req: NextRequest) =>{
    try{
        const {searchParams} = new URL(req.url)
        const slug = searchParams.get('slug')
        const search = searchParams.get('search')
        const page = Number(searchParams.get('page')) || 1
        const limit = Number(searchParams.get('limit')) || 8
        const skip = (page-1) * limit
        
        if(search)
        {
            const searchRegex = new RegExp(search, 'i');
            const total = await ProductModel.countDocuments({ title: searchRegex });

            const products = await ProductModel.find({title: searchRegex}).sort({createdAt: -1}).skip(skip).limit(limit)
            return res.json({total, data:products})
        }

        if(slug)
        {
            const slugs = await ProductModel.distinct('slug')
            return res.json({slugs})
        }

        const total = await ProductModel.countDocuments()
        const products = await ProductModel.find().sort({createdAt: -1}).skip(skip).limit(limit)
        return res.json({total, data:products})
    }
    catch(error){
        return serverCatchError(error)
    }
}