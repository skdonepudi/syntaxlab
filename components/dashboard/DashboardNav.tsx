"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Code2, Settings, ArrowLeft } from "lucide-react";

const mainLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/snippets", label: "Snippets", icon: Code2 },
];

const accountLinks = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  const navItem = (href: string, label: string, Icon: React.ElementType) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center gap-2.5 pl-[10px] pr-3 py-2 rounded text-sm transition-colors",
        pathname === href
          ? "bg-obsidian-overlay text-ink-primary border-l-2 border-brand-blue rounded-l-none"
          : "text-ink-muted hover:bg-obsidian-overlay hover:text-ink-primary border-l-2 border-transparent"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );

  return (
    <nav className="flex flex-col gap-0.5 p-3 flex-grow">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint px-3 mb-1">Main</span>
      {mainLinks.map(({ href, label, icon: Icon }) => navItem(href, label, Icon))}

      <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint px-3 mb-1 mt-4">Account</span>
      {accountLinks.map(({ href, label, icon: Icon }) => navItem(href, label, Icon))}

      <div className="mt-auto pt-3 border-t border-border-subtle">
        <Link
          href="/editor"
          className="flex items-center gap-2.5 pl-[10px] pr-3 py-2 rounded text-sm transition-colors text-ink-faint hover:bg-obsidian-overlay hover:text-ink-primary border-l-2 border-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Editor
        </Link>
      </div>
    </nav>
  );
}
