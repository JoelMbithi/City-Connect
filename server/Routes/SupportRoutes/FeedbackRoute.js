import express from 'express';
import { createFeedback, getAllFeedback, getFeedbackByUserId } from '../../controllers/Support/Feedback.js';
import { getFeedbackTypes } from '../../controllers/Support/feedbackType.js';

const router = express.Router();

router.post('/createFeedback',createFeedback) 
router.get('/getAllFeedback/:user_id',getFeedbackByUserId)
router.get('/getAllFeedback', getAllFeedback);
router.get('/getFeedbackTypes', getFeedbackTypes);

export default router;