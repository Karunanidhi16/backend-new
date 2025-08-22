import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/aysncHandler"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model"
export const verifyJWT = asyncHandler(async(req,res,next)=>{
try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
    if (!token) {
        throw new ApiError(401,"unauthorized request")
    }
    
    
    const decodedToken = JsonWebTokenError.verify(token,process.env.ACESS_TOKEN_SECRET)
    
    await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(401,"INVALID ACESS TOKEN")
    }
    
    req.user = user;
    next()
} catch (error) {
    throw new ApiError(401,erroe?.message|| "invalid access token")
}
})