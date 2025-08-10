import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";

import { getServerSession } from "next-auth";
import CartModel from "@/models/cart.model";
import serverCatchError from "@/lib/server-catch-Error";
import { authOptions } from "@/lib/auth-options";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    // Ensure database connection
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "user")
      return res.json({ message: "Unauthorized Request" }, { status: 401 });

    const body = await req.json();
    
    // Validate required fields
    if (!body.product) {
      return res.json({ message: "Product ID is required" }, { status: 400 });
    }
    
    body.user = session.user.id;

    try {
      const updated = await CartModel.findOneAndUpdate(
        { user: body.user, product: body.product },
        { $inc: { qnt: 1 } },
        { new: true, maxTimeMS: 5000 }
      );
      
      if (updated) {
        return res.json(updated);
      }

      const cart = await CartModel.create(body);
      return res.json(cart);
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return res.json({ 
        message: "Failed to update cart. Please try again." 
      }, { status: 500 });
    }
  } 
  catch (error) {
    return serverCatchError(error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    // Ensure database connection
    await dbConnect();
    
    // const session = await getServerSession(authOptions);
    //  if (!session || session?.user?.role !== "user")
    //   return res.json({ message: "Unauthorized Request" }, { status: 401 });
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session || session.role !== "user")
      return res.json({ message: "Unauthorized Request" }, { status: 401 });
    
    const {searchParams} = new URL(req.url)
    const isCount = searchParams.get('count')
    if(isCount)
    {
        try {
            // Add timeout and retry logic for count query
            const count = await CartModel.countDocuments({user: session.id})
                .maxTimeMS(5000) // 5 second timeout
                .exec();
            return res.json({count})
        } catch (countError) {
            console.error('Cart count error:', countError);
            // Return 0 count instead of failing completely
            return res.json({count: 0})
        }
    }
    // const cart = await CartModel.find({user: session.user.id}).populate("product")
    const cart = await CartModel.find({user: session.id}).populate("product")
    return res.json(cart);
  } 
  catch (error) {
    return serverCatchError(error);
  }
};

