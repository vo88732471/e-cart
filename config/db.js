import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Successfully connected to DB `)       
    } catch (error) {
        console.log(`Error in MongoDB=> ${error}`)
    }
};


export default connectDB