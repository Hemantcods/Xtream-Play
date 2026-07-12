import { Types } from "mongoose";
import { Participant } from "../participant/participant.model.js";
import { ITournament, PlayerMode, Tournament } from "./tournament.model.js";
import { getCountByTeamType } from "../team/team.service.js";
import { ITeam } from "../team/team.model.js";

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
  const tournament = await Tournament.findOne({ _id: id }).select(
    "-roomId -roomPassword",
  );
  return tournament;
};
export const getRegisteredPlayer = async (
  tournament_id: string,
  format: PlayerMode,
) => {
  if (!tournament_id) {
    throw new Error("Tournament id is required");
  }
  const MaxPlayerPerTeam = getCountByTeamType(format);
  const registeredPlayer = await Participant.countDocuments({
    tournamentId: tournament_id,
  });
  return registeredPlayer * MaxPlayerPerTeam;
};

export const getUserTournamentsService = async (userId: Types.ObjectId) => {
  const participants = await Participant.find({ userId } as any)
    .populate("tournamentId")
    .populate("teamId");
  const stats = {
    total: 0,
    upcoming: 0,
    live: 0,
    completed: 0,
    totalWins: 0,
    totalEarnings: 0,
  };
  const tournaments = participants.map((participant) => {
    const tournament = participant.tournamentId as unknown as ITournament;
    const team = participant.teamId as unknown as ITeam;
    let status: "upcoming" | "live" | "completed";
    if (tournament.isCompleted) {
      status = "completed";
      stats.completed++;
    } else if (new Date(tournament.StartTime) <= new Date()) {
      status = "live";
      stats.live++;
    } else {
      status = "upcoming";
      stats.upcoming++;
    }
    stats.total++;
    return {
      _id: tournament._id,
      name: tournament.name,
      game: tournament.game,
      status,
      entryFee: tournament.entryFee,
      prizePool: tournament.prizePool,
      registeredPlayers: tournament.registeredPlayers,
      maxPlayers: tournament.maxPlayers,
      startTime: tournament.StartTime,
      mode: tournament.mode,
      room: {
        roomId: status === "live" ? tournament.roomId : null,
        password: status === "live" ? tournament.roomPassword : null,
      },
      team: {
        id: team?._id,
        teamName: team?.teamName,
      },
    };
  });
  return {
    tournaments,
    stats
  };
};
