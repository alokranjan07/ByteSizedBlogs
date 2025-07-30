import mongoose from 'mongoose'

const connectDB=async()=>{
   try {
    const connectionInsatnce= await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log("mongodb connected" );
   } catch (error) {
    console.log("error occured",error);
    process.exit(1);
   }
}
export default connectDB