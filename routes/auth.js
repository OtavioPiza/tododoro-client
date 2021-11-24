/**
 * router for auth routes
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* imports */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypt = require('crypto');
const moment = require('moment');
const logger = require('../utils/logger');
const patternMatcher = require('../utils/patternMatcher');

/* models */

const User = require('../models/user');

/* setup */

const authRouter = express.Router();
const saltRounds = 8;

/* routes */

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

  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
    email: body.email,
    verification: {
      code: crypt.randomInt(99999999),
      expires: moment(new Date()).add(15, 'm'),
      verified: false
    },
    passwordHash,
  });
  
  try {
    await user.save();
    response.status(201).end();

  } catch (e) {
    response.status(400).send({ error: 'email and username have to be unique' });
  }
  
});

module.exports = authRouter;
