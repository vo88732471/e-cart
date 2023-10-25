import express, { Router } from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//Login || Method POST
router.post('/login',loginController)

//test routes
router.get("/test", requireSignIn,isAdmin,testController);

//Forgot Password
router.post('/forgot-password',forgotPasswordController)

//protected routes
router.get('/user-auth',requireSignIn, (req,res) =>{
  res.status(200).send({ok:true})
})


//admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) =>{
  res.status(200).send({ok:true})
})

//update profile route
router.put('/profile',requireSignIn,updateProfileController)

//order
router.get('/orders',requireSignIn,getOrderController)

//order
router.get('/all-orders',requireSignIn,isAdmin,getAllOrderController)

//update status of order
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

export default router;