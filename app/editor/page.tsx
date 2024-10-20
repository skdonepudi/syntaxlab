"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import { defineTheme } from "@/lib/defineTheme";
import { languages } from "@/constants/languages";
import { Language } from "@/types/language";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

export default function EditorPage() {
  const [code, setCode] = useState<string>("// Start coding here");
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [theme, setTheme] = useState<string>("oceanic-next");
  useEffect(() => {
    defineTheme("oceanic-next").then(() => setTheme("oceanic-next"));
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleThemeChange = (selectedTheme: string) => {
    if (["vs-dark", "light", "hc-black", "hc-light"].includes(selectedTheme)) {
      setTheme(selectedTheme);
    } else {
      defineTheme(selectedTheme).then(() => setTheme(selectedTheme));
    }
  };
  const handleLanguageChange = (selectedLanguage: Language) => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown
            language={language}
            onSelectChange={handleLanguageChange}
          />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown theme={theme} onThemeChange={handleThemeChange} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditor
            theme={theme}
            language={language}
            value={code}
            onChange={handleEditorChange}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <div className="flex flex-col items-end"></div>
        </div>
      </div>
    </>
  );
}
