"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("site-theme") as Theme | null;
    setTheme(stored || "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme;
    root.dataset.theme = resolved;
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  return (
    <div className="theme-switcher" aria-label="Переключение темы">
      <button aria-label="Светлая тема" onClick={() => setTheme("light")} type="button">
        <Sun size={17} />
      </button>
      <button aria-label="Темная тема" onClick={() => setTheme("dark")} type="button">
        <Moon size={17} />
      </button>
      <button aria-label="Системная тема" onClick={() => setTheme("system")} type="button">
        <Monitor size={17} />
      </button>
    </div>
  );
}
