import { useState } from "react";
import {
  Volume2,
  MapPin,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

import { Section } from "./Section";
import { SkillsVenn } from "./SkillsVenn";
import { profile } from "../data/profile";

export function About() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const pronounceName = () => {
    if ("speechSynthesis" in window) {
      setIsPlayingAudio(true);

      const utterance = new SpeechSynthesisUtterance(
        "G V Raghuveer"
      );

      utterance.rate = 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Section
      id="about"
      hasDivider={false}
      className="about-glass"
    >
      <div className="space-y-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-3">

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              01 / About
            </span>

            <span className="h-px w-12 bg-cyan-500/30" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            A little about{" "}
            <span className="liquid-gradient-text">
              me.
            </span>
          </h2>

        </div>

        {/* =====================================================
            MAIN ABOUT CONTENT
        ===================================================== */}

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">

          {/* ===================================================
              LEFT — IDENTITY + BIO
          =================================================== */}

          <div className="space-y-7">

            {/* Name */}

            <div>

              <div className="flex items-center gap-3">

                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                  {profile.name}
                </h3>

                <button
                  type="button"
                  onClick={pronounceName}
                  aria-label="Pronounce my name"
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    duration-300

                    ${
                      isPlayingAudio
                        ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-500"
                        : "border-neutral-200 bg-white/60 text-neutral-500 hover:border-cyan-400/40 hover:text-cyan-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400"
                    }
                  `}
                >
                  <Volume2
                    className={`h-4 w-4 ${
                      isPlayingAudio
                        ? "animate-pulse"
                        : ""
                    }`}
                  />
                </button>

              </div>

              {/* Education */}

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-500">

                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-cyan-500" />
                  B.Tech CSE · REVA University
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-violet-500" />
                  Bengaluru, India
                </span>

              </div>

            </div>

            {/* Bio */}

            <div className="relative pl-5">

              <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-cyan-400 via-violet-400 to-transparent" />

              <div className="space-y-4">

                {profile.about?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-7 text-neutral-600 dark:text-neutral-300 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

              </div>

            </div>

          </div>

          {/* ===================================================
              RIGHT — VENN
          =================================================== */}

          <div className="relative flex min-h-[380px] items-center justify-center">

            {/* Background glow */}

            <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-cyan-500/[0.04] blur-[100px]" />

            <SkillsVenn />

          </div>

        </div>

      </div>
    </Section>
  );
}