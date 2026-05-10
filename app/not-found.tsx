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
      {/* Radial fade */}
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

        {/* 404 */}
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-4">404 — Page not found</p>
        <h1
          className="font-extrabold mb-4 bg-clip-text text-transparent"
          style={{ fontSize: "clamp(72px, 15vw, 120px)", lineHeight: 1, backgroundImage: "linear-gradient(135deg, #58a6ff 0%, #7c3aed 100%)" }}
        >
          404
        </h1>
        <p className="text-ink-muted text-base max-w-sm mb-10 leading-relaxed">
          This page doesn&apos;t exist or has been moved. Head back to the editor and keep building.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: "#58a6ff", color: "#0a0d13" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#79c0ff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#58a6ff"; }}
          >
            Open Editor
          </Link>
          <Link
            href="/landing"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-ink-muted transition-colors hover:text-ink-primary hover:bg-obsidian-overlay border border-border-default"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
