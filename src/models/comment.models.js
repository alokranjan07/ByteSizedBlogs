import mongoose from 'mongoose'

const commentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
         required:true,


    },
    author:{
        type:String,
        required:true,
    }

},{timestamps:true})
export const Comment=mongoose.model('Comment',commentSchema)