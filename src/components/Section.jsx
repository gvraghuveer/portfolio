import { useEffect, useRef, useState } from "react";

export function CornerMark({ position }) {
  const isTop = position.includes("top");
  const isLeft = position.includes("left");

  let borderClasses = "";

  if (isTop && isLeft) {
    borderClasses =
      "border-l-2 border-t-2 border-cyan-500/40 dark:border-cyan-400/40";
  }

  if (isTop && !isLeft) {
    borderClasses =
      "border-r-2 border-t-2 border-cyan-500/40 dark:border-cyan-400/40";
  }

  if (!isTop && isLeft) {
    borderClasses =
      "border-l-2 border-b-2 border-cyan-500/40 dark:border-cyan-400/40";
  }

  if (!isTop && !isLeft) {
    borderClasses =
      "border-r-2 border-b-2 border-cyan-500/40 dark:border-cyan-400/40";
  }

  return (
    <div
      className={`absolute hidden sm:block pointer-events-none w-2.5 h-2.5 bg-transparent transition-all duration-500 ${
        isTop ? "top-3" : "bottom-3"
      } ${isLeft ? "left-3" : "right-3"} ${borderClasses}`}
    />
  );
}

// export function SectionDivider() {
//   return (
//     <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 my-10 pointer-events-none">
//       <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 dark:via-cyan-400/20 to-transparent" />
//     </div>
//   );
// }

export function Section({
  children,
  id,
  className = "",
  sectionClassName = "",
  hasDivider = true,
  ...props
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    const currentEl = sectionRef.current;

    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <>
      <section
        id={id}
        ref={sectionRef}
        className={`relative w-full py-6 transition-all duration-700 ${sectionClassName}`}
        {...props}
      >
        {/* Wider floating glass container */}
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`
              relative
              rounded-[2rem]
              p-6
              sm:p-8
              md:p-10
              overflow-hidden
              backdrop-blur-2xl
              transition-all
              duration-700

              ${
                isVisible
                  ? `
                    bg-white/70
                    dark:bg-[#080d18]/75

                    border
                    border-cyan-500/25
                    dark:border-cyan-400/20

                    shadow-[0_30px_80px_rgba(15,23,42,0.10),0_0_50px_rgba(6,182,212,0.06)]
                    dark:shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_50px_rgba(6,182,212,0.08)]

                    scale-100
                    opacity-100
                  `
                  : `
                    bg-white/50
                    dark:bg-[#080d18]/55

                    border
                    border-neutral-300/60
                    dark:border-white/[0.08]

                    shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                    dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]

                    scale-[0.99]
                    opacity-90
                  `
              }

              ${className}
            `}
          >
            {/* Subtle internal gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.025] via-transparent to-violet-500/[0.025] dark:from-cyan-400/[0.025] dark:to-violet-400/[0.025]" />

            {/* Subtle grid */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.025]
                dark:opacity-[0.035]
              "
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)
                `,
                backgroundSize: "36px 36px",
              }}
            />

            {/* Corner marks */}
            <CornerMark position="top-left" />
            <CornerMark position="top-right" />
            <CornerMark position="bottom-left" />
            <CornerMark position="bottom-right" />

            {/* Active view indicator */}
            {isVisible && (
              <div className="absolute top-4 right-4 sm:top-5 sm:right-6 hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-cyan-600 dark:text-cyan-400">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-cyan-400 opacity-50 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                </span>

                <span className="font-semibold tracking-[0.15em]">
                  ACTIVE VIEW
                </span>
              </div>
            )}

            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </section>

      {/* {hasDivider && <SectionDivider />} */}
      {hasDivider}
    </>
  );
}