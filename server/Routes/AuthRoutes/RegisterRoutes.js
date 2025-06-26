import express from 'express'
import { loginUser, Register } from '../../controllers/Auth/RegisterController.js'

const router = express.Router()

router.post('/create',Register)
router.post('/login',loginUser)

export default router