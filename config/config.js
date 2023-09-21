import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// ROUTES
import lunchRouter from '../routes/lunchRoute.js';
import withdrawalRouter from '../routes/withdrawalRoute.js';
import inviteRouter from '../routes/invite.js';
import lunchRoute from '../routes/lunchRoute.js';
import withdrawalRoute from '../routes/withdrawalRoute.js';
import authenticationRoute from '../routes/authenticationRoute.js';
import userRoute from '../routes/userRoute.js';

// MIDDLEWARES
import errHandler from '../middlewares/errHandler.js';
import notFound from '../middlewares/notFound.js';
import { docRouter } from '../docs.js';

const app = express();
dotenv.config();


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/api-docs", docRouter);
app.use('/api/lunch', lunchRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/', inviteRouter);

app.use('/api/lunch', lunchRoute);
app.use('/api/withdrawal', withdrawalRoute);
app.use('/api', userRoute);
app.use('/api/auth', authenticationRoute);

app.use(notFound);
app.use(errHandler);

export const PORT = process.env.PORT || 4000;

export default app;
