import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Tasks from './pages/Tasks';

const App = () => {
  return (

    <AuthContextProvider>

      <NavBar/>

      <Router>

        <Routes>

          <Route path={'/login'} element={
            <Login/>
          }/>

          <Route path={'/register'} element={
            <Register/>
          }/>

          <Route path={'/verify'} element={
            <Verify/>
          }/>

          <Route path={'/tasks'} element={
            <Tasks/>
          }/>

        </Routes>

      </Router>

    </AuthContextProvider>

  );
};

export default App;
