import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import chatAppImg from '../assets/projects/chat-app.jpg';
import expenseTrackerImg from '../assets/projects/expense-tracker.jpg';
import fsdcManagerImg from '../assets/projects/fsdc-manager.jpg';
import fsdcImg from '../assets/projects/fsdc.jpg';

const projects = [
  {
    title: 'Real-time Chat App',
    description: 'A real-time messaging application built with the MERN stack and Socket.IO. It features user authentication via JWT, instant messaging capabilities, secure backend APIs, and a responsive React-based UI. The app stores user data and messages in MongoDB and uses Cloudinary for media handling. Designed as a learning project, it demonstrates full-stack development fundamentals with clean, functional chat room capabilities.',
    image: chatAppImg,
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    github: 'https://github.com/gvraghuveer/chat-app',
    // demo: '#',
  },
  {
    title: 'Expense Tracker',
    description: 'A full-stack web application for managing personal finances by tracking income and expenses. Built with React (Vite) on the frontend and Node.js/Express on the backend, it uses MongoDB for data persistence and JWT for authentication. The app features transaction management (add, edit, delete), filtering and categorization, income/expense totals, and a responsive UI. With a clean, modular backend structure and environment variable configuration, this project demonstrates practical full-stack development skills with improvements over its tutorial foundation.',
    image: expenseTrackerImg,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/gvraghuveer/expense-tracker',
    demo: 'https://expense-tracker-static.onrender.com/'
  },
  {
    title: 'FSDC Manager',
    description: 'A task management web application built for the Full Stack Development Club. Developed with Next.js 16 and TypeScript, it features modern tooling including Tailwind CSS for styling, shadcn/ui components, and Resend for email functionality. The application provides task organization capabilities with a clean, type-safe architecture using custom hooks, stores, and utilities. Deployed on Vercel, it demonstrates contemporary full-stack development practices with Next.js App Router, middleware implementation, and email integration for club activity management.',
    image: fsdcManagerImg,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Resend'],
    github: 'https://github.com/gvraghuveer/fsdc-manager',
    demo: 'https://fsdc-manager.vercel.app/'
  },
  {
    title: 'Full Stack Development Club',
    description: `The official web presence for the Full Stack Development Club. Forked from the original club repository, this frontend-focused project is built primarily with JavaScript (97.2%), CSS, and HTML. The website serves as the club's digital hub, providing information about the organization, its activities, and resources for members. As a collaborative effort within the club, it demonstrates practical web development skills and serves the community's online presence needs.`,
    image: fsdcImg,
    tags: ['JavaScript', 'TailwindCSS', 'React'],
    github: 'https://github.com/gvraghuveer/fsdc-official-website',
    // demo: '#'
  }
];

export default function Projects() {
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
      if (nextIndex < 0) nextIndex = projects.length - 1;
      if (nextIndex >= projects.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentProject = projects[currentIndex];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 w-full max-w-[1100px] mx-auto overflow-hidden"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 md:p-12 relative">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mix-blend-difference"
          >
            Projects
          </motion.h2>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="p-3 bg-white/5 hover:bg-[#00FF94] text-white hover:text-black border border-white/10 hover:border-[#00FF94] rounded-full transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="p-3 bg-white/5 hover:bg-[#00FF94] text-white hover:text-black border border-white/10 hover:border-[#00FF94] rounded-full transition-all duration-300"
              aria-label="Next project"
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
                x: { type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
                filter: { duration: 0.3 }
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
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
            >
              {/* Image Side */}
              <div className="relative w-full aspect-video sm:h-80 md:h-auto md:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 group shadow-2xl">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  draggable="false"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#00FF94] hover:text-black transition-all duration-300 pointer-events-auto"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#00FF94] hover:text-black transition-all duration-300 pointer-events-auto"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Info Side */}
              <div className="flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[#00FF94] font-mono text-xs font-bold tracking-widest uppercase">
                    Project {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <div className="h-[1px] w-12 bg-white/20"></div>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                  {currentProject.title}
                </h3>

                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 md:mb-8">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  {currentProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 
                                 text-[10px] md:text-[11px] lg:text-xs font-mono font-medium text-white/60 tracking-wider
                                 hover:text-[#00FF94] hover:bg-white/10 hover:border-[#00FF94]/30 transition-all duration-300"
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
        <div className="mt-8 flex md:hidden items-center justify-between">
          <button
            onClick={() => paginate(-1)}
            className="p-3 bg-white/5 active:bg-[#00FF94] text-white active:text-black border border-white/10 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#00FF94] w-6' : 'bg-white/20'}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="p-3 bg-white/5 active:bg-[#00FF94] text-white active:text-black border border-white/10 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Desktop Indicators */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 hover:bg-[#00FF94]/50 ${i === currentIndex ? 'bg-[#00FF94] w-8' : 'bg-white/20 w-3'}`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
