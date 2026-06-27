import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IParticipant extends Document {
  userId: mongoose.Types.ObjectId;
  tournamentId: mongoose.Types.ObjectId;
  resultStatus:"PENDING"|"DECLARED"
  stats?: {
    kills: number;
    rank: number;
    points?: number;
  };
  earnings?: number;
}

const ParticipantSchema = new Schema<IParticipant>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  resultStatus:{
    type:String,
    enum:["PENDING","DECLARED"],
    default:"PENDING"
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
  earnings: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

ParticipantSchema.index({ userId: 1, tournamentId: 1 }, { unique: true });
export const Participant=mongoose.model<IParticipant>("Participant",ParticipantSchema)