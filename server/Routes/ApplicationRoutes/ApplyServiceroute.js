import express from 'express'
import { allAppliedServices, applyService, singleService } from '../../controllers/Application/ApplyService/applyServiceController.js'


const router = express.Router()


router.post('/createService',applyService)
router.get('/allAppliedService',allAppliedServices)
router.get('/singleService/:application_service_id',singleService)

export default router