 import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,


    },
    email:{
        type:String,
        required:true,
        unique:true
    
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        default:"user"
    },
    avatar:{
        type:String,
        default:"",
    }
},{timestamps:true})

 userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword=function( Password){
    return bcrypt.compare( Password,this.password);

};

userSchema.methods.generateAccessToken=function(){
    return jwt.sign (
        {
            id:this._id,
            role:this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'15m'
        }
    );
};

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            id:this._id,
            role:this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

export const  User =mongoose.model("User",userSchema)