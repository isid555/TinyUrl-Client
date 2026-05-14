import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { backend_URL } from "../../constant.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Footer from "../components/Footer.jsx";
import {
    Link2, Scissors, Copy, ExternalLink, BarChart3,
    MousePointerClick, QrCode, LogOut, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [urls, setUrls] = useState([]);
    const [copiedId, setCopiedId] = useState(null);
    const navigate = useNavigate();

    const fetchUrls = async () => {
        try {
            const res = await axios.get(`${backend_URL}api/url/history`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUrls(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch URLs");
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleShorten = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${backend_URL}api/url/shorten`, { originalUrl, customAlias }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setOriginalUrl('');
            setCustomAlias('');
            fetchUrls();
            toast.success("URL shortened successfully!");
        } catch (error) {
            console.error(error);
            const msg = error?.response?.data?.msg || "Something went wrong!";
            toast.error(msg);
        }
    };

    const handleCopy = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);

    const chartData = {
        labels: urls.map((url) => url.shortId),
        datasets: [
            {
                label: 'Clicks',
                data: urls.map((url) => url.clicks),
                backgroundColor: 'rgba(139, 92, 246, 0.6)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#18181b',
                titleColor: '#fafafa',
                bodyColor: '#a1a1aa',
                borderColor: 'rgba(63, 63, 70, 0.5)',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                titleFont: { family: 'Inter', weight: '600' },
                bodyFont: { family: 'Inter' },
            },
        },
        scales: {
            x: {
                ticks: { color: '#71717a', font: { family: 'Inter', size: 11 } },
                grid: { color: 'rgba(63, 63, 70, 0.2)', drawBorder: false },
                border: { display: false },
            },
            y: {
                ticks: { color: '#71717a', font: { family: 'Inter', size: 11 }, stepSize: 1 },
                grid: { color: 'rgba(63, 63, 70, 0.2)', drawBorder: false },
                border: { display: false },
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="relative z-10 min-h-screen" style={{ padding: '0' }}>
            {/* Top Navigation */}
            <nav style={{
                position: 'sticky', top: 0, zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 24px',
                background: 'rgba(9, 9, 11, 0.8)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border-subtle)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'var(--accent-gradient)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Scissors size={18} color="white" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>TinyURL</span>
                </div>
                <button onClick={handleLogout} className="btn-ghost">
                    <LogOut size={16} />
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 20px' }}>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}
                >
                    <div className="glass-card" style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <Link2 size={16} style={{ color: 'var(--accent-light)' }} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Links</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{urls.length}</span>
                    </div>
                    <div className="glass-card" style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <MousePointerClick size={16} style={{ color: 'var(--accent-light)' }} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Clicks</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{totalClicks}</span>
                    </div>
                    <div className="glass-card" style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <BarChart3 size={16} style={{ color: 'var(--accent-light)' }} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Avg. Clicks</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {urls.length ? (totalClicks / urls.length).toFixed(1) : '0'}
                        </span>
                    </div>
                </motion.div>

                {/* Shorten Form */}
                <motion.form
                    onSubmit={handleShorten}
                    className="glass-card"
                    style={{ padding: '24px', marginBottom: '32px' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                >
                    <h2 className="section-title" style={{ marginBottom: '20px' }}>
                        <Plus size={18} style={{ color: 'var(--accent-light)' }} />
                        Shorten a URL
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
                        <div style={{ flex: '2 1 280px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Destination URL
                            </label>
                            <input
                                type="url"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                placeholder="https://example.com/very-long-url..."
                                className="input-field"
                                required
                            />
                        </div>
                        <div style={{ flex: '1 1 160px' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Custom Alias
                            </label>
                            <input
                                type="text"
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value.replace(/\s+/g, '_'))}
                                placeholder="my-link"
                                className="input-field"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ flex: '0 0 auto', height: '48px' }}>
                            <Scissors size={16} />
                            Shorten
                        </button>
                    </div>
                </motion.form>

                {/* URL Cards */}
                <motion.div
                    className="glass-card"
                    style={{ padding: '24px', marginBottom: '32px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h2 className="section-title">Your Links</h2>

                    {urls.length === 0 ? (
                        <div style={{
                            textAlign: 'center', padding: '48px 20px',
                            color: 'var(--text-muted)', fontSize: '0.9rem'
                        }}>
                            <Link2 size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                            <p>No links yet. Create your first short URL above!</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}
                        >
                            <AnimatePresence>
                                {urls.map((url) => (
                                    <motion.div
                                        key={url._id}
                                        variants={itemVariants}
                                        layout
                                        style={{
                                            background: 'rgba(24, 24, 27, 0.4)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: '20px',
                                            transition: 'border-color 0.25s ease',
                                        }}
                                        whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
                                    >
                                        {/* Original URL */}
                                        <div style={{ marginBottom: '12px' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Original</span>
                                            <p style={{
                                                fontSize: '0.85rem', color: 'var(--text-secondary)',
                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                marginTop: '4px'
                                            }}>
                                                {url.originalUrl}
                                            </p>
                                        </div>

                                        {/* Short URL */}
                                        <div style={{ marginBottom: '16px' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Short Link</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                                <a
                                                    href={`${backend_URL}u/${url.shortId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link-accent"
                                                    style={{ fontSize: '0.9rem', fontWeight: 600 }}
                                                >
                                                    {url.shortId}
                                                </a>
                                                <ExternalLink size={12} style={{ color: 'var(--accent-light)', opacity: 0.6 }} />
                                            </div>
                                        </div>

                                        {/* Actions Row */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <button
                                                onClick={() => handleCopy(`${backend_URL}u/${url.shortId}`, url._id)}
                                                className="btn-ghost"
                                                style={{ fontSize: '0.78rem' }}
                                            >
                                                <Copy size={13} />
                                                {copiedId === url._id ? 'Copied!' : 'Copy'}
                                            </button>
                                            <span className="badge">
                                                <MousePointerClick size={11} />
                                                {url.clicks} click{url.clicks !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        {/* QR Code */}
                                        <div style={{
                                            background: 'white',
                                            borderRadius: '10px',
                                            padding: '12px',
                                            width: 'fit-content',
                                        }}>
                                            <QRCodeCanvas
                                                value={`${backend_URL}u/${url.shortId}`}
                                                size={100}
                                                fgColor="#09090b"
                                                bgColor="#ffffff"
                                                level="H"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.div>

                {/* Analytics Chart */}
                {urls.length > 0 && (
                    <motion.div
                        className="glass-card"
                        style={{ padding: '24px', marginBottom: '32px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.6 }}
                    >
                        <h2 className="section-title">
                            <BarChart3 size={18} style={{ color: 'var(--accent-light)' }} />
                            Analytics
                        </h2>
                        <div style={{ height: '280px' }}>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </motion.div>
                )}

                <Footer />
            </div>
        </div>
    );
}
