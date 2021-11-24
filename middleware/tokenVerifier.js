/**
 * verifies if the toke provided by the user is valid
 */

/* imports */

const jwt = require('../utils/jwt');

/* middleware */

/**
 * verfies if a token is valid
 *
 * @param request
 * @param response
 * @param next
 */
const tokenVerifier = (request, response, next) => {
  const token = request.get('authorization');

  if (!token || !jwt.verifyToken(token)) {
    response.status(401).end();
    return;
  }
  next();
};

/* exports */

module.exports = tokenVerifier;