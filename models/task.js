/**
 * task model
 *
 * @version 1.0.0
 */

// == imports == //

const mongoose = require('mongoose');

// == schemas == //

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  due: {
    type: Date,
    required: false
  }
});

// == properties == //

/**
 * overrides default transformation removing __v form the object
 */
taskSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

// == model == //

const Task = mongoose.model('Task', taskSchema);

// == exports == //

module.exports = Task;