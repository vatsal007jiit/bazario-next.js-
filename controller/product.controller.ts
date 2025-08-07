
import ProductModel from "@/models/product.model";
const db = process.env.DB as string
import mongoose from "mongoose";
mongoose.connect(db)

interface Product {
  _id: string; // Always stringify ObjectId
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  image: string | null;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}


export const fetchProducts = async (page: number = 1, limit: number = 8)=>{

    const skip = (page-1)*limit
    const total = await ProductModel.countDocuments()
    const products = await ProductModel.find()
    .sort({createdAt: -1}).skip(skip).limit(limit)
    .lean<Product[]>(); //.lean() tells Mongoose not to hydrate the documents into full Mongoose models — and instead return plain serializable objects, which are safe to pass to the frontend. //Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props. we are passign in page.tsx of products
    
     const data = JSON.parse(JSON.stringify(products));
    
    return {total, data}
}

export const fetchProductSlugs = async ()=>{
   
    const slugs = await ProductModel.distinct('slug')
    return slugs
}

export const fetchProductBySlug = async (slug: string)=>{
   
    const product = await ProductModel.findOne({slug}).lean<Product>()

    const data = JSON.parse(JSON.stringify(product));
    return data
}