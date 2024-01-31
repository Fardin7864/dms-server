import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    intex: true,
},
email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
},
roll: {
    type: String,
    require: true,
},
avater: {
    type: String,
    require: true
},
password: {
    type: String,
    require: [true, 'Password is requred!'],
},
refreshtoken: {
    type: String,
},
},{timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
  return  jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,

    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefrashToken = function () {
    return  jwt.sign({
        _id: this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model('User', userSchema)