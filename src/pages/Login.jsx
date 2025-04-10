import { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 font-sans">
            <motion.form
                onSubmit={handleSubmit}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700"
            >
                <h2 className="text-3xl font-extrabold text-center mb-6 text-silver-500">🔐 Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-silver-500"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-silver-500"
                    placeholder="Password"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 rounded bg-gradient-to-r from-silver-500 to-gray-300 text-black font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                    🚀 Login
                </button>
                <div
                    className="mt-6 text-center bg-gray-800 px-6 py-4 rounded-lg border border-gray-700 shadow-inner w-full max-w-sm">
                    <h3 className="text-lg font-semibold mb-2 text-silver-500">🧪 Test Credentials</h3>
                    <p className="text-gray-300">
                        <span className="font-medium text-white">Email:</span> r555sid@gmail.com
                    </p>
                    <p className="text-gray-300">
                        <span className="font-medium text-white">Password:</span> 123123
                    </p>
                    <p className="mt-4 text-center text-sm text-gray-400">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-silver-500 hover:underline font-medium">
                            Register
                        </Link>
                    </p>
                </div>

            </motion.form>
        </div>
    );
}
