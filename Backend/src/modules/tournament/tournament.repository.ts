import mongoose from "mongoose";
import { Tournament } from "./tournament.model.js";

export const getTournamentRepo = async (
  id: mongoose.Types.ObjectId,
  session?: mongoose.ClientSession,
) => {
  return Tournament.findById(id).session(session ?? null);
};

export const updateTournamentCompletionRepo = async (
  tournamentId: mongoose.Types.ObjectId,
  session?: mongoose.ClientSession,
) => {
  const query = Tournament.findByIdAndUpdate(
    tournamentId,
    {
      $set: {
        isCompleted: true,
      },
    },
    {
      new: true,
    },
  );

  if (session) {
    query.session(session);
  }

  return query;
};
