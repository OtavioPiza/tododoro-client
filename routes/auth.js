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
const {sendVerificationCode} = require('../utils/mailer');

/* middleware */

const tokenVerifier = require('../middleware/tokenVerifier');

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

  if (!body || !('email' in body && 'firstName' in body && 'lastName' in body && 'username' in body && 'password' in body)) {
    response.status(400).send({ error: 'content missing' });
    return;
  }

  // verify valid email

  if (!patternMatcher.isEmailValid(body.email)) {
    response.status(400).send({ error: 'invalid email' });
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

  try {

    // save

    const res = await user.save();
    response.status(201).send({ token: jwt.signToken(res.username, res.email, res._id) });

    // send verification email

    const res2 = await sendVerificationCode(res.email, res.verification.code);
    console.log(res2);

  } catch (e) {                         // email and username are not unique

    if (e.message.startsWith('User validation failed')) {
      response.status(400).send(e.message);
    }
    throw (e);
  }



});

/**
 * logs a user in
 */
authRouter.post('/login', async (request, response) => {
  const body = request.body;

  // verify request

  if (!body || !('username' in body && 'password' in body)) {
    response.status(400).send({ error: 'content missing '});
    return;
  }

  // get user

  const user = await User.findOne().where({username: body.username});

  if (!user) {
    response.status(401).send({ error: 'wrong username or password'});
    return;
  }

  // verify password

  const valid = await bcrypt.compare(body.password, user.passwordHash);

  if (!valid) {
    response.status(401).send({ error: 'wrong username or password' });
    return;
  }

  // generate and return token

  const token = jwt.signToken(user.username, user.email, user._id);
  response.status(200).send({
    username: user.username,
    verified: user.verification.verified,
    token
  });
});

/**
 * verifies if the user has a valid token
 */
authRouter.use('/verify', tokenVerifier);

/**
 * verifies a user
 */
authRouter.post('/verify', async (request, response) => {
  const decToken = jwt.decode(request.get('authorization'));
  const body = request.body;
  const user = await User.findById(decToken.id);

  if (!body || !('code' in body)) {
    response.status(400).end();
    return;
  }

  if (body.code !== user.verification.code) {
    response.status(403).send({ error: 'invalid code' });
    return;
  }

  if (moment(new Date()).isAfter(user.verification.expires)) {
    response.status(403).send({ error: 'code expired' });
    return;
  }

  await User.findByIdAndUpdate(decToken.id, {
    verification: {
      verified: true
    }
  });

  response.status(200).end();
});

/**
 * resends email with verification code
 */
authRouter.post('/verify/resend', async (request, response) => {
  const decToken = jwt.decode(request.get('authorization'));
  const code = crypt.randomInt(99999999).toString().padStart(8, '0');

  const user = await User.findByIdAndUpdate(decToken.id, {
    verification: {
      code: code,
      expires: moment(new Date()).add(12, 'hours'),
      verified: false
    }
  });

  if (!user) {
    response.status(401).send({ error: 'this user does not exist' });
    return;
  }

  const res = await sendVerificationCode(user.email, code);

  if ('accepted' in res && res.accepted) {
    response.status(201).end();
    return;
  }

  response.status(500).end();
});

/* exports */

module.exports = authRouter;
