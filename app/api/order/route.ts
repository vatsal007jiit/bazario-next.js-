import serverCatchError from "@/lib/server-catch-Error";
import orderModel from "@/models/order.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

mongoose.connect(process.env.DB!)

export const POST = async (req: NextRequest)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session.user.role!=="user")
            return res.json({message: "Unauthorized Request"}, {status: 401})

        const body = await req.json()
        body.user = session.user.id
        const order = await orderModel.create(body) 
        return res.json({order})
    } 
    catch (error) {
        return serverCatchError (error)   
    }
}


export const GET = async (req: NextRequest)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session)
            return res.json({message:"Unauthorized"}, {status: 401})
        
        if(session.user.role === "admin")
        {
            const orders = await orderModel.find().sort({createdAt: -1}).populate("user","fullName email address").populate("products","title")
            return res.json(orders)
        }
        if(session.user.role === "user")
        {
            const userId = session.user.id
            const orders = await orderModel.find({user: userId}).sort({createdAt: -1}).populate("products","title image slug")
            return res.json(orders)
        }
        
    } 
    catch (error) {
        return serverCatchError(error)
    }
}