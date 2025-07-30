import {Blog} from '../models/blog,models.js'
import {Asynchandler} from '../utils/Asynchandler.js'
import {ApiError} from '../utils/Apierror.js'
import slugify from 'slugify'
import { User } from '../models/user.models.js'


const createBlog=Asynchandler(async(req,res)=>{
    const {title,content,author,tag,imageUrl}=req.body
    const slug=slugify(title,{lower:true});
    if(!title||!content){
        throw new ApiError(403,"missing tittle or content ")
    }
   const blog= await Blog.create(
    {
        title,
        content,
        author,
        tag,
        slug,
        imageUrl,
        author:req.user._id

    });
      res.status(201).json({ success: true, blog });
});

const getAllBlog=Asynchandler(async(req,res)=>{
  const blog=  await Blog.find()
  .populate('author','name email')
  .sort({ createdAt: -1 });
  if(!blog){
    throw new ApiError(404,"no blogs found")
  }
     
});
const  getblogbySlug=Asynchandler(async(req,res)=>{
    const {slug,title}=req.params.url
})