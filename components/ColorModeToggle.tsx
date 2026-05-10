"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

function ColorModeToggle({ className }: { className?: string }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-7 h-7" />;

  return (
    <button
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
      className={`p-1.5 rounded-md text-ink-faint hover:text-ink-primary hover:bg-obsidian-overlay transition-colors ${className ?? ""}`}
      aria-label="Toggle color mode"
    >
      {currentTheme === "dark"
        ? <Moon size={15} strokeWidth={1.75} />
        : <Sun size={15} strokeWidth={1.75} />}
    </button>
  );
}

export default ColorModeToggle;
