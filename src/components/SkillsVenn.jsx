import { useState } from "react";
import {
  Code2,
  Server,
  BrainCircuit,
  Cpu,
  Sparkles,
} from "lucide-react";

/* ============================================================
   DOMAIN DATA
============================================================ */

const DOMAINS = {
  frontend: {
    label: "Frontend",
    sub: "React · Vite · UI",
    icon: Code2,
    color: "cyan",
    position: "frontend",
  },

  backend: {
    label: "Backend",
    sub: "Node · APIs · Services",
    icon: Server,
    color: "violet",
    position: "backend",
  },

  ai: {
    label: "AI & Cloud",
    sub: "ML · Vision · AWS",
    icon: BrainCircuit,
    color: "emerald",
    position: "ai",
  },

  systems: {
    label: "Systems & IoT",
    sub: "ESP32 · Hardware · IoT",
    icon: Cpu,
    color: "amber",
    position: "systems",
  },
};

/* ============================================================
   COLORS
============================================================ */

const COLORS = {
  cyan: {
    border: "rgba(34,211,238,0.72)",
    hover: "rgba(34,211,238,1)",
    fill: "rgba(34,211,238,0.045)",
    glow: "rgba(34,211,238,0.20)",
    text: "text-cyan-500 dark:text-cyan-400",
  },

  violet: {
    border: "rgba(167,139,250,0.72)",
    hover: "rgba(167,139,250,1)",
    fill: "rgba(167,139,250,0.045)",
    glow: "rgba(167,139,250,0.20)",
    text: "text-violet-500 dark:text-violet-400",
  },

  emerald: {
    border: "rgba(52,211,153,0.72)",
    hover: "rgba(52,211,153,1)",
    fill: "rgba(52,211,153,0.045)",
    glow: "rgba(52,211,153,0.20)",
    text: "text-emerald-500 dark:text-emerald-400",
  },

  amber: {
    border: "rgba(251,191,36,0.72)",
    hover: "rgba(251,191,36,1)",
    fill: "rgba(251,191,36,0.045)",
    glow: "rgba(251,191,36,0.20)",
    text: "text-amber-500 dark:text-amber-400",
  },
};

/* ============================================================
   CIRCLE
============================================================ */

function DomainCircle({
  domain,
  active,
  onEnter,
  onLeave,
  className = "",
}) {
  const colors = COLORS[domain.color];
  const isActive = active === domain.position;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        absolute
        rounded-full
        transition-all
        duration-300
        ease-out
        cursor-default
        ${className}
        ${isActive ? "z-20" : "z-10"}
      `}
      style={{
        border: `2px solid ${
          isActive ? colors.hover : colors.border
        }`,

        background: colors.fill,

        boxShadow: isActive
          ? `
              0 0 32px 5px ${colors.glow},
              inset 0 0 25px 3px ${colors.glow}
            `
          : `
              0 0 14px 1px ${colors.glow}
            `,

        transform: isActive
          ? "translateZ(0) scale(1.015)"
          : "translateZ(0) scale(1)",

        opacity:
          active && !isActive
            ? 0.55
            : 1,
      }}
    >
      {/* Subtle inner glow */}
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full opacity-30 blur-3xl"
        style={{
          background: colors.glow,
        }}
      />
    </div>
  );
}

/* ============================================================
   LABEL
============================================================ */

function DomainLabel({
  domain,
  active,
  onEnter,
  onLeave,
}) {
  const Icon = domain.icon;
  const colors = COLORS[domain.color];

  const isActive = active === domain.position;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        absolute
        z-30
        flex
        -translate-x-1/2
        -translate-y-1/2
        flex-col
        items-center
        justify-center
        text-center
        whitespace-nowrap
        transition-all
        duration-300
        cursor-default
        ${isActive ? "scale-105" : "scale-100"}
      `}
    >
      <div
        className={`
          flex
          items-center
          gap-1
          text-[10px]
          font-bold
          sm:gap-1.5
          sm:text-xs
          md:text-sm
          ${colors.text}
        `}
      >
        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />

        <span>{domain.label}</span>
      </div>

      <span className="mt-0.5 font-mono text-[7px] tracking-wide text-neutral-500 dark:text-neutral-400 sm:mt-1 sm:text-[8.5px]">
        {domain.sub}
      </span>
    </div>
  );
}

/* ============================================================
   VENN
============================================================ */

