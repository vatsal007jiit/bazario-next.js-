import idInterface from "@/interface/id.interface";
import serverCatchError from "@/lib/server-catch-Error";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import CartModel from "@/models/cart.model";

mongoose.connect(process.env.DB!)

export const PUT = async (req: NextRequest, context:idInterface) =>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !== "user")
            return res.json({message: "Unauthorized"}, {status: 401})

        const {id} = await context.params
        const body = await req.json()

         let cartItem = null

        if(body.qnt > 0)
            cartItem = await CartModel.findByIdAndUpdate(id, {qnt: body.qnt}, {new: true})

        else 
           cartItem = await CartModel.findByIdAndDelete(id) 

        if(!cartItem)
            return res.json({message: "Item not found"}, {status: 404})
        return res.json(cartItem)
    } 
    catch (error) {
        return serverCatchError(error)    
    }
}

export const DELETE = async (req: NextRequest, context:idInterface) =>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !== "user")
            return res.json({message: "Unauthorized"}, {status: 401})

        const {id} = await context.params
        const item = await CartModel.findByIdAndDelete(id)

        if(!item)
            return res.json({message: "Item not found"}, {status: 404})
        return res.json({message: "Item Deleted From cart"})
    } 
    catch (error) {
        return serverCatchError(error)    
    }
}