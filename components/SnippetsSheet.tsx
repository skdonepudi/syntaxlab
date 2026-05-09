"use client";
import React, { useState, useEffect } from "react";
import { getUserSnippets, Snippet } from "@/lib/snippets";
import { Language } from "@/types/language";
import { languages } from "@/constants/languages";
import { getCurrentUser } from "@/utils/authUtils";
import { toast } from "react-toastify";

interface SnippetsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (snippet: Snippet, language: Language) => void;
}

export function SnippetsSheet({ isOpen, onClose, onLoad }: SnippetsSheetProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    getCurrentUser().then(async (user) => {
      if (!user) { setIsLoading(false); return; }
      const data = await getUserSnippets(user.id);
      setSnippets(data);
      setIsLoading(false);
    });
  }, [isOpen]);

  const copyShareLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/s/${id}`);
    toast.success("Link copied", { autoClose: 1500 });
  };

  const getLanguage = (langId: number) =>
    languages.find((l) => l.id === langId) ?? languages[0];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-obsidian-surface border-l border-border-default flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
          <h2 className="text-sm font-semibold text-ink-primary">My Snippets</h2>
          <button onClick={onClose} className="text-ink-faint hover:text-ink-primary text-lg leading-none">×</button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {isLoading && <p className="text-ink-faint text-xs p-4">Loading...</p>}
          {!isLoading && snippets.length === 0 && (
            <p className="text-ink-faint text-xs p-4">No snippets yet. Save one with Cmd+S.</p>
          )}
          {snippets.map((s) => {
            const lang = getLanguage(s.language_id);
            return (
              <div key={s.id} className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle hover:bg-obsidian-overlay group">
                <div className="flex-grow min-w-0 cursor-pointer" onClick={() => { onLoad(s, lang); onClose(); }}>
                  <p className="text-xs text-ink-primary truncate font-medium">{s.title}</p>
                  <p className="text-[11px] text-ink-faint">{lang.label.split(" ")[0]} · {s.is_public ? "Public" : "Private"}</p>
                </div>
                <button
                  onClick={() => copyShareLink(s.id)}
                  className="opacity-0 group-hover:opacity-100 text-ink-faint hover:text-ink-primary text-xs transition-opacity"
                  title="Copy share link"
                >⎘</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
