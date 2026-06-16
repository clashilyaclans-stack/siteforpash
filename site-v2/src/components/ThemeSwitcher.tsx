"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("site-theme");
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  return (
    <div className="theme-switcher two-state" aria-label="Переключение темы">
      <button
        aria-label="Светлая тема"
        aria-pressed={theme === "light"}
        className={theme === "light" ? "active" : ""}
        onClick={() => setTheme("light")}
        type="button"
      >
        <Sun size={17} />
      </button>
      <button
        aria-label="Темная тема"
        aria-pressed={theme === "dark"}
        className={theme === "dark" ? "active" : ""}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <Moon size={17} />
      </button>
    </div>
  );
}
