import jwt from 'jsonwebtoken'
import {AsyncHandler }from '../utils/Asynchandler'
import {User} from '../models/user.models.js'


export const verifyAccesToken=AsyncHandler(async(req,res,next)=>{
    const token=req.cookie.accessToken;
    if(!token){
        throw new ApiError(404,"token not found ");
    }
   const decoded= jwt .verify(token,process.env.ACCESS_TOKEN_SECRET);
   if(!token){
    throw new ApiError(403,"token mising or invalid");
   }
   req.user= await User.findById(decoded.id).select('-password');
   next();

});
export const authoriseRole= (...roles)=> {
    return (req,res,next)=>{
        if(!roles.includes(eq.user.role)){
    res.status(403);
    throw new Error("access Denied")
        }
        next();
    };
};