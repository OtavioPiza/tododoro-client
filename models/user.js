/**
 * user model for mongodb
 *
 * @version 1.0.0
 * @author Otavio Sartorelli de Toledo Piza
 */

/* imports */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/* schemas */

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  verification: {
    code: Number,
    expires: Date,
    verified: Boolean
  }
});

userSchema.plugin(uniqueValidator); // email and usernames have to be unique

/* properties */

userSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object.passwordHash;
    delete object._id;
    delete object.__v;
  }
});

/* statics */

/**
 * finds a user with the given name
 *
 * @param username
 * @returns {*}
 */
userSchema.statics.findByUsername = (username) => {
  return this.find({ username: username });
};

/**
 * finds a user with the given email
 *
 * @param email
 * @returns {*}
 */
userSchema.statics.findByEmail = (email) => {
  return this.find({ email: email });
};

/* model */

const User = mongoose.model('User', userSchema);

/* export */

module.exports = User;