import { Company } from "../models/company.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getSingleCompany = asyncHandler(async (req,res) => { 
  try {
    const id = req.params.id;
    const company = await Company.findById(id);
    if(!company) throw new ApiError(400,"Company not founded!")
    return res.status(200).json(new ApiResponse(200, company, "Company founded!"))
  } catch (error) {
    throw new ApiError(500, "Server error to load single Company!")
  }
 })

const getCompanys = asyncHandler (async (req, res) => { 
  try {
    const companys = await Company.find();
    return res
        .status(200)
        .json(new ApiResponse(200, companys, "All company funded!"))
  } catch (error) {
    throw new ApiError(500, "Server error on the company get route!")
  }
 })

const registerCompany = asyncHandler( async (req, res) => { 
    let { companyName, group} = req.body
      // Convert to lowercase
  companyName = companyName.toLowerCase();
  group = group.toLowerCase();

    if ([companyName, group].some((field) =>  field?.trim() === "" )) {
        throw new ApiError(400, "Company name and group required!")
    }

    const existCompany = await Company.findOne({
        $and : [{companyName: companyName.toLowerCase()}, {group: group.toLowerCase()}]
    })

    // console.log(existCompany)

    if(existCompany) {
      throw new ApiError(400, "Already exist this company!")
    }

    const company = await Company.create({
        companyName: companyName.toLowerCase(), 
        group: group.toLowerCase()
    })


    return res
        .status(200)
        .json(new ApiResponse(200,company, "Company registerd succussfully!"))
 })

const deleteCompany = asyncHandler(async (req,res) => { 
    const id =req.params.id;
    console.log(id)

    if(!id) throw new ApiError(400, "Company Id required for remove!")

  const companyToDelete =  await Company.findById(id)
  if (!companyToDelete) {
    throw new ApiError(400, "This company dose not exist!")
  }
  await Company.findByIdAndDelete(id)

   return res
        .status(200)
        .json(new ApiResponse(200,companyToDelete, "Company deleted successfully!"))

  })

const updateCompany = asyncHandler (async (req,res) => { 
    const id = req.params.id;
    if(!id) throw new ApiError(400, "Id required for update company name or group!")

    let {companyName, group} = req.body;
      // Convert to lowercase
   companyName = companyName.toLowerCase();
   group = group.toLowerCase();

    if(!companyName || !group) throw new ApiError(400, "Company name and group required!")

    const companyToUpdate = await Company.findById(id)
     if(!companyToUpdate) throw new ApiError(400, "Company is not founded!")

     const updatedCompany =  await Company.findByIdAndUpdate(id, {
        $set: {
            companyName: companyName.toLowerCase(), 
            group: group.toLowerCase()
        }
     })

     return res
            .status(200)
            .json(new ApiResponse(200, updatedCompany, "Updated succefully!"))
 }
)




 export {getCompanys,getSingleCompany , registerCompany, deleteCompany, updateCompany }