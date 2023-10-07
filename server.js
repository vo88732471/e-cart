import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";



//configure env
dotenv.config();

//database config
connectDB()




//rest object
const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api/v1/auth',authRoutes)

//rest api
app.get('/',(req,res) =>{
    res.send({
        message:'Welcome to e-cart'
    })
})



//run listen
app.listen(process.env.PORT || 8080,()=>{
    console.log(`server Running on Port ${process.env.PORT || 8080}`);
})