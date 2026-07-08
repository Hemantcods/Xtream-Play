import { Request, Response,NextFunction } from "express";
import { loginUser, registerUser } from "../auth/auth.service.js"
import { validateLogin, validateRegister } from "../auth/auth.validator.js";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { User } from "../user/user.model.js";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../../utils/cookies.js";


// after regitering the user send back the user
export const register=asyncHandler ( async(req:Request,res:Response,next:NextFunction)=>{
        const error = validateRegister(req.body);
        if (error){
            throw new AppError(error,409)
        }
        const user=await registerUser(req.body)

        res.status(201).json({
            success:true,
            message:'user Registered',
            user
        })
})

export const login=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const error=validateLogin(req.body)
    if(error){
        throw new AppError(error,400)
    }  
  const {user,accessToken,refreshToken} = await loginUser(req.body)
  setAccessTokenCookie(res, accessToken)
  setRefreshTokenCookie(res,refreshToken)
    res.status(200).json({
        success:true,
        message:'User Logged in Successfully',
        data:user
    })
})

export const refreshAccessToken=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {refreshToken}=req.body
    if(!refreshToken){
        throw new AppError('Refresh token is required',400)
    }
    const verified=verifyRefreshToken(refreshToken)
    if (!verified){
        throw new AppError("RefrehToken is expired",400)
    }
    const userid=verified.userId
    const newToken=generateAccessToken(userid)
    res.status(200).json({
      success:true,
      accessToken:newToken
    });
})

export const getMe=asyncHandler(async (req: AuthRequest, res: Response) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  })
export const refreshToken=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {refreshToken}=req.body
    if(!refreshToken){
        throw new AppError('Refresh token is required',400)
    }
    const verified=verifyRefreshToken(refreshToken)
    if (!verified){
        throw new AppError("RefrehToken is expired",400)
    }
    const userid=verified.userId
    const user=await User.findById(userid).select('+refreshToken')
    if(!user || user.refreshToken !== refreshToken){
        throw new AppError("Invalid refresh token",400)
    }
    const newToken=generateAccessToken(userid)
    res.status(200).json({
      success:true,
      accessToken:newToken
    });
})