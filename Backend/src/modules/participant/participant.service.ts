
import mongoose from "mongoose"
import { Tournament } from "../tournament/tournament.model.js"
import { Participant } from "./participant.model.js"
import { AppError } from "../../utils/AppError.js"

export const JoinTournamentService=async(tournamentId:mongoose.Types.ObjectId,userId:mongoose.Types.ObjectId)=>{
    // check if the user is already a participant in the tournament
    const existingParticipant=await Participant.findOne({tournamentId,userId })
    if(existingParticipant){
        throw new AppError('User is already a participant in this tournament', 400)
    }
    // check if the tournament exists
    const tournament=await Tournament.findById(tournamentId)
    if(!tournament){
        throw new AppError('Tournament not found', 404)
    }
    // check if the tournament has already started
    if(tournament.StartTime < new Date()){
        throw new AppError('Tournament has already started, cannot join', 400)
    }
    // check if the tournament is full
    const participantCount=await Participant.countDocuments({tournamentId})
    if(participantCount >= tournament.maxPlayers){
        throw new AppError('Tournament is full, cannot join', 400)
    }
    // create a new participant
    const participant=await Participant.create({tournamentId,userId})
    return participant;
    // todo- wallet balance check and deduction logic will be implemented here in the future
}

export const LeaveTournamentService=async(tournamentId:mongoose.Types.ObjectId,userId:mongoose.Types.ObjectId)=>{
    if(!tournamentId){
        throw new AppError('Tournament id is required', 400)
    }
        if(!userId){
        throw new AppError('User id is required', 400)
    }
    const participant=await Participant.findOneAndDelete({tournamentId,userId})
    if(!participant){
        throw new AppError('User is not a participant in this tournament', 400)
    }
    return participant;
}

export const GetParticipantsService=async(tournamentId:mongoose.Types.ObjectId)=>{
    if(!tournamentId){
        throw new AppError('Tournament id is required', 400)
    }
    const participants=await Participant.find({tournamentId}).populate('userId')
    if(!participants){
        throw new AppError('No participants found', 404)
    }
    return participants;
}