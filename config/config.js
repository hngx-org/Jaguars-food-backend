const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('../routes/router.js');

// ROUTES
<<<<<<< HEAD
<<<<<<< HEAD
import lunchRouter from '../routes/lunchRoute.js';
import withdrawalRouter from '../routes/withdrawalRoute.js';
import lunchRoute from '../routes/lunchRoute.js';
import withdrawalRoute from '../routes/withdrawalRoute.js';
import authenticationRoute from '../routes/authenticationRoute.js';
import userRoute from '../routes/userRoute.js';
=======
=======
>>>>>>> 29968b7a69867c2a41e0b0d52b2fffdc00355f45
const lunchRouter = require('../routes/lunchRoute.js');
const withdrawalRouter = require('../routes/withdrawalRoute.js');
const inviteRouter = require('../routes/invite.js');
const lunchRoute = require('../routes/lunchRoute.js');
const withdrawalRoute = require('../routes/withdrawalRoute.js');
const authenticationRoute = require('../routes/authenticationRoute.js');
const userRoute = require('../routes/userRoute.js');
<<<<<<< HEAD
>>>>>>> a39f5282f1e6e373be35ccf261659786edc11129
=======
>>>>>>> 29968b7a69867c2a41e0b0d52b2fffdc00355f45

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
app.use('/api/auth', authenticationRoute);

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
