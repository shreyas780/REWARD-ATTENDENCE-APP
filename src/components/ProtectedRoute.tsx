import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = getLoggedInUser();

  // If no logged-in user, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the children component (dashboard)
  return children;
};

export default ProtectedRoute;
