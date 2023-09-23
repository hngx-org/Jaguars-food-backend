const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const router = require("../routes/router.js");

<<<<<<< HEAD
// ROUTES
const lunchRouter = require("../routes/lunchRoute.js");
const withdrawalRouter = require("../routes/withdrawalRoute.js");
const inviteRouter = require("../routes/invite.js");
const lunchRoute = require("../routes/lunchRoute.js");
const withdrawalRoute = require("../routes/withdrawalRoute.js");
const authenticationRoute = require("../routes/authenticationRoute.js");
const userRoute = require("../routes/userRoute.js");
=======
// ROUTE
const lunchRouter = require('../routes/lunchRoute.js');
const withdrawalRouter = require('../routes/withdrawalRoute.js');
const lunchRoute = require('../routes/lunchRoute.js');
const withdrawalRoute = require('../routes/withdrawalRoute.js');
const authenticationRoute = require('../routes/authenticationRoute.js');
const userRoute = require('../routes/userRoute.js');
>>>>>>> 86f7aa43472c14a24f420e7d817a2e87f999d15e

// MIDDLEWARES
const errHandler = require("../middlewares/errHandler.js");
const notFound = require("../middlewares/notFound.js");

const app = express();
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/lunch", lunchRouter);
app.use("/api/withdrawal", withdrawalRouter);
app.use("/api/", inviteRouter);

<<<<<<< HEAD
app.use("/api/lunch", lunchRoute);
app.use("/api/withdrawal", withdrawalRoute);
app.use("/api", userRoute);
app.use("/api/auth", authenticationRoute);
// app.use("/api/organization", staffSignUpRoute);
=======
app.use('/api/lunch', lunchRoute);
app.use('/api/withdrawal', withdrawalRoute);
app.use('/api', userRoute);
app.use('/api/auth', authenticationRoute);
>>>>>>> 86f7aa43472c14a24f420e7d817a2e87f999d15e

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
