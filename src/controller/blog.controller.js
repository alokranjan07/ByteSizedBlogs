import {Blog} from '../models/blog.models.js'
import AsyncHandler from '../utils/Asynchandler.js'
import {ApiError} from '../utils/Apierror.js'
import slugify from 'slugify'
import { User } from '../models/user.models.js'


const createBlog=AsyncHandler(async(req,res)=>{
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

const getAllBlog=AsyncHandler(async(req,res)=>{
  const blog=  await Blog.find()
  .populate('author','name email')
  .sort({ createdAt: -1 });
  if(!blog){
    throw new ApiError(404,"no blogs found")
  }
     
});
const  getblogbySlug=AsyncHandler(async(req,res)=>{
          const blog= await Blog.findOne({slug:req.params.slug});
          if(!blog){
            throw new ApiError(404,"blog not found");
          }

          res.status(200)
          .json( {
            success:true,
             blog
          });
});

const updateBlog=AsyncHandler(async(req,res)=>{
     const {title,content ,tags,imageUrl}=req.body;
      const blog=await findByIdAndUpdate(req.params.id,
        {title,content ,tags,imageUrl},{new:true,runValidators:true}
    );
});
const deleteBlog=AsyncHandler(async(req,res)=>{
  const blog =await findById(req.params.id);
  if(! blog){
    throw new ApiError(404,"blog not found");

  }
  if(blog.author.toString()!=req.user._id.toString()){
    res.status(403);
    throw new ApiError(404,"'Unauthorized: Not the author'");
  }
  res.status(2032)
  .json({
    success:true,
    message:"blog deleted successfully"
  })
});
export {
  createBlog,
  getAllBlog,
  getblogbySlug,
  updateBlog,
  deleteBlog


}
