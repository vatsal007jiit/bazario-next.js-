import serverCatchError from "@/lib/server-catch-Error";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";


mongoose.connect(process.env.DB!)

export const POST = async (req: NextRequest) =>{
    try {
        const body = await req.json()
        await UserModel.create(body)
        return res.json({message: "Signup Successful"})
    } 
    catch (error) {
        return serverCatchError(error)  
    }
}