import express from 'express';
import { getAllSubscribers, subscribeToNewsLetter } from '../../controllers/NewsLetter/Subscribe.js';

const router = express.Router()

router.post('/sendSubscribe',subscribeToNewsLetter)
router.get('/getAllSubscribes',getAllSubscribers)

export default router