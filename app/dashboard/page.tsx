import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getUserSnippets } from "@/lib/snippets";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { RecentSnippets } from "@/components/dashboard/RecentSnippets";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  const snippets = await getUserSnippets(user.id);
  const recent = snippets.slice(0, 6);
  const uniqueLangs = new Set(snippets.map((s) => s.language_id)).size;
  const publicCount = snippets.filter((s) => s.is_public).length;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-ink-primary">
            Welcome back, {user.user_metadata?.full_name?.split(" ")[0] ?? "Developer"}
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">{user.email}</p>
        </div>
        <Link
          href="/editor"
          className="text-sm px-4 py-1.5 rounded bg-brand-blue text-obsidian-base font-semibold hover:bg-brand-blue/90 transition-colors"
        >
          New Snippet
        </Link>
      </div>

      <StatsRow stats={[
        { label: "Total Snippets", value: snippets.length },
        { label: "Languages Used", value: uniqueLangs },
        { label: "Shared Publicly", value: publicCount },
      ]} />

      <h2 className="text-sm font-medium text-ink-muted mt-8 mb-3">Recent</h2>
      {recent.length > 0
        ? <RecentSnippets snippets={recent} />
        : <p className="text-xs text-ink-faint">No snippets yet. <Link href="/editor" className="text-brand-blue hover:underline">Write your first one →</Link></p>
      }
    </div>
  );
}
