import React, {useContext} from 'react';
import {Container, Navbar, Nav, Button, Col, Row, NavDropdown} from 'react-bootstrap';

import AuthContext from '../context/AuthContext';

import '../styles/components/NavBar.css';


const NavBar = () => {

  /* context */

  const authContext = useContext(AuthContext);

  /* return */

  return (
    <Navbar bg={'light'} expand={'md'} id={'navbar'}>

      <Container>

        <Navbar.Brand href={'/'} id={'brand'}>TodoDoro</Navbar.Brand>
        <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
        <Navbar.Collapse id={'basic-navbar-nav'}>

          <Container>

            <Row>

              <Col md={'auto'}>
                <Nav.Link href={'/'}>Home</Nav.Link>
              </Col>

              <Col md={'auto'}>
                <Nav.Link href={'/tasks'}>Tasks</Nav.Link>
              </Col>

              {authContext.token && authContext.username && <Col md={'auto'}>

                <NavDropdown title={'Account'}>

                  <NavDropdown.Item>Hello, {authContext.username}</NavDropdown.Item>
                  {authContext.verified || <NavDropdown.Item>Verify</NavDropdown.Item>}
                  <NavDropdown.Item>Settings</NavDropdown.Item>

                </NavDropdown>

              </Col>}

            </Row>

          </Container>

          { authContext.token ? '' : <Nav.Link href={'/register'}>Register</Nav.Link> }

          <Button
            id={'button'}
            variant={'outline-danger'}
            href={authContext.token ? '' : '/login'}
            onClick={authContext.token ? authContext.logout : () => {}}
          >
            { authContext.token ? 'Logout' : 'Login' }
          </Button>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );

};

export default NavBar;