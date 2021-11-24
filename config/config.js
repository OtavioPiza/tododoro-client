/**
 * Load information on .env file
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */
const process = require('process');

/* setup dotenv */

require('dotenv').config();

/* export */

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN
};