import { Request, Response,NextFunction } from "express";
import { loginUser, registerUser } from "../auth/auth.service.js"
import { validateLogin, validateRegister } from "../auth/auth.validator.js";
import { AppError } from "../../utils/AppError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";


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
    const data=await loginUser(req.body)
    res.status(200).json({
        success:true,
        message:'User Logged in Successfully',
        ...data
    })
})