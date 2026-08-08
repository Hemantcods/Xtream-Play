import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { verifyEmailSchema } from "./verification.schema.js";
import { AppError } from "../../utils/AppError.js";
import { verifyOtpSevice } from "./verification.service.js";

export const VerifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const result = verifyEmailSchema.safeParse(req.body)
  if (!result.success) {
    throw new AppError(result.error.issues[0].message,400)
  } 
  const { email, otp } = result.data
  await verifyOtpSevice(email, otp)
  res.status(200).json({
    success: true,
    message:"EmailVerified successfully"
  })
})