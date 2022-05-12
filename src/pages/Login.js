import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import '../styles/pages/Forms.css';
import {Alert, CircularProgress} from '@mui/material';
import AuthContext from '../context/AuthContext';
import {Navigate} from 'react-router';
import {useStateIfMounted} from 'use-state-if-mounted';
import LogContext from '../context/LogContext';

const Login = () => {

  /* context */

  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  /* states */

  const [loading, setLoading] = useStateIfMounted(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  /* handlers */

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await authContext.login(username, password);

    } catch (e) {

      if (e.response.status === 401) {
        logContext.setError('Invalid username or password');

      } else {
        logContext.setError('Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!');
      }
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

          {logContext.error && <Alert
            id={'alert'}
            open={logContext.error && true}
            onClose={() => logContext.setError('')}
            severity={'error'}
            sx={{
              borderRadius: '1rem',
              marginTop: '5px',
              maxWidth: '100%'
            }}
          >{logContext.error}</Alert>}

        </div>

      </Col>
      <Col/>
    </Row>

  );
};

export default Login;