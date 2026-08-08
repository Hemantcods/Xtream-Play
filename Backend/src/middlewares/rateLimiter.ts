import rateLimit from "express-rate-limit";

export const veriftEmailRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:"Too many verification Attempts,Please try again later"
  }
}) 
export const resendEmailRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:"Too may requests for resend Email, Please try agin later"
  }
})
