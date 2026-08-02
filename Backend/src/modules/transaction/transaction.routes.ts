import express from 'express'
import { getTransactionController } from './transaction.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.get("/",authenticateUser,getTransactionController)


export default router 