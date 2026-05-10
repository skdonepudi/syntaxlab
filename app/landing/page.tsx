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

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative z-10 grid items-center gap-12 px-8 mx-auto w-full"
        style={{
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 1100,
          paddingTop: 64,
          paddingBottom: 48,
        }}
      >
        {/* LEFT */}
        <div
          className="flex flex-col"
          style={{ animation: "landing-slideInLeft 0.7s cubic-bezier(.22,1,.36,1) both" }}
        >
          {/* Badge */}
          <div
            className="landing-badge inline-flex items-center gap-2 w-fit mb-7 rounded-full"
            style={{ border: "1px solid #58a6ff28", padding: "5px 14px 5px 10px",
              background: "linear-gradient(135deg, #58a6ff0a, transparent)" }}
          >
            <div
              className="landing-live-dot rounded-full flex-shrink-0"
              style={{ width: 6, height: 6, background: "#3fb950",
                animation: "landing-pulse-dot 2s ease-in-out infinite",
                boxShadow: "0 0 6px #3fb950" }}
            />
            <span className="text-xs" style={{ color: "#8b949e" }}>
              <strong style={{ color: "#58a6ff" }}>New</strong> — AI assistant with output context
            </span>
          </div>

          {/* Headline */}
          <div
            className="font-extrabold mb-5"
            style={{ fontSize: 50, lineHeight: 1.05, letterSpacing: "-1.8px" }}
          >
            <span className="block" style={{ color: "#e6edf3" }}>Write code.</span>
            <span
              className="block"
              style={{
                backgroundImage: "linear-gradient(90deg, #58a6ff 0%, #a78bfa 35%, #58a6ff 70%, #a78bfa 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "landing-gradflow 5s linear infinite",
              }}
            >
              Run anything.
            </span>
            <span className="block" style={{ color: "#e6edf3" }}>Ship together.</span>
          </div>

          {/* Subtitle */}
          <p
            className="mb-8"
            style={{ fontSize: 15, color: "#8b949e", lineHeight: 1.7, maxWidth: 400 }}
          >
            A professional-grade editor in your browser. 60+ languages, real-time
            collaboration with live cursors, and an AI that sees your output.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mb-9">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-lg font-bold text-sm"
              style={{
                background: "#58a6ff", color: "#0a0d13",
                padding: "11px 24px",
                boxShadow: "0 4px 24px #58a6ff35",
                animation: "landing-ctabreathe 3s ease-in-out infinite",
              }}
            >
              <Play size={14} fill="currentColor" strokeWidth={0} />
              Start coding free
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: "#8b949e" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e6edf3")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8b949e")}
            >
              <PlayCircle size={14} />
              Watch demo
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span ref={stat1Ref} className="text-sm font-bold" style={{ color: "#e6edf3" }}>0</span>
              <span className="text-xs" style={{ color: "#6e7681" }}>+ languages</span>
            </div>
            <div style={{ width: 1, height: 16, background: "#30363d" }} />
            <div className="flex items-center gap-1.5">
              <span ref={stat2Ref} className="text-sm font-bold" style={{ color: "#e6edf3" }}>0</span>
              <span className="text-xs" style={{ color: "#6e7681" }}>ms avg run</span>
            </div>
            <div style={{ width: 1, height: 16, background: "#30363d" }} />
            <div className="flex items-center gap-1.5">
              <div
                className="landing-live-dot rounded-full"
                style={{ width: 7, height: 7, background: "#3fb950",
                  animation: "landing-pulse-dot 2s ease-in-out infinite",
                  boxShadow: "0 0 6px #3fb950" }}
              />
              <span className="text-sm font-bold" style={{ color: "#e6edf3", marginLeft: 4 }}>Live</span>
              <span className="text-xs" style={{ color: "#6e7681" }}>collab</span>
            </div>
          </div>
        </div>

        {/* RIGHT — placeholder, filled in Task 4 */}
        <div />
      </div>

      {/* Pills + footer will be added in Task 6 */}
    </div>
  );
}
