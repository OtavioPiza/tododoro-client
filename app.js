/**
 * Express server
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* setup express async errors */

require('express-async-errors');

/* lib imports */

const cors = require('cors');           // cross origin requests
const express = require('express');     // express

/* middleware */

const requestLogger = require('./middleware/requestLogger');
const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');

/* router imports */

const authRouter = require('./routes/auth');  // execute mongo setup

/* setup express */

const app = express();    // express server

/* routes and middleware */

/**
 * support for cross env requests
 */
app.use(cors());

/**
 * express json parser
 */
app.use(express.json());

/**
 * logs requests
 */
app.use(requestLogger);

/**
 * auth routers
 */
app.use('/api/auth', authRouter);

/**
 * provides 404 page if route is not found
 */
app.use(unknownEndpoint);

/**
 * handles errors by sending 500 and logging to console
 */
app.use(errorHandler.defaultErrorHandler);

/* export */

module.exports = app;