import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import { fetchWishlistAPI } from './services/allAPI'; // Assuming removeFromWishlistAPI is your API service to remove items

const AddtoWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  console.log(wishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          window.location.href = '/login'; // Redirect to login if no token
          return;
        }

        const reqHeader = { Authorization: `Bearer ${token}` };
        const response = await fetchWishlistAPI(reqHeader);

        if (response.status === 200) {
          setWishlist(response.wishlist);
        } else {
          setError('Failed to load wishlist');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       const token = sessionStorage.getItem('token');
//       if (!token) {
//         window.location.href = '/login'; // Redirect to login if no token
//         return;
//       }

//       const reqHeader = { Authorization: `Bearer ${token}` };
//       const response = await removeFromWishlistAPI(reqHeader, { productId });

//       if (response.status === 200) {
//         setWishlist((prevWishlist) =>
//           prevWishlist.filter((product) => product._id !== productId)
//         );
//         setSuccessMessage('Product removed from wishlist');
//       } else {
//         setError('Failed to remove product from wishlist');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

  return (
    <div className="view-wishlist-container">
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : successMessage ? (
        <Alert variant="success">{successMessage}</Alert>
      ) : (
        <>
          <h3>Your Wishlist</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.length === 0 ? (
                <tr>
                  <td colSpan="4">Your wishlist is empty.</td>
                </tr>
              ) : (
                wishlist.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromWishlist(product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default AddtoWishlist;
