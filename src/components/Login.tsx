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
            setAuthData({ username, password });
            navigate('/chat');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid credentials');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-draculabackground px-4">
            <div className="bg-draculacurrentline shadow-md rounded-lg p-8 w-full max-w-md sm:w-96">
                <h2 className="text-xl font-semibold mb-4 text-draculaforeground text-center sm:text-left">Sign In</h2>
                {error && <p className="text-draculared mb-2 text-center sm:text-left">{error}</p>}

                <label className="block text-draculaforeground text-sm sm:text-base">Username</label>
                <input
                    className="bg-draculaforeground border border-gray-300 rounded-md p-2 w-full mb-4"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className="block text-draculaforeground text-sm sm:text-base">Password</label>
                <input
                    className="bg-draculaforeground border border-gray-300 rounded-md p-2 w-full mb-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="hover:opacity-90 bg-draculagreen text-white p-2 w-full rounded-md font-semibold sm:text-base text-sm"
                    onClick={handleLogin}
                >
                    Sign In
                </button>

                <div className="text-center mt-4">
                    <button
                        onClick={handleRegisterRedirect}
                        className="hover:opacity-90 text-draculaforeground underline text-sm sm:text-base"
                    >
                        Don't have an account? Register here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
