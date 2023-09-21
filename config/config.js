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
import adminRouter from "../routes/adminRoute.js";

// MIDDLEWARES
import errHandler from "../middlewares/errHandler.js";
import notFound from "../middlewares/notFound.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/lunch", lunchRouter);
app.use("/api/withdrawal", withdrawalRouter);

app.use("/api/lunch", lunchRoute);
app.use("/api/withdrawal", withdrawalRoute);
app.use("/api", userRoute);
app.use("/api/auth", authenticationRoute);
app.use("/api/organization", adminRouter);

app.use(notFound);
app.use(errHandler);

export const PORT = process.env.PORT || 4000;

export default app;
