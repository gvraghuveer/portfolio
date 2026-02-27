import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';
import profilePic from '../assets/gvraghs-pro.png';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 w-full mx-auto overflow-hidden"
    >
      <motion.div
        style={{ y: textY, opacity }}
        className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 z-10 w-full max-w-[1200px] mx-auto"
      >
        {/* Text Side */}
        <div className="flex flex-col items-center text-center mix-blend-difference text-white pointer-events-auto">
          <motion.h1
            initial={{ y: 100, opacity: 0, clipPath: 'inset(100% 0 0% 0)' }}
            animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="text-[13vw] sm:text-[10vw] md:text-[5vw] font-black leading-[0.85] tracking-tight sm:tracking-tighter text-hollow-thick"
          >
            G V
          </motion.h1>

          <motion.h1
            initial={{ y: 100, opacity: 0, clipPath: 'inset(100% 0 0% 0)' }}
            animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="text-[13vw] sm:text-[10vw] md:text-[5vw] font-black leading-[0.85] tracking-tight sm:tracking-tighter text-white -mt-[1vw]"
          >
            RAGHUVEER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/80 mt-6 sm:mt-8 mb-8 uppercase tracking-[0.2em] sm:tracking-widest text-xs sm:text-sm"
          >
            ASPIRING SOFTWARE ENGINEER
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-4 w-full sm:w-auto"
          >
            <MagneticButton intensity={0.2}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black font-bold px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base rounded-full transition-all duration-300 hover:bg-[#00FF94] block shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,148,0.4)] w-full sm:w-auto"
              >
                Explore the Archive
              </button>
            </MagneticButton>

            <div className="relative group w-full sm:w-auto">
              {/* <button
                className="bg-white/5 border border-white/10 text-white/40 font-bold px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base rounded-full cursor-not-allowed transition-all duration-300 backdrop-blur-sm block w-full sm:w-auto"
              >
                View Resume
              </button> */}
            </div>
          </motion.div>
        </div>

        {/* Photo Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative shrink-0 mt-8 md:mt-0"
        >
          <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-2 border-white/15 shadow-[0_0_60px_rgba(0,255,148,0.1)]">
            <img
              src={profilePic}
              alt="G V Raghuveer"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute inset-[-12px] rounded-full border border-white/10 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#00FF94]"
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Scroll</span>
      </motion.div>
    </section>
  );
}
