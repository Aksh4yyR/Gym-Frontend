import React, { useState } from "react";
import { Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "./HeadFoot/Header.jsx";
import Footer from "./HeadFoot/Footer.jsx";
import { registerAPI, loginAPI } from "./services/allAPI.js";
import authGif from "./assets/auth.gif";

const Authentication = ({ insideRegister = false }) => {
  const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();
console.log(userDetails);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;

    if (username && email && password) {
      try {
        const response = await registerAPI({ ...userDetails, role: "user" });
        if (response.status == 200) {
          alert("Registration Successful");
          setUserDetails({ username: "", email: "", password: "" });
          navigate("/login");
        } else {
          alert("Registration failed");
          setUserDetails({ username: "", email: "", password: "" });
        }
      } catch (err) {
        console.error("Error during registration:", err);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;

    if (email && password) {
      try {
        const response = await loginAPI(userDetails);
        if (response.status == 200) {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("user_id", response.data.user.id);
          sessionStorage.setItem("role", response.data.user.role);
          sessionStorage.setItem("name", response.data.user.username);

          alert("Login Successful");
          if (response.data.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/categories");
          }
        } else {
          alert("Invalid email or password");
        }
      } catch (err) {
        console.error("Error during login:", err);
        alert("Login failed");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 px-3">
        <Row className="w-100">
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
            {/* Left Column: Image */}
            <img
              src={authGif}
              alt="Authentication"
              className="img-fluid rounded-start"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                height: "100%",
                maxHeight: "300px", 
                width: "100%",
              }}
            />
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
            {/* Right Column: Form */}
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
              <h2 className="mb-4 text-center text-danger">
                SIGN {insideRegister ? "UP" : "IN"}
              </h2>
              <Form>
                {insideRegister && (
                  <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, username: e.target.value })
                      }
                    />
                  </FloatingLabel>
                )}
                <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, password: e.target.value })
                    }
                  />
                </FloatingLabel>
                {insideRegister ? (
                  <Button
                    onClick={handleRegister}
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3 bg-danger"
                  >
                    Register
                  </Button>
                ) : (
                  <Button
                    onClick={handleLogin}
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3 bg-danger"
                  >
                    Login
                  </Button>
                )}
              </Form>
              <p className="mt-3 text-center">
                {insideRegister ? (
                  <>
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Sign Up
                    </Link>
                  </>
                )}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Authentication;
