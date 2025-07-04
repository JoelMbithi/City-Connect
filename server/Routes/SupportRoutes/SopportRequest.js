import express from 'express';
import { getAllSupportRequests, sendSupportRequest } from '../../controllers/Support/Support.js';

const router = express.Router()

router.post('/sendSupport',sendSupportRequest)
router.get('/allSupport',getAllSupportRequests)

export default router;