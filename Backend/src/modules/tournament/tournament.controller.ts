import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import {
  validateCreateTournament,
  validateStartTournament,
} from "./tournament.validator.js";
import {
  AssignRoomService,
  createTournament,
  DeleteTournamentService,
  getAdminTournamentByIdService,
  getAdminTournamentsService,
  getRegisteredPlayer,
  getTournament,
  getTournaments,
  getUserTournamentsService,
  PublishResultsService,
  UpdateResultsService,
  updateTournamentSevice,
} from "./tournament.service.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { Participant } from "../participant/participant.model.js";
import { UpdateTournamentSchema } from "./tournament.types.js";
import { AssignRoomSchema, CreateTournamentSchema, TournamentIdParamsSchema, UpdateTournamentsResultSchema } from "./tournament.schema.js";
import mongoose from "mongoose";

export const CreateTournament = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const validatedData = CreateTournamentSchema.parse(req.body);
    const id = req.user?._id;
    if (!id) {
      throw new AppError("Authentication Error", 401);
    }
    // for testing purpose we are using a dummy id but in real application we will get the id from the verified token of the user who is creating the tournament
    const tournament = await createTournament(validatedData, id);
    res.status(201).json({
      success: true,
      message: "Tournament Created Successfully",
      tournament,
    });
  },
);
// getting all tournaments whose startTime is more than current time
export const getAllTournaments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get all tournaments from the database whose startTime is more than current time
    const tournaments = await getTournaments();
    if (!tournaments || tournaments.length === 0) {
      throw new AppError("No tournaments found", 404);
    }
    res.status(200).json({
      success: true,
      data: tournaments,
    });
  },
);

export const getTournamentById = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Tournament id is required", 400);
    }
    const tournamentObjectId = new mongoose.Types.ObjectId(id as string);
    const tournament = await getTournament(tournamentObjectId);
    if (!tournament) {
      throw new AppError("Tournament not found", 404);
    }
    let isRegistered = false;
    if (req.user) {
      const participation = await Participant.exists({
        tournamentId: id,
        userId: req.user._id,
      });
      isRegistered = !!participation;
    }
    res.status(200).json({
      success: true,
      data: { ...tournament.toObject(), isRegistered },
    });
  },
);

export const DeleteTournamentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (Array.isArray(id)) {
      throw new AppError("Invalid tournament id", 400);
    }
    await DeleteTournamentService(id);
    res.status(200).json({
      success: true,
      message: "Tournament deleted successfully",
    });
  },
);

export const StartTournament = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id}=TournamentIdParamsSchema.parse(req.params)
    const {roomId,roomPassword } = AssignRoomSchema.parse(req.body)
    await AssignRoomService(new mongoose.Types.ObjectId(id),roomId,roomPassword)
    res.status(200).json({
      success: true,
      message: "Tournament started successfully",
    });
  },
);

export const EndTournament = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = TournamentIdParamsSchema.parse(req.params)
    
    res.status(200).json({
      success: true,
      message: "Tournament ended successfully",
    });
  },
);

export const Status = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Tournament id is required", 400);
    }
    const tournamentObjectId = new mongoose.Types.ObjectId(id as string);
    const tournament = await getTournament(tournamentObjectId);
    if (!tournament) {
      throw new AppError("Tournament not found", 404);
    }
    let status = "";
    if (tournament.isCompleted) {
      status = "completed";
    } else if (tournament.StartTime > new Date()) {
      status = "upcoming";
    } else {
      status = "ongoing";
    }
    res.status(200).json({
      success: true,
      status,
    });
  },
);
export const getUserTournaments = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new AppError("User id is required", 400);
    }
    const tournaments = await getUserTournamentsService(userId);
    res.status(200).json({
      success: true,
      data: tournaments,
    });
  },
);
export const getAdminTournaments = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAdminTournamentsService(req.query);
    if (!result) {
      throw new AppError("Something went wrong", 400);
    }
    res.status(200).json({
      success: true,
      message: "Tournament fetched successfully",
      data: result,
    });
  },
);
export const getTournamentByIdAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const tournamnetId = req.params.id;
    if (!tournamnetId) {
      throw new AppError("tournamnt id is required", 405);
    }
    const tournament = await getAdminTournamentByIdService(
      tournamnetId as string,
    );
    if (!tournament) {
      throw new AppError("Tournament not found", 409);
    }
    res.status(201).json({
      success: true,
      data: tournament,
    });
  },
);
export const updateTournamentAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const tournamatId = req.params.id;
    const validatedData = UpdateTournamentSchema.parse(req.body);
    const tournament = await updateTournamentSevice(
      tournamatId as string,
      validatedData,
    );
    res.status(200).json({
      success: true,
      message: "Tournament upadted successfully",
      data: tournament,
    });
  },
);
export const updateResults = asyncHandler(async (req: Request, res: Response) => {
  const { id } = TournamentIdParamsSchema.parse(req.params)
  
  const results = UpdateTournamentsResultSchema.parse(req.body.results)
  await UpdateResultsService(new mongoose.Types.ObjectId(id), results)
  res.status(200).json({
    success: true,
    message:"results updated successfully"
  })
})
export const PublishResultController = asyncHandler(async (req: Request, res: Response) => {
  const tournamatId = new mongoose.Types.ObjectId(TournamentIdParamsSchema.parse(req.params).id)
  await PublishResultsService(tournamatId)

  res.status(200).json({
    success: true,
    message:"Results Published Successfully"
  })
})
