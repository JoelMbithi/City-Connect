import express from 'express'
import { allApplication } from '../../controllers/Application/ApplicationController.js'

const router = express.Router()

router.get('/user/:user_id/applications', allApplication);



export default router