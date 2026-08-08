import z from "zod";

export const verifyEmailSchema = z.object({
  email: z.email(),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});