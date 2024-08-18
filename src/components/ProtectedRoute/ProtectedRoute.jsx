import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); 

    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn()) {
        return <Navigate to="/LogIn" replace />;
    }

    // If the user is logged in, render the requested component
    return children;
};

export default ProtectedRoute;