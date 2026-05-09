import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DeleteAllSnippetsButton } from "@/components/dashboard/DeleteAllSnippetsButton";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-lg font-semibold text-ink-primary mb-6">Settings</h1>

      <section className="mb-8">
        <h2 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3">Account</h2>
        <div className="rounded-lg border border-border-default bg-obsidian-surface p-4 space-y-3">
          <div>
            <p className="text-xs text-ink-faint mb-0.5">Name</p>
            <p className="text-sm text-ink-primary">{user.user_metadata?.full_name ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs text-ink-faint mb-0.5">Email</p>
            <p className="text-sm text-ink-primary">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-ink-faint mb-0.5">Provider</p>
            <p className="text-sm text-ink-primary capitalize">{user.app_metadata?.provider ?? "—"}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-medium text-brand-red uppercase tracking-wider mb-3">Danger Zone</h2>
        <div className="rounded-lg border border-brand-red/20 bg-brand-red/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-primary">Delete all snippets</p>
              <p className="text-xs text-ink-faint">Permanently removes all your saved code</p>
            </div>
            <DeleteAllSnippetsButton userId={user.id} />
          </div>
          <div className="flex items-center justify-between">
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
