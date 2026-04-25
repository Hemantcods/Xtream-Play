import mongoose, { ObjectId, Schema } from "mongoose";
import { Document } from "mongoose";

export interface IParticipant extends Document {
  userId: ObjectId;
  tournamentId: ObjectId;
  stats?: {
    kills: number;
    rank: number;
  };
  reward?: number;
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
  stats: {
    kills: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: null,
    },
  },
  reward: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });


export const Participant=mongoose.model("Participant",ParticipantSchema)