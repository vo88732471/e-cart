import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from './routes/productRoutes.js'



//configure env
dotenv.config();

//database config
connectDB()




//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

//rest api
app.get('/',(req,res) =>{
    res.send({
        message:'Welcome to e-carts'

    })
})



//run listen
app.listen(process.env.PORT || 8080,()=>{
    console.log(`server Running on Port ${process.env.PORT || 8080}`);
})