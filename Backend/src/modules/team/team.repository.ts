import mongoose from "mongoose";
import { Team } from "./team.model.js";

export const findTeamByInviteCode = (
  tournamentId: mongoose.Types.ObjectId,
  inviteCode: string,
) => {
  return Team.findOne({
    tournamentId,
    inviteCode,
  });
};
export const findUserTeam = (
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  return Team.findOne({
    tournamentId,
    "members.userId": userId,
  });
};
export const findCaptainTeam = (
  tournamentId: mongoose.Types.ObjectId,
  captainId: mongoose.Types.ObjectId,
) => {
  return Team.findOne({
    tournamentId,
    captainId,
  });
};
