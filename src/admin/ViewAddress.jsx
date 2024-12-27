import React, { useEffect, useState } from "react";
import { viewAdress } from "../services/allAPI"; // Import the API function
import { Navbar, Nav, Button, Container } from "react-bootstrap"; // Import missing components

const ViewAddress = () => {
  const [addresses, setAddresses] = useState([]); // State to store addresses
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const result = await viewAdress(); // Call the API
        setAddresses(result.data); // Assuming `data` contains the address list
      } catch (err) {
        setError("Failed to fetch addresses. Please try again.");
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchAddresses();
  }, []);

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing tokens, redirecting)
    alert("You have been logged out!");
    window.location.href = "/login"; // Redirect to login page
  };

  const handleDashboard = () => {
    window.location.href = "/admin-dashboard"; // Redirect to the dashboard
  };

  const handleOrders = () => {
    window.location.href = "/order-lists"; // Redirect to the orders page
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div className="text-danger">{error}</div>; // Show error message if any
  }

  return (
    <div>
      {/* Header with Menu Bar (Buttons in Navbar) */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">ARMSTRONG FITNESS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" className="me-2" onClick={handleDashboard}>
                Dashboard
              </Button>
              <Button variant="outline-light" className="me-2" onClick={handleOrders}>
                Orders
              </Button>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Address Table */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-uppercase fw-bold">
          Address List
        </h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>ZIP Code</th>
              </tr>
            </thead>
            <tbody>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <tr key={address.id}>
                    <td>{index + 1}</td>
                    <td>{address?.user}</td>
                    <td>{address.street}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.zipCode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No addresses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAddress;
