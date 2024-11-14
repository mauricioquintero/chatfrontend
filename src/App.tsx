import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRedirect from './components/LoginRedirect';
import RegisterRedirect from './components/RegisterRedirect';
import ChatRoom from './components/ChatRoom';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/register" element={<RegisterRedirect />} />

          {/* Protected Route */}
          <Route path="/chat" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
};

export default App;
