import {model, models, Schema} from "mongoose"

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default : 0 
    },
    quantity: {
        type: Number,
        required: true,
        default : 0 
    },
    image: {
        type: String,
        default: null
    },
    slug: {
        type: String,
    }
},{timestamps: true})

productSchema.pre("save", function(next){
    this.slug = this.title.toLowerCase().split(" ").join("-")
    next();
})

const ProductModel = models.Product || model('Product', productSchema)
export default ProductModel
