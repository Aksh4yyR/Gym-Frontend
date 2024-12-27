import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Table } from "react-bootstrap";
import { viewOrdersByUser } from "./services/allAPI";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("user_id"); // Assume userId is stored in session
  console.log(orders);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await viewOrdersByUser(reqHeader);
        // Filter orders by user ID
        const userOrders = result.data.filter((order) => order.user === userId);
        setOrders(userOrders);
      } catch (err) {
        setError("Failed to fetch your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, userId]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  const handleCtaegory=()=>
  {
    navigate('/categories')
  }

  return (
    <>
      {/* Navbar */}
      <Navbar
  bg="dark"
  variant="dark"
  expand="lg"
  style={{
    height: "120px", // Adjust height
    padding: "20px 40px", // Adjust padding
  }}
>
  <Container
    fluid
    style={{
      maxWidth: "100%", // Ensure container spans full width
    }}
  >
    <Navbar.Brand
      className="fw-bold text-uppercase"
      style={{
        fontSize: "1.8rem", // Adjust brand size
        lineHeight: "100px", // Center vertically
      }}
    >
      Armstrong Fitness
    </Navbar.Brand>
    <div className="ms-auto d-flex gap-3">
      <Button variant="outline-success" onClick={handleCtaegory}>
        Categories
      </Button>
      <Button variant="outline-danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  </Container>
</Navbar>



      {/* Orders Table */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-uppercase fw-bolder text-danger">
          My Orders 
        </h2>
        {orders.length > 0 ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center">No orders found for this user.</div>
        )}
      </div>
    </>
  );
};

export default UserOrders;
