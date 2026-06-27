import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { LeaderBoardService } from "./user.service.js";
import { AppError } from "../../utils/AppError.js";

export const getLeaderBoard=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const LeaderBoard=await LeaderBoardService()
    if (!LeaderBoard){
        throw new AppError("No leaderboard found",404)
    }
    res.status(200).json({
        success:true,
        data:LeaderBoard
    })
})  