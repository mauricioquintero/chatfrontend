import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

const LoginRedirect: React.FC = () => {
    const { authData } = useContext(AuthContext);

    if (authData && authData.username && authData.password) {
        // Redirect to chat room if already authenticated
        return <Navigate to="/chat" replace />;
    }

    // Render the Login component if not authenticated
    return <Login />;
};

export default LoginRedirect;
