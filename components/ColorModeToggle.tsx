import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { DarkModeIcon, LightModeIcon } from "./icons";

function ColorModeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
      className="p-1.5 rounded-full bg-gray-200/70 dark:bg-gray-700/70"
      aria-label="Toggle color mode"
    >
      {currentTheme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </button>
  );
}

export default ColorModeToggle;
