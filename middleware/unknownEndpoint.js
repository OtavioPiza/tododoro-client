/**
 * sends an unknown endpoint
 *
 * @param request {*} request
 * @param response {*} response
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  });
};

/* exports */

module.exports = unknownEndpoint;