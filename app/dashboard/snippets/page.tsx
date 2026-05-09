import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getUserSnippets } from "@/lib/snippets";
import { languages } from "@/constants/languages";
import { formatDistanceToNow } from "date-fns";
import { DeleteSnippetButton } from "@/components/dashboard/DeleteSnippetButton";

export default async function SnippetsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  const snippets = await getUserSnippets(user.id);

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-lg font-semibold text-ink-primary mb-6">My Snippets</h1>
      {snippets.length === 0 && (
        <p className="text-xs text-ink-faint">No snippets yet. <Link href="/editor" className="text-brand-blue hover:underline">Create one →</Link></p>
      )}
      <div className="divide-y divide-border-subtle border border-border-default rounded-lg overflow-hidden">
        {snippets.map((s) => {
          const lang = languages.find((l) => l.id === s.language_id);
          return (
            <div key={s.id} className="flex items-center gap-3 px-4 py-3 bg-obsidian-surface hover:bg-obsidian-overlay transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-ink-primary font-medium truncate">{s.title}</p>
                <p className="text-xs text-ink-faint">{lang?.label.split(" ")[0]} · {formatDistanceToNow(new Date(s.updated_at), { addSuffix: true })}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${s.is_public ? "text-brand-green border-brand-green/30 bg-brand-green/10" : "text-ink-faint border-border-default"}`}>
                {s.is_public ? "Public" : "Private"}
              </span>
              <div className="flex items-center gap-1">
                <Link href={`/editor?snippetId=${s.id}`} className="text-xs text-ink-muted hover:text-ink-primary px-2 py-1 rounded hover:bg-obsidian-base transition-colors">Edit</Link>
                {s.is_public && (
                  <a href={`/s/${s.id}`} target="_blank" className="text-xs text-ink-muted hover:text-brand-blue px-2 py-1 rounded hover:bg-obsidian-base transition-colors">View</a>
                )}
                <DeleteSnippetButton snippetId={s.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
