import serverCatchError from "@/lib/server-catch-Error";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {NextResponse as res } from "next/server";
import { authOptions } from "@/lib/auth-options";

mongoose.connect(process.env.DB!)

export const GET = async() =>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !=="admin")
        {
            return res.json({message:"Unauthorised User"},{status: 401})
        }


       const users = await UserModel.find({role: "user"}, {password: 0}).sort({createdAt: -1})
       return res.json({users})    
    } 
    catch (error) {
       return serverCatchError(error)
    }
}