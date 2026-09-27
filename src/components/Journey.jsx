import {
  GraduationCap,
  CalendarDays,
  MapPin,
  Award,
  CircleDot,
} from "lucide-react";

import { Section } from "./Section";
import { profile } from "../data/profile";

export function Journey() {
  return (
    <Section id="journey" className="space-y-8">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] text-cyan-500/70 uppercase">
            Academic Journey
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Education
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-neutral-500">
          <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          ACADEMIC RECORD
        </div>
      </div>

      {/* Academic Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[18px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-500/60 via-cyan-500/20 to-transparent" />

        <div className="space-y-8">
          {/* REVA */}
          <div className="relative pl-12">
            {/* Timeline node */}
            <div className="absolute left-0 top-6 flex size-9 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              <CircleDot className="size-3.5 text-cyan-400" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/60 dark:bg-[#0b0e15]/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40">
              {/* Subtle grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

              <div className="relative p-5 sm:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                      <GraduationCap className="size-5 text-cyan-400" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">
                          REVA University
                        </h3>

                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] tracking-wider text-cyan-400">
                          CURRENT
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Bachelor of Technology in Computer Science & Engineering
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500 sm:justify-end">
                      <CalendarDays className="size-3.5" />
                      2025–2029
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-neutral-500 sm:justify-end">
                      <MapPin className="size-3" />
                      Bengaluru
                    </div>
                  </div>
                </div>

                {/* Coursework */}
                <div className="mt-6">
                  <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
                    Core Coursework
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {profile.academics.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-lg border border-neutral-200 bg-neutral-100/70 px-2.5 py-1.5 font-mono text-[10px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-400"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom status */}
                <div className="mt-6 flex items-center justify-between border-t border-neutral-200/70 pt-4 dark:border-neutral-800/70">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
                    Undergraduate Program
                  </span>

                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-500">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    IN PROGRESS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PUC */}
          <div className="relative pl-12">
            {/* Timeline node */}
            <div className="absolute left-0 top-6 flex size-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900">
              <CircleDot className="size-3.5 text-neutral-500" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/60 dark:border-neutral-800 dark:bg-[#0b0e15]/70 backdrop-blur-xl transition-all duration-300 hover:border-neutral-700">
              <div className="relative p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                      <GraduationCap className="size-5 text-neutral-500 dark:text-neutral-400" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {profile.academics.priorEducation.institution}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {profile.academics.priorEducation.degree}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-neutral-500">
                        {profile.academics.priorEducation.board}
                      </p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                    <div className="flex items-center gap-1.5">
                      <Award className="size-4 text-cyan-400" />

                      <span className="font-mono text-xl font-semibold text-cyan-400">
                        {profile.academics.priorEducation.score}
                      </span>
                    </div>

                    <span className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase">
                      Final Score
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}