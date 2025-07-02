import serverCatchError from "@/lib/server-catch-Error";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";
import bcrypt from 'bcrypt'

mongoose.connect(process.env.DB!)

export const POST = async (req: NextRequest) =>{
    try {
        const body = await req.json()
        const email = body.email;
        const password = body?.password
        const provider = body?.provider

       const user = await UserModel.findOne({email}) 

       if(!user)
        return res.json({message: "User Not Found"}, {status:404})

       const payload = {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        address: user.address
       }

       if(provider === 'google')
        return res.json(payload)
    
       const isLogin = bcrypt.compareSync(password, user.password)

       if(!isLogin)
        return res.json({message:"Login Failed"}, {status:401})

       
       return res.json(payload)
    } 
    catch (error) {
       return serverCatchError(error)
    }
}