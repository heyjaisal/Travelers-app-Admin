import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode to decode tokens

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Fetch the token from localStorage

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token

    // Check if the token contains the role 'superadmin'
    if (decodedToken.role !== 'superadmin') {
      return <Navigate to="/" />; // Redirect if not a superadmin
    }

    // Token is valid, and user is a superadmin
    return children;
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/" />; // Redirect to login on error
  }
};

export default PrivateRoute;