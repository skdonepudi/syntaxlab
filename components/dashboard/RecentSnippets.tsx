import Link from "next/link";
import { Snippet } from "@/lib/snippets";
import { languages } from "@/constants/languages";
import { formatDistanceToNow } from "date-fns";

export function RecentSnippets({ snippets }: { snippets: Snippet[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {snippets.map((s) => {
        const lang = languages.find((l) => l.id === s.language_id);
        return (
          <Link
            key={s.id}
            href={`/editor?snippetId=${s.id}`}
            className="group rounded-lg border border-border-default bg-obsidian-surface p-4 hover:border-border-subtle hover:bg-obsidian-overlay transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-sm font-medium text-ink-primary truncate">{s.title}</p>
              {s.is_public && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 shrink-0">
                  Public
                </span>
              )}
            </div>
            <p className="text-xs text-ink-faint">{lang?.label.split(" ")[0] ?? "Unknown"}</p>
            <p className="text-[11px] text-ink-faint mt-1">
              {formatDistanceToNow(new Date(s.updated_at), { addSuffix: true })}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
