import mongoose, { Document, Schema } from "mongoose";
import { PlayerMode } from "../tournament/tournament.model.js";

export interface ITeam extends Document {
  tournamentId: mongoose.Types.ObjectId;
  captainId: mongoose.Types.ObjectId;
  teamName: string;
  inviteCode: string;
  mode: "SOLO" | "DUO" | "SQUAD";
  maxMembers: number;
  members: Object[];
  paymentStatus: "PENDING" | "PAID";
  stats: {
    kills: number;
    rank: number;
    points: number;
  };
  registrationStatus: "WAITING" | "PARTIAL" | "FULL";
  amountPaid: number;
  createdAt: Date;
  updatedAt: Date;
}
const TeamMemberSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    inGameName: {
      type: String,
      required: true,
    },

    uid: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["CAPTAIN", "MEMBER"],
      default: "MEMBER",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const TeamSchema = new Schema<ITeam>(
  {
    tournamentId: {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    captainId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
    },
    stats: {
      kills: {
        type: Number,
        default: 0,
      },
      rank: {
        type: Number,
        default: null,
      },
      points: {
        type: Number,
        default: 0,
      },
    },
    mode: {
      type: String,
      enum: PlayerMode,
      required: true,
    },
    maxMembers: {
      type: Number,
      required: true,
    },
    members: {
      type: [TeamMemberSchema],
      default: [],
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },
    registrationStatus: {
      type: String,
      enum: ["WAITING", "PARTIAL", "FULL"],
      default: "WAITING",
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

TeamSchema.index({ tournamentId: 1, captainId: 1 }, { unique: true });
TeamSchema.index({ inviteCode: 1 }, { unique: true });

export const Team = mongoose.model<ITeam>("Team", TeamSchema);
