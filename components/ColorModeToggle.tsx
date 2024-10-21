import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { DarkModeIcon, LightModeIcon } from "./icons";

function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle color mode"
    >
      {theme === "dark" ? (
        <DarkModeIcon color="#ffffff" />
      ) : (
        <LightModeIcon color="#000000" />
      )}
    </button>
  );
}

export default ColorModeToggle;
