import React, { useEffect, useState } from "react";
import { Card, Button, Table, Badge, Container, Row, Col, Offcanvas, Nav } from "react-bootstrap";
import { allTasksAPI } from "../services/allAPI";
import { deleteUserAPI } from "../services/allAPI";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [userDet, setUserDet] = useState([]);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar state
  const navigate = useNavigate();
console.log(userDet);

  useEffect(() => {
    handleViewTasks();
  }, []);

  const handleViewTasks = async () => {
    setError("");
    try {
      const reqHeader = { authorization: `Bearer ${sessionStorage.getItem("token")}` };
      const result = await allTasksAPI(reqHeader);
      setUserDet(result.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch user data. Please try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const reqHeader = { authorization: `Bearer ${sessionStorage.getItem("token")}` };
      const response = await deleteUserAPI(reqHeader, id);

      if (response.status === 200) {
        alert("Deleted Successfully");
        handleViewTasks();
      } else {
        alert("Deletion failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Container fluid className="p-0">
      {/* Sidebar */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link onClick={() => setShowSidebar(false)} href="/total-users">
              Total Users
            </Nav.Link>
            <Nav.Link onClick={() => setShowSidebar(false)} href="#active-users">
              Active Users
            </Nav.Link>
            <Nav.Link onClick={() => setShowSidebar(false)} href="/add-products">
              Add Products
            </Nav.Link>
            <Nav.Link onClick={() => setShowSidebar(false)} href="/products">
            View Products
            </Nav.Link>
            <Nav.Link onClick={() => setShowSidebar(false)} href="/order-lists">
              Ordered Lists
            </Nav.Link>
            
            <Nav.Link onClick={() => { setShowSidebar(false); handleLogout(); }} href="#logout">
              Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar toggle button */}
      <Button variant="primary" onClick={() => setShowSidebar(true)} className="position-fixed top-0 start-0 mt-3 ms-3">
        <i className="fas fa-bars"></i> Menu
      </Button>

      {/* Main Dashboard Content */}
      <Row className="g-0">
  {/* Sidebar */}
  <Col xs={2} className="d-none d-md-block">
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        width: "250px",
        backgroundColor: "#343a40",
        color: "white",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
        zIndex: 10
      }}
    >
      <h3 className="text-center p-3" style={{ fontWeight: "bold" }}>Dashboard</h3>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/add" style={{ color: "white", fontSize: "1.1rem", marginBottom: "10px" }}>Add Products</Nav.Link>
        <Nav.Link href="/products" style={{ color: "white", fontSize: "1.1rem", marginBottom: "10px" }}>View Products</Nav.Link>
        <Nav.Link href="/view-address-admin" style={{ color: "white", fontSize: "1.1rem", marginBottom: "10px" }}>View Address</Nav.Link>
        <Nav.Link href="/order-lists" style={{ color: "white", fontSize: "1.1rem", marginBottom: "10px" }}>View Orders</Nav.Link>
        <Nav.Link onClick={handleLogout} style={{ color: "white", fontSize: "1.1rem", marginTop: "20px" }}>Logout</Nav.Link>
      </Nav>
    </div>
  </Col>

  {/* Main Content */}
  <Col xs={12} md={10} className="ms-md-auto p-5" style={{ marginLeft: "250px" }}>
    <h1 className="mb-4 text-center" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2rem" }}>
      Admin Dashboard
    </h1>

    {/* Summary Cards */}
    <Row className="mb-4">
      <Col md={4} className="mb-3">
        <Card className="shadow-sm border-0 rounded-3">
          <Card.Body>
            <Card.Title className="text-muted">Total Users</Card.Title>
            <Card.Text className="display-4 text-primary">{userDet?.length || 0}</Card.Text>
            <Button variant="primary" size="sm" onClick={handleViewTasks}>
              Refresh
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card className="shadow-sm border-0 rounded-3">
          <Card.Body>
            <Card.Title className="text-muted">Active Users</Card.Title>
            <Card.Text className="display-4 text-success">{userDet?.length || 0}</Card.Text>
            <Button variant="success" size="sm">
              Manage
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card className="shadow-sm border-0 rounded-3">
          <Card.Body>
            <Card.Title className="text-muted">Add Products</Card.Title>
            <Card.Text className="display-4 text-danger text-center">+</Card.Text>
            <Link to={"/add"} className="btn btn-danger w-100">
              Add Products
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* User Table */}
    <h3 className="mb-3" style={{ color: "#343a40", fontWeight: "bold" }}>
      User Management
    </h3>
    {error && <p className="text-danger">{error}</p>}
    <Table
      bordered
      hover
      responsive
      className="shadow-sm"
      style={{ backgroundColor: "#fff", color: "#343a40", borderRadius: "8px" }}
    >
      <thead style={{ backgroundColor: "#343a40", color: "#fff" }}>
        <tr>
          <th>#</th>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userDet?.length > 0 ? (
          userDet.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
                  {user.role || "user"}
                </Badge>
              </td>
              <td>
                <Button
                  onClick={() => handleDeleteUser(user?._id)}
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center text-muted">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </Col>
</Row>

    </Container>
  );
};

export default AdminDashboard;
