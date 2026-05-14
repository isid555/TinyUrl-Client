import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { backend_URL } from "../../constant.js";
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { UserPlus, Mail, Lock, Zap, ArrowLeft } from 'lucide-react';

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
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            {isLoading && <LoadingOverlay />}

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                {/* Brand Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                        style={{ background: 'var(--accent-gradient)', boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)' }}>
                        <Zap size={28} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        Create your account
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
                        Start shortening URLs in seconds
                    </p>
                </motion.div>

                {/* Register Card */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="glass-card"
                    style={{ padding: '32px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {/* Email */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                style={{ paddingLeft: '44px' }}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                style={{ paddingLeft: '44px' }}
                                placeholder="Min. 6 characters"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        <UserPlus size={18} />
                        Create Account
                    </button>

                    {/* Login Link */}
                    <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '24px' }}>
                        Already have an account?{' '}
                        <Link to="/" className="link-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowLeft size={14} /> Sign in
                        </Link>
                    </p>
                </motion.form>
            </motion.div>
        </div>
    );
}
