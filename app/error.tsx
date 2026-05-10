"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Code2, TriangleAlert } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

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
        <Link href="/landing" className="flex items-center gap-2 mb-12">
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px #58a6ff30" }}>
            <Code2 size={17} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold text-ink-primary tracking-tight">SyntaxLab</span>
        </Link>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#ff7b7210", border: "1px solid #ff7b7225" }}>
          <TriangleAlert size={24} style={{ color: "#ff7b72" }} strokeWidth={1.75} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">Something went wrong</p>
        <h1 className="text-2xl font-bold text-ink-primary mb-3">Unexpected error</h1>
        <p className="text-ink-muted text-sm max-w-sm mb-6 leading-relaxed">
          {error.message || "An unexpected error occurred. You can try again or return to the editor."}
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="text-[11px] font-mono text-ink-faint/60 mb-8">
            digest: {error.digest}
          </p>
        )}

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: "#58a6ff", color: "#0a0d13" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#79c0ff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#58a6ff"; }}
          >
            Try again
          </button>
          <Link
            href="/editor"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-muted hover:text-ink-primary hover:bg-obsidian-overlay border border-border-default transition-colors"
          >
            Back to Editor
          </Link>
        </div>
      </div>
    </div>
  );
}
