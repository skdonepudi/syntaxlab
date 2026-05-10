import Link from "next/link";
import { Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#0a0d13", color: "#e6edf3" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#58a6ff08 1px, transparent 1px), linear-gradient(90deg, #58a6ff08 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #0a0d13 85%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2 mb-14">
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px #58a6ff30" }}>
            <Code2 size={17} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold text-ink-primary tracking-tight">SyntaxLab</span>
        </Link>

        {/* Cheeky eyebrow */}
        <p className="font-mono text-xs text-ink-faint/70 mb-5 tracking-wide">
          <span className="text-brand-blue/60">const</span> page <span className="text-ink-faint/50">=</span> <span className="text-brand-red/70">null</span><span className="text-ink-faint/50">;</span>
        </p>

        {/* 404 */}
        <h1
          className="font-extrabold font-mono mb-5 bg-clip-text text-transparent"
          style={{ fontSize: "clamp(80px, 16vw, 128px)", lineHeight: 1, backgroundImage: "linear-gradient(135deg, #58a6ff 0%, #7c3aed 100%)" }}
        >
          404
        </h1>

        <p className="text-lg font-semibold text-ink-primary mb-3">This page returned <code className="font-mono text-brand-blue/80 text-base">null</code></p>
        <p className="text-ink-muted text-sm max-w-sm mb-10 leading-relaxed">
          You followed a dead link, mistyped a URL, or this page never made it past code review. These things happen.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-[#58a6ff] hover:bg-[#79c0ff] text-[#0a0d13]"
          >
            Open Editor
          </Link>
          <Link
            href="/landing"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-muted hover:text-ink-primary hover:bg-obsidian-overlay border border-border-default transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
