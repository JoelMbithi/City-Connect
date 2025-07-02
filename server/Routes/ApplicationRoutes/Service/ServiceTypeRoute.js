import express from 'express';
import {  getAllServiceTypes } from '../../../controllers/Application/ApplyService/serviceType.js';

const router = express.Router()

router.get('/allServiceTypes',getAllServiceTypes )

export default router;