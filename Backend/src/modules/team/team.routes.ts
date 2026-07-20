import express from "express";
import { getTeamController, JoinViaTeamCode, KickMember } from "./team.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/:tournamentId/team", authenticateUser, getTeamController);
router.post("/:tournamentId/invite/join", authenticateUser, JoinViaTeamCode);
router.delete("/:tournamentId/kick/:memberId", authenticateUser,KickMember);
export default router;
