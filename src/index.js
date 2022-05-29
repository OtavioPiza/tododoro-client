import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { LogContextProvider } from './context/LogContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { TaskContextProvider } from './context/TaskContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LogContextProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </LogContextProvider>
    </AuthContextProvider>
  </React.StrictMode >,
  document.getElementById('root')
);
