import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const { setAuthData } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log('Attempting to login with:', username, password);
            await axios.get('/api/messages', {
                auth: { username, password },
            });
            console.log('Login successful');
            setAuthData({ username, password }); // Update authData in context
            navigate('/chat');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid credentials');
        }
    };


    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 w-full"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
