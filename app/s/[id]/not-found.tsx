import Link from "next/link";

export default function SnippetNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian-base text-ink-primary gap-4">
      <p className="text-ink-muted text-sm">This snippet doesn&apos;t exist or is private.</p>
      <Link href="/editor" className="text-brand-blue text-sm hover:underline">
        Open Editor →
      </Link>
    </div>
  );
}
