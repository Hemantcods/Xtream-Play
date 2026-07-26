import z from "zod";
import { Game, PlayerMode } from "./tournament.model.js";
import mongoose from "mongoose";

export const CreateTournamentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Tournament name must have 3 characters")
      .max(100, "Tournament name cannot exceed 100 characters"),
    game: z.enum(Game),
    entryFee: z.number().min(0, "Entry fee cannot be negative"),
    prizePool: z.number().min(0, "Prize pool cannot be negative"),
    mode: z.object({
      map: z.string().trim().min(1, "Map is rerquired"),
      player: z.enum(PlayerMode),
      type: z.string().trim().min(1, "Tournament type is required"),
    }),
    StartTime: z.coerce
      .date()
      .refine((date) => date > new Date(), "Start time must be in future"),
    maxPlayers: z.number().int().positive("Max Players must be greater than 0"),
    PlacementPrize: z.object({
      first: z.number().min(0),
      second: z.number().min(0),
      third: z.number().min(0),
    }),
    PerEliminationPrize: z.number().min(0).optional(),
  })
  .strict();
export type CreateTournamentDto = z.infer<typeof CreateTournamentSchema>;

export const AssignRoomSchema = z.object({
  roomId: z
    .string()
    .trim()
    .min(1, "Room ID is too short")
    .max(50, "Room ID is too long"),
  roomPassword: z
    .string()
    .trim()
    .min(1, "Room password is too short")
    .max(50, "Room password is too long"),
});
export const TournamentIdParamsSchema = z.object({
  id: z.string().refine(
    (id) => mongoose.Types.ObjectId.isValid(id),
    {
      message: "Invalid tournament id",
    },
  ),
});
export const TeamResultSchema = z.object({
  teamId: z.string().min(1),
  placement: z.number().int().min(1),
  kills: z.number().min(0, "Kills entered is invalid"),
  points: z.number().min(0,"Please enter valid points")
})
export const UpdateTournamentsResultSchema = z.array(TeamResultSchema)
export type UpdateTournamentsResultDto=z.infer<typeof UpdateTournamentsResultSchema>