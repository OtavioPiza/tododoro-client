/**
 * file to handle jwt token operations
 */

/* imports */

const jwt = require('jsonwebtoken');
const config = require('../config/config');

/* functions */

/**
 * signs a token
 *
 * @param username
 * @param email
 * @param id
 * @returns {jwt.Token}
 */
const signToken = (username, email, id) => {
  const userForToken = { username, email, id };
  return jwt.sign(userForToken, config.SECRET);
};

/**
 * verifies a token
 *
 * @param token
 * @returns {*}
 */
const verifyToken = (token) => (
  jwt.verify(token, config.SECRET)
);

/**
 * decodes a token
 *
 * @param token
 * @returns {{payload: *, signature: *, header: *}|*}
 */
const decode = (token) => {
  verifyToken(token);

  return jwt.decode(token, config.SECRET);
};

/* exports */

module.exports = {
  signToken,
  verifyToken,
  decode
};