const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('../routes/router.js');

// ROUTE
const lunchRouter = require('../routes/lunchRoute.js');
const withdrawalRouter = require('../routes/withdrawalRoute.js');
const authenticationRouter = require('../routes/authenticationRoute.js');
const userRouter = require('../routes/userRoute.js');

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


app.use('/api', userRouter);
app.use('/api/auth', authenticationRouter);

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
