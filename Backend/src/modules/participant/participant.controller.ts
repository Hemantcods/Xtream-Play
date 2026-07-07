import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import {
  GetParticipantsService,
  LeaveTournamentService,
  RegisterTournamentService,
} from "./participant.service.js";
import { validateJoinTournament } from "./participant.validator.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
export const JoinTournament = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { uid, inGameName, teamName } = req.body
    // team name "" for solo
    if (!teamName) {
       teamName=""
    }
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const userId = req.user._id;
    const error = validateJoinTournament({ tournamentId: id,userId:userId,uid,inGameName });
    if (error) {
      throw new AppError(error, 400);
    }
    // change type of id before passing to the service
    const tournamentId = new mongoose.Types.ObjectId(id as string);
    // join the tournament
    const {participant,team} = await RegisterTournamentService(tournamentId, userId,inGameName,uid,teamName);
    res.status(200).json({
      success: true,
      data: {
        participant,
        team
      },
    });
  },
);

export const LeaveTournament = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Tournament id is required", 400);
    }
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const userId = req.user._id;
    const error = validateJoinTournament({ tournamentId: id,userId:userId });
    if (error) {
      throw new AppError(error, 400);
    }
    const tournamentId = new mongoose.Types.ObjectId(id as string);
    const participant = await LeaveTournamentService(tournamentId, userId);
    res.status(200).json({
      success: true,
      data: participant,
    });
  },
);

export const GetParticipants = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Tournament id is required", 400);
    }
    const tournamentId = new mongoose.Types.ObjectId(id as string);
    const participants = await GetParticipantsService(tournamentId);
    res.status(200).json({
      success: true,
      data: participants,
    });
  },
);
