import React from 'react';
import { Navigate } from 'react-router-dom';

// this is how i will protect routes from unauthorized access
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
