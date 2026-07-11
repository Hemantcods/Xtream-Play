import mongoose from "mongoose";
import { Tournament } from "../tournament/tournament.model.js";
import { Participant } from "./participant.model.js";
import { AppError } from "../../utils/AppError.js";
import {
  checkWalletService,
  creditWalletService,
  debitWalletService,
} from "../wallet/wallet.service.js";
import {
  generateUniqueInviteCode,
  getCountByTeamType,
  getReservedPlayerCount,
} from "../team/team.service.js";
import { Team } from "../team/team.model.js";

export const RegisterTournamentService = async (
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  uid: string,
  inGameName: string,
  teamName: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // check if the user is already a participant in the tournament
    const existingParticipant = await Participant.findOne({
      tournamentId,
      userId,
    }).session(session);
    if (existingParticipant) {
      throw new AppError(
        "User is already a participant in this tournament",
        400,
      );
    }
    // check if the tournament exists
    const tournament = await Tournament.findById(tournamentId).session(session);
    if (!tournament) {
      throw new AppError("Tournament not found", 404);
    }
    // check if the tournament has already started
    if (tournament.StartTime < new Date()) {
      throw new AppError("Tournament has already started, cannot join", 400);
    }
    // check the team name is provided or not
    if (tournament.mode.player !== "solo" && !teamName?.trim()) {
      throw new AppError("Team name is Reqired", 400);
    }
    // check if the tournament is full
    const teamCount = getCountByTeamType(tournament.mode.player);
    if (teamCount == -1) {
      throw new AppError("Internal Team Count Error", 400);
    }
    const reservedPlayers = await getReservedPlayerCount(
      tournamentId,
      teamCount,
    );
    if (reservedPlayers + teamCount > tournament.maxPlayers) {
      throw new AppError("Tournament is full", 400);
    }
    // check wallet balance
    const wallet = await checkWalletService(userId, session);
    if (!wallet || wallet.balance < tournament.entryFee) {
      throw new AppError("Insufficient wallet balance", 400);
    }
    // wallet deduction
    await debitWalletService(
      userId,
      tournament.entryFee,
      session,
      "tournament_join",
      tournamentId,
    );
    // create invite code for the team
    let inviteCode = "";
    if (tournament.mode.player !== "solo") {
      inviteCode = await generateUniqueInviteCode(tournamentId);
    }
    // create Team
    const team = await Team.create(
      [
        {
          tournamentId,
          captainId: userId,
          teamName,
          inviteCode,
          maxMembers: teamCount,
          mode:tournament.mode.player,
          members: [
            {
              userId,
              inGameName,
              uid,
              role: "CAPTAIN",
            },
          ],
        },
      ],
      { session },
    );
    const participant = await Participant.create(
      [
        {
          tournamentId,
          userId,
          teamId: team[0]._id,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    session.endSession();
    return { participant: participant[0], team: team[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError((error as Error).message, 500);
  }
};

export const LeaveTournamentService = async (
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!tournamentId) {
      throw new AppError("Tournament id is required", 400);
    }
    if (!userId) {
      throw new AppError("User id is required", 400);
    }
    const participant = await Participant.findOneAndDelete(
      {
        tournamentId,
        userId,
      },
      { session },
    );
    if (!participant) {
      throw new AppError("User is not a participant in this tournament", 400);
    }
    // refund the tournament entry fee
    const tournament = await Tournament.findById(tournamentId, { session });
    if (!tournament) throw new AppError("Tournament not found", 404);
    const amount = tournament?.entryFee;
    await creditWalletService(
      userId,
      amount,
      session,
      "tournament_refund",
      tournamentId,
    );
    await session.commitTransaction();
    session.endSession();
    return participant;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError((error as Error).message, 500);
  }
};
export const GetParticipantsService = async (
  tournamentId: mongoose.Types.ObjectId,
) => {
  if (!tournamentId) {
    throw new AppError("Tournament id is required", 400);
  }
  const participants = await Participant.find({ tournamentId }).populate(
    "userId",
  );
  if (!participants) {
    throw new AppError("No participants found", 404);
  }
  return participants;
};
