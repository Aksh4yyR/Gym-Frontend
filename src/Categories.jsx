import React, { useState, useEffect } from 'react';
import Header from './HeadFoot/Header';
import Footer from './HeadFoot/Footer';
import { viewProductsUserAPI, addToCartAPI, addToWishlist } from './services/allAPI';
import { Card, Button, Row, Col, Container, Spinner, Alert, Form, Pagination } from 'react-bootstrap';
import './Categories.css';

const Categories = () => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState('');
  const [quantities, setQuantities] = useState({});
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const fetchProducts = async (selectedCategory, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await viewProductsUserAPI(reqHeader, selectedCategory, page, itemsPerPage);

      if (response.status === 200) {
        setProducts(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setCurrentPage(1);
    if (selectedCategory) {
      fetchProducts(selectedCategory, 1);
    } else {
      setProducts([]);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleAddToCart = async (productId) => {
    let quantity = quantities[productId] || 1;

    if (isNaN(quantity) || quantity <= 0) {
      alert('Invalid quantity');
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqBody = { productId, quantity };

      const response = await addToCartAPI(reqHeader, reqBody);
      if (response.status == 200) {
        alert('Added to Cart successfully');
      }
    } catch (error) {
      alert('Add to cart failed');
      setCartMessage('Failed to add product to cart. Please try again.');
      setTimeout(() => setCartMessage(''), 3000);
    }
  };

  const handleAddToWishlist = async (productId) => {
    const quantity = quantities[productId] || 1;
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqBody = { productId, quantity };

      const response = await addToWishlist(reqHeader, reqBody);
      if (response) {
        alert('Added to Wishlist successfully!');
      }
    } catch (error) {
      alert('Add to wishlist failed');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProducts(category, nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      fetchProducts(category, previousPage);
    }
  };

  return (
    <div className="bg-black text-white">
      <Header />
      <Container>
        {!category && (
          <div className="no-category-selected text-center" style={{ height: '40vh' }}>
            <h3>Select a Category to View Products</h3>
            <p>Please select a category to explore our products.</p>
          </div>
        )}

        <Row className="mb-4">
          <Col md={{ span: 4, offset: 4 }}>
            <select className="form-select" value={category} onChange={handleCategoryChange}>
              <option value="">Select a Category</option>
              <option value="Whey Protein">Whey Protein</option>
              <option value="BCAA">BCAA</option>
              <option value="Creatine">Creatine</option>
              <option value="FishOil">Fish Oil</option>
            </select>
          </Col>
        </Row>

        {category && (
          <div className="text-center my-4">
            <h3>Showing products for: <strong>{category}</strong></h3>
          </div>
        )}

        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        {cartMessage && <Alert variant="success">{cartMessage}</Alert>}
        {wishlistMessage && <Alert variant="success">{wishlistMessage}</Alert>}

        {category && (
          <Row>
            {products?.length > 0 ? (
              products.map((product) => (
                <Col md={4} sm={6} xs={12} className="mb-4" key={product?._id}>
                  <Card className="product-card bg-dark text-white">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3000/uploads/${product?.image}`}
                      alt={product?.name}
                      className="product-img"
                    />
                    <Card.Body>
                      <Card.Title className="product-title">{product?.name}</Card.Title>
                      <Card.Text className="product-category">{product?.category}</Card.Text>
                      <Card.Text className="product-price text-success">
                        <strong>Price:</strong> ₹{product?.price}
                      </Card.Text>

                      <Form.Group controlId={`quantity-${product?._id}`} className="mb-3">
  <Form.Label>Quantity</Form.Label>
  <Form.Control
    type="number"
    value={1} // Always set the quantity to 1
    readOnly // Make it non-editable
  />
</Form.Group>


                      <Button
                        variant="dark"
                        className="me-2 add-to-cart-btn"
                        onClick={() => handleAddToCart(product?._id)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="danger"
                        className="add-to-wishlist-btn"
                        onClick={() => handleAddToWishlist(product?._id)}
                      >
                        Add to Wishlist
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col md={12} className="text-center">
                <p>No products available for this category.</p>
              </Col>
            )}
          </Row>
        )}

        {category && totalPages > 1 && (
          <Pagination className="justify-content-center my-4">
            <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
          </Pagination>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Categories;
