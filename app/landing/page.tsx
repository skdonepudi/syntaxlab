import Link from "next/link";
import { SyntaxLabIcon } from "@/components/icons";
import ColorModeToggle from "@/components/ColorModeToggle";

const features = [
  { icon: "⬡", title: "60+ Languages", desc: "JavaScript, Python, Rust, Go, Java, and 55 more. Every language runs on the same Judge0 backend." },
  { icon: "⚡", title: "Instant Execution", desc: "Submit code and get output in seconds. Stdin support, execution time, and memory usage included." },
  { icon: "👥", title: "Real-time Collab", desc: "Share a room link and code together with live cursors and presence avatars." },
  { icon: "🤖", title: "AI Assistant", desc: "Press Cmd+K to explain, fix, optimize, or translate your code — with full awareness of your output." },
  { icon: "📎", title: "Snippet Sharing", desc: "Save snippets to your profile and share a public URL. Anyone can view and fork your code." },
  { icon: "🎨", title: "Custom Themes", desc: "25+ Monaco themes. Switch on the fly. Preferences saved to your account." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian-base text-ink-primary">
      {/* Grid background */}
      <svg className="absolute inset-0 -z-10 h-full w-full stroke-white/[0.04] [mask-image:radial-gradient(60%_40%_at_50%_0%,white,transparent)]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
      </svg>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <SyntaxLabIcon width={28} height={28} />
          <span className="text-lg font-semibold">SyntaxLab</span>
        </div>
        <div className="flex items-center gap-3">
          <ColorModeToggle className="text-ink-muted hover:text-ink-primary" />
          <Link
            href="/editor"
            className="text-sm px-4 py-1.5 rounded bg-brand-blue text-obsidian-base font-semibold hover:bg-brand-blue/90 transition-colors"
          >
            Open Editor
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default text-ink-faint text-xs mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          Now with AI code assistance
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-ink-primary to-ink-muted bg-clip-text text-transparent leading-none">
          Code, Collaborate,<br />Create Together
        </h1>

        <p className="text-ink-muted text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          A professional-grade web editor for developers. 60+ languages, real-time collaboration, AI assistance, and instant shareable snippets.
        </p>

        <Link
          href="/editor"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-blue text-obsidian-base font-semibold text-sm hover:bg-brand-blue/90 transition-colors shadow-lg shadow-brand-blue/20"
        >
          Start Coding →
        </Link>
      </main>

      {/* Features */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg border border-border-default bg-obsidian-surface p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="text-sm font-semibold text-ink-primary mb-1">{f.title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle px-6 py-4 flex justify-between items-center text-xs text-ink-faint">
        <span>© {new Date().getFullYear()} SyntaxLab</span>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-ink-muted transition-colors">Privacy</Link>
          <a href="https://github.com" className="hover:text-ink-muted transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
