import z from "zod";
import { Game, PlayerMode } from "./tournament.model.js";

export interface GetAdminTournamentQuery {
  page?: number;
  limit?: number;
  search?: string;
  game?: Game;
  playerMode?: PlayerMode;
  sort?: string;
}

export const UpdateTournamentSchema = z.object({
  name: z.string().optional(),

  game: z.nativeEnum(Game).optional(),

  entryFee: z.number().positive().optional(),

  prizePool: z.number().positive().optional(),

  maxPlayers: z.number().positive().optional(),

  StartTime: z.coerce.date().optional(),

  mode: z.object({
    map: z.string(),
    player: z.nativeEnum(PlayerMode),
    type: z.string(),
  }).optional(),

  PlacementPrize: z.object({
    first: z.number(),
    second: z.number(),
    third: z.number(),
  }).optional(),

  PerEliminationPrize: z.number().optional(),
}).strict();
export enum TournamentStatus {
    UPCOMING = "UPCOMING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
}
export type UpdateTournamentDto = z.infer<typeof UpdateTournamentSchema>;