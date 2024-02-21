import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloydinary } from "../utils/cloudinary.js";

const getProduct = asyncHandler(async (req, res) => {
  try {
    const filter = {};
    const id = req.query.id;
    if (id) filter._id = id;
    const products = await Product.find(filter);
    if (!products) throw new ApiError(400, "Product not found!");
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Prdouct founded successfully!"));
  } catch (error) {
    throw new ApiError(500, "Faild to found Products!");
  }
});

const addProducts = asyncHandler(async (req, res) => {
  let { productName, price, category, company, wet } = req.body;
  productName = productName.toLowerCase();
  category = category.toLowerCase();

  if (
    [productName, price, category, company, wet].some(
      (field) => field.trim() === ""
    )
  )
    throw new ApiError(
      400,
      "ProductName, price, category, company and wet required!"
    );

  const existProduct = await Product.findOne({
    $and: [{ productName }, { price }, { category }, { company }],
  });
  // console.log(existProduct);
// console.log(req.body)
  const avaterLocalPath = req.files?.photo[0]?.path;

  // console.log(avaterLocalPath);
  // if (!avaterLocalPath) {
  //   throw new ApiError(400, "Avater file is required!");
  // }

  const photo = await uploadOnCloydinary(avaterLocalPath) || "";
  // if (!photo) {
  //   throw new ApiError(400, "Photo file is required!");
  // }

  if (existProduct) throw new ApiError(400, "This Product already exist!");

  const product = await Product.create({
    productName,
    price,
    company,
    category,
    wet,
    photo: photo
  });
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Created successfully!"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let { productName, price, category, company, wet, photo } = req.body;
  productName = productName.toLowerCase();
  category = category.toLowerCase();

  if (
    [productName, category, company, wet].some((field) => field.trim() === "")
  )
    throw new ApiError(
      400,
      "ProductName, price, category, company and wet required!"
    );

  const existProduct = await Product.findOne({
    $and: [{ productName }, { price }, { category }, { company }],
  });
  // console.log(existProduct);

  if (existProduct) throw new ApiError(400, "You do not update anything!");

  const product = await Product.findByIdAndUpdate(id, {
    productName,
    price,
    company,
    category,
    wet,
    photo,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully!"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new ApiError(400, "Id is required to delete!");
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) throw new ApiError(400, "Faild delete Product!");
    return res
      .status(200)
      .json(new ApiResponse(200, deleteProduct, "Deleted successfully!"));
  } catch (error) {
    throw new ApiError(500, "Server error to delete product!");
  }
});

export { getProduct, addProducts, updateProduct, deleteProduct };
