import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserSnippets } from "@/lib/snippets";
import { SnippetsView } from "@/components/dashboard/SnippetsView";

export default async function SnippetsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/landing");

  const snippets = await getUserSnippets(user.id);

  return <SnippetsView snippets={snippets} />;
}
