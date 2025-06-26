import express from 'express'
import { allUsers, deleteUser, getSingleUser, updateUser } from '../../controllers/Auth/UserController.js'
const router = express.Router()

router.get('/getSingleUser/:user_id',getSingleUser)
router.get('/allUsers',allUsers)
router.put('/updateUser',updateUser)
router.delete('/deleteUser',deleteUser)

export default router