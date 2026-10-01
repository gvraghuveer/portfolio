import { useState, useEffect } from "react";

export function useAnimations() {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-animations");
      if (saved !== null) {
        return saved === "true";
      }
    }
    // Default to without animations (performance mode) as requested
    return false;
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