export function SkillsVenn({ className = "" }) {
  const [active, setActive] = useState(null);

  const enter = (id) => setActive(id);
  const leave = () => setActive(null);

  return (
    <div
      className={`
        relative
        mx-auto
        aspect-square
        w-full
        max-w-[430px]
        select-none
        ${className}
      `}
    >
      {/* ======================================================
          TECHNICAL GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[3%]
          opacity-[0.025]
          dark:opacity-[0.055]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(34,211,238,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(34,211,238,0.5) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ======================================================
          CENTER GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-56
          w-56
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/[0.045]
          blur-[90px]
          dark:bg-cyan-400/[0.07]
        "
      />

      {/* ======================================================
          CIRCLES

          All four circles are mathematically centered around (50%, 50%):
          Frontend: (50%, 31.5%)
          Systems: (50%, 68.5%)
          Backend: (31.5%, 50%)
          AI & Cloud: (68.5%, 50%)
      ====================================================== */}

      {/* FRONTEND */}
      <DomainCircle
        domain={DOMAINS.frontend}
        active={active}
        onEnter={() => enter("frontend")}
        onLeave={leave}
        className="
          left-[21.5%]
          top-[3%]
          h-[57%]
          w-[57%]
        "
      />

      {/* BACKEND */}
      <DomainCircle
        domain={DOMAINS.backend}
        active={active}
        onEnter={() => enter("backend")}
        onLeave={leave}
        className="
          left-[3%]
          top-[21.5%]
          h-[57%]
          w-[57%]
        "
      />

      {/* AI + CLOUD */}
      <DomainCircle
        domain={DOMAINS.ai}
        active={active}
        onEnter={() => enter("ai")}
        onLeave={leave}
        className="
          right-[3%]
          top-[21.5%]
          h-[57%]
          w-[57%]
        "
      />

      {/* SYSTEMS + IOT */}
      <DomainCircle
        domain={DOMAINS.systems}
        active={active}
        onEnter={() => enter("systems")}
        onLeave={leave}
        className="
          left-[21.5%]
          bottom-[3%]
          h-[57%]
          w-[57%]
        "
      />

      {/* ======================================================
          LABELS
          Evenly distributed in the outer crescents of each circle
      ====================================================== */}

      {/* FRONTEND */}
      <div className="absolute left-[50%] top-[14%]">
        <DomainLabel
          domain={DOMAINS.frontend}
          active={active}
          onEnter={() => enter("frontend")}
          onLeave={leave}
        />
      </div>

      {/* BACKEND */}
      <div className="absolute left-[18%] top-[50%]">
        <DomainLabel
          domain={DOMAINS.backend}
          active={active}
          onEnter={() => enter("backend")}
          onLeave={leave}
        />
      </div>

      {/* AI + CLOUD */}
      <div className="absolute left-[82%] top-[50%]">
        <DomainLabel
          domain={DOMAINS.ai}
          active={active}
          onEnter={() => enter("ai")}
          onLeave={leave}
        />
      </div>

      {/* SYSTEMS */}
      <div className="absolute left-[50%] top-[86%]">
        <DomainLabel
          domain={DOMAINS.systems}
          active={active}
          onEnter={() => enter("systems")}
          onLeave={leave}
        />
      </div>

      {/* ======================================================
          CENTER NODE
      ====================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-40
          flex
          h-[58px]
          w-[58px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-cyan-400/30
          bg-white/95
          shadow-[0_0_25px_rgba(34,211,238,0.18)]
          backdrop-blur-xl

          dark:border-cyan-400/25
          dark:bg-[#09101c]/95
          dark:shadow-[0_0_30px_rgba(34,211,238,0.2)]

          sm:h-[68px]
          sm:w-[68px]

          md:h-[76px]
          md:w-[76px]
        "
      >
        {/* Inner ring */}
        <div
          className="
            pointer-events-none
            absolute
            inset-1
            rounded-full
            border
            border-cyan-500/15
            dark:border-cyan-400/20
          "
        />

        <div className="relative flex flex-col items-center">
          <Sparkles className="mb-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-500 dark:text-cyan-400" />

          <span className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.12em] text-neutral-900 dark:text-white">
            CSE
          </span>

          <span className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
            REVA
          </span>
        </div>
      </div>

      {/* ======================================================
          SMALL TECHNICAL MARKERS
      ====================================================== */}

      {/* Top */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[7%]
          h-3
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-cyan-400/60
          to-transparent
        "
      />

      {/* Bottom */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[7%]
          left-1/2
          h-3
          w-px
          -translate-x-1/2
          bg-gradient-to-t
          from-amber-400/60
          to-transparent
        "
      />

      {/* Left */}

      <div
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-1/2
          h-px
          w-3
          -translate-y-1/2
          bg-gradient-to-r
          from-violet-400/60
          to-transparent
        "
      />

      {/* Right */}

      <div
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-1/2
          h-px
          w-3
          -translate-y-1/2
          bg-gradient-to-l
          from-emerald-400/60
          to-transparent
        "
      />
    </div>
  );
}