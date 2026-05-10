"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";

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
        <Link href="/landing" className="flex items-center gap-2 mb-14">
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px #58a6ff30" }}>
            <Code2 size={17} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold text-ink-primary tracking-tight">SyntaxLab</span>
        </Link>

        {/* Cheeky eyebrow */}
        <p className="font-mono text-xs text-ink-faint/70 mb-5 tracking-wide">
          <span className="text-brand-red/70">throw new</span> <span className="text-brand-blue/60">Error</span><span className="text-ink-faint/50">(</span><span className="text-brand-green/60">&apos;unexpected&apos;</span><span className="text-ink-faint/50">);</span>
        </p>

        {/* Heading */}
        <h1
          className="font-extrabold font-mono mb-5 bg-clip-text text-transparent"
          style={{ fontSize: "clamp(44px, 9vw, 72px)", lineHeight: 1.1, backgroundImage: "linear-gradient(135deg, #ff7b72 0%, #ffa657 100%)" }}
        >
          Uncaught<br />Exception
        </h1>

        <p className="text-ink-muted text-sm max-w-sm mb-3 leading-relaxed">
          {error.message || "Something broke on our end. The stack trace has been noted — by nobody. You can try again or retreat to safety."}
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="font-mono text-[11px] text-ink-faint/50 mb-8">
            digest: <span className="text-ink-faint/80">{error.digest}</span>
          </p>
        )}

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-[#58a6ff] hover:bg-[#79c0ff] text-[#0a0d13]"
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
