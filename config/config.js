import express from "express";
import cors from "cors";
import joi from "joi";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "../routes/router.js";
import lunchRouter from "../routes/lunchRoute.js";
import withdrawalRouter from "../routes/withdrawalRoute.js";
import errHandler from "../middlewares/errHandler.js";
import notFound from "../middlewares/notFound.js"


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

app.use(notFound)
app.use(errHandler)

export const PORT = process.env.PORT || 4000;

export default app;
