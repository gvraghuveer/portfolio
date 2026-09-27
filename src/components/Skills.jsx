import {
  Code2,
  Server,
  Cloud,
  Palette,
  Cpu,
  Wrench,
  Layers,
  Wifi,
} from "lucide-react";
import { webSkills } from "../data/skills";

export function Skills() {
  const iconMap = {
    code: Code2,
    server: Server,
    cloud: Cloud,
    palette: Palette,
    cpu: Cpu,
    chip: Wifi,
    wrench: Wrench,
    layers: Layers,
  };

  const totalTechnologies = webSkills.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  return (
    <section id="skills" className="relative py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            OUTER FLOATING GLASS PANEL
        ===================================================== */}

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#080d18]/75 dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

          {/* Ambient cyan glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[120px] dark:bg-cyan-500/[0.04]" />

          {/* Ambient violet glow */}
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-500/[0.05] blur-[120px] dark:bg-violet-500/[0.035]" />

          {/* Subtle technical grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top-left corner */}
          <div className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l-2 border-t-2 border-cyan-500/40 dark:border-cyan-400/40" />

          {/* Top-right corner */}
          <div className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-cyan-500/40 dark:border-cyan-400/40" />

          {/* Bottom-left corner */}
          <div className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b-2 border-l-2 border-cyan-500/40 dark:border-cyan-400/40" />

          {/* Bottom-right corner */}
          <div className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b-2 border-r-2 border-cyan-500/40 dark:border-cyan-400/40" />

          {/* ===================================================
              CONTENT
          =================================================== */}

          <div className="relative z-10 p-6 sm:p-8 md:p-10">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

              <div className="space-y-3">

                {/* Label */}

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-cyan-600 dark:text-cyan-400">

                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  </span>

                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Technical Profile
                  </span>

                </div>

                {/* Heading */}

                <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
                  What I{" "}
                  <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-violet-500 bg-clip-text text-transparent">
                    work with.
                  </span>
                </h2>

                {/* Description */}

                <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
                  A practical collection of languages, frameworks,
                  infrastructure, AI tools, and hardware I&apos;ve worked
                  with across my projects.
                </p>

              </div>

              {/* =================================================
                  STATS
              ================================================= */}

              <div className="hidden items-center gap-4 font-mono sm:flex">

                {/* Technologies */}

                <div className="text-right">

                  <div className="text-[9px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
                    Technologies
                  </div>

                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    {totalTechnologies}
                  </div>

                </div>

                <div className="h-8 w-px bg-neutral-200 dark:bg-white/10" />

                {/* Domains */}

                <div className="text-right">

                  <div className="text-[9px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
                    Domains
                  </div>

                  <div className="text-xl font-bold text-cyan-500">
                    {String(webSkills.length).padStart(2, "0")}
                  </div>

                </div>

              </div>
            </div>

            {/* =================================================
                MOBILE STATS
            ================================================= */}

            <div className="mb-8 flex items-center gap-4 font-mono sm:hidden">

              <div>
                <div className="text-[8px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-600">
                  Technologies
                </div>

                <div className="text-lg font-bold text-neutral-900 dark:text-white">
                  {totalTechnologies}
                </div>
              </div>

              <div className="h-7 w-px bg-neutral-200 dark:bg-white/10" />

              <div>
                <div className="text-[8px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-600">
                  Domains
                </div>

                <div className="text-lg font-bold text-cyan-500">
                  {String(webSkills.length).padStart(2, "0")}
                </div>
              </div>

            </div>

            {/* =================================================
                SKILLS SYSTEM
            ================================================= */}

            <div className="relative">

              {/* Desktop vertical spine */}

              <div className="absolute bottom-6 left-[23px] top-6 hidden w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent md:block" />

              <div className="space-y-5">

                {webSkills.map((category, categoryIndex) => {
                  const Icon = iconMap[category.icon] || Code2;

                  return (
                    <div
                      key={category.category}
                      className="group relative"
                    >

                      {/* =================================================
                          CATEGORY MARKER
                      ================================================= */}

                      <div className="absolute left-0 top-5 z-20 hidden items-center justify-center md:flex">

                        <div
                          className={`
                            h-[46px]
                            w-[46px]
                            rounded-2xl
                            bg-gradient-to-br
                            ${category.color}
                            p-[1px]
                            shadow-lg
                            transition-transform
                            duration-300
                            group-hover:scale-105
                          `}
                        >

                          <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-white dark:bg-[#09090B]">

                            <Icon className="h-5 w-5 text-neutral-800 dark:text-white" />

                          </div>

                        </div>

                      </div>

                      {/* =================================================
                          CATEGORY PANEL
                      ================================================= */}

                      <div className="md:ml-[68px]">

                        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/50 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/25 hover:bg-white/75 dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:bg-white/[0.04]">

                          {/* Category glow */}

                          <div
                            className={`
                              pointer-events-none
                              absolute
                              -right-24
                              -top-24
                              h-48
                              w-48
                              rounded-full
                              bg-gradient-to-br
                              ${category.color}
                              opacity-[0.04]
                              blur-3xl
                              transition-opacity
                              duration-500
                              group-hover:opacity-[0.1]
                            `}
                          />

                          <div className="relative p-5 sm:p-6">

                            {/* =================================================
                                CATEGORY HEADER
                            ================================================= */}

                            <div className="mb-5 flex items-center justify-between gap-4">

                              <div className="flex items-center gap-3">

                                {/* Mobile icon */}

                                <div
                                  className={`
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    ${category.color}
                                    text-white
                                    md:hidden
                                  `}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>

                                <div>

                                  <div className="flex items-center gap-2">

                                    <h3 className="text-base font-bold text-neutral-900 dark:text-white sm:text-lg">
                                      {category.category}
                                    </h3>

                                    <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-600">
                                      /
                                      {String(categoryIndex + 1).padStart(
                                        2,
                                        "0"
                                      )}
                                    </span>

                                  </div>

                                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
                                    {category.skills.length} technologies
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* =================================================
                                SKILLS
                            ================================================= */}

                            <div className="flex flex-wrap gap-2">

                              {category.skills.map((skill) => (

                                <div
                                  key={skill.name}
                                  className="group/skill inline-flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-neutral-50/70 px-3 py-2 transition-all duration-200 hover:border-cyan-500/30 hover:bg-cyan-500/[0.04] dark:border-white/[0.07] dark:bg-black/20"
                                >

                                  {/* Level indicator */}

                                  <span
                                    className={`
                                      h-1.5
                                      w-1.5
                                      shrink-0
                                      rounded-full
                                      ${
                                        skill.level === "Core"
                                          ? "bg-cyan-500"
                                          : "bg-violet-500"
                                      }
                                    `}
                                  />

                                  {/* Skill name */}

                                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                                    {skill.name}
                                  </span>

                                  {/* Level */}

                                  <span
                                    className={`
                                      font-mono
                                      text-[8px]
                                      uppercase
                                      tracking-wide
                                      ${
                                        skill.level === "Core"
                                          ? "text-cyan-600 dark:text-cyan-400"
                                          : "text-violet-600 dark:text-violet-400"
                                      }
                                    `}
                                  >
                                    {skill.level}
                                  </span>

                                </div>

                              ))}

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* =================================================
                LEGEND
            ================================================= */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />

                <span>Core</span>

              </div>

              <div className="h-3 w-px bg-neutral-200 dark:bg-white/10" />

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                <span>Exploring</span>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}