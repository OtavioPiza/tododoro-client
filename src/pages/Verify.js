import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import '../styles/pages/Forms.css';
import {Alert, CircularProgress} from '@mui/material';
import AuthContext from '../context/AuthContext';
import {Navigate} from 'react-router';

const Login = () => {

  /* context */

  const authContext = useContext(AuthContext);

  authContext.token = authContext.token ? authContext.token : null;
  authContext.verified = authContext.verified ? authContext.verified : null;
  authContext.username = authContext.username ? authContext.username : null;

  /* states */

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [code, setCode] = useState('');

  /* handlers */

  const handleVerify = async (e) => {
    e.preventDefault();

    if (code.length !== 8) {
      setAlert('Invalid code!');
      return;
    }

    setLoading(true);

    try {
      await authContext.verify(code);

    } catch (e) {

      if (e.response.status === 403) {

        if (e.response.data.includes('code expired')) {
          setAlert('Code expired');

        } else if (e.response.data.includes('invalid code')) {
          setAlert('Invalid code');

        } else {
          setAlert('Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!');
        }
      }
      setTimeout(() => {
        setAlert('');
      }, 5000);
    }
    setLoading(false);
  };

  /* return */

  if (authContext.token && authContext.verified) {
    return (
      <Navigate to={'/tasks'} />
    );
  }

  if (!authContext.token) {
    return (
      <Navigate to={'/login'} />
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
                One last step!
              </h3>

              <Form.Group className="mb-3" controlId="password" id={'in'}>
                <Form.Control
                  placeholder="Code"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </Form.Group>

              <div id={'buttonHolder'}>

                <Button id={'button'} variant="danger" type="submit"
                  onClick={async (e) => await handleVerify(e)}>
                  Verify
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