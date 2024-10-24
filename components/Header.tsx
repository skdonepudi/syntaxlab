import React from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import ColorModeToggle from "@/components/ColorModeToggle";
import { Language } from "@/types/language";
import { RunIcon, SyntaxLabIcon } from "./icons";

function Header({
  language,
  theme,
  code,
  isProcessing,
  handleCompileClick,
  onThemeChange,
  onLanguageChange,
}: {
  language: Language;
  theme: string;
  code: string;
  isProcessing: boolean;
  handleCompileClick: () => void;
  onThemeChange: (theme: string) => void;
  onLanguageChange: (language: Language) => void;
}) {
  const { theme: currentTheme } = useTheme();
  return (
    <header
      className="flex flex-col md:flex-row justify-between items-center p-2 px-4 bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-2">
        <SyntaxLabIcon
          className="w-8 h-8 dark:fill-white"
          color={currentTheme === "dark" ? "#fff" : "#000"}
        />
        <h1 className="text-xl mr-4 font-semibold text-slate-800 dark:text-white">
          SyntaxLab
        </h1>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          <LanguagesDropdown
            language={language}
            onSelectChange={onLanguageChange}
          />
          <ThemeDropdown theme={theme} onThemeChange={onThemeChange} />
        </div>
        <button
          className={clsx(
            "bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-3 rounded ml-12",
            isProcessing || !code ? "opacity-50 cursor-not-allowed" : ""
          )}
          onClick={handleCompileClick}
          disabled={isProcessing || !code}
        >
          {isProcessing ? (
            "Processing..."
          ) : (
            <div className="flex flex-row items-center gap-2">
              <RunIcon color="#ffffff" width={16} height={16} />
              <p className="text-sm">Run</p>
            </div>
          )}
        </button>
      </div>
      <ColorModeToggle />
    </header>
  );
}

export default Header;
