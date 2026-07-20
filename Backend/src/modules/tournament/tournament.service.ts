import mongoose, { Types } from "mongoose";
import { Participant } from "../participant/participant.model.js";
import { ITournament, PlayerMode, Tournament } from "./tournament.model.js";
import { getCountByTeamType } from "../team/team.service.js";
import { ITeam } from "../team/team.model.js";
import {
  GetAdminTournamentQuery,
  TournamentStatus,
  UpdateTournamentDto,
} from "./tournament.types.js";
import { QueryFilter } from "mongoose";
import { AppError } from "../../utils/AppError.js";
import { CreateTournamentDto } from "./tournament.schema.js";

export const createTournament = async (
  data: CreateTournamentDto,
  creator: mongoose.Types.ObjectId,
) => {
  // Implementation for creating a tournament
  // it always get the verified data from the controller so no need to validate it here
  // create a tournament in the database
  const tournament = await Tournament.create({ ...data, createdBy: creator });
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
    stats,
  };
};
export const getAdminTournamentsService = async (
  query: GetAdminTournamentQuery,
) => {
  const {
    page = 1,
    limit = 10,
    search,
    game,
    playerMode,
    sort = "-createdAt",
  } = query;
  const filter: QueryFilter<ITournament> = {};
  if (game) filter.game = game;
  if (playerMode) filter["mode.player"] = playerMode;
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }
  const skip = (Number(page) - 1) * Number(limit);
  const [tournamentsWithoutStatus, total] = await Promise.all([
    Tournament.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
    Tournament.countDocuments(filter),
  ]);
  const tournaments = tournamentsWithoutStatus.map((tournament) => ({
    ...tournament,
    status: getTournamentStatus(tournament),
  }));
  return {
    tournaments,
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit)),
  };
};
export const getAdminTournamentByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid tournament id", 400);
  }
  const tournament = await Tournament.findById(id)
    .populate("createdBy", "name email")
    .populate("winner", "name")
    .lean();
  if (!tournament) {
    throw new AppError("Tournament not Found", 404);
  }
  const status = getTournamentStatus(tournament);

  return {
    ...tournament,
    status,
  };
};
export const updateTournamentSevice = async (
  id: string,
  updatedData: UpdateTournamentDto,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid tournament id.", 400);
  }
  const tournament = await Tournament.findById(id);
  if (!tournament) {
    throw new AppError("Tournament not found.", 404);
  }
  // Business Logic
  if (
    tournament.registeredPlayers > 0 &&
    (updatedData.game ||
      updatedData.mode ||
      updatedData.maxPlayers ||
      updatedData.entryFee)
  ) {
    throw new AppError(
      "Game, mode, entry fee, and max players cannot be changed after registrations have started.",
      400,
    );
  }
  Object.assign(tournament, updatedData);
  await tournament.save();
  const status = getTournamentStatus(tournament);
  return {
    tournament,
    status,
  };
};
export const getTournamentStatus = (
  tournament: ITournament,
): TournamentStatus => {
  if (tournament.isCompleted) {
    return TournamentStatus.COMPLETED;
  }
  if (new Date() >= tournament.StartTime) {
    return TournamentStatus.RUNNING;
  }
  return TournamentStatus.UPCOMING;
};
export const DeleteTournamentService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid tournament id.", 400);
  }
  const tournament = await Tournament.findById(id);
  if (!tournament) {
    throw new AppError("Tournament not found", 404);
  }
  if (tournament.registeredPlayers > 0) {
    throw new AppError(
      "Cannot delete a tournament with registered players",
      400,
    );
  }
  if (tournament.StartTime <= new Date()) {
    throw new AppError("Tournament has alredy started", 400);
  }
  await tournament.deleteOne();
};
