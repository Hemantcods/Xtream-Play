import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IParticipant extends Document {
  userId: mongoose.Types.ObjectId;
  tournamentId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
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
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
}, { timestamps: true });

ParticipantSchema.index({ userId: 1, tournamentId: 1 }, { unique: true });
export const Participant=mongoose.model<IParticipant>("Participant",ParticipantSchema)