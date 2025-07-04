import express from 'express';
import { createEventApplication, getAllEvents } from '../../../server/controllers/Events/EventApplicationController.js';

const router = express.Router()

router.post('/event/create',createEventApplication)
router.get('/allEvents',getAllEvents)

export default router;