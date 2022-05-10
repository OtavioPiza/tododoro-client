import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import '../styles/pages/Forms.css';
import {Alert, CircularProgress} from '@mui/material';
import AuthContext from '../context/AuthContext';
import {Navigate} from 'react-router';
import {useStateIfMounted} from 'use-state-if-mounted';

const Login = () => {

  /* context */

  const authContext = useContext(AuthContext);

  authContext.token = authContext.token ? authContext.token : null;
  authContext.verified = authContext.verified ? authContext.verified : null;
  authContext.username = authContext.username ? authContext.username : null;

  /* states */

  const [loading, setLoading] = useStateIfMounted(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [alert, setAlert] = useState('');

  /* handlers */

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await authContext.login(username, password);

    } catch (e) {

      if (e.response.status === 401) {
        setAlert('Invalid username or password');

      } else {
        setAlert('Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!');
      }

      setTimeout(() => {
        setAlert('');
      }, 5000);
    }
    setLoading(false);
  };

  if (authContext.token && !authContext.verified) {
    return (
      <Navigate to={'/verify'} />
    );
  }

  if (authContext.token && authContext.verified) {
    return (
      <Navigate to={'/tasks'} />
    );
  }

  return (

    <Row>
      <Col/>
      <Col xs={'auto'}>

        <Card id={'card'} >

          <Container id={'container'}>
            <Form>

              <h3>
                Welcome back!
              </h3>

              <Form.Group controlId={'username'} id={'in'}>
                <Form.Control
                  placeholder={'Enter username'}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password" id={'in'}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div id={'buttonHolder'}>

                <Button id={'button'} variant="danger" type="submit"
                  onClick={async (e) => await handleLogin(e)}>
                  Login
                </Button>

                {loading && <CircularProgress color={'inherit'}/>}

              </div>

            </Form>
          </Container>

        </Card>

        <div id={'alertDiv'}>

          {alert && <Alert
            id={'alert'}
            open={alert && true}
            onClose={() => setAlert('')}
            severity={'error'}
            sx={{
              borderRadius: '1rem',
              marginTop: '5px',
              maxWidth: '100%'
            }}
          >{alert}</Alert>}

        </div>

      </Col>
      <Col/>
    </Row>

  );
};

export default Login;