import { PlayerMode } from "./tournament";

export interface TeamDetailsResponse {
  id: string;
  captainId: string;
  teamName: string;
  inviteCode: string;
  mode: PlayerMode;
  registrationStatus: "WAITING" | "PARTIAL" | "FULL";
  maxMembers: number;
  joinedMembers: number;
  members: TeamMember[];
}

export interface TeamMember {
  userId: string;
  inGameName: string;
  uid: string;
  joinedAt?: Date;
}

export interface JoinTeamDto {
    inviteCode: string;
    uid: string;
    inGameName: string;
}

export interface UpdateTeamProfileDto {
  teamName?: string;
  inGameName?: string;
  uid?: string;
}