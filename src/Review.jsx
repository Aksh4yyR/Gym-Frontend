import React, { useState } from 'react';
import { addreview } from './services/allAPI'; // Adjust the path as necessary
import Header from './HeadFoot/Header';
import Footer from './HeadFoot/Footer';

const Review = () => {
  const [username, setUsername] = useState('');
  const [review, setReview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!username || !review) {
      setErrorMessage('Both username and review are required!');
      return;
    }

    const reqBody = { username, review };
    const token = sessionStorage.getItem('token');
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const response = await addreview(reqHeader, reqBody);
      console.log(response);

      if (response) {
        setSuccessMessage('Review submitted successfully!');
        setUsername('');
        setReview('');
      } else {
        setErrorMessage('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: '#f7f7f7',
          padding: '40px',
          maxWidth: '700px',
          margin: '40px auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
          Submit Your Review
        </h2>
        {successMessage && (
          <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
        )}
        <form onSubmit={handleAddReview}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#555',
              }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#555',
              }}
            >
              Your Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review"
              rows={5}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                resize: 'none',
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'block',
              width: '100%',
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Review;
