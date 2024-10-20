import React from "react";
import Editor from "@monaco-editor/react";
import { Language } from "@/types/language";

interface CodeEditorProps {
  language: Language;
  theme: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  theme,
  value,
  onChange,
}) => {
  return (
    <div className="overlay rounded-lg overflow-hidden w-full h-full shadow-4xl">
      <Editor
        className="rounded-lg border border-gray-300"
        height="90vh"
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
