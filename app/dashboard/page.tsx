import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
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

  const fullName = user.user_metadata?.full_name as string | undefined;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const provider = user.app_metadata?.provider as string | undefined;
  const memberYear = user.created_at ? new Date(user.created_at).getFullYear() : null;

  const initials = fullName
    ? fullName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="p-6 max-w-4xl">
      {/* Profile hero row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={fullName ?? "Avatar"}
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-border-default"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white ring-2 ring-border-default flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #58a6ff, #7c3aed)" }}
            >
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-ink-primary">
              {fullName ?? "Developer"}
            </h1>
            <p className="text-sm text-ink-muted mt-0.5">
              {user.email}
              {provider && ` · ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
              {memberYear && ` · member since ${memberYear}`}
            </p>
          </div>
        </div>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-semibold bg-[#58a6ff] text-obsidian-base hover:bg-[#79c0ff] transition-colors"
        >
          <Plus size={16} />
          New Snippet
        </Link>
      </div>

      <StatsRow stats={[
        { label: "Total Snippets", value: snippets.length, icon: "FileCode2", color: "#58a6ff" },
        { label: "Languages Used", value: uniqueLangs, icon: "Globe", color: "#3fb950" },
        { label: "Shared Publicly", value: publicCount, icon: "Share2", color: "#ffa657" },
      ]} />

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-sm font-medium text-ink-muted">Recent snippets</h2>
        <Link href="/dashboard/snippets" className="text-sm text-ink-muted hover:text-ink-primary transition-colors">
          View all →
        </Link>
      </div>

      {recent.length > 0
        ? <RecentSnippets snippets={recent} />
        : <p className="text-xs text-ink-faint">No snippets yet. <Link href="/editor" className="text-brand-blue hover:underline">Write your first one →</Link></p>
      }
    </div>
  );
}
