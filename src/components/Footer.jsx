import { Github, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            paddingBottom: '24px',
        }}>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Built with <Heart size={13} style={{ color: 'var(--accent)' }} /> by
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}> Siddharth</span>
            </p>
            <a
                href="https://github.com/isid555/TinyUrl-Client"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: '0.8rem' }}
            >
                <Github size={15} />
                GitHub
            </a>
        </footer>
    );
}
