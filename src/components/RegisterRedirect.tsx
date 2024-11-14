import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Register from './Register';
import { AuthContext } from '../context/AuthContext';

const RegisterRedirect: React.FC = () => {
    const { authData } = useContext(AuthContext);

    if (authData && authData.username && authData.password) {
        // Redirect to chat room if already authenticated
        return <Navigate to="/chat" replace />;
    }

    // Render the Register component if not authenticated
    return <Register />;
};

export default RegisterRedirect;
