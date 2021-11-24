/**
 * Default error handler
 */

/* imports */

const logger = require('../utils/logger');

/* middleware */

/**
 * default error handler: logs to console and sends 500
 *
 * @param error
 * @param request
 * @param response
 * @param next
 */
const defaultErrorHandler = (error, request, response, next) => {
  logger.error(error);
  response.status(500).end();
  next();
};

/* exports */

module.exports = {
  defaultErrorHandler
};