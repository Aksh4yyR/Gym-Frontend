import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#333', color: 'white', padding: '40px 0', fontSize: '14px' }}>
      <Container>
        <Row>
          <Col md={3} style={{ marginBottom: '20px' }}>
            <h5 className='fw-bolder'>About Us</h5>
            <p>
              We offer premium supplements tailored for athletes and fitness enthusiasts. Our mission is to fuel your workouts and help you achieve your fitness goals.
            </p>
          </Col>

          <Col md={3} style={{ marginBottom: '20px' }}>
            <h5  className='fw-bolder'>Customer Support</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><a href="#shipping" style={{ color: 'lightgray', textDecoration: 'none' }}>Shipping & Delivery</a></li>
              <li><a href="#returns" style={{ color: 'lightgray', textDecoration: 'none' }}>Returns & Exchanges</a></li>
              <li><a href="#privacy" style={{ color: 'lightgray', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: 'lightgray', textDecoration: 'none' }}>Terms of Service</a></li>
            </ul>
          </Col>

          <Col md={3} style={{ marginBottom: '20px' }}>
            <h5  className='fw-bolder'>Contact Us</h5>
            <p>
              <strong>Email:</strong> armstrongfitness2024@gmail.com<br />
              <strong>Phone:</strong> +91922789087<br />
              <strong>Address:</strong> 123 Fitness Lane, Kakkanad,Ernakulam dist.
            </p>
          </Col>

          <Col md={3} style={{ marginBottom: '20px' }}>
            <h5  className='fw-bolder'>Newsletter Signup</h5>
            <p>Stay updated with our latest products and exclusive offers.</p>
            <Form inline style={{ display: 'flex', gap: '5px' }}>
              <Form.Control
                type="email"
                placeholder="Your email"
                style={{ flex: '1', borderRadius: '5px', padding: '5px' }}
              />
              <Button variant="primary" style={{ backgroundColor: '#FF6B6B', border: 'none', borderRadius: '5px' }}>Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr style={{ backgroundColor: 'gray', margin: '20px 0' }} />

        <Row>
          <Col md={6}>
            <p>&copy; Akshay {new Date().getFullYear()} Gym Supplements Co. All rights reserved.</p>
          </Col>
          <Col md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'lightgray', textDecoration: 'none', margin: '0 10px' }}>Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'lightgray', textDecoration: 'none', margin: '0 10px' }}>Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'lightgray', textDecoration: 'none', margin: '0 10px' }}>Twitter</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
