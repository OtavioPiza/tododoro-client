/**
 * Express server
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* lib imports */

const cors = require('cors');           // cross origin requests
const express = require('express');     // express

/* middleware */

const requestLogger = require('./middleware/requestLogger');
const unknownEndpoint = require('./middleware/unknownEndpoint');

/* router imports */

const authRouter = require('./routes/auth');  // execute mongo setup

/* setup express */

const app = express();    // express server

app.use(cors());            // support for cross env requests
app.use(express.json());    // json parser

/* routes */

app.use(requestLogger);

app.use('/api/auth', authRouter);

app.use(unknownEndpoint);

/* export */

module.exports = app;