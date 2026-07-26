import express from 'express'
import { getAdminTeams, GetParticipants, getRegisteredTeams, JoinTournament, LeaveTournament } from './participant.controller.js'
import { authenticateUser, authorizeAdmin } from '../../middlewares/auth.middleware.js'

const router=express.Router()

// user protected Routes
router.post("/:id/join",authenticateUser,JoinTournament)
router.post("/:id/leave",authenticateUser,LeaveTournament)
router.get("/:id/teams",authenticateUser,getRegisteredTeams)
// TODO: add the blank data for team stats till the result is not declared
// get team for the admin
router.get("/admin/:id/teams",authenticateUser,authorizeAdmin,getAdminTeams)
// public Routes
router.get('/:id/participants', GetParticipants)
export default router