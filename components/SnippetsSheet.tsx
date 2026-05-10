"use client";
import React, { useState, useEffect } from "react";
import { getUserSnippets, Snippet } from "@/lib/snippets";
import { Language } from "@/types/language";
import { languages } from "@/constants/languages";
import { getCurrentUser } from "@/utils/authUtils";
import { toast } from "react-toastify";
import { X, Search, Link2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SnippetsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (snippet: Snippet, language: Language) => void;
}

const LANG_COLORS: Record<number, string> = {
  71: "#58a6ff",
  63: "#ffa657",
  74: "#79c0ff",
  60: "#79c0ff",
  73: "#ff7b72",
  62: "#d2a8ff",
  51: "#3fb950",
  72: "#ff7b72",
};
const DEFAULT_COLOR = "#6e7681";

export function SnippetsSheet({ isOpen, onClose, onLoad }: SnippetsSheetProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "az">("newest");

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

  const displayed = snippets
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col shadow-2xl w-[340px]"
        style={{ background: "#161b22", borderLeft: "1px solid #30363d" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-border-default flex-shrink-0">
          <h2 className="text-sm font-semibold text-ink-primary">My Snippets</h2>
          <button
            onClick={onClose}
            className="text-ink-faint hover:text-ink-primary transition-colors p-1 rounded hover:bg-obsidian-overlay"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search + sort bar */}
        <div className="flex-shrink-0 px-3 py-2.5 border-b border-border-default flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none">
              <Search size={12} />
            </span>
            <input
              type="text"
              placeholder="Search snippets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-obsidian-overlay border border-border-subtle rounded-lg pl-8 pr-3 py-1.5 text-xs text-ink-primary placeholder-ink-faint outline-none focus:border-brand-blue/40 transition-colors"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "az")}
            className="bg-obsidian-overlay border border-border-subtle rounded-lg px-2 py-1.5 text-xs text-ink-muted outline-none cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="az">A–Z</option>
          </select>
        </div>

        {/* Snippet list */}
        <div className="flex-grow overflow-y-auto">
          {isLoading && (
            <>
              <div className="animate-pulse h-12 mx-3 my-2 rounded-lg bg-obsidian-overlay" />
              <div className="animate-pulse h-12 mx-3 my-2 rounded-lg bg-obsidian-overlay" />
              <div className="animate-pulse h-12 mx-3 my-2 rounded-lg bg-obsidian-overlay" />
            </>
          )}

          {!isLoading && snippets.length === 0 && (
            <div className="text-ink-faint text-xs text-center p-6">
              <p>No snippets saved yet.</p>
              <p>Press Cmd+S in the editor to save.</p>
            </div>
          )}

          {!isLoading &&
            displayed.map((s) => {
              const lang = getLanguage(s.language_id);
              const langColor = LANG_COLORS[s.language_id] ?? DEFAULT_COLOR;
              const langName = lang.label.split(" ")[0];
              const relativeTime = formatDistanceToNow(new Date(s.updated_at), {
                addSuffix: true,
              });

              return (
                <div
                  key={s.id}
                  className="group flex items-center gap-3 px-3 py-3 border-b border-border-subtle hover:bg-obsidian-overlay/60 transition-colors cursor-pointer"
                >
                  {/* Language dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: langColor }}
                  />

                  {/* Clickable content area */}
                  <div
                    className="flex-grow min-w-0"
                    onClick={() => { onLoad(s, lang); onClose(); }}
                  >
                    <p className="text-xs font-medium text-ink-primary truncate">{s.title}</p>
                    <p className="text-[10px] text-ink-faint mt-0.5">
                      {langName} · {relativeTime}
                    </p>
                  </div>

                  {/* Copy link button */}
                  <button
                    onClick={() => copyShareLink(s.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded hover:bg-obsidian-overlay text-ink-faint hover:text-ink-primary"
                    title="Copy share link"
                  >
                    <Link2 size={13} />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
