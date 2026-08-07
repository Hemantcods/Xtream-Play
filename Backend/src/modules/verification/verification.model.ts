import mongoose, { Document, Schema } from "mongoose";

export enum VerificationType {
  EMAIL_VERIFY = "email_verify",
  PASSWORD_RESET = "password_reset",
}

export interface IVerification extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  otpHash: string;
  type: VerificationType;
  expiresAt: Date;
}

const VerificationSchema = new mongoose.Schema<IVerification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(VerificationType),
      required: true,
    },
    expiresAt: {
      type: Date,
      reuired: true,
    },
  },
  {
    timestamps: true,
  },
);

// auto delete old otp Documents
VerificationSchema.index({expiresAt:1},{expireAfterSeconds:0})

// fast lookup by userId and type
VerificationSchema.index({
  userId: 1,
  type: 1,
});

export const Verification = mongoose.model<IVerification>(
  "Verification",
  VerificationSchema,
);
