import { useState, useEffect } from "react";
import {
  Home,
  User,
  Layers,
  Cpu,
  GraduationCap,
  Mail,
  Sun,
  Moon,
  ExternalLink,
  ChevronUp,
  Sparkles,
  ZapOff,
} from "lucide-react";
import { Github } from "./Icons";
import { profile } from "../data/profile";

export function DockerMenu({
  theme,
  toggleTheme,
  animationsEnabled = true,
  toggleAnimations = () => {},
}) {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [bouncingId, setBouncingId] = useState(null);
  const [toggleNotice, setToggleNotice] = useState(null);

  const dockItems = [
    {
      id: "hero",
      label: "Home",
      icon: Home,
      href: "#hero",
    },
    {
      id: "about",
      label: "About",
      icon: User,
      href: "#about",
    },
    {
      id: "projects",
      label: "Projects",
      icon: Layers,
      href: "#projects",
    },
    {
      id: "skills",
      label: "Skills",
      icon: Cpu,
      href: "#skills",
    },
    {
      id: "journey",
      label: "Education",
      icon: GraduationCap,
      href: "#journey",
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      href: "#contact",
    },
  ];

  /* ============================================================
     ACTIVE SECTION DETECTION
  ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "projects",
        "skills",
        "journey",
        "contact",
      ];

      const scrollPosition =
        window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);

        if (section) {
          const sectionTop = section.offsetTop;

          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }

      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const handleNavClick = (event, item) => {
    event.preventDefault();

    setBouncingId(item.id);

    window.setTimeout(() => {
      setBouncingId(null);
    }, 550);

    const target = document.querySelector(item.href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* ============================================================
     THEME
  ============================================================ */

  const handleThemeClick = () => {
    setBouncingId("theme");

    window.setTimeout(() => {
      setBouncingId(null);
    }, 550);

    toggleTheme();
  };

  const handleAnimationsClick = () => {
    const nextState = !animationsEnabled;
    setBouncingId("animations");

    const noticeId = Date.now();
    setToggleNotice({
      mode: nextState ? "on" : "off",
      id: noticeId,
    });

    window.setTimeout(() => {
      setBouncingId(null);
    }, 550);

    window.setTimeout(() => {
      setToggleNotice((curr) => (curr?.id === noticeId ? null : curr));
    }, 2400);

    toggleAnimations();
  };

  return (
    <nav
      aria-label="Quick navigation"
      className="
        fixed
        bottom-4
        left-1/2
        z-50
        -translate-x-1/2
        select-none
        pointer-events-auto
      "
    >
      {/* ========================================================
          FLOATING MODE STATUS HUD TOAST
      ======================================================== */}
      {toggleNotice && (
        <div
          className={`
            pointer-events-none
            absolute
            -top-12
            left-1/2
            -translate-x-1/2
            z-50
            flex
            items-center
            gap-2
            whitespace-nowrap
            rounded-full
            px-4
            py-1.5
            text-[11px]
            font-semibold
            shadow-2xl
            backdrop-blur-xl
            transition-all
            duration-300
            animate-bounce
            border
            ${
              toggleNotice.mode === "on"
                ? "border-cyan-400/40 bg-[#0b1329]/95 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.45)]"
                : "border-emerald-400/40 bg-[#091512]/95 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            }
          `}
        >
          {toggleNotice.mode === "on" ? (
            <>
              <Sparkles className="size-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
              <span>High Graphics Enabled (Liquid WebGL)</span>
            </>
          ) : (
            <>
              <ZapOff className="size-3.5 text-emerald-400" />
              <span>Performance Mode: Aurora Borealis (Zero Lag)</span>
            </>
          )}
        </div>
      )}

      {/* ========================================================
          MAIN DOCK
      ======================================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-1
          rounded-2xl
          border
          border-black/[0.08]
          bg-white/[0.78]
          px-2
          py-2
          shadow-[0_18px_50px_rgba(15,23,42,0.16)]
          backdrop-blur-2xl
          backdrop-saturate-150

          dark:border-white/[0.10]
          dark:bg-[#090d17]/[0.82]
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.65)]

          sm:gap-1.5
          sm:rounded-[1.25rem]
          sm:px-2.5
          sm:py-2.5
        "
      >
        {/* ======================================================
            TOP EDGE LIGHT
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-5
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-400/50
            to-transparent
          "
        />

        {/* ======================================================
            NAV ITEMS
        ====================================================== */}

        {dockItems.map((item, index) => {
          const Icon = item.icon;

          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === index;
          const isBouncing = bouncingId === item.id;

          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* =================================================
                  TOOLTIP
              ================================================= */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -top-11
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  rounded-lg
                  border
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-semibold
                  tracking-wide
                  shadow-xl
                  backdrop-blur-xl
                  transition-all
                  duration-200

                  ${
                    isHovered
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-2 scale-90 opacity-0"
                  }

                  border-black/[0.08]
                  bg-white/90
                  text-neutral-800

                  dark:border-white/[0.10]
                  dark:bg-[#111622]/95
                  dark:text-neutral-200
                `}
              >
                {item.label}

                {/* Tooltip pointer */}

                <div
                  className="
                    absolute
                    -bottom-1
                    left-1/2
                    h-2
                    w-2
                    -translate-x-1/2
                    rotate-45
                    border-r
                    border-b
                    border-black/[0.08]
                    bg-white/90

                    dark:border-white/[0.10]
                    dark:bg-[#111622]
                  "
                />
              </div>

              {/* =================================================
                  NAV BUTTON
              ================================================= */}

              <a
                href={item.href}
                onClick={(event) =>
                  handleNavClick(event, item)
                }
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-300
                  ease-out

                  sm:h-11
                  sm:w-11
                  sm:rounded-[0.9rem]

                  ${
                    isBouncing
                      ? "animate-dock-bounce"
                      : ""
                  }

                  ${
                    isActive
                      ? `
                        border
                        border-cyan-500/30
                        bg-cyan-500/[0.10]
                        text-cyan-600
                        shadow-[0_0_20px_rgba(6,182,212,0.16)]

                        dark:border-cyan-400/25
                        dark:bg-cyan-400/[0.10]
                        dark:text-cyan-300
                        dark:shadow-[0_0_25px_rgba(6,182,212,0.18)]
                      `
                      : `
                        border
                        border-transparent
                        text-neutral-500
                        hover:border-black/[0.05]
                        hover:bg-black/[0.035]
                        hover:text-neutral-950

                        dark:text-neutral-500
                        dark:hover:border-white/[0.06]
                        dark:hover:bg-white/[0.05]
                        dark:hover:text-white
                      `
                  }
                `}
              >
                <Icon
                  className={`
                    h-[17px]
                    w-[17px]
                    transition-all
                    duration-300
                    sm:h-[18px]
                    sm:w-[18px]

                    ${
                      isActive
                        ? "scale-105"
                        : "group-hover:-translate-y-0.5"
                    }
                  `}
                />

                {/* Active bottom indicator */}

                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-[3px]
                      left-1/2
                      h-1
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-cyan-500
                      shadow-[0_0_8px_rgba(6,182,212,0.9)]
                      dark:bg-cyan-400
                    "
                  />
                )}

                {/* Hover glow */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-xl
                    bg-cyan-400/[0.06]
                    opacity-0
                    blur-md
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />
              </a>
            </div>
          );
        })}

        {/* ======================================================
            SEPARATOR
        ====================================================== */}

        <div
          className="
            mx-1
            h-6
            w-px
            bg-black/[0.08]
            dark:bg-white/[0.10]
          "
        />

        {/* ======================================================
            GITHUB
        ====================================================== */}

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredIndex("github")}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}

          <div
            className={`
              pointer-events-none
              absolute
              -top-11
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              rounded-lg
              border
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              tracking-wide
              shadow-xl
              backdrop-blur-xl
              transition-all
              duration-200

              ${
                hoveredIndex === "github"
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-2 scale-90 opacity-0"
              }

              border-black/[0.08]
              bg-white/90
              text-neutral-800

              dark:border-white/[0.10]
              dark:bg-[#111622]/95
              dark:text-neutral-200
            `}
          >
            <span className="flex items-center gap-1.5">
              GitHub
              <ExternalLink className="h-2.5 w-2.5" />
            </span>

            <div
              className="
                absolute
                -bottom-1
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                rotate-45
                border-r
                border-b
                border-black/[0.08]
                bg-white/90
                dark:border-white/[0.10]
                dark:bg-[#111622]
              "
            />
          </div>

          {/* GitHub button */}

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-transparent
              text-neutral-500
              transition-all
              duration-300

              hover:border-black/[0.05]
              hover:bg-black/[0.035]
              hover:text-neutral-950

              dark:text-neutral-500
              dark:hover:border-white/[0.06]
              dark:hover:bg-white/[0.05]
              dark:hover:text-white

              sm:h-11
              sm:w-11
              sm:rounded-[0.9rem]
            "
          >
            <Github className="h-[17px] w-[17px] transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]" />

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-xl
                bg-cyan-400/[0.05]
                opacity-0
                blur-md
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </a>
        </div>

        {/* ======================================================
            SECOND SEPARATOR
        ====================================================== */}

        <div
          className="
            mx-1
            h-6
            w-px
            bg-black/[0.08]
            dark:bg-white/[0.10]
          "
        />

        {/* ======================================================
            ANIMATIONS TOGGLE (PERFORMANCE MODE)
        ====================================================== */}

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredIndex("animations")}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}
          <div
            className={`
              pointer-events-none
              absolute
              -top-11
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              rounded-lg
              border
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              tracking-wide
              shadow-xl
              backdrop-blur-xl
              transition-all
              duration-200

              ${
                hoveredIndex === "animations"
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-2 scale-90 opacity-0"
              }

              border-black/[0.08]
              bg-white/90
              text-neutral-800

              dark:border-white/[0.10]
              dark:bg-[#111622]/95
              dark:text-neutral-200
            `}
          >
            {animationsEnabled ? "Graphics: Liquid WebGL" : "Performance Mode: Aurora (Lag-Free)"}

            <div
              className="
                absolute
                -bottom-1
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                rotate-45
                border-r
                border-b
                border-black/[0.08]
                bg-white/90
                dark:border-white/[0.10]
                dark:bg-[#111622]
              "
            />
          </div>

          {/* Animations button */}
          <button
            type="button"
            onClick={handleAnimationsClick}
            aria-label={animationsEnabled ? "Disable heavy animations for performance" : "Enable animations"}
            className={`
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-transparent
              text-neutral-500
              transition-all
              duration-300

              hover:border-black/[0.05]
              hover:bg-black/[0.035]
              hover:text-neutral-950

              dark:text-neutral-500
              dark:hover:border-white/[0.06]
              dark:hover:bg-white/[0.05]
              dark:hover:text-white

              sm:h-11
              sm:w-11
              sm:rounded-[0.9rem]

              ${
                bouncingId === "animations"
                  ? "animate-dock-bounce scale-110"
                  : ""
              }
            `}
          >
            {animationsEnabled ? (
              <span className="relative flex items-center justify-center">
                <Sparkles className="h-[17px] w-[17px] text-cyan-500 transition-transform duration-300 group-hover:scale-110 sm:h-[18px] sm:w-[18px]" />
                <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-[#090d17] animate-pulse" />
              </span>
            ) : (
              <span className="relative flex items-center justify-center">
                <ZapOff className="h-[17px] w-[17px] text-emerald-500 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110 sm:h-[18px] sm:w-[18px]" />
              </span>
            )}

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-xl
                bg-cyan-400/[0.05]
                opacity-0
                blur-md
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </button>
        </div>

        {/* ======================================================
            THEME TOGGLE
        ====================================================== */}

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredIndex("theme")}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}

          <div
            className={`
              pointer-events-none
              absolute
              -top-11
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              rounded-lg
              border
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              tracking-wide
              shadow-xl
              backdrop-blur-xl
              transition-all
              duration-200

              ${
                hoveredIndex === "theme"
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-2 scale-90 opacity-0"
              }

              border-black/[0.08]
              bg-white/90
              text-neutral-800

              dark:border-white/[0.10]
              dark:bg-[#111622]/95
              dark:text-neutral-200
            `}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}

            <div
              className="
                absolute
                -bottom-1
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                rotate-45
                border-r
                border-b
                border-black/[0.08]
                bg-white/90
                dark:border-white/[0.10]
                dark:bg-[#111622]
              "
            />
          </div>

          {/* Theme button */}

          <button
            type="button"
            onClick={handleThemeClick}
            aria-label="Toggle visual theme"
            className={`
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-transparent
              text-neutral-500
              transition-all
              duration-300

              hover:border-black/[0.05]
              hover:bg-black/[0.035]
              hover:text-neutral-950

              dark:text-neutral-500
              dark:hover:border-white/[0.06]
              dark:hover:bg-white/[0.05]
              dark:hover:text-white

              sm:h-11
              sm:w-11
              sm:rounded-[0.9rem]

              ${
                bouncingId === "theme"
                  ? "animate-dock-bounce"
                  : ""
              }
            `}
          >
            {theme === "dark" ? (
              <Sun className="h-[17px] w-[17px] text-amber-500 transition-transform duration-300 group-hover:rotate-45 sm:h-[18px] sm:w-[18px]" />
            ) : (
              <Moon className="h-[17px] w-[17px] text-indigo-600 transition-transform duration-300 group-hover:-rotate-12 sm:h-[18px] sm:w-[18px]" />
            )}

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-xl
                bg-violet-400/[0.05]
                opacity-0
                blur-md
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </button>
        </div>
      </div>
    </nav>
  );
}