import express from 'express'
import { GetParticipants, getRegisteredTeams, JoinTournament, LeaveTournament } from './participant.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'

const router=express.Router()

// user protected Routes
router.post("/:id/join",authenticateUser,JoinTournament)
router.post("/:id/leave",authenticateUser,LeaveTournament)
router.get("/:id/teams",authenticateUser,getRegisteredTeams)

// public Routes
router.get('/:id/participants', GetParticipants)
export default router