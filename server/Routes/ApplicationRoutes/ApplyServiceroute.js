import express from 'express'
import { allAppliedServices, applyService, getUserApplications } from '../../controllers/Application/ApplyService/applyServiceController.js'


const router = express.Router()


router.post('/createService',applyService)
router.get('/allAppliedService',allAppliedServices)

router.get('/user/:user_id/applications', getUserApplications);

export default router