import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";

import { getServerSession } from "next-auth";
import CartModel from "@/models/cart.model";
import serverCatchError from "@/lib/server-catch-Error";
import { authOptions } from "@/lib/auth-options";

mongoose.connect(process.env.db!);

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "user")
      return res.json({ message: "Unauthorized Request" }, { status: 401 });

    const body = await req.json();
    body.user = session.user.id;

    const updated = await CartModel.findOneAndUpdate(
      { user: body.user, product: body.product },
      { $inc: { qnt: 1 } },
      { new: true }
    );
    if (updated)
        return res.json(updated)

    const cart = await CartModel.create(body);
    return res.json(cart);
  } 
  catch (error) {
    return serverCatchError(error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "user")
      return res.json({ message: "Unauthorized Request" }, { status: 401 });
    
    const {searchParams} = new URL(req.url)
    const isCount = searchParams.get('count')
    if(isCount)
    {
        const count = await CartModel.countDocuments({user: session.user.id})
        return res.json({count})
    }
    const cart = await CartModel.find({user: session.user.id}).populate("product")
    return res.json(cart);
  } 
  catch (error) {
    return serverCatchError(error);
  }
};

