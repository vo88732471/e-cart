import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();

//routes
//create product isAdmin And signinRequired
router.post('/create-product',requireSignIn,isAdmin,formidable() ,createProductController);

//get all product(without photo)
router.get('/get-product',getProductController)

//get single product(without photo)
router.get('/get-product/:slug',getSingleProductController)

//get photo of product
router.get('/product-photo/:pid',productPhotoController)

//delete product
//see is it only done by admin or not
router.delete('/delete-product/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

export default router;