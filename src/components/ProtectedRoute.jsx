import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

/**
 * ProtectedRoute Component
 * 
 * Protects routes that require authentication.
 * - Checks Redux auth state for token/user
 * - If not logged in → redirects to /login
 * - If logged in → renders children
 * 
 * @param {React.ReactNode} children - Child components to render if authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  // Show loader while checking auth status
  if (loading) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
};

export default ProtectedRoute;

