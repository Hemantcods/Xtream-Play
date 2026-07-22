import mongoose from "mongoose";
import { ITeam, Team } from "./team.model.js";
import { PlayerMode, Tournament } from "../tournament/tournament.model.js";
import { generateInviteCode } from "../../utils/inviteCode.js";
import { AppError } from "../../utils/AppError.js";
import {
  JoinViaInviteCodeResponse,
  TeamDetailsResponse,
} from "./team.types.js";
import {
  findCaptainTeam,
  findTeamByInviteCode,
  findUserTeam,
} from "./team.repository.js";
import { getTournamentStatus } from "../tournament/tournament.service.js";
import { TournamentStatus } from "../tournament/tournament.types.js";
import { Participant } from "../participant/participant.model.js";
import { ensureTournamentRegistrationOpen } from "../tournament/tournament.helper.js";
import { getTournamentRepo } from "../tournament/tournament.repository.js";
import { UpdateTeamProfileDto } from "./team.validation.js";

function updateRegistrationStatus(team: ITeam) {
  const memberCount = team.members.length;

  if (memberCount === 0) {
    team.registrationStatus = "WAITING";
  } else if (memberCount < team.maxMembers) {
    team.registrationStatus = "PARTIAL";
  } else {
    team.registrationStatus = "FULL";
  }
}
export const getReservedPlayerCount = async (
  tournamentId: mongoose.Types.ObjectId,
  teamSize: number,
): Promise<number> => {
  const teamCount = await Team.countDocuments({
    tournamentId,
  });
  return teamCount * teamSize;
};

export function getCountByTeamType(type: PlayerMode) {
  if (type == PlayerMode.SOLO) {
    return 1;
  }
  if (type == PlayerMode.DUO) {
    return 2;
  }
  if (type == PlayerMode.SQUAD) {
    return 4;
  }
  return -1;
}

export async function generateUniqueInviteCode(
  tournamentId: mongoose.Types.ObjectId,
): Promise<string> {
  while (true) {
    const code = generateInviteCode();
    const exists = await Team.exists({
      tournamentId,
      inviteCode: code,
    });
    if (!exists) {
      return code;
    }
  }
}

export async function getTeamService(
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
): Promise<TeamDetailsResponse> {
  // find the team where the user is a member
  const team = await findUserTeam(tournamentId, userId)
  // if team doesnt exists
  if (!team) {
    throw new AppError("Team not Found", 404);
  }
  return {
    id: team._id,
    captainId: team.captainId,
    teamName: team.teamName,
    inviteCode: team.inviteCode,
    mode: team.mode,
    registrationStatus: team.registrationStatus,
    maxMembers: team.maxMembers,
    joinedMembers: team.members.length,
    members: team.members,
  };
}

export async function JoinTeamViaInviteCodeService(
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  inviteCode: string,
  uid: string,
  inGameName: string,
): Promise<JoinViaInviteCodeResponse> {
  // find the team
  const team = await findTeamByInviteCode(tournamentId, inviteCode);
  if (!team) {
    throw new AppError("Team doesn't exists", 404);
  }
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new AppError("Tournament not found", 404);
  }
  const tournamentStatus = getTournamentStatus(tournament);
  if (
    tournamentStatus === TournamentStatus.RUNNING ||
    tournamentStatus === TournamentStatus.COMPLETED
  ) {
    throw new AppError(`Tournament has ${tournamentStatus}, cannot join`, 404);
  }
  // Capacity check
  if (team.members.length >= team.maxMembers) {
    throw new AppError("Team is full", 409);
  }
  // already in team check
  const AlreadyInTeam = team.members.some((member) =>
    member.userId.equals(userId),
  );
  if (AlreadyInTeam) {
    throw new AppError("Already Joined the team", 409);
  }
  // joined another team check
  const otherTeam = await findUserTeam(tournamentId, userId);
  if (otherTeam) {
    throw new AppError("Already joined another team", 409);
  }
  // adding members
  team.members.push({ userId, inGameName, uid });
  // writing regrestration status
  updateRegistrationStatus(team);
  await team.save();
  await Participant.create({
    userId,
    tournamentId,
    teamId: team._id,
  });
  return {
    teamId: team._id,
    teamName: team.teamName,
    registrationStatus: team.registrationStatus,
  };
}

export async function KickMemberService(
  tournamentId: mongoose.Types.ObjectId,
  memberId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
): Promise<void> {
  // find the captain team
  const team = await findCaptainTeam(tournamentId, userId);
  if (!team) {
    throw new AppError("Only captains can remove members", 403);
  }
  // check is tournament started or completed
  const tournament = await getTournamentRepo(tournamentId);
  if (!tournament) {
    throw new AppError("Tournament not found", 409);
  }
  ensureTournamentRegistrationOpen(tournament);
  // dont allow captain to remove itself
  if (memberId.equals(userId)) {
    throw new AppError("Captain cannot remove themselves", 400);
  }
  const member = team.members.find((member) => member.userId.equals(memberId));
  if (!member) {
    throw new AppError("Member not found", 404);
  }
  // delete the member
  team.members = team.members.filter(
    (member) => !member.userId.equals(memberId),
  );
  // delete the participant
  await Participant.deleteOne({
    tournamentId,
    userId: memberId,
  });
  // update regrestration status
  updateRegistrationStatus(team);
  await team.save();
}

export async function LeaveTeamService(
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
): Promise<void> {
  // find the team
  const team = await findUserTeam(tournamentId, userId);
  if (!team) {
    throw new AppError("Team not found", 404);
  }
  // Tournament validation
  const tournament = await getTournamentRepo(tournamentId);
  if (!tournament) {
    throw new AppError("Tournament not found", 404);
  }
  ensureTournamentRegistrationOpen(tournament);
  // STAGE: 1 Captain  cannot leave the tournament
  if (team.captainId.equals(userId)) {
    throw new AppError(
      "Captain cannot leave the team. Delete the team instead.",
      400,
    );
  }
  // now remove the member
  team.members = team.members.filter((member) => !member.userId.equals(userId));
  // Delete the participant
  await Participant.deleteOne({
    tournamentId,
    userId,
  });
  // update registration
  updateRegistrationStatus(team);

  // save
  await team.save();
}

export async function UpdateTeamProfileService(
  tournamentId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  dto: UpdateTeamProfileDto,
) {
  const team = await findUserTeam(tournamentId, userId);
  if (!team) {
    throw new AppError("Team not found", 404);
  }
  const tournament = await getTournamentRepo(tournamentId);
  if (!tournament) {
    throw new AppError("Tournament not found", 404);
  }
  ensureTournamentRegistrationOpen(tournament);
  const member = team.members.find((member) => member.userId.equals(userId));
  if (!member) {
    throw new AppError("Member not found", 404);
  }
  if (dto.inGameName !== undefined) {
    member.inGameName = dto.inGameName;
  }
  if (dto.uid !== undefined) {
    member.uid = dto.uid;
  }

  if (dto.teamName !== undefined) {
    if (!team.captainId.equals(userId)) {
      throw new AppError("Only captain can update team name", 403);
    }

    team.teamName = dto.teamName;
  }

  await team.save();
}
