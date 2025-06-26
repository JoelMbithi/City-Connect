import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js'
import registerRoute from './Routes/AuthRoutes/RegisterRoutes.js'
import userRoutes from './Routes/AuthRoutes/UserRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors({
    origin:"",
     method:['POST', 'GET', 'PUT', 'DELETE'],
     credentials:true
}))
app.use(express.json());

//apis
app.use('/api/register',registerRoute)
app.use('/api/user',userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;