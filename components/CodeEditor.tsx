import React from "react";
import Editor from "@monaco-editor/react";
import { Language } from "@/types/language";

interface CodeEditorProps {
  language: Language;
  theme: string;
  value: string;
  isFullScreen: boolean;
  onChange: (value: string | undefined) => void;
  onCursorChange?: (pos: { line: number; column: number }) => void;
  options?: Record<string, unknown>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  theme,
  value,
  isFullScreen,
  onChange,
  onCursorChange,
  options,
}) => {
  return (
    <div
      className={`w-full ${
        isFullScreen ? "h-screen" : "h-[65vh] md:h-full"
      } overflow-auto`}
    >
      <Editor
        className="w-full h-full"
        language={language.value}
        value={value}
        theme={theme}
        onChange={onChange}
        onMount={(editor) => {
          editor.onDidChangeCursorPosition((e) => {
            onCursorChange?.({ line: e.position.lineNumber, column: e.position.column });
          });
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          ...options,
        }}
      />
    </div>
  );
};

export default CodeEditor;
