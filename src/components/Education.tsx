import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const educationData = [
    {
        degree: 'Bachelor of Technology (B.Tech)',
        institution: 'Reva University',
        location: 'Bengaluru, India',
        period: '2025 - 2029',
        status: 'Currently Studying here',
        description: 'First year engineering student, deeply interested in software development, data structures, and algorithms. Actively exploring modern web technologies and participating in tech communities.'
    },
    {
        degree: 'Intermediate',
        institution: 'New Horizon PU',
        location: 'Bengaluru, India',
        period: '2023 - 2025',
        status: '',
        description: 'Completed higher secondary education with a strong foundation in Physics, Chemistry, Mathematics and Computer Science.'
    },
    {
        degree: 'Primary And Secondary School',
        institution: 'Sri Chaitanya Techno School',
        location: 'Bengaluru, India',
        period: '2013 - 2023',
        status: 'Started here',
        description: 'Completed primary and secondary education. And got an interest into software development.'
    }
];

export default function Education() {
    const targetRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: false, margin: "-10% 0px" });
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        const calculateScroll = () => {
            if (carouselRef.current) {
                // The total width of the content minus the width of the visible window
                const scrollWidth = carouselRef.current.scrollWidth;
                const viewportWidth = carouselRef.current.parentElement?.offsetWidth || window.innerWidth;

                // Only scroll if content is wider than viewport
                if (scrollWidth > viewportWidth) {
                    setScrollDistance(-(scrollWidth - viewportWidth + 48)); // 48px extra padding buffer
                } else {
                    setScrollDistance(0);
                }
            }
        };

        calculateScroll();
        window.addEventListener('resize', calculateScroll);
        return () => window.removeEventListener('resize', calculateScroll);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, scrollDistance]);

    return (
        <section
            id="education"
            ref={targetRef}
            className="relative h-[300vh] w-full"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden">
                <div className="w-full max-w-[1100px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden h-[90vh] sm:h-[80vh] max-h-[850px] flex flex-col justify-center">

                    {/* Subtle Gradient Backdrops */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FF94]/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

                    <div className="flex flex-col mb-12 relative z-10" ref={headerRef}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00FF94] text-[10px] md:text-xs font-mono tracking-widest uppercase mb-6 w-fit shadow-xl backdrop-blur-md"
                        >
                            <Sparkles size={14} />
                            <span>Academic Journey</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2"
                        >
                            Education
                        </motion.h2>
                    </div>

                    <div className="relative z-10 -mx-8 md:-mx-12 h-fit flex items-center overflow-x-hidden">
                        <motion.div ref={carouselRef} style={{ x }} className="flex gap-6 px-8 md:px-12 w-max">
                            {educationData.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className="w-[80vw] sm:w-[450px] md:w-[500px] shrink-0"
                                >
                                    {/* Main Card */}
                                    <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/5 hover:border-[#00FF94]/30 transition-all duration-500 group relative shadow-lg flex flex-col h-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        <div className="flex items-center gap-2 mb-6">
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-2 w-fit
                                                ${index === 0 ? 'bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                                                {index === 0 ? (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                                                ) : (
                                                    <BookOpen size={12} />
                                                )}
                                                {edu.status || "Completed"}
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#00FF94] transition-colors duration-300">
                                            {edu.degree}
                                        </h3>

                                        <div className="flex flex-col gap-3 text-white/60 mb-6 flex-grow">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap size={16} className="text-[#00FF94]/70 shrink-0" />
                                                <span className="font-semibold text-white/80">{edu.institution}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs font-medium">
                                                <div className="flex items-center gap-1.5 text-white/40">
                                                    <MapPin size={14} className="shrink-0" />
                                                    <span>{edu.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/50 border border-white/5 shrink-0 text-[#00FF94] w-fit">
                                                    <Calendar size={12} />
                                                    {edu.period}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent my-6" />

                                        <p className="text-white/60 leading-relaxed text-sm font-light">
                                            {edu.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
