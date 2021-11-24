/**
 * router for auth routes
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* imports */

const express = require('express');
const bcrypt = require('bcrypt');
const crypt = require('crypto');
const moment = require('moment');

/* utils */

const patternMatcher = require('../utils/patternMatcher');
const jwt = require('../utils/jwt');

/* models */

const User = require('../models/user');

/* setup */

const authRouter = express.Router();
const saltRounds = 8;

/* routes */

/**
 * registers a new user
 */
authRouter.post('/register', async (request, response) => {
  const body = request.body;

  // verify if body contains necessary info

  if (!body || !('email' in body || 'firstName' in body || 'lastName' in body || 'username' in body || 'password' in body)) {
    response.status(400).send({ error: 'content-missing' });
    return;
  }

  // verify valid email

  if (!patternMatcher.isEmailValid(body.email)) {
    response.status(401).send({ error: 'invalid email' });
    return;
  }

  // generate password hash and user model

  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
    email: body.email,
    verification: {
      code: crypt.randomInt(99999999).toString().padStart(8, '0'),
      expires: moment(new Date()).add(12, 'hours'),
      verified: false
    },
    passwordHash,
  });

  // save

  try {                                 // try to save
    const res = await user.save();
    response.status(200).send(jwt.signToken(res.username, res.email, res._id));

  } catch (e) {                         // email and username are not unique

    if (e.message.startsWith('User validation failed')) {
      response.status(400).send(e.message);
    }
    throw (e);
  }
  
});

module.exports = authRouter;
