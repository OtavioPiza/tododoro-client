import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext';
import LogContext from '../context/LogContext';
import { Navigate } from 'react-router-dom';

const Protect = ({ children }) => {
  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  if (!authContext.token) {
    useEffect(() => {
      logContext.setError('You must be logged in to view this page.');
    }, []);
    return <Navigate to="/login" />;

  } else {
    return children;
  }
};

Protect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protect;