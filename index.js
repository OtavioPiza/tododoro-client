/**
 * HTTP web server entry point
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* imports */

const http = require('http');
const app = require('./app');

/* config */

const config = require('./config/config'); // access env vars
require('./config/mongodb');

/* utils imports */

const logger = require('./utils/logger'); // log info

/* create http server */

http.createServer(app).listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
