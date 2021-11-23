/**
 * configures mongodb
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* lib imports */

const mongoose = require('mongoose');

/* config */

const config = require('./config');

/* utils */

const logger = require('../utils/logger');

/* setup database */

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error) => {
  error ? logger.error(error) : logger.info('connected to mongo');
});

/* exports */

module.exports = mongoose.connection;