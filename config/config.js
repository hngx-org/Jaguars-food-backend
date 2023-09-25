const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('../routes/router.js');
const lunchRouter = require('../routes/lunchRoute.js');
const withdrawalRouter = require('../routes/withdrawalRoute.js');
const { authRouter, orgRouter } = require('../routes/authenticationRoute.js');
const userRoute = require('../routes/userRoute.js');
const errHandler = require('../middlewares/errHandler.js');
const notFound = require('../middlewares/notFound.js');
const swaggerUI = require('swagger-ui-express');
const { swaggerDocument } = require('../utils/constants.js');
const { auth } = require('../docs');
const app = express();
dotenv.config();

// const farewellPath = YAML.load('./docs/farewell.yaml');
const components = {
  securitySchemes: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
      description: 'Basic Authentication',
    },
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      description: 'Bearer Token Authentication',
    },
  },
};
swaggerDocument.paths = {
  ...swaggerDocument.paths,
  ...components,
  ...auth,
};

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ROUTES
app.use(router);
app.use('/api/lunch', lunchRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api', userRoute);
app.use('/api/auth', authRouter);
app.use('/api/orgs', orgRouter);

// MIDDLEWARES
app.use(notFound);
app.use(errHandler);

// CONSTANTS
const PORT = process.env.PORT || 4000;

module.exports = { app, PORT };
