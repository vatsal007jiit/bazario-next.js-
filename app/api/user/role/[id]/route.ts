import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import idInterface from "@/interface/id.interface";
import serverCatchError from "@/lib/server-catch-Error";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest , NextResponse as res } from "next/server";

mongoose.connect(process.env.DB!)

export const PUT= async (req:NextRequest, context: idInterface)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !=='admin' )
            return res.json({message: "Unauthorised"}, {status: 401})
        const {id} = await context.params
        const body = await req.json()

        await UserModel.updateOne({_id: id}, body)
        return res.json({message: "Role changed successfully"})
    } 
    catch (error) {
        return serverCatchError(error)    
    }
}