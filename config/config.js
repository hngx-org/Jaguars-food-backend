const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('../routes/router.js');
// ROUTES
const lunchRoute = require('../routes/lunchRoute.js');
const withdrawalRoute = require('../routes/withdrawalRoute.js');
const authenticationRoute = require('../routes/authenticationRoute.js');
const userRoute = require('../routes/userRoute.js');

// MIDDLEWARES
const errHandler = require('../middlewares/errHandler.js');
const notFound = require('../middlewares/notFound.js');

const app = express();
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/api/v1/lunch', lunchRoute);
app.use('/api/v1/withdrawal', withdrawalRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1/auth', authenticationRoute);

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
