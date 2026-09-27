import { useState, useEffect, useRef, useCallback } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Code2,
  Cloud,
  Wifi,
  Search,
  Play,
  Pause,
  Layers,
  TvMinimalPlay,
  BrainCircuit,
  FlaskConical,
} from "lucide-react";

import { Section } from "./Section";
import { Github } from "./Icons";
import { projects } from "../data/projects";

const AUTOPLAY_MS = 6000;

/* =========================================================
   PROJECT VISUAL METADATA
========================================================= */

const panelMeta = {
  chakravyuh: {
    icon: ShieldCheck,
    label: "Blockchain Intelligence",
    eyebrow: "CYBERSECURITY",
    color:
      "from-blue-500/75 via-indigo-500/65 to-cyan-500/75 dark:from-blue-500/30 dark:via-indigo-500/20 dark:to-cyan-500/20",
    glow: "bg-blue-500/20",
    ring: "border-blue-500/35 dark:border-blue-500/30",
    iconBg: "from-blue-600 to-cyan-500",
  },

  mediforge: {
    icon: FlaskConical,
    label: "Research Initiative",
    eyebrow: "AI + RESEARCH",
    color:
      "from-rose-500/75 via-pink-500/65 to-violet-500/75 dark:from-rose-500/30 dark:via-pink-500/20 dark:to-violet-500/20",
    glow: "bg-rose-500/20",
    ring: "border-rose-500/35 dark:border-rose-500/30",
    iconBg: "from-rose-600 to-pink-500",
  },

  aethercode: {
    icon: Code2,
    label: "AI Developer Tooling",
    eyebrow: "ARTIFICIAL INTELLIGENCE",
    color:
      "from-violet-500/75 via-purple-500/65 to-indigo-500/75 dark:from-violet-500/30 dark:via-purple-500/20 dark:to-indigo-500/20",
    glow: "bg-violet-500/20",
    ring: "border-violet-500/35 dark:border-violet-500/30",
    iconBg: "from-violet-600 to-indigo-500",
  },

  helioforge: {
    icon: BrainCircuit,
    label: "AI Engineering",
    eyebrow: "AI SYSTEMS",
    color:
      "from-fuchsia-500/75 via-violet-500/65 to-blue-500/75 dark:from-fuchsia-500/30 dark:via-violet-500/20 dark:to-blue-500/20",
    glow: "bg-fuchsia-500/20",
    ring: "border-fuchsia-500/35 dark:border-fuchsia-500/30",
    iconBg: "from-fuchsia-600 to-violet-500",
  },

  crimeshield: {
    icon: Wifi,
    label: "IoT + Computer Vision",
    eyebrow: "EMERGING TECH",
    color:
      "from-red-500/75 via-rose-500/65 to-orange-500/75 dark:from-red-500/30 dark:via-rose-500/20 dark:to-orange-500/20",
    glow: "bg-red-500/20",
    ring: "border-red-500/35 dark:border-red-500/30",
    iconBg: "from-red-600 to-orange-500",
  },

  "s3-drive": {
    icon: Cloud,
    label: "Full-Stack Web & Cloud",
    eyebrow: "CLOUD ENGINEERING",
    color:
      "from-cyan-500/75 via-sky-500/65 to-blue-500/75 dark:from-cyan-500/30 dark:via-sky-500/20 dark:to-blue-500/20",
    glow: "bg-cyan-500/20",
    ring: "border-cyan-500/35 dark:border-cyan-500/30",
    iconBg: "from-cyan-600 to-blue-500",
  },

  "web-scraper": {
    icon: Search,
    label: "Automation + DevOps",
    eyebrow: "AUTOMATION",
    color:
      "from-emerald-500/75 via-teal-500/65 to-cyan-500/75 dark:from-emerald-500/30 dark:via-teal-500/20 dark:to-cyan-500/20",
    glow: "bg-emerald-500/20",
    ring: "border-emerald-500/35 dark:border-emerald-500/30",
    iconBg: "from-emerald-600 to-teal-500",
  },

  "avengers-watchlist": {
    icon: TvMinimalPlay,
    label: "Web Application",
    eyebrow: "WEB DEVELOPMENT",
    color:
      "from-purple-500/75 via-violet-500/65 to-fuchsia-500/75 dark:from-purple-500/30 dark:via-violet-500/20 dark:to-fuchsia-500/20",
    glow: "bg-purple-500/20",
    ring: "border-purple-500/35 dark:border-purple-500/30",
    iconBg: "from-purple-600 to-violet-500",
  },
};

