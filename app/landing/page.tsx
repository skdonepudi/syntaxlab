/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Code2, Zap, Users, Sparkles, Upload, Sun, Play, PlayCircle } from "lucide-react";

export default function LandingPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const editorRef  = useRef<HTMLDivElement>(null);
  const stat1Ref   = useRef<HTMLSpanElement>(null);
  const stat2Ref   = useRef<HTMLSpanElement>(null);
  const remoteRef  = useRef<HTMLSpanElement>(null);
  const flashRef   = useRef<HTMLSpanElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={landingRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#0a0d13", color: "#e6edf3" }}
    >
      {/* ── Background layers ── */}
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#58a6ff06 1px, transparent 1px), linear-gradient(90deg, #58a6ff06 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Radial edge fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 25%, #0a0d13 80%)",
        }}
      />
      {/* Ambient glow — right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 40, right: -60, width: 560, height: 480,
          background:
            "radial-gradient(ellipse at 65% 35%, #58a6ff10 0%, #7c3aed08 45%, transparent 70%)",
        }}
      />
      {/* Ambient glow — left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -80, left: -80, width: 400, height: 400,
          background: "radial-gradient(ellipse, #58a6ff07 0%, transparent 65%)",
        }}
      />
      {/* Grid scan line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 200,
          background:
            "linear-gradient(to bottom, transparent, #58a6ff03 40%, #58a6ff05 50%, #58a6ff03 60%, transparent)",
          animation: "landing-scan 12s linear infinite",
          zIndex: 1,
        }}
      />

      {/* ── Navigation ── */}
      <nav
        className="relative flex items-center justify-between px-8 z-10"
        style={{
          height: 54,
          borderBottom: "1px solid #ffffff07",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 28, height: 28,
              background: "linear-gradient(135deg, #58a6ff, #7c3aed)",
              boxShadow: "0 4px 12px #58a6ff25",
            }}
          >
            <Code2 size={14} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ letterSpacing: "-0.3px" }}>
            SyntaxLab
          </span>
        </Link>

        {/* Centre links */}
        <div className="hidden md:flex items-center gap-6">
          {["Features", "Languages", "Docs"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm transition-colors"
              style={{ color: "#8b949e" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#e6edf3")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8b949e")}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/editor"
            className="text-sm px-3.5 py-1.5 rounded-lg transition-colors"
            style={{ color: "#8b949e", border: "1px solid #30363d" }}
          >
            Sign in
          </Link>
          <Link
            href="/editor"
            className="text-sm font-semibold px-4 py-1.5 rounded-lg"
            style={{
              background: "#58a6ff",
              color: "#0a0d13",
              animation: "landing-ctabreathe 3s ease-in-out infinite",
            }}
          >
            Open Editor
          </Link>
        </div>
      </nav>

      {/* Hero, pills, footer will be added in subsequent tasks */}
      <main className="flex-grow" />
    </div>
  );
}
