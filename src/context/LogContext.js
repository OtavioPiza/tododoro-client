import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * default initial state
 */
const initialState = {
  error: '',
  info: '',
  warn: '',
};

const LogContext = createContext({
  error: '',
  info: '',
  warn: '',
  setError: () => { },
  setInfo: () => { },
  setWarn: () => { },
});

const LogContextProvider = ({ children }) => {

  /* state */

  const [log, setLog] = useState(initialState);

  /* handlers */

  const setError = (error, duration = 5000) => {
    setLog({ ...log, error: error });
    setTimeout(() => {
      setLog({ ...log, error: '' });
    }, duration);
  };

  const setInfo = (info, duration = 5000) => {
    setLog({ ...log, info: info });
    setTimeout(() => {
      setLog({ ...log, info: '' });
    }, duration);
  };

  const setWarn = (warn, duration = 5000) => {
    setLog({ ...log, warn: warn });
    setTimeout(() => {
      setLog({ ...log, warn: '' });
    }, duration);
  };

  return (
    <LogContext.Provider value={{
      error: log.error,
      info: log.info,
      warn: log.warn,
      setError,
      setInfo,
      setWarn,
    }}>
      {children}
    </LogContext.Provider>
  );

};

// == prototyping == //

LogContextProvider.propTypes = {
  children: PropTypes.any
};

// == export == //

export default LogContext;
export {
  LogContextProvider
};
