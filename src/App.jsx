import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import { FluidBackground } from "./components/FluidBackground";
import { DockerMenu } from "./components/DockerMenu";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ProjectCarousel } from "./components/ProjectCarousel";
import { Skills } from "./components/Skills";
import { Journey } from "./components/Journey";
import { Contact } from "./components/Contact";
import { WordmarkFooter } from "./components/WordmarkFooter";
import { Footer } from "./components/Footer";

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updatePointer = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  return (
    <div className="site-shell min-h-screen bg-transparent text-neutral-900 dark:text-[#F4F4F5] selection:bg-cyan-500/25 selection:text-cyan-300 font-sans transition-colors duration-300 relative overflow-x-hidden">
      {/* Whole-page persistent WebGL liquid mercury background */}
      <FluidBackground />

      {/* Floating macOS/iOS style Docker Menu */}
      <DockerMenu theme={theme} toggleTheme={toggleTheme} />

      {/* Main Sections wrapped in glassmorphism */}
      <main className="site-main relative z-10 space-y-4">
        <Hero />
        <About />
        <ProjectCarousel />
        <Skills />
        <Journey />
        <Contact />
      </main>

      {/* Wordmark + Footer — must be z-10 to stay above the FluidBackground canvas */}
      <div className="relative z-10">
        <WordmarkFooter />
        <Footer />
      </div>

    </div>
  );
}

export default App;