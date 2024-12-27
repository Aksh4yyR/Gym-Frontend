import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Button, Toast, Form } from 'react-bootstrap';
import { AddAddress,userViewAddress } from '../services/allAPI'; // Assuming you have these API functions

const Header = () => {
  const [showAddModal, setShowAddModal] = useState(false); // For Add Address modal
  const [showViewModal, setShowViewModal] = useState(false); // For View Address modal
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [addresses, setAddresses] = useState([]); // Store addresses for viewing
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isLoggedIn = sessionStorage.getItem('token');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const fetchAddresses = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const reqHeader = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      };
      const response = await userViewAddress(reqHeader);

      if (response.status == 200) {
        setAddresses(response.data); // Save the fetched addresses
      } else {
        setErrorMessage('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setErrorMessage('Error fetching addresses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const reqHeader = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      };
      const response = await AddAddress(reqHeader, address);

      if (response.status === 200) {
        setSuccessMessage('Address added successfully!');
        alert('Address added successfully');
        setAddress({
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        });
        setShowAddModal(false);
      } else {
        setErrorMessage(response.message || 'Failed to add address. Please try again.');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setErrorMessage('Failed to add address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showViewModal && isLoggedIn) {
      fetchAddresses(); // Fetch addresses when the "View Address" modal is opened
    }
  }, [showViewModal, isLoggedIn]);

  return (
    <>
      <Navbar expand="lg" className="bg-black navbar-dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" style={{ width: '80px', borderRadius: '8px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
  {!isLoggedIn ? (
    // If user is not logged in, show Login and Register buttons
    <>
      <Nav.Link as={Link} to="/login" className="btn btn-primary text-white mx-2">
        Login <i className="fa-solid fa-user"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/register" className="btn btn-warning text-white mx-2">
        Register <i className="fa-solid fa-user"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/" className="btn btn-success text-white mx-2">
        Home <i className="fa-solid fa-house"></i>
      </Nav.Link>
    </>
  ) : (
    // If user is logged in, show the following options
    <>
      <Nav.Link as={Link} to="/" className="btn btn-success text-white mx-2">
        Home <i className="fa-solid fa-house"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/reviews" className="btn btn-info text-white mx-2">
        Reviews <i className="fa-solid fa-star"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/wishlist" className="btn btn-warning text-white mx-2">
        Wishlist <i className="fa-solid fa-heart"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/view-cart" className="btn btn-primary text-white mx-2">
        Cart <i className="fa-solid fa-shopping-cart"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/Categories" className="btn btn-secondary text-white mx-2">
        Products <i className="fa-solid fa-cogs"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/my-orders" className="btn btn-primary text-white mx-2">
      My Orders <i className="fa-solid fa-box"></i>
      </Nav.Link>
      <Nav.Link onClick={() => setShowAddModal(true)} className="btn btn-info text-white mx-2">
        Save Address <i className="fa-solid fa-map-marker-alt"></i>
      </Nav.Link>
      <Nav.Link onClick={() => setShowViewModal(true)} className="btn btn-secondary text-white mx-2">
       View Addresses <i className="fa-solid fa-eye"></i>
      </Nav.Link>
      <Nav.Link as={Link} to="/bmi-calculator" className="btn btn-secondary text-white mx-2">
        Check BMI <i className="fa-solid fa-heartbeat"></i>
      </Nav.Link>
      <Nav.Link onClick={handleLogout} className="btn btn-danger text-white mx-2">
        Logout <i className="fa-solid fa-sign-out-alt"></i>
      </Nav.Link>
    </>
  )}
</Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for adding address */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveAddress}>
            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street"
                name="street"
                value={address.street}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={address.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                name="state"
                value={address.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip code"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="country"
                value={address.country}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Address'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for viewing addresses */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Addresses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Toast bg="danger">{errorMessage}</Toast>}
          {isLoading ? (
            <p>Loading addresses...</p>
          ) : addresses.length > 0 ? (
            <ul>
              {addresses.map((addr, index) => (
                <li key={index}>
                  {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* modal for viewwing address */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Addresses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Toast bg="danger">{errorMessage}</Toast>}
          {isLoading ? (
            <p>Loading addresses...</p>
          ) : addresses.length > 0 ? (
            <ul>
              {addresses.map((addr, index) => (
                <li key={index}>
                  {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
