import express from 'express';
import { getAllType } from '../../../controllers/Application/requestType.js';

const router = express.Router();

router.get("/allRequestType", getAllType)

export default router