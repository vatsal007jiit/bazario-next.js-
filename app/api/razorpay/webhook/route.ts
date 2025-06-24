import serverCatchError from "@/lib/server-catch-Error";
import fs from "fs";
import { NextRequest, NextResponse as res } from "next/server";
import crypto from "crypto"

export const POST = async(req: NextRequest)=>{
    try {
        const signature = req.headers.get("x-razorpay-signature")
        const body = await req.json()
        fs.writeFileSync("test.json", JSON.stringify(body, null, 2))
        console.log("Req Recieved")
        return res.json({message: "Success"})
    } 
    catch (error) {
        return serverCatchError(error)
    }
}