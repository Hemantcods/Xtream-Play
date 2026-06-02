import express from "express";
import { getMe, login, refreshToken, register } from "./auth.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.get("/me",authenticateUser,getMe)
router.post("/refresh-token",refreshToken)
export default router;