import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { backend_URL } from "../../constant.js";
import LoadingOverlay from "../components/LoadingOverlay.jsx";
import { LogIn, Mail, Lock, Zap, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await axios.post(`${backend_URL}api/auth/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Login failed. Please check your credentials.');
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
                        Welcome back
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
                        Sign in to manage your links
                    </p>
                </motion.div>

                {/* Login Card */}
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
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        <LogIn size={18} />
                        Sign In
                    </button>

                    {/* Register Link */}
                    <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '24px' }}>
                        Don't have an account?{' '}
                        <Link to="/register" className="link-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Create one <ArrowRight size={14} />
                        </Link>
                    </p>
                </motion.form>

                {/* Test Credentials */}
                <motion.div
                    className="glass-card"
                    style={{ marginTop: '16px', padding: '20px 24px' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span className="badge">DEMO</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Test Credentials</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Email</span>
                            <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.8rem' }}>r555sid@gmail.com</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Password</span>
                            <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.8rem' }}>123123</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
