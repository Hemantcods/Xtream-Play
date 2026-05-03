import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import {GetParticipantsService, JoinTournamentService, LeaveTournamentService} from "./participant.service.js"
import { validateJoinTournament } from "./participant.validator.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";
export const JoinTournament=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    const error=validateJoinTournament({tournamentId:id})
    if(error){
        throw new AppError(error, 400)
    }
    // change type of id before passing to the service
    const tournamentId=new mongoose.Types.ObjectId(id as string)
    const userId=new mongoose.Types.ObjectId('69f64f24f4947bd9bf9cf6e2') // todo- get user id from auth middleware in the future
    // join the tournament
    const participant=await JoinTournamentService(tournamentId ,userId)
    res.status(200).json({
        success:true,
        data:participant
    })
})

export const LeaveTournament=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    if(!id){
        throw new AppError('Tournament id is required', 400)
    }
    const error=validateJoinTournament({tournamentId:id})
    if(error){
        throw new AppError(error, 400)
    }
    const tournamentId=new mongoose.Types.ObjectId(id as string)
    const userId=new mongoose.Types.ObjectId('69f64f24f4947bd9bf9cf6e2') // todo- get user id from auth middleware in the future
    const participant=await LeaveTournamentService(tournamentId,userId)
    res.status(200).json({
        success:true,
        data:participant
    })
})

export const GetParticipants=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    if(!id){
        throw new AppError('Tournament id is required', 400)
    }
    const tournamentId=new mongoose.Types.ObjectId(id as string)
    const participants=await GetParticipantsService(tournamentId)
    res.status(200).json({
        success:true,
        data:participants
    })

})