import idInterface from "@/interface/id.interface";
import serverCatchError from "@/lib/server-catch-Error";
import orderModel from "@/models/order.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


mongoose.connect(process.env.DB!)

export const PUT = async (req: NextRequest, context: idInterface) =>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session.user.role !== 'admin')
            return res.json({message: "Unauthorized"}, {status: 401})
        
        const {id} = await context.params
        const body = await req.json()
        const order = await orderModel.findByIdAndUpdate(id, {status: body.status}, {new: true})
        if(!order)
            return res.json({message: "Order not found"}, {status: 404})
        return res.json({message: "Order Status Updated"})
    } 
    catch (error) 
    {
    return serverCatchError(error)    
    }
}