import { asyncHandler } from "../utilities/asynceHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utilities/cloudinary.js"
import { ApiResponse } from "../utilities/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists (username and email)
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user user creation
  // return response

  const { fullName, email, username, password } = req.body;
  // console.log("email:", email);
  console.log("request body:", req.body);

  // NOTE:-***** THIS CODE AND THE CODE WRITTEN below is almost same *****
  /*
    if (fullName === "") {
            throw new ApiError(400 , "Full name is required")
        }else if (email === "" && email.includes("@")) {
            throw new ApiError(400 , "Email is required")
        }else if (username === "") {
            throw new ApiError(400 , "Username is required")
        }else if (password === "") {
            throw new ApiError(400 , "Password is required")
        }
 */

  if (
    // LEARN about "some()" method
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, " User with email or username already exists");
  }
//   console.log("request files:",req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path

//   console.log("avatar: ",avatarLocalPath);
  // const coverImageLocalPath = req.files?.coverImage[0]?.path
  let coverImageLocalPath;

  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ) {
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }


  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage =  await uploadOnCloudinary(coverImageLocalPath)



  if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering User")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )



});

export { registerUser };
