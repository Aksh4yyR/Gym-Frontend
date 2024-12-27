import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Ordersuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <h1 className="success-title">🎉 Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase! Your order is being processed and will be delivered soon.
        </p>
        <button className="home-btn" onClick={() => navigate('/Categories')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Ordersuccess;
