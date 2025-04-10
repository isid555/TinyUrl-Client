import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/auth/register', { email, password });
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4 font-semibold">Register</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 p-2 border" placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border" placeholder="Password" required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Register</button>
            </form>
        </div>
    );
}