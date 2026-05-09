"use client";
import { useRouter } from "next/navigation";
import { deleteSnippet } from "@/lib/snippets";
import { Button } from "@/components/ui/button";

export function DeleteSnippetButton({ snippetId }: { snippetId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Delete this snippet?")) return;
    await deleteSnippet(snippetId);
    router.refresh();
  };
  return <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>;
}
