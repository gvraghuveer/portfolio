import { useState, useRef } from "react";
import { profile } from "../data/profile";

const UID = "wf-raghu";

export function WordmarkFooter() {
  const containerRef = useRef(null);
  const [shineCenter, setShineCenter] = useState({ x: 500, y: 80 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 160;
    setShineCenter({ x, y });
  };

  const handleMouseLeave = () => {
    setShineCenter({ x: 500, y: 80 });
  };

  return (
    <section
      aria-label="Signature wordmark"
      className="relative w-full overflow-hidden select-none"
      style={{ paddingTop: "clamp(20px, 3cqw, 48px)" }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 cursor-default"
      >
        <svg
          viewBox="0 0 1000 220"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block"
          aria-label={profile.shortName}
        >
          <defs>
            <radialGradient
              id={`${UID}-shine`}
              gradientUnits="userSpaceOnUse"
              cx={shineCenter.x}
              cy={shineCenter.y}
              r="700"
            >
              <stop offset="0%"   stopColor="var(--wf-s1)" />
              <stop offset="24%"  stopColor="var(--wf-s2)" />
              <stop offset="50%"  stopColor="var(--wf-s3)" />
              <stop offset="100%" stopColor="var(--wf-s4)" />
            </radialGradient>

            <linearGradient id={`${UID}-maskg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#fff" stopOpacity="1" />
              <stop offset="60%"  stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.55" />
            </linearGradient>

            <mask id={`${UID}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="220">
              <rect width="1000" height="220" fill={`url(#${UID}-maskg)`} />
            </mask>
          </defs>

          <text
            x="500"
            y="208"
            textAnchor="middle"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="240"
            fontWeight="700"
            letterSpacing="-0.05em"
            fill={`url(#${UID}-shine)`}
            mask={`url(#${UID}-mask)`}
            style={{ userSelect: "none" }}
          >
            {profile.shortName}
          </text>
        </svg>

        <div
          className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
          style={{ background: "var(--wf-line)" }}
        />
      </div>
    </section>
  );
}
