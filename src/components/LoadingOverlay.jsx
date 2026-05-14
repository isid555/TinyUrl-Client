import { motion } from 'framer-motion';

export default function LoadingOverlay() {
    return (
        <motion.div
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="spinner" />
            <p style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
            }}>
                Please wait...
            </p>
        </motion.div>
    );
}
