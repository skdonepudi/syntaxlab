import { notFound } from "next/navigation";
import { getSnippet } from "@/lib/snippets";
import { languages } from "@/constants/languages";
import { SnippetViewer } from "@/components/SnippetViewer";

export default async function SnippetPage({ params }: { params: { id: string } }) {
  const snippet = await getSnippet(params.id);
  if (!snippet || !snippet.is_public) notFound();

  const language = languages.find((l) => l.id === snippet.language_id) ?? languages[0];

  return <SnippetViewer snippet={snippet} language={language} />;
}
