import express from 'express';
import BalanceRouter from './routes/BalanceRoutes'
import UserRouter from './routes/UserRoutes'
import cookieParser from 'cookie-parser'
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',BalanceRouter)
app.use('/api/v1',UserRouter)

export default app;