import express from 'express'
import { CreateTournament, DeleteTournamentById, EndTournament, getAllTournaments, getTournamentById, getUserTournaments, StartTournament, Status } from './tournament.controller.js'
import { authenticateUser, authorizeAdmin } from '../../middlewares/auth.middleware.js'

const router=express.Router()
// admin routes
router.post('/create',authenticateUser,authorizeAdmin,CreateTournament)
router.put('/update/:id',authenticateUser,authorizeAdmin,CreateTournament) // for updating the tournament details we can use the same controller as creating a tournament but we need to pass the tournament id in the request params and the updated data in the request body
router.delete('/delete/:id',authenticateUser,authorizeAdmin,DeleteTournamentById)
// admin routes for start and end a tournament
router.post('/start/:id',authenticateUser,authorizeAdmin,StartTournament) // for starting a tournament we can use the same controller as creating a tournament but we need to pass the tournament id in the request params and the room id and room password in the request body
router.post('/end/:id',authenticateUser,authorizeAdmin,EndTournament) 
// public routes
router.get('/',getAllTournaments)
router.get('/joined',authenticateUser,getUserTournaments)
router.get('/:id',authenticateUser,getTournamentById)
router.get('/status/:id',Status) // for getting the tournament details along with the status of the tournament (upcoming, ongoing, completed) we can use the same controller as getting a tournament by id but we need to pass the tournament id in the request params and we can calculate the status of the tournament based on the current time and the start time of the tournament
export default router