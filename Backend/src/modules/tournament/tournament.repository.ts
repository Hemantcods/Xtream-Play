import mongoose from "mongoose";
import { Tournament } from "./tournament.model.js";

export const getTournamentRepo = async (
  id: mongoose.Types.ObjectId
) => {
  return Tournament.findById(id);
};