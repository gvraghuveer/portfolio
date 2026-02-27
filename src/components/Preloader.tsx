import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onLoadingComplete: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Determine the loading time we want
        // Counting from 0 to 100
        const duration = 2000; // 2 seconds total roughly
        const incrementTime = duration / 100;

        const timer = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        onLoadingComplete();
                    }, 500); // Wait half a second at 100% before triggering exit
                    return 100;
                }

                // Randomize the jump amount slightly to feel more "real"
                const jump = Math.floor(Math.random() * 3) + 1;
                return Math.min(prev + jump, 100);
            });
        }, incrementTime);

        // Failsafe or manual override to jump to 100% on actual window load
        const handleLoad = () => {
            setCounter(100);
        };

        if (document.readyState === 'complete') {
            // if already loaded and we just want to show the cool animation
            // we'll let the interval finish anyway for effect.
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearInterval(timer);
            window.removeEventListener('load', handleLoad);
        };
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            <motion.div
                key="preloader"
                initial={{ y: 0 }}
                exit={{ y: '-100%' }} // Slides up and away
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'fixed' }}
                className="inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] text-white overflow-hidden pointer-events-none"
            >
                <div className="absolute inset-0 z-0">
                    {/* Background subtle glow to match theme */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] bg-[#00FF94]/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-[6vw] sm:text-[4vw] md:text-[2vw] font-black tracking-tighter mix-blend-difference opacity-80"
                    >
                        LOADING...
                    </motion.div>

                    <div className="text-[18vw] sm:text-[12vw] md:text-[8vw] font-black tabular-nums tracking-tighter text-[#00FF94] drop-shadow-[0_0_15px_rgba(0,255,148,0.4)] leading-none mt-4 mb-4">
                        {counter}%
                    </div>

                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#00FF94] rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${counter}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>
                </div>

                {/* Bottom edge detail
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono uppercase tracking-widest">
                    Loading Experience
                </div> */}
            </motion.div>
        </AnimatePresence>
    );
}
