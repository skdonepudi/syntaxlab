"use client";
import React, { useEffect, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { MonacoBinding } from "y-monaco";
import { useRoom, useSelf } from "@/lib/liveblocks";
import { Language } from "@/types/language";

interface CollaborativeEditorProps {
  language: Language;
  theme: string;
  isFullScreen: boolean;
  onChange: (value: string | undefined) => void;
  onCursorChange?: (pos: { line: number; column: number }) => void;
  options?: Record<string, unknown>;
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  language, theme, isFullScreen, onChange, onCursorChange, options,
}) => {
  const room = useRoom();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const self = useSelf() as any;
  const bindingRef = useRef<MonacoBinding | null>(null);

  // Extract primitives so the effect depends on values, not the self object
  // reference — prevents an infinite loop where setLocalStateField triggers
  // a Liveblocks update → new self reference → effect re-fires.
  const selfColor: string = self?.info?.color ?? "#58a6ff";
  const selfName: string = self?.info?.name ?? "Guest";

  useEffect(() => {
    const provider = getYjsProviderForRoom(room);
    provider.awareness.setLocalStateField("lbInfo", { color: selfColor, name: selfName });
  }, [room, selfColor, selfName]);

  const handleMount: OnMount = (editor) => {
    // getYjsProviderForRoom caches one provider per room and owns the Y.Doc.
    // Using it avoids a race condition where a fresh Y.Doc hasn't synced yet.
    const provider = getYjsProviderForRoom(room);
    const ydoc = provider.getYDoc();
    const ytext = ydoc.getText("monaco");
    const awareness = provider.awareness;

    // Fallback palette if a client hasn't set lbInfo yet
    const FALLBACK = ["#58a6ff", "#3fb950", "#ffa657", "#d2a8ff", "#ff7b72", "#79c0ff", "#56d364"];

    const injectCursorStyles = () => {
      const styleId = "yjs-cursor-styles";
      let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      let css = "";
      awareness.getStates().forEach((state: unknown, clientID: number) => {
        if (clientID === ydoc.clientID) return;
        const s = state as Record<string, unknown>;
        const lbInfo = s.lbInfo as { color?: string; name?: string } | undefined;
        const c = lbInfo?.color ?? FALLBACK[clientID % FALLBACK.length];
        const name = (lbInfo?.name ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');

        css += `.yRemoteSelection-${clientID}{background:${c}28;}\n`;
        css += `.yRemoteSelectionHead-${clientID}{border-color:${c};}\n`;
        if (name) {
          css += `.yRemoteSelectionHead-${clientID}::before{`
            + `content:"${name}";`
            + `position:absolute;`
            + `top:-20px;left:-2px;`
            + `font-size:10px;font-weight:600;font-family:system-ui,sans-serif;`
            + `padding:1px 6px;border-radius:3px 3px 3px 0;`
            + `background:${c};color:#fff;`
            + `white-space:nowrap;pointer-events:none;line-height:1.6;`
            + `}\n`;
        }
      });
      styleEl.textContent = css;
    };

    awareness.on("change", injectCursorStyles);
    injectCursorStyles();

    const model = editor.getModel();
    if (!model) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const binding = new MonacoBinding(ytext, model, new Set([editor]), awareness as any);
    bindingRef.current = binding;

    if (onCursorChange) {
      editor.onDidChangeCursorPosition((e) => {
        onCursorChange({ line: e.position.lineNumber, column: e.position.column });
      });
    }

    editor.getModel()?.onDidChangeContent(() => {
      onChange(editor.getValue());
    });
  };

  useEffect(() => {
    return () => {
      bindingRef.current?.destroy();
    };
  }, []);

  return (
    <div className={`w-full ${isFullScreen ? "h-screen" : "h-[65vh] md:h-full"} overflow-auto`}>
      <Editor
        className="w-full h-full"
        language={language.value}
        theme={theme}
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

export default CollaborativeEditor;
