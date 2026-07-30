import mongoose from "mongoose";
import { Team } from "./team.model.js";
import { UpdateTournamentsResultDto } from "../tournament/tournament.schema.js";

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
export const findTeamsByIds = (teamIds: string[]) => {
  return Team.find({
    _id: {
      $in: teamIds,
    },
  });
};
export const updateBulkResultsRepo = (
  results: UpdateTournamentsResultDto,
  session?: mongoose.ClientSession,
) => {
  return Team.bulkWrite(
    results.map((result) => ({
      updateOne: {
        filter: {
          _id: result.teamId,
        },
        update: {
          $set: {
            "stats.kills": result.kills,
            "stats.placement": result.placement,
            "stats.points": result.points,
          },
        },
      },
    })),
    { session },
  );
};
export const getTeamsByTournament = (
  tournamentId: mongoose.Types.ObjectId,
  session: mongoose.ClientSession,
) => {
  return Team.find({ tournamentId }).session(session ?? null);
};
export const bulkUpdateTeamEarningsRepo = async (
  teamEarnings: { teamId: mongoose.Types.ObjectId; earnings: number }[],
  session?: mongoose.ClientSession,
) => {
  return Team.bulkWrite(
    teamEarnings.map((team) => ({
      updateOne: {
        filter: {
          _id: team.teamId,
        },
        update: {
          $set: {
            "stats.earnings": team.earnings,
          },
        },
      },
    })),
    { session },
  );
};
