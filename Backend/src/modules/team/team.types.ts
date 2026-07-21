import mongoose from "mongoose";
import { PlayerMode } from "../tournament/tournament.model.js";
import { ITeamMember } from "./team.model.js"
export interface TeamDetailsResponse {
  id: mongoose.Types.ObjectId;
  teamName: string;
  inviteCode: string;
  mode: PlayerMode;
  registrationStatus: "WAITING" | "PARTIAL" | "FULL";
  maxMembers: number;
  joinedMembers: number;
  members: ITeamMember[];
}
export interface JoinViaInviteCodeResponse{
  teamId: mongoose.Types.ObjectId;
  teamName: string;
  registrationStatus:"WAITING" | "PARTIAL" | "FULL";
}