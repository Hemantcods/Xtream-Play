import { NextFunction, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { GetTournamentTeamParamsSchema, JoinTeamBodySchema, KickMeberSchema } from "./team.validation.js";
import { getTeamService, JoinTeamViaInviteCodeService, KickMemberService } from "./team.service.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";

export const getTeamController = asyncHandler(async (req:AuthRequest,res:Response,next:NextFunction) => {
  const { tournamentId } = GetTournamentTeamParamsSchema.parse(req.params)
  const tournamentObjectId = new mongoose.Types.ObjectId(tournamentId);
  if (!req.user) {
    throw new AppError("Authentication Error",400)
  }
  const userId=req.user._id
  const team = await getTeamService(tournamentObjectId, userId)
  res.status(200).json({
    success: true,
    message: "fetched team sucessfully",
    data:team
  })
})

export const JoinViaTeamCode = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { tournamentId } = GetTournamentTeamParamsSchema.parse(req.params)
  const tournamentObjectId = new mongoose.Types.ObjectId(tournamentId);
  if (!req.user) {
    throw new AppError("Authentication Error",409)
  }
  const userId=req.user._id
  const { inviteCode ,inGameName,uid} = JoinTeamBodySchema.parse(req.body)
  const data = await JoinTeamViaInviteCodeService(tournamentObjectId, userId, inviteCode, uid, inGameName)
  res.status(200).json({
    success: true,
    message: "Joined team successfully",
    data
  })
})

export const KickMember = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { tournamentId, memberId } = KickMeberSchema.parse(req.params)
  const tournamentObjectId = new mongoose.Types.ObjectId(tournamentId);
  const memberObjectId = new mongoose.Types.ObjectId(memberId);
  await KickMemberService(tournamentObjectId,memberObjectId,req.user!._id)
  res.status(200).json({
    success: true,
    message:"Member saved successfully"
  })
})