import mongoose from "mongoose";
import { User } from "../user/user.model.js";

export const findUserByEmailRepo = async (
  email: string,
  session?: mongoose.ClientSession,
) => {
  return User.findOne({ email }).session(session ?? null);
};
export const updateUserVerificationRepo = async (
  userId: mongoose.Types.ObjectId,
  session?: mongoose.ClientSession,
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      isEmailVerified: true,
    },
    {
      new: true,
      session,
    },
  );
};