const fallbackMeta = {
  icon: Layers,
  label: "Software Project",
  eyebrow: "ENGINEERING",
  color:
    "from-cyan-500/30 via-violet-500/20 to-blue-600/20",
  glow: "bg-cyan-500/20",
  ring: "border-cyan-500/30",
  iconBg: "from-cyan-500 to-violet-500",
};

/* =========================================================
   PROJECT CAROUSEL
========================================================= */

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animDir, setAnimDir] = useState("next");
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentProject = projects[currentIndex];

  const meta =
    panelMeta[currentProject?.id] ?? fallbackMeta;

  const PanelIcon = meta.icon;

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const goTo = useCallback(
    (newIndex, direction = "next") => {
      if (newIndex === currentIndex) return;

      setAnimDir(direction);
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex(newIndex);
        setProgress(0);
        startTimeRef.current = performance.now();
        setIsVisible(true);
      }, 220);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    if (!projects.length) return;

    goTo(
      (currentIndex + 1) % projects.length,
      "next"
    );
  }, [currentIndex, goTo]);

  const prevSlide = useCallback(() => {
    if (!projects.length) return;

    goTo(
      (currentIndex - 1 + projects.length) %
        projects.length,
      "prev"
    );
  }, [currentIndex, goTo]);

  /* =======================================================
     AUTOPLAY
  ======================================================= */

  useEffect(() => {
    if (isPaused || projects.length <= 1) {
      return;
    }

    startTimeRef.current = performance.now();
    setProgress(0);

    const tick = (now) => {
      const elapsed =
        now - startTimeRef.current;

      const percentage = Math.min(
        (elapsed / AUTOPLAY_MS) * 100,
        100
      );

      setProgress(percentage);

      if (percentage < 100) {
        progressRef.current =
          requestAnimationFrame(tick);
      } else {
        nextSlide();
      }
    };

    progressRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(
          progressRef.current
        );
      }
    };
  }, [
    currentIndex,
    isPaused,
    nextSlide,
  ]);

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        prevSlide();
      }

      if (event.code === "Space") {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [nextSlide, prevSlide]);

  if (!currentProject) {
    return null;
  }

  return (
    <Section
      id="projects"
      hasDivider={false}
      sectionClassName="relative py-12 sm:py-16"
      className="projects-glass"
    >
      {/* =====================================================
          PROJECT CONTENT
      ===================================================== */}

      <div className="relative w-full">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-7">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/[0.08] border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono tracking-wide mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SELECTED WORK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-neutral-900 dark:text-[#F4F4F5] leading-[0.95]">
              Things I've{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 bg-clip-text text-transparent">
                built.
              </span>
            </h2>

            <p className="mt-4 text-sm text-neutral-600 dark:text-[#A1A1AA] leading-relaxed max-w-xl">
              A collection of software, AI, cloud,
              cybersecurity, IoT, and research
              projects built across different areas
              of engineering.
            </p>
          </div>

          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="flex items-center gap-2 shrink-0">

            <div className="mr-2 hidden sm:block">
              <div className="text-[9px] uppercase tracking-widest font-mono text-neutral-400 dark:text-[#52525B]">
                PROJECT
              </div>

              <div className="font-mono text-sm text-neutral-800 dark:text-[#D4D4D8]">
                <span className="text-cyan-500 font-bold">
                  {String(
                    currentIndex + 1
                  ).padStart(2, "0")}
                </span>

                <span className="mx-1 text-neutral-400">
                  /
                </span>

                {String(projects.length).padStart(
                  2,
                  "0"
                )}
              </div>
            </div>

            <button
              onClick={() =>
                setIsPaused((prev) => !prev)
              }
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center border border-neutral-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] transition-all"
              title={
                isPaused
                  ? "Resume autoplay"
                  : "Pause autoplay"
              }
              aria-label={
                isPaused
                  ? "Resume autoplay"
                  : "Pause autoplay"
              }
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 text-cyan-500" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-cyan-500" />
              )}
            </button>

            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center border border-neutral-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] transition-all"
              title="Previous project"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center border border-neutral-200/80 dark:border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] transition-all"
              title="Next project"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <div className="relative h-[2px] w-full bg-neutral-200 dark:bg-white/[0.07] rounded-full overflow-hidden mb-5">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* ===================================================
            PROJECT CARD
        =================================================== */}

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateX(0)"
              : animDir === "next"
                ? "translateX(-20px)"
                : "translateX(20px)",
            transition:
              "opacity 220ms ease, transform 220ms ease",
          }}
        >
          <div className="relative rounded-[1.5rem] overflow-hidden border border-neutral-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-[#09090B]/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.07)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.5)] lg:h-[590px]">

            {/* Project glow */}

            <div
              className={`absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full ${meta.glow} blur-[110px] pointer-events-none`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 h-full relative z-10">

              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col min-h-0">

                {/* Header row */}

                <div className="flex items-center justify-between mb-6 shrink-0">

                  <div className="flex items-center gap-3">

                    <span className="font-mono text-[10px] text-cyan-500 tracking-widest">
                      {String(
                        currentIndex + 1
                      ).padStart(2, "0")}
                    </span>

                    <div className="w-7 h-px bg-neutral-300 dark:bg-white/10" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-[#52525B]">
                      {meta.eyebrow}
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-[9px] font-mono text-neutral-400 dark:text-[#52525B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    FEATURED
                  </div>
                </div>

                {/* Badge */}

                <div className="inline-flex self-start items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/[0.08] border border-cyan-500/20 mb-4 shrink-0">

                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />

                  <span className="text-[9px] font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                    {currentProject.badge}
                  </span>
                </div>

                {/* Title */}

                <div className="space-y-2 shrink-0">

                  <h3 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-black tracking-[-0.035em] text-neutral-900 dark:text-[#F4F4F5] leading-[1.05]">
                    {currentProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-cyan-600 dark:text-cyan-300 leading-relaxed">
                    {currentProject.subtitle}
                  </p>
                </div>

                {/* =================================================
                    SCROLLABLE DESCRIPTION
                ================================================= */}

                <div className="mt-5 max-w-2xl h-[115px] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-[#A1A1AA] leading-6">
                    {currentProject.description}
                  </p>
                </div>

                {/* =================================================
                    STATS
                ================================================= */}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 shrink-0">

                  {currentProject.stats.map(
                    (stat) => (
                      <div
                        key={stat.label}
                        className="p-2.5 rounded-lg bg-neutral-50/80 dark:bg-white/[0.025] border border-neutral-200/70 dark:border-white/[0.06] hover:border-cyan-500/20 transition-colors"
                      >
                        <div className="text-[8px] uppercase tracking-widest font-mono text-neutral-400 dark:text-[#52525B] mb-1">
                          {stat.label}
                        </div>

                        <div className="text-[11px] font-semibold text-neutral-900 dark:text-[#E4E4E7] truncate">
                          {stat.value}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* =================================================
                    TECH STACK
                ================================================= */}

                <div className="mt-5 pt-4 border-t border-neutral-200/80 dark:border-white/[0.06]">

                  <div className="text-[8px] uppercase tracking-[0.2em] font-mono text-neutral-400 dark:text-[#52525B] mb-2.5">
                    TECH STACK
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-[58px] overflow-hidden">

                    {currentProject.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/[0.035] border border-neutral-200 dark:border-white/[0.08] text-[9px] font-mono text-neutral-700 dark:text-[#D4D4D8] hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="flex flex-wrap gap-2.5 mt-auto pt-5">

                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-bold hover:scale-[1.02] transition-all shadow-lg"
                    >
                      <Github className="w-3.5 h-3.5" />

                      <span>
                        View Repository
                      </span>

                      <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[10px] font-bold shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />

                      <span>
                        Live Demo
                      </span>

                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>

              {/* =================================================
                  RIGHT PROJECT VISUAL
              ================================================= */}

              <div className="lg:col-span-5 p-4 sm:p-6 lg:p-7 flex min-h-[300px] lg:min-h-0">

                <div
                  className={`
                    relative
                    flex-1
                    rounded-[1.25rem]
                    border
                    ${meta.ring}
                    bg-gradient-to-br
                    ${meta.color}
                    overflow-hidden
                    flex
                    flex-col
                    items-center
                    justify-center
                  `}
                >

                  {/* Grid */}

                  <div className="absolute inset-0 opacity-[0.07]">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize:
                          "28px 28px",
                      }}
                    />
                  </div>

                  {/* Glow */}

                  <div className="absolute w-40 h-40 rounded-full bg-white/10 blur-[70px]" />

                  {/* Rings */}

                  <div className="absolute w-64 h-64 rounded-full border border-white/[0.045]" />
                  <div className="absolute w-48 h-48 rounded-full border border-white/[0.055]" />
                  <div className="absolute w-36 h-36 rounded-full border border-white/[0.065]" />

                  {/* Domain */}

                  <div className="absolute left-5 top-5 rounded-lg border border-black/10 bg-black/5 px-3 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-black/10">
                    <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-slate-700 uppercase dark:text-white/45">
                      {meta.eyebrow}
                    </span>
                  </div>

                  {/* Counter */}

                  <div className="absolute right-5 top-5 rounded-lg border border-black/10 bg-black/5 px-3 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-black/10">
                    <span className="font-mono text-[9px] font-semibold text-slate-700 dark:text-white/45">
                      {String(
                        currentIndex + 1
                      ).padStart(2, "0")}
                      /
                      {String(
                        projects.length
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Icon */}

                  <div
                    className={`
                      relative
                      p-6
                      rounded-[1.5rem]
                      bg-gradient-to-br
                      ${meta.iconBg}
                      shadow-[0_15px_45px_rgba(0,0,0,0.3)]
                      ring-1
                      ring-white/20
                    `}
                  >
                    <PanelIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-lg" />
                  </div>

                  {/* Domain title */}

                  <p className="mt-6 font-mono text-[9px] font-semibold tracking-[0.25em] text-slate-600 uppercase dark:text-white/45">
                    PROJECT DOMAIN
                  </p>

                  <h3 className="mt-3 max-w-[300px] text-center text-lg font-semibold leading-tight tracking-tight text-slate-950 sm:text-xl dark:text-white">
                    {meta.label}
                  </h3>

                  {/* Technology preview */}

                  <div className="relative flex flex-wrap justify-center gap-1.5 max-w-xs px-5 mt-5">

                    {currentProject.technologies
                      .slice(0, 5)
                      .map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-black/10 bg-black/5 px-2.5 py-1 font-mono text-[9px] font-semibold text-slate-700 backdrop-blur-sm dark:border-white/10 dark:bg-black/10 dark:text-white/65"
                        >
                          {technology}
                        </span>
                      ))}

                    {currentProject.technologies
                      ?.length > 5 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-2.5 py-1 font-mono text-[9px] font-semibold text-slate-700 backdrop-blur-sm dark:border-white/10 dark:bg-black/10 dark:text-white/60">
                        +
                        {currentProject.technologies.length -
                          5}
                      </span>
                    )}
                  </div>

                  {/* Status */}

                  <div className="absolute bottom-5 left-5 flex items-center gap-2">

                    <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />

                    <span className="font-mono text-[8px] font-semibold tracking-[0.18em] text-slate-700 uppercase dark:text-white/35">
                      BUILT & EXPERIENCED
                    </span>
                  </div>

                  {/* Decorative blobs */}

                  <div className="absolute -top-14 -right-14 w-32 h-32 rounded-full bg-white/[0.05] blur-3xl" />

                  <div className="absolute -bottom-14 -left-14 w-32 h-32 rounded-full bg-white/[0.05] blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}