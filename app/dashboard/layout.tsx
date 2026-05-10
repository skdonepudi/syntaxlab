import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  const displayName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User";
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const fallbackLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-obsidian-base text-ink-primary overflow-hidden">
      <aside className="w-60 shrink-0 border-r border-border-default bg-obsidian-surface flex flex-col">
        <div className="flex items-center gap-2 px-4 h-12 border-b border-border-default">
          <Link href="/editor" className="flex items-center gap-1.5 text-ink-primary hover:text-brand-blue transition-colors">
            <div style={{ width: 22, height: 22, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Code2 size={12} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">SyntaxLab</span>
          </Link>
        </div>
        <DashboardNav />
        <div className="flex-grow" />
        <div className="border-t border-border-default p-4 flex items-center gap-3">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={displayName} width={32} height={32} className="rounded-full object-cover shrink-0" />
          ) : (
            <div
              style={{ width: 32, height: 32, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              className="text-white text-xs font-semibold"
            >
              {fallbackLetter}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-primary truncate">{displayName}</p>
            <p className="text-[11px] text-ink-faint truncate">{user.email}</p>
          </div>
        </div>
      </aside>
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
