import mongoose from 'mongoose'
import {User} from './user.models.js'


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,

    },
    slug:{
    type:String,
    unique:true,
    lowercase:true
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"{User}",
        required:true,
    },
    imageUrl:{
        type:String
    },
    tags:[String]


},{timestamps:true})
export const Blog=mongoose.model('Blog',blogSchema)