import React, { useState, useRef } from "react";
import { addProductAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import Footer from "../HeadFoot/Footer";
import { Navbar, Nav, Container } from 'react-bootstrap';

const Add = () => {
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // for error message
  const [isLoading, setIsLoading] = useState(false); // for disabling submit button
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const handleImageValidation = (file) => {
    const maxSize = 2 * 1024 * 1024;
    if (file) {
      if (file.size > maxSize) {
        setImageFileStatus(false);
        setErrorMessage("Image size should be less than 2MB.");
      } else if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
        setImageFileStatus(true);
        setErrorMessage("");
        setProductDetails({ ...productDetails, image: file });
      } else {
        setImageFileStatus(false);
        setErrorMessage("Please upload a valid image (jpeg, jpg, png).");
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, category, price, description, image } = productDetails;

    if (name && category && price && description && image) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("category", category);
      reqBody.append("price", price);
      reqBody.append("description", description);
      reqBody.append("image", image);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          setIsLoading(true);
          const result = await addProductAPI(reqHeader, reqBody);
          if (result.status === 200) {
            alert("Product added successfully");
            setProductDetails({ name: "", category: "", price: "", description: "", image: "" });
          } else {
            setErrorMessage(result.response.data || "Error adding product");
          }
        } catch (err) {
          setErrorMessage("Error adding product");
          console.error("Error adding product:", err);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <>
      <div>
        {/* Header Section */}
        <Navbar bg="light" expand="lg" className="shadow p-3 mb-4">
      <Container>
        <Navbar.Brand className="fw-bold">ARMSTRONG FITNESS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="btn btn-outline-primary me-2" onClick={() => navigate('/admin-dashboard')}>
              <i className="bi bi-house-door"></i> Dashboard
            </Nav.Link>
            <Nav.Link className="btn btn-outline-secondary me-2" onClick={() => navigate('/products')}>
              <i className="bi bi-box"></i> View Products
            </Nav.Link>
            <Nav.Link className="btn btn-outline-success" onClick={() => navigate('/order-lists')}>
              <i className="bi bi-list"></i> Order Lists
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        {/* Form Section */}
        <div className="container mt-5">
          <h2 className="text-center mb-4 text-uppercase fw-bolder text-danger">ADD PRODUCTS</h2>

          <form onSubmit={handleAddProduct} className="shadow-lg p-4 rounded bg-white">
            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Product Name</label>
              <input
                type="text"
                className="form-control border-0 shadow-sm"
                placeholder="Enter product name"
                value={productDetails.name}
                onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label fw-bolder">Category</label>
              <input
                type="text"
                className="form-control border-0 shadow-sm"
                placeholder="Enter product category"
                value={productDetails.category}
                onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label fw-bolder">Price</label>
              <input
                type="number"
                className="form-control border-0 shadow-sm"
                placeholder="Enter product price"
                value={productDetails.price}
                onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-bolder">Description</label>
              <textarea
                className="form-control border-0 shadow-sm"
                rows="3"
                placeholder="Enter product description"
                value={productDetails.description}
                onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-bolder">Product Image</label>
              <div className="d-flex align-items-center">
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInput}
                  onChange={(e) => handleImageValidation(e.target.files[0])}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary shadow-sm"
                  onClick={() => fileInput.current.click()}
                >
                  Choose File
                </button>
              </div>
              {!imageFileStatus && (
                <small className="text-danger mt-2 d-block">
                  {errorMessage || "Please upload a valid image (jpeg, jpg, png)."}
                </small>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-danger w-100 py-2 mt-3 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </button>
          </form>

          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Add;
