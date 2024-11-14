import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('/api/users/register', { username, password });
            setMessage('Registration successful!');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl mb-4">Register</h2>
            {message && <p>{message}</p>}
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
                onClick={handleRegister}
            >
                Register
            </button>
        </div>
    );
};

export default Register;
