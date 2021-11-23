/**
 * Express server
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* lib imports */

const cors = require('cors');           // cross origin requests
const express = require('express');     // express
const mongoose = require('mongoose');   // mongoose

/* config */

const config = require('util/config');

/* utils */

const logger = require('utils/logger');

/* setup database */

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (error) => {
  error ? logger.error(error) : logger.info('connected to mongo');
});

/* setup express */

const app = express();    // express server

app.use(cors);            // support for cross env requests
app.use(express.json);    // json parser

/* export */

module.exports = app;