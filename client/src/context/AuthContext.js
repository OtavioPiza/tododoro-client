import React, {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {doLogin, doRegister, doVerify} from '../services/api';

// == constants == //

/**
 * default initial state
 */
let initialState;

try {
  initialState = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {
    token: null,
    verified: null,
    username: null,
  };
} catch (e) {
  initialState = {
    token: null,
    verified: null,
    username: null,
  };
}

// == auth context == //

/**
 * auth context
 *
 * @type {React.Context<{logout: logout, verify: verify, login: login, register: register}>}
 */
const AuthContext = createContext({
  register: () => {},
  verify: () => {},
  login: () => {},
  logout: () => {},
  token: () => false,
  verified: () => false,
  username: () => false
});

// == provider == //

/**
 * context provider
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const AuthContextProvider = ({ children }) => {

  /* state */

  const [auth, setAuth] = useState(initialState);

  /* hooks */

  /**
   * update local storage everytime auth changes
   */
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  /* handlers */

  /**
   * tries to register a user
   *
   * @param email
   * @param firstName
   * @param lastName
   * @param username
   * @param password
   * @param passwordConf
   * @returns {Promise<void>}
   */
  const register = async (email, firstName, lastName, username, password, passwordConf) => {

    if (password !== passwordConf) {
      return;
    }

    const res = await doRegister(email, firstName, lastName, username, password);

    if (res.status === 201) {
      setAuth({
        ...auth,
        token: res.data.token,
        verified: false,
        username: username
      });
    }
  };

  /**
   * verifies an account
   *
   * @param code
   * @returns {Promise<void>}
   */
  const verify = async (code) => {

    if (!auth.token) {
      return;
    }

    const res = await  doVerify(auth.token, code);

    if (res.status === 200) {
      setAuth({
        ...auth,
        verified: true,
      });
    }
  };

  /**
   * tries to log a user in
   *
   * @param username  username
   * @param password  password
   */
  const login = async (username, password) => {

    if (!username || !password) {
      throw ({ response: { status: 401 }});
    }

    const res = await doLogin(username, password);

    if (res.status === 200) {
      setAuth({
        ...auth,
        token: res.data.token,
        verified: res.data.verified,
        username
      });
    }
  };

  /**
   * logs the current user out
   */
  const logout = () => {
    setAuth({
      token: null,
      verified: null,
      username: null,
    });
  };

  /* return */

  return (
    <AuthContext.Provider value={{
      register,
      verify,
      login,
      logout,
      token: auth.token,
      verified: auth.verified,
      username: auth.username
    }}>
      {children}
    </AuthContext.Provider>
  );

};

// == prototyping == //

AuthContextProvider.propTypes = {
  children: PropTypes.any
};

// == export == //

export default AuthContext;
export {
  AuthContextProvider
};
