import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {backend_URL} from "../../constant.js";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [urls, setUrls] = useState([]);

    const fetchUrls = async () => {
        const res = await axios.get(`${backend_URL}api/url/history`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUrls(res.data);
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleShorten = async (e) => {
        e.preventDefault();
        await axios.post(`${backend_URL}api/url/shorten`, { originalUrl, customAlias }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOriginalUrl('');
        setCustomAlias('');
        fetchUrls();
    };

    const handleCopy = async (text) => {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const chartData = {
        labels: urls.map((url) => url.shortId),
        datasets: [
            {
                label: 'Clicks',
                data: urls.map((url) => url.clicks),
                backgroundColor: '#C0C0C0', // silver
            },
        ],
    };

    return (
        <div className="min-h-screen px-6 md:px-16 py-10 bg-black text-white font-sans">
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-extrabold text-center mb-10 text-silver-500"
            >
                ✨ Your Monochrome URL Dashboard ✨
            </motion.h1>

            <motion.form
                onSubmit={handleShorten}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12"
            >
                <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Paste your long URL here..."
                    className="w-full md:w-1/2 px-4 py-2 rounded bg-black border border-silver-500 text-white placeholder-silver-500 focus:outline-none focus:ring-2 focus:ring-silver-500"
                    required
                />
                <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    placeholder="Custom alias"
                    className="w-full md:w-1/4 px-4 py-2 rounded bg-black border border-silver-500 text-white placeholder-silver-500 focus:outline-none focus:ring-2 focus:ring-silver-500"
                    required
                />
                <button
                    type="submit"
                    className="px-6 py-2 rounded bg-gray-300 text-black font-semibold hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
                >
                    🚀 Shorten
                </button>
            </motion.form>

            <motion.div
                className="bg-black border border-silver-500 rounded-xl p-6 mb-10 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
            >
                <h2 className="text-2xl font-semibold mb-6 text-silver-500">🔗 Your Shortened URLs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {urls.map((url) => (
                        <div key={url._id} className="p-4 border border-silver-500 rounded-xl bg-black">
                            <p><strong className="text-silver-500">Original:</strong> <a className="underline hover:text-white" href={url.originalUrl}>{url.originalUrl}</a></p>
                            <p><strong className="text-silver-500">Short:</strong> <a className="underline hover:text-white" href={`${backend_URL}u/${url.shortId}`} target="_blank" rel="noopener noreferrer">{backend_URL}u/{url.shortId}</a></p>
                            <button
                                onClick={() => handleCopy(`${backend_URL}u/${url.shortId}`)}
                                className="mt-2 text-sm text-silver-500 hover:text-white underline"
                            >
                                📋 Copy to Clipboard
                            </button>
                            <div className="mt-4">
                                <QRCodeCanvas value={`${backend_URL}u/${url.shortId}`} size={100} fgColor="#C0C0C0" bgColor="#000000" />
                            </div>
                            <p className="mt-2 text-sm text-silver-500"><strong>🔁 Clicks:</strong> {url.clicks}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="bg-black border border-silver-500 rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            >
                <h2 className="text-2xl font-semibold mb-4 text-silver-500">📊 Analytics Overview</h2>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#C0C0C0'
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: { color: '#C0C0C0' },
                                grid: { color: '#333' }
                            },
                            y: {
                                ticks: { color: '#C0C0C0' },
                                grid: { color: '#333' }
                            }
                        }
                    }}
                />
            </motion.div>

            <p className="mt-10 text-center text-sm text-silver-500 italic">
                "Every click tells a story. Understand how your links perform and grow your digital presence."
            </p>
            <Footer/>
        </div>
    );
}
