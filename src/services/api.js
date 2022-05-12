/**
 * file to handle api calls related to user
 *
 * @version 1.0.0
 */

/* imports */

import axios from 'axios';

/* constants */

const authBaseUrl = '/api/auth';
const taskBaseUrl = '/api/task';

/* functions */

/**
 * tries to register a user with the api
 *
 * @param email     email
 * @param firstName first name
 * @param lastName  last name
 * @param username  username
 * @param password  password
 * @returns {Promise<number|any>}
 */
const doRegister = async (email, firstName, lastName, username, password) => {

  const response = await axios.post(`${authBaseUrl}/register`, {
    email,
    firstName,
    lastName,
    username,
    password
  });

  return { status: response.status, data: response.data };
};

/**
 * Checks if the token the user is holding is valid
 * 
 * @param {String} token token provided by the api
 * @returns 
 */
const doCheck = async (token) => {
  const response = await axios.post(`${authBaseUrl}/check`, null, {
    headers: {
      Authorization: token
    }
  });

  return { status: response.status, data: response.data };
};

/**
 * tries to verify a user with the api
 *
 * @param token token
 * @param code  code
 * @returns {Promise<boolean|*>}
 */
const doVerify = async (token, code) => {

  const response = await axios.post(`${authBaseUrl}/verify`, {
    code
  }, {
    headers: {
      'Authorization': token
    }
  });

  return { status: response.status, data: response.data };
};

/**
 * resends the verification code
 *
 * @param token auth token
 * @returns {Promise<number|*>}
 */
const doResendVerify = async (token) => {

  const response = await axios.post(`${authBaseUrl}/verify/resend`, null, {
    headers: {
      'Authorization': token
    }
  });

  return { status: response.status, data: response.data };
};

/**
 * tries to log a user in
 *
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
const doLogin = async (username, password) => {

  const response = await axios.post(`${authBaseUrl}/login`, {
    username,
    password
  });

  return { status: response.status, data: response.data };
};

/**
 * gets the notes from a user
 *
 * @param token token
 * @returns {Promise<{data: any, status: number}>}
 */
const getNotes = async (token) => {
  const response = await axios.get(`${taskBaseUrl}`, {
    headers: {
      'Authorization': token
    }
  });
  return { status: response.status, data: response.data };
};

/**
 * creates a new note
 *
 * @param token
 * @param title
 * @param description
 * @returns {Promise<{data: any, status: number}>}
 */
const doCreateNote = async (token, title, description) => {
  const response = await axios.post(`${taskBaseUrl}`, {
    title,
    description,
  }, {
    headers: {
      'Authorization': token
    }
  });
  return { status: response.status, data: response.data };
};

const doRemoveNote = async (token, id) => {
  const response = await axios.delete(`${taskBaseUrl}`, {
    headers: {
      'Authorization': token
    },
    data: {
      id
    }
  });
  return { status: response.status, data: response.data };
};

/* exports */

export {
  doRegister,
  doVerify,
  doCheck,
  doResendVerify,
  doLogin,
  getNotes,
  doCreateNote,
  doRemoveNote,
};