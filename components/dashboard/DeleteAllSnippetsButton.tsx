"use client";
import { useRouter } from "next/navigation";
import { deleteAllUserSnippets } from "@/lib/snippets";
import { Button } from "@/components/ui/button";

export function DeleteAllSnippetsButton({ userId }: { userId: string }) {
  const router = useRouter();
  const handle = async () => {
    if (!confirm("Delete ALL snippets? This cannot be undone.")) return;
    await deleteAllUserSnippets(userId);
    router.refresh();
  };
  return <Button variant="danger" size="sm" onClick={handle}>Delete All</Button>;
}
