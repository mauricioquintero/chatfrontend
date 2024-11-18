import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('/api/users/register', { username, password });
            setMessage('Registration successful!');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-draculabackground px-4">
            <div className="bg-draculacurrentline shadow-md rounded-lg p-8 w-full max-w-md sm:w-96">
                <h2 className="text-xl font-semibold mb-4 text-draculaforeground text-center sm:text-left">Register</h2>
                {message && <p>{message}</p>}
                <label className="block text-draculaforeground text-sm sm:text-base">Username</label>
                <input
                    className="bg-draculaforeground border border-gray-300 rounded-md p-2 w-full mb-4"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <label className="block text-draculaforeground text-sm sm:text-base">Password</label>
                <input
                    className="bg-draculaforeground border border-gray-300 rounded-md p-2 w-full mb-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="hover:opacity-90 bg-draculagreen text-white p-2 w-full rounded-md font-semibold sm:text-base text-sm"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <div className="text-center mt-4">
                    <button
                        onClick={handleLoginRedirect}
                        className="hover:opacity-90 text-draculaforeground underline text-sm sm:text-base"
                    >
                        Already registered? Sign in here
                    </button>
                </div>
            </div>
        </div>


    );
};

export default Register;
