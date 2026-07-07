import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { validateCreateTournament, validateStartTournament } from "./tournament.validator.js";
import { createTournament, getRegisteredPlayer, getTournament, getTournaments, getUserTournamentsService } from "./tournament.service.js";
import console from "console";
import { AuthRequest } from "../../middlewares/auth.middleware.js";

export const CreateTournament=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const error=validateCreateTournament(req.body)
    if(error){
        throw new AppError(error,400)
    }
    const id = req.body.id; 
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
    if(!tournaments || tournaments.length === 0) {
        throw new AppError('No tournaments found',404)
    }
    res.status(200).json({
        success:true,
        data:tournaments
    })
})

export const getTournamentById=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const { id } = req.params;
    if(!id){
        throw new AppError('Tournament id is required',400)
    }
    console.log(id)
  const tournament = await getTournament(id as string)
  if(!tournament){
      throw new AppError('Tournament not found',404)
  }
  const registeredplayer = await getRegisteredPlayer(id as string,tournament?.mode.player)
    res.status(200).json({
      success: true,
      data:{...tournament.toObject(),registeredPlayers:registeredplayer}
    })
})

export const DeleteTournamentById=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const { id } = req.params;
    if(!id){
        throw new AppError('Tournament id is required',400)
    }
    const tournament=await getTournament(id as string)
    if(!tournament){
        throw new AppError('Tournament not found',404)
    }
    if(tournament.StartTime < new Date()){
        throw new AppError('Tournament has already started, cannot delete',400)
    }
    await tournament.deleteOne()
    res.status(200).json({
        success:true,
        message:'Tournament deleted successfully'
    })
})

export const StartTournament=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const { id } = req.params;
    if(!id){
        throw new AppError('Tournament id is required',400)
    }
    const error=validateStartTournament(req.body)
    if(error){
        throw new AppError(error,400)
    }
    const {roomId,roomPassword}=req.body
    const tournament=await getTournament(id as string)
    if(!tournament){
        throw new AppError('Tournament not found',404)
    }
    if(tournament.StartTime > new Date()){
        throw new AppError('Tournament has not started yet, cannot start',400)
    }
    // logic for starting the tournament
    tournament.roomId=roomId
    tournament.roomPassword=roomPassword
    await tournament.save()
    res.status(200).json({
        success:true,
        message:'Tournament started successfully',
        tournament
    })
})

export const EndTournament=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const { id } = req.params;
    if(!id){
        throw new AppError('Tournament id is required',400)
    }
    const tournament=await getTournament(id as string)
    if(!tournament){
        throw new AppError('Tournament not found',404)
    }
    if(tournament.StartTime > new Date()){
        throw new AppError('Tournament has not started yet, cannot end',400)
    }
    // logic for ending the tournament
    tournament.isCompleted=true
    await tournament.save()
    res.status(200).json({
        success:true,
        message:'Tournament ended successfully',
        tournament
    })
})

export const Status=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const { id } = req.params;
    if(!id){
        throw new AppError('Tournament id is required',400)
    }
    const tournament=await getTournament(id as string)
    if(!tournament){
        throw new AppError('Tournament not found',404)
    }
    let status=""
    if(tournament.isCompleted){
        status="completed"
    }else if(tournament.StartTime > new Date()){
        status="upcoming"
    }else{
        status="ongoing"
    }
    res.status(200).json({
        success:true,
        status
    })
})
export const getUserTournaments=asyncHandler(async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const userId=req.user?._id
    if(!userId){
        throw new AppError('User id is required',400)
    }
    const tournaments=await getUserTournamentsService(userId)
    if(!tournaments || tournaments.length === 0) {
        res.status(200).json({
            success:true,
            message:'No tournaments found'
        })
    }
    res.status(200).json({
        success:true,
        data:tournaments
    })

})