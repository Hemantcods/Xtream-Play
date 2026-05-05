import mongoose from "mongoose";
import { Tournament } from "../tournament/tournament.model.js";
import { Participant } from "./participant.model.js";
import { AppError } from "../../utils/AppError.js";
import { Wallet } from "../wallet/wallet.model.js";
import { Transaction } from "../transaction/transaction.model.js";

export const JoinTournamentService = async (
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
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
    // check if the tournament is full
    const participantCount = await Participant.countDocuments({
      tournamentId,
    }).session(session);
    if (participantCount >= tournament.maxPlayers) {
      throw new AppError("Tournament is full, cannot join", 400);
    }
    // check wallet balance
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet || wallet.balance < tournament.entryFee) {
      throw new AppError("Insufficient wallet balance", 400);
    }
    // wallet deduction
    wallet.balance -= tournament.entryFee;
    await wallet.save({ session });

    // transaction
    await Transaction.create([{
        userId,
        amount: tournament.entryFee,
        type: "debit",
        reason: "tournament_join",
        tournamentId
    }],{session})

    // create a new participant
    const participant = await Participant.create([{ tournamentId, userId }],{session});
    await session.commitTransaction();
    session.endSession();
    return participant;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError((error as Error).message, 500);
  }
};

export const LeaveTournamentService = async (
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  if (!tournamentId) {
    throw new AppError("Tournament id is required", 400);
  }
  if (!userId) {
    throw new AppError("User id is required", 400);
  }
  const participant = await Participant.findOneAndDelete({
    tournamentId,
    userId,
  });
  if (!participant) {
    throw new AppError("User is not a participant in this tournament", 400);
  }
  return participant;
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
