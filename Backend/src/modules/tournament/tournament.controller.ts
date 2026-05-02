import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { validateCreateTournament } from "./tournament.validator.js";
import { createTournament, getTournaments } from "./tournament.service.js";

export const CreateTournament=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const error=validateCreateTournament(req.body)
    if(error){
        throw new AppError(error,400)
    }
    const {id} = req.body.id; 
    // for testing purpose we are using a dummy id but in real application we will get the id from the verified token of the user who is creating the tournament
    const tournamat=await createTournament(req.body,id)
    res.status(201).json({
        success:true,
        message:'Tournament Created Successfully',
        tournamat
    })
})
// getting all tournaments whose startTime is more than current time
export const getAllTournaments=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    // get all tournaments from the database whose startTime is more than current time
    const tournaments=await getTournaments()
    res.status(200).json({
        success:true,
        tournaments
    })
})