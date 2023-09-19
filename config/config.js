import express from "express";
import cors from "cors";
import joi from "joi";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "../routes/router.js";
import lunchRouter from "../routes/lunchRoute.js";
import withdrawalRouter from "../routes/withdrawalRoute.js";
import organizationRouter from "../routes/organizationRoutes.js";
import authorizationRouterouter from "../routes/authorizationRoutes.js";
import organizationRouter from "..routes/userRoutes.js";



const app = express();
dotenv.config();

app.use(cors());
app.use(router);
// app.use(joi);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/api/lunch', lunchRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/auth', authorizationRouter);
app.use('/api/user', userRouter);

export const PORT = process.env.PORT || 4000;

export default app;
