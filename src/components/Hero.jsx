import { ArrowDown, Sparkles } from "lucide-react";
import { profile } from "../data/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden px-4 pt-20 pb-16"
    >
      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-2 text-center sm:px-6 lg:px-8">

        {/* =======================================================
            SOFTWARE ENGINEERING BADGE
        ======================================================= */}

        <div className="mb-6 inline-flex select-none items-center gap-2.5 rounded-full border border-white/20 bg-white/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-800 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 dark:border-white/10 dark:bg-neutral-900/40 dark:text-neutral-200 sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>

          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Software Engineering
          </span>
        </div>

        {/* =======================================================
            MAIN TITLE
        ======================================================= */}

        <h1 className="mb-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-neutral-900 dark:text-white sm:text-6xl md:text-[4.5rem]">

          {/* Name */}

          {profile.name}

          {/* Subtitle */}

          <span className="mx-auto mt-3 block max-w-4xl text-2xl font-bold leading-tight tracking-tight liquid-gradient-text sm:text-4xl md:text-5xl">
            Computer Science & Engineering Student
          </span>
        </h1>

        {/* =======================================================
            DESCRIPTION
        ======================================================= */}

        <p className="mb-8 max-w-2xl text-base font-normal leading-relaxed text-neutral-700 dark:text-neutral-300/90 sm:text-lg">
          CSE undergraduate at REVA University, building practical systems
          across AI, cloud, full-stack development, computer vision, and IoT.
        </p>

        {/* =======================================================
            ACTIONS
        ======================================================= */}

        <div className="flex flex-wrap items-center justify-center gap-4">

          {/* Explore */}

          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 dark:bg-white dark:text-neutral-950"
          >
            <span>Explore My Work</span>

            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>

          {/* Contact */}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/40 px-7 py-3.5 text-sm font-medium text-neutral-800 shadow-md backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 hover:bg-white/70 dark:border-white/10 dark:bg-neutral-900/50 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
          >
            <span>Get in Touch</span>
          </a>

        </div>
      </div>
    </section>
  );
}