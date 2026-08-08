import express from "express"
import { VerifyEmail } from "./verification.controller.js"
const router = express.Router()

router.post("/verify-email",VerifyEmail)

export default router