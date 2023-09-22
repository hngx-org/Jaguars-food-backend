const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('../routes/router.js');

// ROUTES
import lunchRouter from '../routes/lunchRoute.js';
import withdrawalRouter from '../routes/withdrawalRoute.js';
import lunchRoute from '../routes/lunchRoute.js';
import withdrawalRoute from '../routes/withdrawalRoute.js';
import authenticationRoute from '../routes/authenticationRoute.js';
import organizationRoute from '../routes/organizationRoute.js';
import userRoute from '../routes/userRoute.js';


// MIDDLEWARES
const errHandler = require('../middlewares/errHandler.js');
const notFound = require('../middlewares/notFound.js');

const app = express();
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/lunch', lunchRouter);
app.use('/api/withdrawal', withdrawalRouter);

app.use('/api/lunch', lunchRoute);
app.use('/api/withdrawal', withdrawalRoute);
app.use('/api', userRoute);
app.use('/api/organization', organizationRoute);
app.use('/api/auth', authenticationRoute)


app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
