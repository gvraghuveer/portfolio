import { useState, useEffect } from "react";

export function useAnimations() {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-animations");
      if (saved !== null) {
        return saved === "true";
      }
      // If user has system preference for reduced motion, start disabled
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (animationsEnabled) {
      root.classList.remove("disable-animations");
    } else {
      root.classList.add("disable-animations");
    }
    localStorage.setItem("portfolio-animations", String(animationsEnabled));
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev);
  };

  return { animationsEnabled, toggleAnimations };
}
