import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import ColorModeToggle from "@/components/ColorModeToggle";
import { Language } from "@/types/language";
import { SyntaxLabIcon } from "./icons";

function Header({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}) {
  const { theme: currentTheme } = useTheme();
  return (
    <header
      className="flex flex-col md:flex-row justify-between items-center p-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-2">
        <SyntaxLabIcon
          className="w-8 h-8 dark:fill-white"
          color={currentTheme === "dark" ? "#fff" : "#000"}
        />
        <h1 className="text-2xl mr-4 font-bold">SyntaxLab</h1>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          <LanguagesDropdown
            language={language}
            onSelectChange={onLanguageChange}
          />
          <ThemeDropdown theme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>
      <ColorModeToggle />
    </header>
  );
}

export default Header;
