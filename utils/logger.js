/**
 * Contains the functions for logging server activity
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* imports */

const process = require('process');

/**
 * logs info
 *
 * @param params
 */
const info = (...params) => {

  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

/**
 * logs an error
 *
 * @param params
 */
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

/* exports */

module.exports = {
  info,
  error,
};