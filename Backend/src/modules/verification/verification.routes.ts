import express from "express"
import { ResendEmail, VerifyEmail } from "./verification.controller.js"
import { resendEmailRateLimit, veriftEmailRateLimit } from "../../middlewares/rateLimiter.js"
const router = express.Router()

router.post("/verify-email",veriftEmailRateLimit,VerifyEmail)
router.post("/resend-email",resendEmailRateLimit,ResendEmail)
export default router