import serverCatchError from "@/lib/server-catch-Error";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

mongoose.connect(process.env.DB_URL!)

export const PUT = async (req: NextRequest) =>{
    try {
        const session = await getServerSession(authOptions)
        if(!session || session?.user?.role !=="user")
        {
            return res.json({message: "Unauthorised User"}, {status: 401})
        }
        const id = session.user.id
        const body = await req.json()
     
        console.log(id, body)
        const user = await UserModel.findByIdAndUpdate(id, body, {new: true})

        if(!user)
           return res.json({message:"User Not Found"}, {status: 404})

        return res.json({message: "Profile Updated successfully", user })
    } 
    catch (error) {
        return serverCatchError(error)
    }
}