import express from 'express'
import { CreateTournament, DeleteTournamentById, EndTournament, getAdminTournaments, getAllTournaments, getTournamentById, getTournamentByIdAdmin, getUserTournaments, StartTournament, Status, updateTournamentAdmin } from './tournament.controller.js'
import { authenticateUser, authorizeAdmin } from '../../middlewares/auth.middleware.js'

const router=express.Router()
// admin routes
router.post('/admin/create',authenticateUser,authorizeAdmin,CreateTournament)
router.put('/update/:id',authenticateUser,authorizeAdmin,CreateTournament) // for updating the tournament details we can use the same controller as creating a tournament but we need to pass the tournament id in the request params and the updated data in the request body
router.delete('/admin/:id',authenticateUser,authorizeAdmin,DeleteTournamentById)
router.get('/admin/list', authenticateUser, authorizeAdmin, getAdminTournaments)
router.get('/admin/:id', authenticateUser, authorizeAdmin, getTournamentByIdAdmin)
router.patch('/admin/:id', authenticateUser, authorizeAdmin, updateTournamentAdmin)
router.patch('/admin/assign/:id',authenticateUser,authorizeAdmin,StartTournament)
// router.post('/end/:id', authenticateUser, authorizeAdmin, EndTournament) removed for now becusde planned to update end tournament when result declared
// public routes
router.get('/',getAllTournaments)
router.get('/joined',authenticateUser,getUserTournaments)
router.get('/:id',authenticateUser,getTournamentById)
router.get('/status/:id',Status) // for getting the tournament details along with the status of the tournament (upcoming, ongoing, completed) we can use the same controller as getting a tournament by id but we need to pass the tournament id in the request params and we can calculate the status of the tournament based on the current time and the start time of the tournament
export default router