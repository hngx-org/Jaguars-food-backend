import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from '../routes/router.js';
import organizationRouter from "../routes/organizationRoutes.js";
import authorizationRouter from "../routes/authorizationRoutes.js";
import userRouter from "../routes/userRoutes.js";


const app = express();
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/organization', organizationRouter);
app.use('/api/auth', authorizationRouter);
app.use('/api/user', userRouter);

export const PORT = process.env.PORT || 4000;

export default app;
