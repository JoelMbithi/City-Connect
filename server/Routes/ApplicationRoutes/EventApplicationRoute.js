import express from 'express'
import { allEventApplications, applyEvent, singleEventApplication } from '../../controllers/Application/eventApplication.js'


const router = express.Router()

router.post('/createEvent',applyEvent)
router.get('/getAllAppliedEvent',allEventApplications)
router.get('/getSingleEventApplication/:application_event_id',singleEventApplication)


export default router