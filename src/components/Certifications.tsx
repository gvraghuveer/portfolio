import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const certificationsData = [
    {
        title: 'Python 101 for Data Science',
        description: 'Achieved IBM Skills Network foundational certification in Python for Data Science. This course established core Python programming skills specifically for data science applications, covering Python basics, data structures, libraries (NumPy, Pandas), and fundamental programming concepts. Built a strong foundation for applying Python to real-world data science problems and analytics workflows.',
        image: '/src/assets/certificates/PDS.jpg',
        tags: ['Data Science', 'Python', 'Pandas'],
        issuer: 'IBM',
        date: '23/11/2025',
        link: 'https://courses.skillsbuild.skillsnetwork.site/certificates/f0c0d6ab37154774ac4827d2e4baca36'
    },
    {
        title: 'Data Analysis With Python',
        description: 'Completed IBM Skills Network certification in Data Analysis Using Python. This intermediate-level course covered essential data analysis techniques including data manipulation with Pandas, exploratory data analysis, data wrangling, and statistical analysis. Demonstrated proficiency in using Python libraries to extract insights from datasets, perform data cleaning, and create meaningful visualizations for data-driven decision making.',
        image: '/src/assets/certificates/DAP.jpg',
        tags: ['Data Analysis', 'Python', 'Jupyter'],
        issuer: 'IBM',
        date: '23/11/2025',
        link: 'https://courses.skillsbuild.skillsnetwork.site/certificates/3bcc8b60a1964cda81a1cf4ce1de52c1'
    },
    {
        title: 'Data Visualization With Python',
        description: 'Earned IBM Skills Network certification in Data Visualization Using Python. This intermediate-level course focused on creating impactful visual representations of data using Python libraries such as Matplotlib, Seaborn, and Folium. Developed skills in building various chart types, interactive dashboards, and geospatial visualizations to effectively communicate complex data insights and patterns.',
        image: '/src/assets/certificates/DVP.jpg',
        tags: ['Data Visualization', 'Matplotlib', 'Seaborn'],
        issuer: 'IBM',
        date: '27/11/2025',
        link: 'https://courses.skillsbuild.skillsnetwork.site/certificates/ba0cc05a02ac4a9f8826532139badabe'
    }
];

export default function Certifications() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 30 : -30,
            opacity: 0,
            scale: 0.98,
            filter: "blur(4px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 30 : -30,
            opacity: 0,
            scale: 0.98,
            filter: "blur(4px)"
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = certificationsData.length - 1;
            if (nextIndex >= certificationsData.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const currentCert = certificationsData[currentIndex];

    return (
        <section
            id="certifications"
            ref={ref}
            className="relative py-24 md:py-32 px-6 md:px-12 w-full max-w-[1100px] mx-auto overflow-hidden"
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 md:p-12 relative">
                {/* Subtle Background Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none opacity-40" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00FF94]/10 rounded-full blur-[120px] pointer-events-none opacity-40" />

                <div className="flex items-center justify-between mb-8 md:mb-12 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-white mix-blend-difference"
                    >
                        Certifications
                    </motion.h2>

                    {/* Desktop Navigation Arrows */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => paginate(-1)}
                            className="p-3 bg-white/5 hover:bg-[#00A3FF] text-white hover:text-black border border-white/10 hover:border-[#00A3FF] rounded-full transition-all duration-300 z-10"
                            aria-label="Previous certification"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="p-3 bg-white/5 hover:bg-[#00A3FF] text-white hover:text-black border border-white/10 hover:border-[#00A3FF] rounded-full transition-all duration-300 z-10"
                            aria-label="Next certification"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative w-full min-h-[450px]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                                filter: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10"
                        >
                            {/* Image Side */}
                            <div className="relative w-full aspect-video sm:h-80 md:h-auto md:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 group shadow-2xl border border-white/10">
                                <img
                                    src={currentCert.image}
                                    alt={currentCert.title}
                                    draggable="false"
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                // Fallback for missing images currently
                                // onError={(e) => {
                                //     const target = e.target as HTMLImageElement;
                                //     target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop';
                                // }}
                                />

                                {/* Hover overlay with links */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {currentCert.link !== '#' && (
                                        <a
                                            href={currentCert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#00A3FF] hover:text-black transition-all duration-300 pointer-events-auto flex items-center gap-2 px-6"
                                            aria-label="View Credential"
                                        >
                                            <Award size={20} />
                                            <span className="font-bold text-sm">View Credential</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Info Side */}
                            <div className="flex flex-col justify-center">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="text-[#00A3FF] font-mono text-xs font-bold tracking-widest uppercase">
                                        Badge {String(currentIndex + 1).padStart(2, '0')}
                                    </span>
                                    <div className="h-[1px] w-12 bg-white/20"></div>
                                </div>

                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-[#00A3FF] transition-colors">
                                    {currentCert.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-white/80 font-medium text-sm">{currentCert.issuer}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/30" />
                                    <span className="text-white/40 text-sm">{currentCert.date}</span>
                                </div>

                                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 md:mb-8">
                                    {currentCert.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                    {currentCert.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 
                                 text-[10px] md:text-[11px] lg:text-xs font-mono font-medium text-white/60 tracking-wider
                                 hover:text-[#00A3FF] hover:bg-white/10 hover:border-[#00A3FF]/30 transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile Navigation Arrows & Indicators */}
                <div className="mt-8 flex md:hidden items-center justify-between relative z-10">
                    <button
                        onClick={() => paginate(-1)}
                        className="p-3 bg-white/5 active:bg-[#00A3FF] text-white active:text-black border border-white/10 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-2">
                        {certificationsData.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#00A3FF] w-6' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="p-3 bg-white/5 active:bg-[#00A3FF] text-white active:text-black border border-white/10 rounded-full transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Desktop Indicators */}
                <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-10">
                    {certificationsData.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 hover:bg-[#00A3FF]/50 ${i === currentIndex ? 'bg-[#00A3FF] w-8' : 'bg-white/20 w-3'}`}
                            aria-label={`Go to certification ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
