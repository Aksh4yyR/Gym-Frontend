import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { viewAllOrders, updateOrderStatus } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for errors
  const token = sessionStorage.getItem("token"); // Store token in a variable
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await viewAllOrders(reqHeader);
        setOrders(result);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = useCallback(
    async (orderId, newStatus) => {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const reqBody = { status: newStatus };

      try {
        const result = await updateOrderStatus(orderId, reqHeader, reqBody);
        if (result.status === 200) {
          const updatedOrders = await viewAllOrders(reqHeader);
          setOrders(updatedOrders);
        } else {
          setError("Failed to update order status.");
        }
      } catch (err) {
        setError("Error updating order status.");
      }
    },
    [token]
  );

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const goToDashboard = () => {
    navigate("/admin-dashboard");
  };

  const goToAddressAdmin = () => {
    navigate("/view-address-admin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">ARMSTRONG FITNESS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" className="me-2" onClick={goToDashboard}>
                Dashboard
              </Button>
              <Button variant="outline-light" className="me-2" onClick={goToAddressAdmin}>
                View Address
              </Button>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Order List */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-uppercase fw-bolder text-danger">
          Order List
        </h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.length > 0 ? (
                orders.data.map((order) =>
                  order.products.map((product, index) => (
                    <tr key={`${order._id}-${index}`}>
                      <td>{index === 0 ? order._id : ""}</td>
                      <td>{index === 0 ? order.user : ""}</td>
                      <td>{product.product}</td>
                      <td>{product.quantity}</td>
                      <td>{index === 0 ? order.totalAmount : ""}</td>
                      <td>{index === 0 ? order.status : ""}</td>
                      <td>
                        {index === 0 && (
                          <>
                            {["Pending", "Success"].map((status) => (
                              <button
                                key={status}
                                className={`btn mx-1 ${
                                  status === "Pending" ? "btn-warning" : "btn-success"
                                }`}
                                onClick={() => handleStatusChange(order._id, status)}
                                disabled={order.status === status}
                              >
                                {status}
                              </button>
                            ))}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderList;
