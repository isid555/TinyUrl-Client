import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { backend_URL } from "../../constant.js";
import LoadingOverlay from '../components/LoadingOverlay.jsx';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.post(`${backend_URL}api/auth/register`, { email, password });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Registration failed. Try a different email or try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 font-sans">
            {isLoading && <LoadingOverlay />}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700"
            >
                <h2 className="text-3xl font-extrabold text-center mb-6 text-silver-500">📝 Register</h2>
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
                    className="w-full px-4 py-2 rounded bg-gradient-to-r from-green-400 to-lime-300 text-black font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                    ✅ Register
                </button>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/" className="text-silver-500 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </motion.form>
        </div>
    );
}
