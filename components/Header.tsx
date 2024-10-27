import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { User } from "@supabase/supabase-js";
import { Language } from "@/types/language";
import { RunIcon, SyntaxLabIcon, MenuIcon } from "./icons";
import { getCurrentUser } from "@/utils/authUtils";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import ColorModeToggle from "@/components/ColorModeToggle";
import { UserMenu } from "@/components/UserMenu";
import { SignInDialog } from "@/components/SignInDialog";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-slate-50/30 dark:bg-[#011727]/30 backdrop-blur-md z-10 transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />
      <header className="relative z-20 flex flex-col md:flex-row justify-between items-center p-2 px-4 bg-slate-50 dark:bg-[#011727] text-gray-900 dark:text-white">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
            <div className="flex items-center gap-2">
              <SyntaxLabIcon className="w-8 h-8" />
              <h1 className="text-xl mr-4 font-semibold text-slate-800 dark:text-white">
                SyntaxLab
              </h1>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <ColorModeToggle />
              {isLoading ? (
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              ) : user ? (
                <UserMenu user={user} setUser={setUser} />
              ) : (
                <SignInDialog />
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div
            className={clsx(
              "absolute left-0 right-0 top-full md:static",
              "flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto",
              "bg-slate-50/90 dark:bg-[#011727]/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none",
              "p-4 md:p-0",
              "transition-all duration-300 ease-in-out",
              "z-20",
              isMenuOpen
                ? "max-h-[300px] opacity-100 pointer-events-auto"
                : "max-h-0 opacity-0 pointer-events-none md:max-h-full md:opacity-100 md:pointer-events-auto",
              "overflow-hidden md:overflow-visible"
            )}
          >
            <LanguagesDropdown
              language={language}
              onSelectChange={onLanguageChange}
            />
            <ThemeDropdown theme={theme} onThemeChange={onThemeChange} />
            <div className="flex items-center">
              <div className="ml-12">
                <button
                  className={clsx(
                    "bg-green-600 dark:bg-blue-700 hover:bg-green-700 dark:hover:bg-blue-800 text-white font-semibold py-2 px-3 rounded",
                    isProcessing || !code
                      ? "opacity-50 cursor-not-allowed"
                      : "",
                    "w-full md:w-auto",
                    "hidden md:block"
                  )}
                  onClick={handleCompileClick}
                  disabled={isProcessing || !code}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <div className="flex flex-row items-center justify-center gap-2 ">
                      <RunIcon width={16} height={16} />
                      <p className="text-sm">Run</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 mr-2">
          <ColorModeToggle />
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          ) : user ? (
            <UserMenu user={user} setUser={setUser} />
          ) : (
            <SignInDialog />
          )}
        </div>
      </header>
    </>
  );
}
export default Header;
