"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import OutputWindow from "@/components/OutputWindow";
import { ExpandEditor, RunIcon } from "@/components/icons";
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
  const { resolvedTheme } = useTheme();
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [code, setCode] = useState<string>(getDefaultCode(language.value));
  const [editorTheme, setEditorTheme] = useState<string>("oceanic-next");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fileName, setFileName] = useState(language.sampleFileName);
  const [languageIcon, setLanguageIcon] = useState(language.icon);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      defineTheme("night-owl").then(() => setEditorTheme("night-owl"));
    } else {
      defineTheme("eiffel").then(() => setEditorTheme("eiffel"));
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        handleCompileClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setLanguageIcon(selectedLanguage.icon);
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
    <div className="flex flex-col h-screen bg-slate-200 dark:bg-slate-800 text-gray-900 dark:text-white">
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
      <div className="flex flex-col md:flex-row flex-grow overflow-auto md:overflow-hidden space-x-2">
        <div
          className={`flex flex-col transition-all duration-300 ease-in-out ${
            isEditorExpanded || isFullScreen ? "w-full" : "w-full md:w-[70%]"
          }`}
        >
          <div className="bg-slate-200 dark:bg-slate-800  flex justify-between items-center px-3  border-r border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-2 bg-white dark:bg-[#011727]  px-2 py-1.5 border-t border-blue-500">
              <Image
                src={languageIcon}
                alt="Language Icon"
                className="w-4 h-4"
                width={16}
                height={16}
              />
              <span className="text-[13px]">{fileName}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullScreen}
                className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded"
              >
                {isFullScreen ? (
                  <CompressIcon className="w-4 h-4" />
                ) : (
                  <ExpandIcon className="w-4 h-4" />
                )}
              </button>
              {!isFullScreen && (
                <button
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  onClick={toggleEditor}
                >
                  <ExpandEditor className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex-grow overflow-auto md:overflow-hidden">
            <CodeEditor
              theme={editorTheme}
              language={language}
              value={code}
              onChange={handleEditorChange}
            />
          </div>
        </div>

        {!isFullScreen && !isEditorExpanded && (
          <div className="md:flex flex-col w-full md:w-[30%] bg-slate-200 dark:bg-slate-800">
            <OutputWindow outputDetails={outputDetails} position="top" />
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
              position="bottom"
            />
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        )}
      </div>

      <button
        onClick={handleCompileClick}
        disabled={isProcessing}
        className="md:hidden fixed bottom-12 right-4 bg-green-600 dark:bg-blue-700 hover:bg-slate-700 text-white rounded-full p-3 shadow-lg z-50"
      >
        <RunIcon width={16} height={16} />
      </button>

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
