import serverCatchError from "@/lib/server-catch-Error";
import PaymentModel from "@/models/payment.model";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

mongoose.connect(process.env.DB!)

export const POST = async (req: NextRequest) =>{
    try {
        const body = await req.json()
        const payment = await PaymentModel.create(body)
        return res.json({payment})    
    } 
    catch (error) {
        return serverCatchError(error)
    }
}

export const GET = async (req: NextRequest) =>{
    try {


        const payments = await PaymentModel.find().sort({createdAt:-1})
        .populate("user","fullName email")
        .populate({
            path: "order",
            populate: {
                path: "product",
                model: "Product"
            }
        })

        return res.json({payments})    
    } 
    catch (error) {
        return serverCatchError(error)
    }
}