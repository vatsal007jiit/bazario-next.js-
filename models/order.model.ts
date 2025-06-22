import mongoose, {model, models, Schema} from "mongoose"
import ProductModel from "./product.model"
import UserModel from "./user.model"

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: ProductModel,
        required: true
    },
    price: {
        type: Number,
        required : true
    },
    discount: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        default: "processing",
        enum: ['processing', 'dispatched' , 'fulfiled', 'returned']
    }
}, 
{timestamps: true}
)

const orderModel = models.Order || model ("Order", orderSchema)

export default orderModel