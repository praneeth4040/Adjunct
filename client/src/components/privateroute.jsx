import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check for the JWT token

  // If the token is not present, redirect to the login page
  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
