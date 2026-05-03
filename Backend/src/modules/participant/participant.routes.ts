import express from 'express'
import { GetParticipants, JoinTournament, LeaveTournament } from './participant.controller.js'

const router=express.Router()

// user protected Routes
router.post("/:id/join",JoinTournament)
router.post("/:id/leave",LeaveTournament)


// public Routes
router.get('/:id/participants',GetParticipants)
export default router