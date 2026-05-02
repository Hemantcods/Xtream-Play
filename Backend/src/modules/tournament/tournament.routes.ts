import express from 'express'
import { CreateTournament, getAllTournaments } from './tournament.controller.js'

const router=express.Router()

router.post('/create',CreateTournament)




// public routes
router.get('/',getAllTournaments)


export default router