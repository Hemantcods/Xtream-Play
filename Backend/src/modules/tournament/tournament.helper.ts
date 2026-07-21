import { AppError } from "../../utils/AppError.js";
import { ITournament } from "./tournament.model.js";
import { getTournamentStatus } from "./tournament.service.js";

export function ensureTournamentRegistrationOpen(
  tournament: ITournament
): void {
  const status = getTournamentStatus(tournament);

  if (status === "RUNNING") {
    throw new AppError(
      "Tournament has already started.",
      400
    );
  }

  if (status === "COMPLETED") {
    throw new AppError(
      "Tournament has already ended.",
      400
    );
  }
}