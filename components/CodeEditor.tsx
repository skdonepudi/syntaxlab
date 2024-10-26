import React from "react";
import Editor from "@monaco-editor/react";
import { Language } from "@/types/language";

interface CodeEditorProps {
  language: Language;
  theme: string;
  value: string;
  isFullScreen: boolean;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  theme,
  value,
  isFullScreen,
  onChange,
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
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
