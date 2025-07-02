import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js'
import registerRoute from './Routes/AuthRoutes/RegisterRoutes.js'
import userRoutes from './Routes/AuthRoutes/UserRoutes.js'
import applicationRouter from "./Routes/ApplicationRoutes/ApplicationRoutes.js"
import serviceApplicationRouter from './Routes/ApplicationRoutes/ApplyServiceroute.js'
import requestRouter from './Routes/ApplicationRoutes/Request/RequestRoute.js'
import eventApplicationRoute from './Routes/ApplicationRoutes/EventApplicationRoute.js '
import requestTypeRouter from './Routes/ApplicationRoutes/Request/RequestTypeRoute.js'
import serviceType from  './Routes/ApplicationRoutes/Service/ServiceTypeRoute.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors({
    origin:"http://localhost:5173",
     method:['POST', 'GET', 'PUT', 'DELETE'],
     credentials:true
}))
app.use(express.json());

//apis
app.use('/api/register',registerRoute)
app.use('/api/user',userRoutes)
app.use('/api/application',applicationRouter)
app.use('/api/applyService',serviceApplicationRouter)
app.use('/api/request',requestRouter)
app.use('/api/eventApplication',eventApplicationRoute)
app.use('/api/requestType', requestTypeRouter)
app.use('/api/serviceType',serviceType)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;