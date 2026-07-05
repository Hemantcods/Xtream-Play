import { Types } from "mongoose";
import { Participant } from "../participant/participant.model.js";
import { Tournament } from "./tournament.model.js";

export const createTournament = async (data: any, creator: any) => {
  // Implementation for creating a tournament
  // it always get the verified data from the controller so no need to validate it here
  const { name, game, entryFee, prizePool, mode, StartTime, maxPlayers } = data;
  const createdBy = creator;
  // create a tournament in the database
  const tournament = await Tournament.create({
    name,
    game,
    entryFee,
    prizePool,
    mode,
    StartTime,
    maxPlayers,
    createdBy,
  });
  return tournament;
};

export const getTournaments = async () => {
  // Implementation for getting all tournaments
  const tournaments = await Tournament.find();
  return tournaments;
};

export const getTournament = async (id: string) => {
  if (!id) {
    throw new Error("Tournament id is required");
  }
  const tournament = await Tournament.findOne({ _id:id });
  return tournament;
};
export const getRegisteredPlayer = async (tournament_id: string) => {
  if (!tournament_id) {
    throw new Error("Tournament id is required")
  }
  const registeredPlayer = await Participant.countDocuments({
    tournamentId:tournament_id
  })
  return registeredPlayer
}

export const getUserTournamentsService=async(userId:Types.ObjectId)=>{
  const tournaments=await Participant.find({userId}as any).populate('tournamentId')
  return tournaments.map(participant=>participant.tournamentId)}
