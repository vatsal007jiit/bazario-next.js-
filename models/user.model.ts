import {model, models, Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email']
    },
    // mobile: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true
    // },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    this.role = "user"
    next();
})

userSchema.pre("save", async function(next){
    const count = await model('User').countDocuments({email: this.email})
    if(count > 0)
        throw next(new Error("Email already exists"))
    next();
})

// userSchema.pre("save", async function(next){
//     const count = await model('User').countDocuments({mobile: this.mobile})
//     if(count > 0)
//         throw next(new Error("Mobile no already exists"))
//     next();
// })

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password.toString(), 12)
    next()
})



const UserModel = models.User || model('User', userSchema)

export default UserModel