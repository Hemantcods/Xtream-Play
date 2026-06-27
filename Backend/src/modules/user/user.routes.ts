import express from 'express'
import { getLeaderBoard } from './user.controller.js';

const router = express.Router();

router.get("/leaderboard",getLeaderBoard)


export default router;