import serverCatchError from "@/lib/server-catch-Error";
import ProductModel from "@/models/product.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";
import path from "path"
import fs from "fs"
import {v4 as uuid} from "uuid"

mongoose.connect(process.env.DB!)

export const POST = async (req: NextRequest) =>{
    try {
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
        serverCatchError(error)
    }
}

export const GET = async (req: NextRequest) =>{
    try{
        const {searchParams} = new URL(req.url)
        const slug = searchParams.get('slug')
        const page = Number(searchParams.get('page')) || 1
        const limit = Number(searchParams.get('limit')) || 8
        const skip = (page-1) * limit
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
        serverCatchError(error)
    }
}