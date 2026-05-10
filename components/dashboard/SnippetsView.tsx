"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { type Snippet } from "@/lib/snippets";
import { type Language } from "@/types/language";
import { languages } from "@/constants/languages";
import { DeleteSnippetButton } from "@/components/dashboard/DeleteSnippetButton";

const LANG_COLORS: Record<number, string> = {
  71: "#58a6ff",  // Python
  63: "#ffa657",  // JavaScript
  74: "#79c0ff",  // TypeScript
  60: "#79c0ff",  // Go
  73: "#ff7b72",  // Rust
  62: "#d2a8ff",  // Java
  51: "#3fb950",  // C#
  72: "#ff7b72",  // Ruby
};
const DEFAULT_COLOR = "#6e7681";

function getLangColor(languageId: number): string {
  return LANG_COLORS[languageId] ?? DEFAULT_COLOR;
}

function codePreview(code: string): string {
  const line = code.split("\n").find((l) => {
    const t = l.trim();
    return (
      t.length > 2 &&
      !t.startsWith("//") &&
      !t.startsWith("#") &&
      !t.startsWith("/*") &&
      !t.startsWith("*")
    );
  });
  return line?.trim() ?? "";
}

export function SnippetsView({ snippets }: { snippets: Snippet[] }) {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<number | null>(null);
  const [sort, setSort] = useState<"newest" | "oldest" | "az">("newest");

  const uniqueLangs = Array.from(new Set(snippets.map((s) => s.language_id)))
    .map((id) => languages.find((l) => l.id === id))
    .filter(Boolean) as Language[];

  const filtered = snippets
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => langFilter === null || s.language_id === langFilter)
    .sort((a, b) => {
      if (sort === "newest")
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      if (sort === "oldest")
        return (
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="p-6 max-w-4xl">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-primary">My Snippets</h1>
        <Link
          href="/editor"
          className="flex items-center gap-1.5 bg-brand-blue text-obsidian-base rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          New Snippet
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mt-6 mb-5 flex gap-3 flex-wrap items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets…"
            className="w-full bg-obsidian-surface border border-border-default rounded-lg pl-8 pr-3 py-2 text-sm text-ink-primary placeholder:text-ink-faint outline-none focus:border-brand-blue/50 transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "newest" | "oldest" | "az")}
          className="bg-obsidian-surface border border-border-default rounded-lg px-3 py-2 text-sm text-ink-muted outline-none cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A → Z</option>
        </select>

        {/* Language filter chips */}
        {uniqueLangs.map((lang) => {
          const color = getLangColor(lang.id);
          const isActive = langFilter === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => setLangFilter(isActive ? null : lang.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                isActive
                  ? ""
                  : "border-border-default text-ink-faint hover:text-ink-primary"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: color + "18",
                      borderColor: color + "60",
                      color: color,
                    }
                  : undefined
              }
            >
              {lang.label.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Snippets list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-ink-faint">
            {snippets.length === 0 ? (
              <>
                No snippets yet.{" "}
                <Link href="/editor" className="text-brand-blue hover:underline">
                  Create one →
                </Link>
              </>
            ) : (
              "No snippets match your filters."
            )}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((s) => {
            const lang = languages.find((l) => l.id === s.language_id);
            const color = getLangColor(s.language_id);
            const preview = codePreview(s.code);

            return (
              <div
                key={s.id}
                className="group rounded-xl border border-border-default bg-obsidian-surface p-4 hover:bg-obsidian-overlay transition-colors"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  {/* Left: color dot + title */}
                  <div className="flex items-start gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-semibold text-ink-primary truncate">
                      {s.title}
                    </span>
                  </div>

                  {/* Right: badge + actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        s.is_public
                          ? "text-brand-green border-brand-green/30 bg-brand-green/10"
                          : "text-ink-faint border-border-default"
                      }`}
                    >
                      {s.is_public ? "Public" : "Private"}
                    </span>

                    {/* Actions — visible on hover */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/editor?snippetId=${s.id}`}
                        className="text-xs px-2 py-1 rounded text-ink-muted hover:text-ink-primary hover:bg-obsidian-base transition-colors"
                      >
                        Edit
                      </Link>
                      {s.is_public && (
                        <a
                          href={`/s/${s.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-2 py-1 rounded text-ink-muted hover:text-ink-primary hover:bg-obsidian-base transition-colors"
                        >
                          View
                        </a>
                      )}
                      <DeleteSnippetButton snippetId={s.id} />
                    </div>
                  </div>
                </div>

                {/* Code preview */}
                {preview && (
                  <code className="text-[11px] font-mono text-ink-faint bg-obsidian-overlay rounded px-2 py-1.5 mt-2.5 block truncate">
                    {preview}
                  </code>
                )}

                {/* Footer */}
                <p className="text-[11px] text-ink-faint mt-2">
                  {lang?.label.split(" ")[0]} &middot;{" "}
                  {formatDistanceToNow(new Date(s.updated_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
