import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-[#00FF94] text-black rounded-full 
                     shadow-[0_4px_20px_rgba(0,255,148,0.3)] hover:bg-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] 
                     transition-colors duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} strokeWidth={2.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
