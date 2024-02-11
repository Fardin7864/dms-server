import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getProduct = asyncHandler(async (req,res) => { 
    try {
        const filter = {};
        const id = req.query.id;
        if(id) filter._id = id;
        const products = await Product.find(filter);
        if(!products) throw new ApiError(400, "Product not found!")
        return res.status(200).json(new ApiResponse(200, products, "Prdouct founded successfully!"))
    } catch (error) {
        throw new ApiError(500, "Faild to found Products!")
    }
 })

 const addProducts = asyncHandler (async (req,res) => { 

        let {productName,price, category, company, wet, photo} = req.body;
        productName= productName.toLowerCase();
        category = category.toLowerCase();

        if([productName,price, category, company, wet].some(field => field.trim() === "")) throw new ApiError(400, "ProductName, price, category, company and wet required!")

        const existProduct = await Product.findOne({
            $and: [{productName}, {price}, {category}, {company}]
        })
        console.log(existProduct)


        if(existProduct) throw new ApiError(400, "This Product already exist!")
        
        const product = await Product.create({
            productName,
            price,
            company,
            category,
            wet,
            photo
        })
        return res.status(200).json(new ApiResponse(200, product, "Product Created successfully!"))
    
  })



  export {getProduct, addProducts, }