import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CartModel from "@/models/cart.model";
import serverCatchError from "@/lib/server-catch-Error";

mongoose.connect(process.env.db!)

export const POST = async (req:NextRequest) =>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !== 'user')
            return res.json({message: "Unauthorized Request"}, {status: 401})
        
        const body = await req.json()
        const cart = await CartModel.create(body)
        return res.json({cart})
    } 
    catch (error) {
        return serverCatchError(error)
    }
}

