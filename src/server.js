import { app } from './app.js';
import connectDB from  './db/db.js'
import dotenv from 'dotenv'


 

dotenv.config();
connectDB()
.then(() => {
  app.listen( `${process.env.PORT}`, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  })
})
.catch((error)=>{
    console.log("error occured while running server",error);

})
