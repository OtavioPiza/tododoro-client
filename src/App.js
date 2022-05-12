import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Tasks from './pages/Tasks';
import AuthContext from './context/AuthContext';
import Protect from './components/Protect';

const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.check();
  }, [authContext.token]);

  return (
    <>
      <NavBar />

      <Router>

        <Routes>

          <Route path={'/login'} element={
            <Login />
          } />

          <Route path={'/register'} element={
            <Register />
          } />

          <Route path={'/verify'} element={
            <Protect><Verify /></Protect>
          } />

          <Route path={'/tasks'} element={
            <Protect><Tasks /></Protect>
          } />

        </Routes>

      </Router>
    </>
  );
};

export default App;
