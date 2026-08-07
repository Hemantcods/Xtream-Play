import mongoose from "mongoose";
import { VerificationType, Verification } from "./verification.model.js";

interface CreateVerificationProps {
  userId: mongoose.Types.ObjectId;
  email: string;
  otpHash: string;
  type: VerificationType;
  expiresAt: Date;
}
export const deleteVerificationRepo = async (
  userId: mongoose.Types.ObjectId,
  type: VerificationType,
  session?: mongoose.ClientSession,
) => {
  return Verification.deleteMany({ userId, type }).session(session ?? null);
};
export const createVerificationRepo = async (data: CreateVerificationProps) => {
  return Verification.create(data);
};
export const findVerificationRepo = async (
  userId: mongoose.Types.ObjectId,
  type: VerificationType,
  session?: mongoose.ClientSession,
) => {
  return Verification.findOne({
    userId,
    type,
  }).session(session ?? null);
};
