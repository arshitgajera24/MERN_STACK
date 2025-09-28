import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
})

userSchema.pre('save', async function(next) {
    const user = this;

    if(!user.isModified("password"))
    {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "7d",
        })
    } catch (error) {
        console.error("Error while generating token", error);
    }
}


export const User = mongoose.model("User", userSchema);