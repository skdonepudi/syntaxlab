"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import OutputWindow from "@/components/OutputWindow";
import { ExpandEditor } from "@/components/icons";
import CustomInput from "@/components/CustomInput";
import OutputDetails from "@/components/OutputDetails";
import { ExpandIcon, CompressIcon } from "@/components/icons";
import { Language } from "@/types/language";
import { handleCompile, checkStatus } from "@/lib/compilerUtils";
import { defineTheme } from "@/lib/defineTheme";
import { languages } from "@/constants/languages";
import { getDefaultCode } from "@/constants/defaultCode";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

export default function EditorPage() {
  const { theme } = useTheme();
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [code, setCode] = useState<string>(getDefaultCode(language.value));
  const [editorTheme, setEditorTheme] = useState<string>("oceanic-next");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fileName, setFileName] = useState(language.sampleFileName);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      defineTheme("oceanic-next").then(() => setEditorTheme("oceanic-next"));
    } else {
      defineTheme("eiffel").then(() => setEditorTheme("eiffel"));
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleThemeChange = (selectedTheme: string) => {
    if (["vs-dark", "light", "hc-black", "hc-light"].includes(selectedTheme)) {
      setEditorTheme(selectedTheme);
    } else {
      defineTheme(selectedTheme).then(() => setEditorTheme(selectedTheme));
    }
  };

  const handleLanguageChange = (selectedLanguage: Language) => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setFileName(selectedLanguage.sampleFileName);
      setCode(getDefaultCode(selectedLanguage.value));
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

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  const toggleEditor = useCallback(() => {
    setIsEditorExpanded(!isEditorExpanded);
  }, [isEditorExpanded]);

  return (
    <div
      className={`min-h-screen bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col ${
        isFullScreen ? "min-h-screen" : ""
      }`}
    >
      {!isFullScreen && (
        <Header
          language={language}
          onLanguageChange={handleLanguageChange}
          theme={editorTheme}
          onThemeChange={handleThemeChange}
          isProcessing={isProcessing}
          code={code}
          handleCompileClick={handleCompileClick}
        />
      )}
      <div
        className={`flex flex-col md:flex-row space-x-2 items-start ${
          isFullScreen ? "h-screen" : "flex-grow"
        } overflow-hidden`}
      >
        <div
          className={`flex flex-col w-full justify-start items-end transition-all duration-300 ease-in-out ${
            isEditorExpanded || isFullScreen
              ? "md:w-full h-screen"
              : "md:w-[70%]"
          }`}
        >
          <div className="w-full bg-slate-200 dark:bg-gray-800 p-1 flex justify-between items-center px-3 border-t border-r border-gray-300 dark:border-gray-700">
            <span className="text-[13px] font-mono">{fileName}</span>

            <div className="flex flex-row items-center gap-2">
              <button
                onClick={toggleFullScreen}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                {isFullScreen ? (
                  <CompressIcon
                    className="w-4 h-4"
                    color={theme === "dark" ? "#ffffff" : "#000000"}
                  />
                ) : (
                  <ExpandIcon
                    className="w-4 h-4"
                    color={theme === "dark" ? "#ffffff" : "#000000"}
                  />
                )}
              </button>
              {!isFullScreen && (
                <button
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  onClick={toggleEditor}
                >
                  <ExpandEditor
                    className="w-4 h-4"
                    color={theme === "dark" ? "#ffffff" : "#000000"}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="w-full flex-grow overflow-hidden">
            <CodeEditor
              theme={editorTheme}
              language={language}
              value={code}
              onChange={handleEditorChange}
            />
          </div>
        </div>

        {!isFullScreen && !isEditorExpanded && (
          <div className="right-container flex flex-col w-full md:w-[30%] flex-shrink-0 bg-slate-200 dark:bg-gray-800 transition-all duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="transition-all duration-300 ease-in-out">
                <OutputWindow outputDetails={outputDetails} position="top" />
              </div>
              <div className="flex flex-col transition-all duration-300 ease-in-out">
                <CustomInput
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                  position="bottom"
                />
              </div>
            </div>
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        )}
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
    </div>
  );
}
