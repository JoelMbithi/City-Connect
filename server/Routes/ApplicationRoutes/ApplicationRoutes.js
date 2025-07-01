import express from 'express'
import { allApplication } from '../../controllers/Application/ApplicationController.js'

const router = express.Router()

router.get('/allApplication',allApplication)


export default router