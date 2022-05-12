import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import '../styles/pages/Forms.css';
import {Alert, CircularProgress} from '@mui/material';
import AuthContext from '../context/AuthContext';
import {Navigate} from 'react-router';

const Register = () => {

  /* context */

  const authContext = useContext(AuthContext);

  /* states */

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  /* handlers */

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (password !== passwordConfirm) {
      setAlert('Passwords don\'t match');
      setTimeout(() => {
        setAlert('');
      }, 5000);
      return;
    }
    if (password.length < 8) {
      setAlert('Password should be at least 8 characters long');
      setTimeout(() => {
        setAlert('');
      }, 5000);
      return;
    }
    if (!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      setAlert('Invalid email');
      setTimeout(() => {
        setAlert('');
      }, 5000);
      return;
    }

    setLoading(true);

    try {
      await authContext.register(email, firstName, lastName, username, password, passwordConfirm);

    } catch (e) {

      if (e.response.status === 400) {

        if (e.response.data.includes('email: Error') && e.response.data.includes('username: Error')) {
          setAlert('Both the username and email have to be unique');

        } else if (e.response.data.includes('email: Error')) {
          setAlert('This email is already taken');

        } else if (e.response.data.includes('username: Error')) {
          setAlert('This username is already taken');

        } else {
          setAlert('Invalid email');
        }
      } else {
        setAlert('Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!');
      }
      setTimeout(() => {
        setAlert('');
      }, 5000);
    }

    setLoading(false);
  };

  /* return */

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
                Welcome to TodoDoro!
              </h3>

              <p>
                {'We can\'t wait to have you with us! Fill out with your information and we\'ll be done in no time.'}
              </p>

              <Form.Group controlId={'email'} id={'in'}>
                <Form.Control
                  placeholder={'Email'}
                  onChange={(e) => setEmail(e.target.value)}
                  type={'email'}
                  required
                />
                <Form.Text>Please enter a valid email. We will send you a verification code. We will never share your information.</Form.Text>
              </Form.Group>

              <Form.Group controlId={'firstName'} id={'in'}>
                <Form.Control
                  placeholder={'First name'}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId={'lastName'} id={'in'}>
                <Form.Control
                  placeholder={'Last name'}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId={'username'} id={'in'}>
                <Form.Control
                  placeholder={'Username'}
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

              <Form.Group className="mb-3" controlId="passwordConfirm" id={'in'}>
                <Form.Control
                  type="password"
                  placeholder="Retype password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </Form.Group>

              <div id={'buttonHolder'}>

                <Button
                  id={'button'}
                  variant="danger"
                  type="submit"
                  onClick={(e) => handleRegister(e)}
                >
                  Register
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

export default Register;