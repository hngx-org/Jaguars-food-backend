<<<<<<< HEAD
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "../routes/router.js";

// ROUTES
import lunchRouter from "../routes/lunchRoute.js";
import withdrawalRouter from "../routes/withdrawalRoute.js";
import lunchRoute from "../routes/lunchRoute.js";
import withdrawalRoute from "../routes/withdrawalRoute.js";
import authenticationRoute from "../routes/authenticationRoute.js";
import userRoute from "../routes/userRoute.js";

// MIDDLEWARES
import errHandler from "../middlewares/errHandler.js";
import notFound from "../middlewares/notFound.js";

// test route
import { router as Test } from "../controllers/admin-controller.js";
=======
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('../routes/router.js');

// ROUTES
const lunchRouter = require('../routes/lunchRoute.js');
const withdrawalRouter = require('../routes/withdrawalRoute.js');
const lunchRoute = require('../routes/lunchRoute.js');
const withdrawalRoute = require('../routes/withdrawalRoute.js');
const authenticationRoute = require('../routes/authenticationRoute.js');
const userRoute = require('../routes/userRoute.js');

// MIDDLEWARES
const errHandler = require('../middlewares/errHandler.js');
const notFound = require('../middlewares/notFound.js');
>>>>>>> f0f9523e86bf450ba9cccafc13a4963871ce78fc

const app = express();
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(Test);

<<<<<<< HEAD
app.use("/api/lunch", lunchRouter);
app.use("/api/withdrawal", withdrawalRouter);

app.use("/api/lunch", lunchRoute);
app.use("/api/withdrawal", withdrawalRoute);
app.use("/api", userRoute);
app.use("/api/auth", authenticationRoute);
=======
app.use('/api/lunch', lunchRoute);
app.use('/api/withdrawal', withdrawalRoute);
app.use('/api', userRoute);
app.use('/api/auth', authenticationRoute);
>>>>>>> f0f9523e86bf450ba9cccafc13a4963871ce78fc

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
