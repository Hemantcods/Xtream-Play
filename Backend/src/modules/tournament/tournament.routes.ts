import express from 'express'
import { CreateTournament, DeleteTournamentById, EndTournament, getAllTournaments, getTournamentById, StartTournament, Status } from './tournament.controller.js'

const router=express.Router()
// admin routes
router.post('/create',CreateTournament)
router.put('/update/:id',CreateTournament) // for updating the tournament details we can use the same controller as creating a tournament but we need to pass the tournament id in the request params and the updated data in the request body
router.delete('/delete/:id',DeleteTournamentById)
// admin routes for start and end a tournament
router.post('/start/:id',StartTournament) // for starting a tournament we can use the same controller as creating a tournament but we need to pass the tournament id in the request params and the room id and room password in the request body
router.post('/end/:id',EndTournament) 
// public routes
router.get('/',getAllTournaments)
router.get('/:id',getTournamentById)
router.get('/status/:id',Status) // for getting the tournament details along with the status of the tournament (upcoming, ongoing, completed) we can use the same controller as getting a tournament by id but we need to pass the tournament id in the request params and we can calculate the status of the tournament based on the current time and the start time of the tournament
export default router