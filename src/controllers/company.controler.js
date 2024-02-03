import { Company } from "../models/company.mode.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const registerCompany = asyncHandler( async (req, res) => { 
    const { companyName, group } = req.body
    console.log( companyName, group)

    if ([companyName, group ].some((field) =>  field?.trim() === "" )) {
        throw new ApiError(400, "Company name and Groupe required!")
    }

    const existCompany = await Company.findOne({
        $and : [{companyName}, {group}]
    })

    if(existCompany) throw new ApiError(400, "Already exist this company!")

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
    if(!id) throw new ApiError(400, "Id required for update company name or groupe!")

    const {companyName, group } = req.body;

    if(!companyName || !group ) throw new ApiError(400, "Company name and groupe required!")

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




 export { registerCompany, deleteCompany, updateCompany }