import Link from "next/link";
import { Snippet } from "@/lib/snippets";
import { languages } from "@/constants/languages";
import { formatDistanceToNow } from "date-fns";

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
const DEFAULT_LANG_COLOR = "#6e7681";

function getCodePreview(code: string): string {
  const lines = code.split("\n");
  const line = lines.find((l) => {
    const t = l.trim();
    return (
      t.length > 0 &&
      !t.startsWith("//") &&
      !t.startsWith("#") &&
      !t.startsWith("/*") &&
      !t.startsWith("*")
    );
  });
  return line?.trim() ?? "";
}

export function RecentSnippets({ snippets }: { snippets: Snippet[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {snippets.map((s) => {
        const lang = languages.find((l) => l.id === s.language_id);
        const langColor = LANG_COLORS[s.language_id] ?? DEFAULT_LANG_COLOR;
        const preview = getCodePreview(s.code);

        return (
          <Link
            key={s.id}
            href={`/editor?snippetId=${s.id}`}
            className="group rounded-xl border bg-obsidian-surface p-4 hover:bg-obsidian-overlay transition-all duration-200"
            style={{ borderTop: "2px solid", borderTopColor: `${langColor}40` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: langColor }}
              />
              <p className="text-sm font-medium text-ink-primary truncate flex-1">{s.title}</p>
              {s.is_public && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 shrink-0">
                  Public
                </span>
              )}
            </div>

            {preview && (
              <code className="text-[11px] font-mono text-ink-faint truncate bg-obsidian-overlay rounded px-2 py-1 mt-2 block">
                {preview}
              </code>
            )}

            <p className="text-[11px] text-ink-faint mt-2">
              {lang?.label.split(" ")[0] ?? "Unknown"} · {formatDistanceToNow(new Date(s.updated_at), { addSuffix: true })}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
