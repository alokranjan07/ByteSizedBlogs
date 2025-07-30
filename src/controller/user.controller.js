import   AsyncHandler   from "../utils/Asynchandler.js";
import {User} from '../models/user.models.js'
import {ApiError} from '../utils/Apierror.js'
import jwt from 'jsonwebtoken'

const registerUser= AsyncHandler(async(req,res)=>{
   //requesting data from frontend
    const {name,email,password}=req.body;


//check the details are enetere or not 
    if(!name|| !email|| !password){
        return res.status(402)
        .json(
            {
                success:false,
                message:"details required for user registration"

            }
        );
       
    }
    //check user is already regisetred or not 
   const existedUser= await User.findOne({email});
   if(existedUser){
     throw new ApiError(409,"user already registered")
   }

   //creating a user 

  const user=await  User.create({
    name,
    email,
    password
  });
  //genertaing access and refreshTOken for the user
  const accessToken=user.generateAccessToken();
  const  refreshToken=user.generateRefreshToken();

  res.status(201)
  
  .cookie('accessToken',accessToken,{
    httpOnly:true,
    secure:true,
    sameSite: 'None',
      maxAge: 15 * 60 * 1000

  })
  .cookie('refreshToken',refreshToken,{
    httpOnly:true,
    secure:true,
     sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
  })

  
  .json(
    {
    sucess:true,
    message:"user registered successfully",
     user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role

    }
  });


});

const loginUser=AsyncHandler(async(req,res)=>{

  //get details from frontend
    const {email,password}=req.body;
    //check user exists or not 
       const user=await User.findOne({email});
       
       if(!user){
        throw new ApiError(404,"user not found");
       }
       //match the password with the mongodb Compare password methiod
      const isPasswordValid = await user.comparePassword(password);
       if (!isPasswordValid) {
       throw new ApiError(402, "password is incorrect");
}
//then generate access and refresh Token for the user


const accessToken=user.generateAccessToken();
const refreshToken=user.generateRefreshToken();

res.status(200)
.cookie('accessToken',accessToken,{
    httpOnly:true,
    secure:true,
    sameSite:'none',
    maxAge:1*60*60*1000

})
.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:'none',
    maxAge:7*24*60*60*1000

})
.json({
    success:true,
    message:"user login successful",
    user:{
        
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
})

})
const logout=AsyncHandler(async(req,res)=>{
  //clear accessstoken and refresh token
  res.
  clearCookie('accessToken',{

  })
  .clearCookie('refreshToken',{
    httpOnly:true,
    secure:true,
    sameSite:'Strict'
  })
  .status(200)
  .json({
    success:true,
    message:"logout successfully",
    secure:true,
    sameSite:'Strict'

  })

});
const refreshToken=AsyncHandler(async(req,res)=>{
  //request token
const token =req.cookies.refreshtoken;
if(!token ){
  
  throw new ApiError(402,"token not found");

}
//verify token with the env token
const decoded=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
if(!decodedToken){
  throw new ApiError(404,"refresh Token not found");
}

//find user by the decoded token
const user=await User.findById(decoded.id);
if(!user){
  throw new ApiError("user not found")
}

//generate new access Token for the user

const newAccessToken=user.generateAccessToken();

res
.cookie('accessToken',newAccessToken,{
  httpOnly:true,
  secure:true,
  sameSite:'none',
  maxAge:15*60*1000

})
.status(200)
.json({
  success:true,
  message:"accessToken refreshed"
})


})
export{registerUser,loginUser,logout,refreshToken}