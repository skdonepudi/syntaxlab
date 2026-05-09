import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { SyntaxLabIcon } from "@/components/icons";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  return (
    <div className="flex h-screen bg-obsidian-base text-ink-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-border-default bg-obsidian-surface flex flex-col">
        <div className="flex items-center gap-2 px-4 h-12 border-b border-border-default">
          <Link href="/editor" className="flex items-center gap-1.5 text-ink-primary hover:text-brand-blue transition-colors">
            <SyntaxLabIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">SyntaxLab</span>
          </Link>
        </div>
        <DashboardNav />
      </aside>

      {/* Main */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
