import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { LogContextProvider } from './context/LogContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LogContextProvider>
        <App />
      </LogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
