"use client";
import React from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Language } from "@/types/language";

interface CodeEditorProps {
  language: Language;
  theme: string;
  value: string;
  isFullScreen: boolean;
  onChange: (value: string | undefined) => void;
  onCursorChange?: (pos: { line: number; column: number }) => void;
  options?: Record<string, unknown>;
  roomId?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language, theme, value, isFullScreen, onChange, onCursorChange, options, roomId,
}) => {
  const handleMount: OnMount = (editor) => {
    if (onCursorChange) {
      editor.onDidChangeCursorPosition((e) => {
        onCursorChange({ line: e.position.lineNumber, column: e.position.column });
      });
    }
  };

  return (
    <div className={`w-full ${isFullScreen ? "h-screen" : "h-[65vh] md:h-full"} overflow-auto`}>
      <Editor
        className="w-full h-full"
        language={language.value}
        value={roomId ? undefined : value}
        theme={theme}
        onChange={onChange}
        onMount={handleMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-geist-mono), 'JetBrains Mono', monospace",
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbersMinChars: 3,
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          ...options,
        }}
      />
    </div>
  );
};

export default CodeEditor;
