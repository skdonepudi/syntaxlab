import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { DeleteAllSnippetsButton } from "@/components/dashboard/DeleteAllSnippetsButton";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { User, Mail, Shield, TriangleAlert } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  const fullName = user.user_metadata?.full_name ?? "—";
  const provider = user.app_metadata?.provider ?? "—";
  const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1);
  const memberYear = user.created_at ? new Date(user.created_at).getFullYear() : null;

  const initials = fullName !== "—"
    ? fullName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-lg font-semibold text-ink-primary mb-6">Settings</h1>

      {/* Profile card */}
      <div className="rounded-2xl border border-border-default bg-obsidian-surface overflow-hidden mb-8">
        {/* Gradient header band */}
        <div className="h-20 bg-gradient-to-r from-[#58a6ff15] to-[#7c3aed15]" />

        {/* Avatar row */}
        <div className="px-6 pb-6 -mt-8 flex items-end gap-4">
          {user.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt={fullName}
              width={64}
              height={64}
              className="rounded-full object-cover ring-4 ring-obsidian-surface"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full ring-4 ring-obsidian-surface flex items-center justify-center text-xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #58a6ff, #7c3aed)" }}
            >
              {initials}
            </div>
          )}

          <div className="flex-1 min-w-0 pb-1">
            <p className="text-lg font-bold text-ink-primary truncate">{fullName}</p>
            <p className="text-sm text-ink-muted truncate">{user.email}</p>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-border-default bg-obsidian-overlay text-ink-muted mt-1">
              <Shield size={11} />
              {providerLabel}
            </span>
            {memberYear && (
              <p className="text-[11px] text-ink-faint mt-0.5">Member since {memberYear}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account section */}
      <section className="mb-8">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint mb-3">
          Account
        </h2>
        <div className="rounded-xl border border-border-default bg-obsidian-surface overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-default">
            <div className="flex items-center">
              <User size={15} className="text-ink-faint" />
              <span className="text-xs text-ink-faint ml-2.5">Name</span>
            </div>
            <span className="text-sm text-ink-primary text-right">{fullName}</span>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-default">
            <div className="flex items-center">
              <Mail size={15} className="text-ink-faint" />
              <span className="text-xs text-ink-faint ml-2.5">Email</span>
            </div>
            <span className="text-sm text-ink-primary text-right">{user.email}</span>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center">
              <Shield size={15} className="text-ink-faint" />
              <span className="text-xs text-ink-faint ml-2.5">Provider</span>
            </div>
            <span className="text-sm text-ink-primary text-right">{providerLabel}</span>
          </div>
        </div>
      </section>

      {/* Danger zone section */}
      <section>
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-brand-red mb-3 flex items-center gap-1.5">
          <TriangleAlert size={12} />
          Danger Zone
        </h2>
        <div className="rounded-xl border border-[#ff7b72]/20 bg-[#ff7b72]/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#ff7b72]/10">
            <div>
              <p className="text-sm text-ink-primary">Delete all snippets</p>
              <p className="text-xs text-ink-faint">Permanently removes all your saved code</p>
            </div>
            <DeleteAllSnippetsButton userId={user.id} />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm text-ink-primary">Sign out</p>
              <p className="text-xs text-ink-faint">Sign out of your account</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </section>
    </div>
  );
}
