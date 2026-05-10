"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useSearchParams, useRouter } from "next/navigation";
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
import { handleCompile } from "@/lib/compilerUtils";
import { defineTheme } from "@/lib/defineTheme";
import { languages } from "@/constants/languages";
import { getDefaultCode } from "@/constants/defaultCode";
import { Snippet } from "@/lib/snippets";
import { SnippetsSheet } from "@/components/SnippetsSheet";
import { RoomProvider } from "@/lib/liveblocks";
import { AICommandBar } from "@/components/AICommandBar";
import { OutputTabs } from "@/components/OutputTabs";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });
const CollaborativeEditor = dynamic(() => import("@/components/CollaborativeEditor"), { ssr: false });

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
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const [saveTriggered, setSaveTriggered] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInOpen, setSignInOpen] = useState(false);
  const [aiCommandOpen, setAiCommandOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [outputTab, setOutputTab] = useState<"output" | "ai">("output");

  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");

  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("signed_in") === "1") {
      toast.success("Signed in successfully");
      const params = new URLSearchParams(searchParams.toString());
      params.delete("signed_in");
      const newUrl = params.toString() ? `?${params}` : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        setSaveTriggered((v) => v + 1);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setAiCommandOpen((v) => !v);
      }
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
          const result = await handleCompile(language, code, customInput);
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

  const editorContent = (
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
          currentSnippet={currentSnippet}
          saveTriggered={saveTriggered}
          onSnippetSaved={setCurrentSnippet}
          onSnippetsClick={() => setSnippetsOpen(true)}
          onNewSnippet={() => { setCurrentSnippet(null); setCode(getDefaultCode(language.value)); }}
          onSignInRequired={() => setSignInOpen(true)}
          roomId={roomId}
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
        <div className={`relative flex flex-col ${isFullScreen ? "w-full" : "w-full md:w-[68%]"} overflow-hidden`}>
          <div className="flex-grow overflow-hidden">
            {roomId ? (
              <CollaborativeEditor
                theme={editorTheme}
                language={language}
                isFullScreen={isFullScreen}
                onChange={(v) => setCode(v || "")}
                onCursorChange={setCursorPosition}
              />
            ) : (
              <CodeEditor
                theme={editorTheme}
                language={language}
                value={code}
                isFullScreen={isFullScreen}
                onChange={(v) => setCode(v || "")}
                onCursorChange={setCursorPosition}
              />
            )}
          </div>
          <AICommandBar
            isOpen={aiCommandOpen}
            onClose={() => setAiCommandOpen(false)}
            code={code}
            language={language}
            output={outputDetails?.stdout ? atob(outputDetails.stdout) : outputDetails?.stderr ? atob(outputDetails.stderr) : undefined}
            stdin={customInput}
            onResponse={(text) => { setAiResponse(text); setOutputTab("ai"); }}
          />
        </div>

        {/* Output panel */}
        {!isFullScreen && (
          <div className="hidden md:flex flex-col w-[32%] border-l border-border-default bg-obsidian-base">
            <OutputTabs activeTab={outputTab} onTabChange={setOutputTab} hasAIResponse={!!aiResponse}>
              {outputTab === "output" ? (
                <>
                  <OutputWindow outputDetails={outputDetails} position="top" />
                  <CustomInput customInput={customInput} setCustomInput={setCustomInput} position="bottom" />
                  {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </>
              ) : (
                <div className="p-3 overflow-y-auto h-full">
                  <pre className="text-xs text-ink-primary whitespace-pre-wrap font-mono leading-relaxed">{aiResponse}</pre>
                </div>
              )}
            </OutputTabs>
          </div>
        )}
      </div>

      <StatusBar
        language={language}
        cursorPosition={cursorPosition}
        judgeStatus={judgeStatus}
      />

      <SnippetsSheet
        isOpen={snippetsOpen}
        onClose={() => setSnippetsOpen(false)}
        onLoad={(snippet, lang) => {
          setCurrentSnippet(snippet);
          setLanguage(lang);
          setCode(snippet.code);
          toast.success(`Loaded: ${snippet.title}`, { autoClose: 1500 });
        }}
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

  if (roomId) {
    return (
      <RoomProvider id={roomId} initialPresence={{ cursor: null, name: "", color: "" }}>
        {editorContent}
      </RoomProvider>
    );
  }
  return editorContent;
}
