import express from "express"
import { authenticateUser } from "../../middlewares/auth.middleware.js"
import { GetWalletController } from "./wallet.controller.js"

const router = express.Router()

router.get("/", authenticateUser, GetWalletController)

export default router