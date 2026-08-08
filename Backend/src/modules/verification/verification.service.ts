import { email } from "zod";
import { sendEmail } from "../../services/mail/sendEmail.js";
import { verificationTemplate } from "../../services/mail/templates/verfication.template.js";
import { generateOTP } from "../../utils/otp.js";
import { IUser } from "../user/user.model.js";
import { VerificationType } from "./verification.model.js";
import {
  createVerificationRepo,
  deleteVerificationRepo,
  findVerificationRepo,
} from "./verification.repository.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { findUserByEmailRepo, updateUserVerificationRepo } from "../auth/auth.repository.js";
import { AppError } from "../../utils/AppError.js";

export const createEmailVerificationService = async (user: IUser) => {
  // delete pevious otp
  deleteVerificationRepo(user._id, VerificationType.EMAIL_VERIFY);
  // generate otp
  const otp = generateOTP();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await createVerificationRepo({
    userId: user._id,
    email: user.email!,
    expiresAt,
    otpHash,
    type: VerificationType.EMAIL_VERIFY,
  });

  //send verification email
  await sendEmail({
    to: user.email!,
    subject: "Verify your Xtream Play account",
    html: verificationTemplate(user.name, otp),
  });
};
export const verifyOtpSevice = async (email: string, otp: string) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const user =await findUserByEmailRepo(email, session)
    if (!user) {
      throw new AppError("User not found",404)
    }
    if (user.isEmailVerified) {
      throw new AppError("Email Alerady verified",400)
    }
    const verification = await findVerificationRepo(user._id, VerificationType.EMAIL_VERIFY, session)
    if (!verification) {
         throw new AppError("Verification request not found.", 404);
    }
    if (verification.expiresAt < new Date()) {
      throw new AppError("Otp has Expired ;(",400)
    }
    const isValid = await bcrypt.compare(otp, verification.otpHash)
    console.log(otp,isValid)
    if (!isValid) {
      throw new AppError("Invalid Otp",400)
    }
    await updateUserVerificationRepo(user._id, session)
    await deleteVerificationRepo(user._id, VerificationType.EMAIL_VERIFY, session)
    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    console.log(error)
    throw error
  } finally {
    session.endSession()
  }
}
