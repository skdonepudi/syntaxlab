"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import LanguagesDropdown from "@/components/LanguagesDropdown";
import ThemeDropdown from "@/components/ThemeDropdown";
import OutputWindow from "@/components/OutputWindow";
import { RunIcon } from "@/components/icons";
import CustomInput from "@/components/CustomInput";
import OutputDetails from "@/components/OutputDetails";
import { Language } from "@/types/language";
import { handleCompile, checkStatus } from "@/lib/compilerUtils";
import { defineTheme } from "@/lib/defineTheme";
import { languages } from "@/constants/languages";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

export default function EditorPage() {
  const [code, setCode] = useState<string>("// Start coding here");
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [theme, setTheme] = useState<string>("oceanic-next");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("");
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

  const handleCompileClick = async () => {
    setIsProcessing(true);
    toast.promise(
      (async () => {
        try {
          const token = await handleCompile(language, code, customInput);
          const result = await checkStatus(token);
          setOutputDetails(result);
        } catch (error) {
          throw error;
        } finally {
          setIsProcessing(false);
        }
      })(),
      {
        pending: "Processing your request...",
        error: "Error compiling code",
        success: "Compilation successful",
      }
    );
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
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              className={clsx(
                "bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded",
                isProcessing || !code ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={handleCompileClick}
              disabled={isProcessing || !code}
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <div className="flex flex-row items-center gap-3">
                  <RunIcon color="#ffffff" /> Compile
                  {/* (<CmdIcon /> + <EnterIcon />) */}
                </div>
              )}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
