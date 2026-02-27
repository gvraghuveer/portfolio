import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.name.toLowerCase());
      // Get all sections and their positions
      const sectionPositions = sections.map(section => {
        const el = document.getElementById(section);
        if (el) {
          return {
            id: section,
            top: el.getBoundingClientRect().top
          };
        }
        return { id: section, top: Infinity };
      });

      // Find the active section based on which one is currently intersecting the top half of the screen
      const viewportMiddle = window.innerHeight / 2;

      // Filter sections that have scrolled past the middle (or are close to it)
      const visibleSections = sectionPositions.filter(pos => pos.top <= viewportMiddle + 100);

      if (visibleSections.length > 0) {
        // The last section that crossed the threshold is the active one
        // If we are at the bottom of the page, forcefully select the last visible section
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
        const current = isAtBottom
          ? sectionPositions[sectionPositions.length - 1].id
          : visibleSections[visibleSections.length - 1].id;

        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-[90] items-center gap-1 px-2 py-2 
                   bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.name.toLowerCase();
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] rounded-xl transition-colors duration-300 ${isActive ? 'text-[#00FF94]' : 'text-white/40 hover:text-white'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active"
                  className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {link.name}
            </a>
          );
        })}
      </motion.nav>

      {/* Mobile Menu Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-[100] p-3 rounded-full bg-black/90 backdrop-blur-md border border-white/10 text-white shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:bg-white/10 transition-colors"
        aria-label="Toggle Navigation Menu"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isMobileMenuOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[95] bg-black/95 flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.name.toLowerCase();
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.1 }}
                    className={`relative text-2xl font-black uppercase tracking-[0.2em] transition-colors duration-300 w-full text-center py-4 border-b border-white/5 ${isActive ? 'text-[#00FF94]' : 'text-white/50 hover:text-white'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobile-active-indicator"
                        className="absolute left-[20%] right-[20%] bottom-0 h-0.5 bg-[#00FF94]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
