"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Topbar } from "@/components/layout/Topbar";
import { TabBar } from "@/components/layout/TabBar";
import { StatusBar } from "@/components/layout/StatusBar";
import OutputWindow from "@/components/OutputWindow";
import CustomInput from "@/components/CustomInput";
import OutputDetails from "@/components/OutputDetails";
import { Language } from "@/types/language";
import { handleCompile, checkStatus } from "@/lib/compilerUtils";
import { defineTheme } from "@/lib/defineTheme";
import { languages } from "@/constants/languages";
import { getDefaultCode } from "@/constants/defaultCode";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

export default function EditorPage() {
  const { resolvedTheme } = useTheme();
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [code, setCode] = useState<string>(getDefaultCode(language.value));
  const [editorTheme, setEditorTheme] = useState<string>("oceanic-next");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [judgeStatus, setJudgeStatus] = useState<string | undefined>();

  useEffect(() => {
    if (resolvedTheme === "dark") {
      defineTheme("night-owl").then(() => setEditorTheme("night-owl"));
    } else {
      defineTheme("eiffel").then(() => setEditorTheme("eiffel"));
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleCompileClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(getDefaultCode(lang.value));
  };

  const handleThemeChange = (theme: string) => {
    if (["vs-dark", "light", "hc-black", "hc-light"].includes(theme)) {
      setEditorTheme(theme);
    } else {
      defineTheme(theme).then(() => setEditorTheme(theme));
    }
  };

  const handleCompileClick = async () => {
    setIsProcessing(true);
    setJudgeStatus("Submitting...");
    toast.promise(
      (async () => {
        try {
          const token = await handleCompile(language, code, customInput);
          setJudgeStatus("Running...");
          const result = await checkStatus(token);
          setOutputDetails(result);
          setJudgeStatus(undefined);
        } catch (error) {
          setJudgeStatus(undefined);
          throw error;
        } finally {
          setIsProcessing(false);
        }
      })(),
      { pending: "Running...", error: "Compilation error", success: "Done" }
    );
  };

  const toggleFullScreen = useCallback(() => setIsFullScreen((v) => !v), []);

  return (
    <div className="flex flex-col h-screen bg-obsidian-base text-ink-primary overflow-hidden">
      {!isFullScreen && (
        <Topbar
          language={language}
          theme={editorTheme}
          code={code}
          isProcessing={isProcessing}
          onLanguageChange={handleLanguageChange}
          onThemeChange={handleThemeChange}
          handleCompileClick={handleCompileClick}
        />
      )}

      <TabBar
        language={language}
        fileName={language.sampleFileName}
        isFullScreen={isFullScreen}
        onToggleFullScreen={toggleFullScreen}
      />

      <div className="flex flex-grow overflow-hidden">
        {/* Editor */}
        <div className={`flex flex-col ${isFullScreen ? "w-full" : "w-full md:w-[68%]"} overflow-hidden`}>
          <div className="flex-grow overflow-hidden">
            <CodeEditor
              theme={editorTheme}
              language={language}
              value={code}
              isFullScreen={isFullScreen}
              onChange={(v) => setCode(v || "")}
              onCursorChange={setCursorPosition}
            />
          </div>
        </div>

        {/* Output panel */}
        {!isFullScreen && (
          <div className="hidden md:flex flex-col w-[32%] border-l border-border-default bg-obsidian-base">
            <OutputWindow outputDetails={outputDetails} position="top" />
            <CustomInput customInput={customInput} setCustomInput={setCustomInput} position="bottom" />
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        )}
      </div>

      <StatusBar
        language={language}
        cursorPosition={cursorPosition}
        judgeStatus={judgeStatus}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        theme="dark"
        toastStyle={{ background: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
      />
    </div>
  );
}
