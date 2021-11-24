/**
 * logs server requests
 */

/* imports */

const logger = require('../utils/logger');

/* middleware */

/**
 * logs request
 *
 * @param request {Request} request
 * @param response {Response} response
 * @param next {Function} next
 */
const requestLogger = (request, response, next) => {
  logger.info(`Method:\t${request.method}`);
  logger.info(`Path:\t${request.path}`);
  logger.info(`Body:\t${JSON.stringify(request.body)}`);
  logger.info('---');
  next();
};

/* export */

module.exports = requestLogger;