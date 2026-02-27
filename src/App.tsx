import { useState } from 'react';
import Navigation from './components/Navigation';
import WebGLCanvas from './components/WebGLCanvas';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SmoothScroll>
              <div className="w-full relative bg-transparent selection:bg-[var(--accent-primary)] selection:text-[var(--color-dark-bg-primary)]">
                <CustomCursor />
                <WebGLCanvas />

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Navigation />
                  <ScrollToTop />

                  <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Education />
                    <Certifications />
                  </main>

                  <Footer />
                </motion.div>
              </div>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
