import { motion } from 'framer-motion';

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="h-12 w-12 border-4 border-t-transparent border-silver-500 rounded-full"
            />
            Please wait !
        </div>
    );
}
