import {asyncHandler} from "../utils/aysncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const userRegister = asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })
const {fullName,email,username,password} = req.body
console.log("email :", email);             

// if(fullName===""){
//     throw new ApiError()
// }
if ([fullName,email,username,password].some((field)=>
     field?.trim()==="")) {
    throw new ApiError(400,"ALLL FIELDS ARE REQUIRED")
}
if (!email.includes("@")) {
    throw new ApiError(404,"email should have @")
}

const existedUser = User.findOne({
$or : [{username},{email}]
})

if(existedUser){
    throw new ApiError(409,"user alreeaddy exisssts")
}


const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if (!avatarLocalPath) {
    throw new ApiError(404, "avatar should present")  
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage  = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar) {
    throw new ApiError(400, "avatarfile reqq")
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()

})
const createdUser = await User.findById(user._id).select("-password -refreshToken")

if (!createdUser) {
    throw new ApiError(500,"SOMETHING WENT WRONG WHILE REGISTERING")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "USer Registered succesfully")
)
})

export {userRegister}