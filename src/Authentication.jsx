import React from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './HeadFoot/Header.jsx'

const Authentication = ({ insideRegister = false }) => {
  return (
    
  <>
  <Header/>
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark" style={{ backgroundColor: '#f5f5f5' }}>
      <Row className="shadow-lg card p-0" style={{ width: '80%', maxWidth: '900px', borderRadius: '10px' }}>
        {/* Left Column with Image */}
        
        {/* Right Column with Form */}
        <Col lg={12} className="p-4" style={{ backgroundColor: 'white' }}>
          <h2 className="mb-4 text-center fw-bold text-danger">SIGN {insideRegister ?"UP":"IN" }</h2>
          <Form>
            {insideRegister && (
              <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                <Form.Control type="text" placeholder="Username" style={{ borderColor: '#ccc' }} />
              </FloatingLabel>
            )}
            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" style={{ borderColor: '#ccc' }} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" style={{ borderColor: '#ccc' }} />
            </FloatingLabel>
            {insideRegister ? (
              <Button variant="primary" type="submit" className="w-100 mt-3 bg-danger" style={{ backgroundColor: '#2a75bb', borderColor: '#2a75bb' }}>
                Register
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="w-100 mt-3 bg-danger" style={{ backgroundColor: '#2a75bb', borderColor: '#2a75bb' }}>
                Login
              </Button>
            )}
          </Form>
          <p className="mt-3 text-center">
            {insideRegister ? (
              <>
                Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#2a75bb' }}>Sign In</Link>
              </>
            ) : (
              <>
                Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#2a75bb' }}>Sign Up</Link>
              </>
            )}
          </p>
        </Col>
      </Row>
    </Container></>
  );
};

export default Authentication;