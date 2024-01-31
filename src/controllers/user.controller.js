import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloydinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res ) => { 
   //get usr details from frontend
   // validation - not empty
   // check if user already exists: email
   // check for images, check for avatar
   // upload them to cloudinary, avetar
   // create user object
   // create user object - create entry in db
   // remove pass and refresh token field from response
   // check for user creation
   // return res

   const{ username, email, roll, password} = req.body
    console.log("email" , email)
    if([username, email, password].some((field) =>
        field?.trim() === ""
     )) throw new ApiError (400, "All fields are required");

    const existedUser = await  User.findOne({
        $or: [{ username }, {email}]
     })

     if (existedUser) {
        throw new ApiError(409, "User with emaill or username exists!")
     }

    const avaterLocalPath =  req.files?.avater[0]?.path;

    console.log(avaterLocalPath)
    if (!avaterLocalPath) {
        throw new ApiError(400, "Avater file is required!")
    }

    const avater =  await uploadOnCloydinary(avaterLocalPath)
    if (!avater) {
        throw new ApiError(400, "Avater file is required!")
    }


   const user = await User.create({
        username: username.toLowerCase(),
        avater: avater.url,
        email,
        roll,
        password,
    })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
   )

   if (!createdUser) {
    throw new ApiError(500, "Something wrong when user register!")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully!")
   )

 })


 export  {registerUser}