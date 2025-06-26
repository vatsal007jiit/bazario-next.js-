import { NextRequest, NextResponse as res } from "next/server";
import serverCatchError from "@/lib/server-catch-Error";
import crypto from 'crypto'
import OrderModel from "@/models/order.model";
import PaymentModel from "@/models/payment.model";
import fs from 'fs'
import moment from "moment";
import path from 'path'
import CartModel from "@/models/cart.model";
const root = process.cwd()

interface CreateOrderInterface {
    user: string
    products: string[]
    discounts: string[]
    prices: string[]
    grossTotal: number
}

interface CreatePaymentInterface {
    user: string
    paymentId: string
    orderId: string
    vendor?: 'razorpay' | 'stripe'
    tax: number
    status: string
    currency: string
    amount: number
    fee: number
    method: string
}

interface DeleteCartsInterface {
    user: string
    products: string[]
}

const createLog = (err: unknown, service: string)=>{
    if(err instanceof Error)
    {
        const dateTime = moment().format('DD-MM-YYYY_hh-mm-ss_A');
        const filePath = path.join(root, 'logs', `${service}-error-${dateTime}.txt`);
        fs.writeFileSync(filePath, err.message)
        return false
    }
}

const createOrder = async (order: CreateOrderInterface)=>{
    try {
        const orderDoc = await OrderModel.create(order)
        const orderId = orderDoc.orderId 
        return orderId
    }
    catch(err)
    {
        return createLog(err, "order")
    }
}

const deleteCarts = async (carts: DeleteCartsInterface)=>{
    try {
        const query = carts.products.map((id)=>({user: carts.user, product: id}))
        await CartModel.deleteMany({$or: query})
        return true
    }
    catch(err)
    {
        return createLog(err, "delete-cart")
    }
}

const createPayment = async (payment: CreatePaymentInterface)=>{
    try {
        await PaymentModel.create(payment)
        return true
    }
    catch(err)
    {
        return createLog(err, "payment")
    }
}

export const POST = async (req: NextRequest)=>{
    try {
        const signature = req.headers.get('x-razorpay-signature')
        const body = await req.json()

        if(!signature)
            return res.json({message: 'Invalid signature'}, {status: 400})

        const mySignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(JSON.stringify(body))
        .digest('hex')

        if(signature !== mySignature)
            return res.json({message: 'Invalid signature'}, {status: 400})

        
        const user = body.payload.payment.entity.notes.user
        const paymentId = body.payload.payment.entity.id
        const {tax, fee, status, method, currency} = body.payload.payment.entity
        const grossTotal = (body.payload.payment.entity.amount/100)
        const orders = JSON.parse(body.payload.payment.entity.notes.orders)

       if(body.event === "payment.authorized" && process.env.NODE_ENV === "development")
       {
            const orderId = await createOrder({user, ...orders, grossTotal})

            if(!orderId)
                return res.json({message: 'Failed to create order'}, {status: 424})

            const payment = await createPayment({
                user, 
                orderId, 
                paymentId,
                tax,
                fee,
                status,
                currency,
                amount: grossTotal,
                method
            })
            
            if(!payment)
                return res.json({message: 'Failed to create payment'}, {status: 424})

            await deleteCarts({user, products: orders.products})

            return res.json({success: true})
       }

       if(body.event === "payment.captured")
       {
            const orderId = await createOrder({user, ...orders, grossTotal})

            if(!orderId)
                return res.json({message: 'Failed to create order'}, {status: 424})

            const payment = await createPayment({
                user, 
                orderId, 
                paymentId,
                tax,
                fee,
                status,
                currency,
                amount: grossTotal,
                method
            })
            
            if(!payment)
                return res.json({message: 'Failed to create payment'}, {status: 424})

            return res.json({success: true})
       }

       if(body.event === "payment.failed")
       {
        console.log("payment failed")
       }

       return res.json({success: true})
    }
    catch(err)
    {
        console.log(err)
        return serverCatchError(err)
    }
}



// import serverCatchError from "@/lib/server-catch-Error";
// import fs from "fs";
// import { NextRequest, NextResponse as res } from "next/server";
// import crypto from "crypto"
// import moment from "moment";
// import path from "path";
// import orderModel from "@/models/order.model";
// import PaymentModel from "@/models/payment.model";
// import CartModel from "@/models/cart.model";
// const root = process.cwd()

// interface CreateOrderInterface {
//     user: string
//     products: string[]
//     discounts: string[]
//     prices: string[]
//     grossTotal: number
// }

// interface CreatePaymentInterface {
//     user: string
//     paymentId: string
//     orderId: string
//     vendor?: 'razorpay' | 'stripe'
//     tax: number
//     status: string
//     currency: string
//     amount: number
//     fee: number
//     method: string
// }

// interface DeleteCartsInterface {
//     user: string
//     products: string[]
// }

// const createLog = (err: unknown, service: string)=>{
//     if(err instanceof Error)
//     {
//         const dateTime = moment().format('DD-MM-YYYY_hh-mm-ss_A');
//         const filePath = path.join(root, 'logs', `${service}-error-${dateTime}.txt`);
//         fs.writeFileSync(filePath, err.message)
//         return false
//     }
// }

// const createOrder = async (order: CreateOrderInterface)=>{
//     try {
//         const {orderId} = await orderModel.create(order)
//         return orderId
//     }
//     catch(err)
//     {
//         return createLog(err, "order")
//     }
// }

// const createPayment = async (payment: CreatePaymentInterface)=>{
//     try {
//         await PaymentModel.create(payment)
//         return true
//     }
//     catch(err)
//     {
//         return createLog(err, "payment")
//     }
// }

// const deleteCarts = async (carts: DeleteCartsInterface)=>{
//     try {
//         const query = carts.products.map((id)=>({user: carts.user, product: id}))
//         await CartModel.deleteMany({$or: query})
//         return true
//     }
//     catch(err)
//     {
//         return createLog(err, "delete-cart")
//     }
// }


// export const POST = async(req: NextRequest)=>{
//     try {
//         const signature = req.headers.get("x-razorpay-signature")
//         const body = await req.json()
//         fs.writeFileSync("test.json", JSON.stringify(body, null, 2))
//         console.log("Req Recieved")

//         const mySignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
//         .update(JSON.stringify(body))
//         .digest("hex")

//         if(signature !== mySignature)
//             return res.json({message:"Invalid Signature"}, {status: 400})

//         const user = body.payload.payment.entity.notes.user
//         const paymentId = body.payload.payment.entity.id
//         const {tax, fee, status, method, currency} = body.payload.payment.entity
//         const grossTotal = (body.payload.payment.entity.amount/100)
//         const orders = JSON.parse(body.payload.payment.entity.notes.orders)

//         if(body.event === "payment.authorized" && process.env.NODE_ENV === 'development')
//         {
//             const orderId = await createOrder({user, ...orders, grossTotal})
//             if(!orderId)
//                 return res.json({message: 'Failed to create order'}, {status: 424})

//             const payment = await createPayment({
//                             user, 
//                             orderId, 
//                             paymentId,
//                             tax,
//                             fee,
//                             status,
//                             currency,
//                             amount: grossTotal,
//                             method
//                         })
                        
//             if(!payment)
//                 return res.json({message: 'Failed to create payment'}, {status: 424})

//             // await deleteCarts({user, products: orders.products})

//             return res.json({success: true})
//         }
//         if(body.event === "payment.captured")
//         {
            
//         }
//         if(body.event === "payment.failed")
//         {
//             console.log("payment failed")
//         }
//        return res.json({message: "Success"})
//     } 
//     catch (error) {
//         return serverCatchError(error)
//     }
// }