import express from 'express'
import { GetParticipants, JoinTournament, LeaveTournament } from './participant.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'

const router=express.Router()

// user protected Routes
router.post("/:id/join",authenticateUser,JoinTournament)
router.post("/:id/leave",authenticateUser,LeaveTournament)


// public Routes
router.get('/:id/participants',GetParticipants)
export default router