import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [urls, setUrls] = useState([]);

    const fetchUrls = async () => {
        const res = await axios.get('http://localhost:5000/api/url/history', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUrls(res.data);
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleShorten = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/url/shorten', { originalUrl, customAlias }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOriginalUrl('');
        setCustomAlias('');
        fetchUrls();
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-2 mb-6">
                <input type="url" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} placeholder="Enter long URL" className="flex-1 p-2 border" required />
                <input type="text" value={customAlias} onChange={(e) => setCustomAlias(e.target.value)} placeholder="Custom alias" className="w-40 p-2 border" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Shorten</button>
            </form>
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Your URLs</h2>
                {urls.map((url) => (
                    <div key={url._id} className="mb-2">
                        <p><strong>Original:</strong> <a className="text-blue-500"
                                                         href={url.originalUrl}>{url.originalUrl}</a></p>
                        <p><strong>Short:</strong> <a className="text-green-600"
                                                      href={`http://localhost:5000/u/${url.shortId}`} target="_blank"
                                                      rel="noopener noreferrer">http://localhost:5000/u/{url.shortId}</a>
                        </p>

                        <p><strong>Clicks:</strong> {url.clicks}</p>
                        <p><strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}
