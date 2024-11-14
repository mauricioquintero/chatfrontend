import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { authData } = useContext(AuthContext);
    console.log('ProtectedRoute authData:', authData);

    if (!authData || !authData.username || !authData.password) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
