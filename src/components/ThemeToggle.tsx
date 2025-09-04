"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // On mount, check saved theme or system preference
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (saved) setTheme(saved);
    else if (systemPrefersDark) setTheme("dark");
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="p-2 rounded-md hover-effect w-10 h-10 flex items-center justify-center">
        <Moon className="w-5 h-5 text-gray-600" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="p-2 rounded-md hover-effect w-10 h-10 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Moon className="w-5 h-5 text-gray-800" />
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 text-yellow-400" />
        </>
      )}
    </button>
  );
}
