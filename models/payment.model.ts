import mongoose from "mongoose";
import {Schema, model, models} from "mongoose"
import UserModel from "./user.model";
import orderModel from "./order.model";

const paymentSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: orderModel,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        default: "razorpay",
        enum: ["razorpay", "stripe"]
    }
}, {timestamps: true})

const PaymentModel = models.payment || model('payment', paymentSchema)

export default PaymentModel