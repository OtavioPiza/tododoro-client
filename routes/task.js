/**
 * Router for task routes
 *
 * @version 1.0.0
 */

// == imports == //

/* libs */

const express = require('express');
const jwt = require('../utils/jwt');

/* middleware */

const tokenVerifier = require('../middleware/tokenVerifier');

/* models */

const Task = require('../models/task');
const User = require('../models/user');

// == routes == //

const taskRouter = express.Router();

taskRouter.use(tokenVerifier);

taskRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body || !('title' in body)) {
    response.status(400).send({ error: 'missing content' });
  }

  const token = jwt.decode(request.get('authorization'));
  const user = await User.findById(token.id);

  if (!user)  {
    response.send(401).send({ error: 'this user does not exist'});
  }

  const task = new Task({
    user: user.id,
    title: body.title,
    description: 'description' in body ? body.description : null,
    due: 'due' in body ? body.due : null,
  });

  try {
    const res = await task.save();
    response.status(201).send({
      id: res._id,
      title: res.title,
      description: 'description' in res ? res.description : null,
      due: 'due' in res ? res.due : null
    });

  } catch (e) {

    if (e.message.startsWith('Task validation failed')) {
      response.status(400).send(e.message);
    }
    throw e;
  }
  response.status(500).end();
});

taskRouter.delete('/', async (request, response) => {
  const body = request.body;

  if (!body || !('id' in body)) {
    response.send(400).send({ error: 'content missing' });
    return;
  }

  try {
    const token = jwt.decode(request.get('authorization'));
    await Task.findByIdAndDelete(body.id).where({ user: token.id });

  } catch (e) {

    if (e.kind === 'ObjectId') {
      response.status(400).send({ error: 'invalid id' });
      return;
    }
    throw e;
  }
  response.status(204).end();
});

// == exports == //

module.exports = taskRouter;
