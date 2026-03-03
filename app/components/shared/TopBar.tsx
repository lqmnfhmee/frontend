"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Menu } from "lucide-react";

interface TopBarProps {
  onToggle: () => void;
}

export default function TopBar({ onToggle }: TopBarProps) {
  const [theme, setTheme] = useState<string | null>(null);

  // Initialize theme safely
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (savedTheme === "dark") {
      root.classList.add("dark");
      setTheme("dark");
    } else {
      root.classList.add("light");
      setTheme("light");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "light") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  if (!theme) return null;

  return (
    <header
      className="
        h-14
        bg-white dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-800
        flex items-center justify-between
        px-6
        z-20
        transition-colors duration-300
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* SIDEBAR TOGGLE */}
        <button
          onClick={onToggle}
          className="
            p-2 rounded-lg
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-all duration-200
            text-slate-600 dark:text-slate-300
            hover:scale-105 active:scale-95
          "
        >
          <Menu size={20} />
        </button>

        {/* PLANT SELECTOR */}
        <div
          className="
            px-3 py-1
            border border-slate-200 dark:border-slate-700
            rounded-md text-sm
            text-slate-700 dark:text-slate-300
          "
        >
          Larut-A (LRA)
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 text-slate-600 dark:text-slate-300">

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg
            bg-slate-100 dark:bg-slate-800
            hover:scale-110 active:scale-95
            transition-all duration-200
          "
        >
          {theme === "light" ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>

        {/* SETTINGS */}
        <button className="hover:scale-110 active:scale-95 transition">
          ⚙️
        </button>

        {/* NOTIFICATIONS */}
        <button className="hover:scale-110 active:scale-95 transition">
          🔔
        </button>

        {/* USER AVATAR */}
        <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-sm font-medium shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}