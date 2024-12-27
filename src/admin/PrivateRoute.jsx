import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  const userRole = sessionStorage.getItem('role');  // or use your JWT role logic here

  // If user is not an admin, redirect to Pnf
  if (userRole !== 'admin' ) {
    return <Navigate to="/pnf" />;
  }

  return element; // If user is an admin, render the element (route component)
};

export default PrivateRoute;
