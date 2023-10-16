import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs"

export const createProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = new productModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating product",
      });
    }
  };

  export const getProductController =async(req,res)=>{
    try {
        const product = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1}).populate("category");
        res.status(200).send({
          success: true,
          total:product.length,
          message: "All Products List",
          product,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting all products",
        });
      }     

  };

  export const getSingleProductController = async(req,res)=>{
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
          success: true,
          message: "Get Single product Successfully",
          product,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While getting Single Product",
        });
      }
    };

//get product photo
export const productPhotoController = async(req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
      };
    }catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting all photo list",
        });
      }     
};

//delete product
export const deleteProductController = async(req,res)=> {
 try {
    const product = await productModel.findById(req.params.pid).select("-photo");
    if(!product){
      return  res.status(200).send({
            success: true,
            message: "There is no Product with this Product id",
          }) 
    }
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    })
 } catch (error) {
    console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while deleting product",
        });
 }
}

//update product
export const updateProductController = async(req,res) => {
try {
    const { name, description, price, category, quantity, shipping } =
    req.fields;
  const { photo } = req.files;
  //validation
  switch (true) {
    case !name:
      return res.status(500).send({ error: "Name is Required" });
    case !description:
      return res.status(500).send({ error: "Description is Required" });
    case !price:
      return res.status(500).send({ error: "Price is Required" });
    case !category:
      return res.status(500).send({ error: "Category is Required" });
    case !quantity:
      return res.status(500).send({ error: "Quantity is Required" });
    case photo && photo.size > 1000000:
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
  }
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
} catch (error) {
    console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while updating product",
        });
}
}