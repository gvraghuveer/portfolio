import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme) {
        return savedTheme;
      }
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
