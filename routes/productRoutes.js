import express, { Router } from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersControllers, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
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

//filter-product
router.post("/product-filters",productFiltersControllers);

//product-count
router.get("/product-count",productCountController);

//product per page
router.get("/product-list/:page",productListController);

//search product
router.get('/search/:keyword',searchProductController)

//related product
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController);


//payment routes
//token
router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;