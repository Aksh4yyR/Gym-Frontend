import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner, Alert, Navbar, Nav, Container } from 'react-bootstrap';
import { viewProductsAPI, editProductAPT, deleteProductAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import Footer from '../HeadFoot/Footer';

const ProductsAdded = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await viewProductsAPI({
        Authorization: `Bearer ${token}`,
      });

      if (response?.data?.data) {
        setProducts(response.data.data);
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct(product);
    setNewImage(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
    setUpdatedProduct({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append('name', updatedProduct.name);
      formData.append('category', updatedProduct.category);
      formData.append('price', updatedProduct.price);
      formData.append('description', updatedProduct.description);

      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await editProductAPT(currentProduct._id, headers, formData);

      if (response?.status === 200) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === currentProduct._id ? { ...product, ...updatedProduct } : product
          )
        );
        alert('Product updated successfully');
        handleModalClose();
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert('An error occurred while updating the product.');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await deleteProductAPI(productId, headers);

        if (response?.status === 200) {
          alert('Product deleted successfully');
          fetchProducts(); // Refresh product list
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('An error occurred while deleting the product.');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
        <Container>
          <Navbar.Brand href="#home" style={{ fontWeight: 'bold' }}>
            ARMSTRONG FITNESS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Button
                className="me-2"
                variant="outline-secondary"
                onClick={() => navigate('/admin-dashboard')}
              >
                Go to Dashboard
              </Button>
              <Button variant="primary" onClick={() => navigate('/add')}>
                Add Product
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>
          Products List
        </h1>

        {products.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      {product.image ? (
                        <img
                          src={`https://gymshop-server-1.onrender.com/uploads/${product.image}`}
                          alt={product.name}
                          style={{ width: '100px', objectFit: 'cover' }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <p>No products available</p>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={updatedProduct.name || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={updatedProduct.category || ''}
                  onChange={handleInputChange}
                >
                  <option>Whey Protein</option>
                  <option>BCAA</option>
                  <option>Creatine</option>
                  <option>Fish Oil</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={updatedProduct.price || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={updatedProduct.description || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Footer />
    </>
  );
};

export default ProductsAdded;
