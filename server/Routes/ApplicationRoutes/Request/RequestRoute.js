import express from 'express'
import { allRequest, applyRequest, singleRequest } from '../../../controllers/Application/RequestController.js'
import { getAllType } from '../../../controllers/Application/requestType.js';





const router = express.Router()


router.post('/createRequest',applyRequest)
router.get('/allRequest',allRequest)
router.get('/singleRequest/:user_id/applications',singleRequest)
router.get('/allRequestType', getAllType)

export default router