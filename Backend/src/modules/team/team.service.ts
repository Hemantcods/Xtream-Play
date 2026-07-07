import mongoose from "mongoose";
import { Team } from "./team.model.js";
import { PlayerMode } from "../tournament/tournament.model.js";
import { generateInviteCode } from "../../utils/inviteCode.js";

export const getReservedPlayerCount = async (
  tournamentId: mongoose.Types.ObjectId,
  teamSize: number
): Promise<number> => {
  const teamCount = await Team.countDocuments({
    tournamentId,
  });
  return teamCount * teamSize;
};

export const getCountByTeamType = (type:PlayerMode) => {
  if (type==PlayerMode.SOLO) {
    return 1
  }
  if (type == PlayerMode.DUO) {
    return 2
  }
  if (type == PlayerMode.SQUAD) {
    return 4
  }
  return -1
}

export async function generateUniqueInviteCode(tournamentId:mongoose.Types.ObjectId):Promise<string> {
  while (true) {
    const code = generateInviteCode();
    const exists = await Team.exists({
      tournamentId,
      inviteCode:code
    })
    if (!exists) {
      return code
    }
  }
}