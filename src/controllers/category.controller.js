import { Category } from "../models/category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createCategory = asyncHandler( async (req,res) => { 
    let {categoryName} = req.body;
    categoryName = categoryName.toLowerCase();
    console.log(categoryName)

    if(!categoryName) throw new ApiError(400, "Category name required!")

    const isExist = await Category.findOne({categoryName})
    if(isExist) throw new ApiError(400, "This category already exist!")


    const category =  await Category.create({
        categoryName: categoryName.toLowerCase()
    })

    return res
            .status(200)
            .json(new ApiResponse(200, category, "Created the category successfully!"))
 })

const deleteCategory = asyncHandler ( async (req,res) => { 
    const id = req.params.id;
    if(!id) throw new ApiError(400, "Id is required for delete!")

    const category = await Category.findById(id);
    if(!category) throw new ApiError(400, "This category is not found!")

    await Category.deleteOne(category)
    return res
            .status(200)
            .json(new ApiResponse(200, "Delete Successfully!"))
 })

const updateCategory = asyncHandler (async (req,res) => { 
   
        const id = req.params.id;
        if(!id) throw new ApiError(400, "Id required for update category!")
        let {categoryName} = req.body
        categoryName = categoryName.toLowerCase();
    
        if(!categoryName) throw new ApiError(400, "Category name required!")
    
        const category = await Category.findById(id)
        if(!category) throw new ApiError (400, "This category is not found!")
    
        await Category.findByIdAndUpdate(id, {
            $set: {
                categoryName
            }
        })

        return res
            .status(200)
            .json(new ApiResponse(200, categoryName, "Updated successfully!"))
    
 })

 export { createCategory, updateCategory, deleteCategory }