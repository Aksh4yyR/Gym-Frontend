import React, { useState, useEffect } from 'react';
import { fetchWishlistAPI } from './services/allAPI'; // Import your API function
import './App.css';
import Header from './HeadFoot/Header';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist data when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const reqHeader = { 'Authorization': `Bearer ${token}` };
        
        const response = await fetchWishlistAPI(reqHeader);
        setWishlist(response.data.wishlist);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div>
        <h1>Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} width={50} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Wishlist;
