import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloydinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesstoken = user.generateAccessToken();
    const refreshToken = user.generateRefrashToken();
    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accesstoken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something is wrong when generating refresh token and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
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

  const { username, email, roll, password } = req.body;
  console.log("email", email);
  if ([username, email, roll, password].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with emaill or username exists!");
  }

  const avaterLocalPath = req.files?.avater[0]?.path;

  console.log(avaterLocalPath);
  if (!avaterLocalPath) {
    throw new ApiError(400, "Avater file is required!");
  }

  const avater = await uploadOnCloydinary(avaterLocalPath);
  if (!avater) {
    throw new ApiError(400, "Avater file is required!");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    avater: avater.url,
    email,
    roll,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something wrong when user register!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email, "Password:", password);
  if (!email || !password) {
    throw new ApiError(400, "Email and password required!");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });
  console.log("User Details:", user);
  if (!user) {
    throw new ApiError(404, "User not find!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user cridantial! error is here");
  }

  const { accesstoken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("valochiAccessToken", accesstoken, options)
    .cookie("valochiRefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accesstoken,
          refreshToken,
        },
        "User loged In Successfully!"
      )
    );
});

const logOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      valochiRefreshToken: undefined,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("valochiAccessToken", options)
    .clearCookie("valochiRefreshToken", options)
    .json(new ApiResponse(200, "User loged Out  Successfully!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookie.valochiRefreshToken || req.body.valochiRefreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refreshtoken");
    }

    if (incomingRefreshToken === user?.refreshtoken) {
      throw new ApiError(401, "Refresh token expire or used!");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accesstoken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    return res
      .status(200)
      .clearCookie("valochiAccessToken", accesstoken, options)
      .clearCookie("valochiRefreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accesstoken, refreshToken },
          "Access token refreshed successfylly!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message);
  }
});

const getAllUsers = asyncHandler (async (req,res) => { 
  try {
    const users = await User.find();
    if (!users) {
      throw new ApiError (400, "user not founded !")
    }

    return res 
          .status(200)
          .json(new ApiResponse(200, users, "User loaded succesfully!"))
  } catch (error) {
    throw new ApiError (500, "user did not loaded !")
  }
 })

export { registerUser, loginUser, logOut, refreshAccessToken, getAllUsers };
