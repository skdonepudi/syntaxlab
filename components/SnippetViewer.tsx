"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Snippet } from "@/lib/snippets";
import { Language } from "@/types/language";
import { Code2 } from "lucide-react";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

interface SnippetViewerProps {
  snippet: Snippet;
  language: Language;
}

export function SnippetViewer({ snippet, language }: SnippetViewerProps) {
  const forkUrl = `/editor?code=${encodeURIComponent(snippet.code)}&langId=${snippet.language_id}`;

  return (
    <div className="flex flex-col h-screen bg-obsidian-base text-ink-primary">
      <header className="flex items-center justify-between h-11 px-4 bg-obsidian-surface border-b border-border-default shrink-0">
        <div className="flex items-center gap-2">
          <div style={{ width: 20, height: 20, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Code2 size={11} color="white" strokeWidth={2.5} />
            </div>
          <span className="text-sm font-medium text-ink-muted">{snippet.title}</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-obsidian-overlay text-ink-faint border border-border-default">
            {language.label.split(" ")[0]}
          </span>
        </div>
        <Link
          href={forkUrl}
          className="text-xs px-3 py-1.5 rounded bg-brand-blue text-obsidian-base font-semibold hover:bg-brand-blue/90 transition-colors"
        >
          Fork →
        </Link>
      </header>
      <div className="flex-grow overflow-hidden">
        <CodeEditor
          language={language}
          theme="night-owl"
          value={snippet.code}
          isFullScreen={false}
          onChange={() => {}}
          options={{ readOnly: true }}
        />
      </div>
    </div>
  );
}
