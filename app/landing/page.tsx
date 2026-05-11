/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2, Zap, Users, Sparkles, Upload, Sun, Play, PlayCircle, Globe, Share2, AlertCircle, MessageSquare } from "lucide-react";
import { SignInDialog } from "@/components/SignInDialog";
import { getCurrentUser } from "@/utils/authUtils";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

const PILLS: { Icon: React.ElementType; label: string; hoverColor: string; delay: number }[] = [
  { Icon: Code2,    label: "60+ Languages",    hoverColor: "#58a6ff", delay: 0.55 },
  { Icon: Zap,      label: "Instant Execution", hoverColor: "#ffa657", delay: 0.62 },
  { Icon: Users,    label: "Real-time Collab",  hoverColor: "#3fb950", delay: 0.69 },
  { Icon: Sparkles, label: "AI Assistant",      hoverColor: "#d2a8ff", delay: 0.76 },
  { Icon: Upload,   label: "Snippet Sharing",   hoverColor: "#ff7b72", delay: 0.83 },
  { Icon: Sun,      label: "25+ Themes",        hoverColor: "#79c0ff", delay: 0.90 },
];

export default function LandingPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const editorRef  = useRef<HTMLDivElement>(null);
  const stat1Ref   = useRef<HTMLSpanElement>(null);
  const stat2Ref   = useRef<HTMLSpanElement>(null);
  const remoteRef  = useRef<HTMLSpanElement>(null);
  const flashRef   = useRef<HTMLSpanElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { getCurrentUser().then(setUser); }, []);

  // ── 1. Mouse parallax on editor window
  useEffect(() => {
    const hero   = heroRef.current;
    const editor = editorRef.current;
    if (!hero || !editor) return;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / r.width;
      const dy = (e.clientY - (r.top  + r.height / 2)) / r.height;
      editor.style.transform  = `rotateX(${-dy * 10}deg) rotateY(${dx * 14}deg) translateZ(16px)`;
      editor.style.transition = "transform 0.08s linear";
    };
    const onLeave = () => {
      editor.style.transform  = "rotateX(0deg) rotateY(0deg) translateZ(0)";
      editor.style.transition = "transform 0.6s cubic-bezier(.22,1,.36,1)";
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── 2. Stat count-up (60 languages, 340ms)
  useEffect(() => {
    function countUp(el: HTMLSpanElement, target: number, duration: number) {
      const start = performance.now();
      const step  = (now: number) => {
        const p     = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const t = setTimeout(() => {
      if (stat1Ref.current) countUp(stat1Ref.current, 60,  1200);
      if (stat2Ref.current) countUp(stat2Ref.current, 340,  900);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // ── 3. Remote cursor typewriter ("Sarah" types the comment)
  useEffect(() => {
    const FULL = "# O(log n) — returns index or -1";
    const BASE = "    ";
    let ri = 0;
    let cancelled = false;
    let tid: ReturnType<typeof setTimeout>;

    const type = () => {
      if (cancelled) return;
      if (ri <= FULL.length) {
        if (remoteRef.current) remoteRef.current.textContent = BASE + FULL.slice(0, ri);
        ri++;
        tid = setTimeout(type, 55 + Math.random() * 40);
      } else {
        tid = setTimeout(del, 3200);
      }
    };
    const del = () => {
      if (cancelled) return;
      if (ri > 0) {
        ri--;
        if (remoteRef.current) remoteRef.current.textContent = BASE + FULL.slice(0, ri);
        tid = setTimeout(del, 22);
      } else {
        tid = setTimeout(type, 1200);
      }
    };
    if (remoteRef.current) remoteRef.current.textContent = BASE;
    tid = setTimeout(type, 1800);
    return () => { cancelled = true; clearTimeout(tid); };
  }, []);

  // ── 4. Status bar "Run complete" flash
  useEffect(() => {
    const times = ["0.18s", "0.23s", "0.31s", "0.19s", "0.27s"];
    let tid: ReturnType<typeof setTimeout>;
    const flash = () => {
      const el = flashRef.current;
      if (el) {
        el.textContent = `✓ Run complete · ${times[Math.floor(Math.random() * times.length)]}`;
        el.style.opacity = "1";
        setTimeout(() => { if (el) el.style.opacity = "0"; }, 2200);
      }
      tid = setTimeout(flash, 8000 + Math.random() * 5000);
    };
    tid = setTimeout(flash, 3500);
    return () => clearTimeout(tid);
  }, []);

  // ── 5. Grid intersection sparkles
  useEffect(() => {
    const container = landingRef.current;
    if (!container) return;
    let tid: ReturnType<typeof setTimeout>;
    const sparkle = () => {
      const dot = document.createElement("div");
      const gx  = Math.floor(Math.random() * 24) * 44;
      const gy  = Math.floor(Math.random() * 14) * 44;
      Object.assign(dot.style, {
        position: "absolute", left: `${gx}px`, top: `${gy}px`,
        width: "3px", height: "3px", borderRadius: "50%",
        background: "#58a6ff", boxShadow: "0 0 6px #58a6ff",
        pointerEvents: "none", zIndex: "2",
        animation: "landing-sparkle-fade 0.8s ease-out forwards",
      });
      container.appendChild(dot);
      setTimeout(() => dot.remove(), 800);
      tid = setTimeout(sparkle, 150 + Math.random() * 250);
    };
    tid = setTimeout(sparkle, 1000);
    return () => clearTimeout(tid);
  }, []);

  return (
    <div
      ref={landingRef}
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ background: "#0a0d13", color: "#e6edf3" }}
    >
      {/* ── Background layers ── */}
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#58a6ff08 1px, transparent 1px), linear-gradient(90deg, #58a6ff08 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Radial edge fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 40%, transparent 35%, #0a0d13 82%)",
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
          top: -80, left: -80, width: 500, height: 500,
          background: "radial-gradient(ellipse, #58a6ff12 0%, transparent 65%)",
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
        className="relative flex items-center justify-between px-4 sm:px-8 z-10"
        style={{
          height: 68,
          background: "rgba(10, 13, 19, 0.75)",
          borderBottom: "1px solid #30363d30",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #58a6ff, #7c3aed)",
              boxShadow: "0 4px 14px #58a6ff30",
            }}
          >
            <Code2 size={18} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-bold tracking-tight" style={{ fontSize: 17, letterSpacing: "-0.4px" }}>
            SyntaxLab
          </span>
        </Link>

        {/* Centre links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "Languages", href: "#languages" },
            { label: "AI", href: "#ai-spotlight" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{ fontSize: 15, color: "#8b949e", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#e6edf3")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8b949e")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg"
              style={{ fontSize: 14, padding: "7px 14px", color: "#8b949e", border: "1px solid #30363d", background: "transparent", transition: "color 0.2s, border-color 0.2s, background 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#e6edf3"; el.style.borderColor = "#58a6ff50"; el.style.background = "#21262d"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#8b949e"; el.style.borderColor = "#30363d"; el.style.background = "transparent"; }}
            >
              {user.user_metadata?.avatar_url && (
                <Image src={user.user_metadata.avatar_url} alt="" width={20} height={20} className="rounded-full object-cover" />
              )}
              Dashboard
            </Link>
          ) : (
            <SignInDialog redirectPath="/editor">
              <button
                className="hidden sm:block rounded-lg"
                style={{ fontSize: 14, padding: "7px 14px", color: "#8b949e", border: "1px solid #30363d", background: "transparent", cursor: "pointer", transition: "color 0.2s, border-color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#e6edf3"; el.style.borderColor = "#58a6ff50"; el.style.background = "#21262d"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#8b949e"; el.style.borderColor = "#30363d"; el.style.background = "transparent"; }}
              >
                Sign in
              </button>
            </SignInDialog>
          )}
          <Link
            href="/editor"
            className="hidden sm:block font-semibold rounded-lg"
            style={{
              fontSize: 14,
              padding: "7px 16px",
              background: "#58a6ff",
              color: "#0a0d13",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#79c0ff"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 4px 14px #58a6ff40"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#58a6ff"; el.style.transform = ""; el.style.boxShadow = ""; }}
          >
            Open Editor
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12 px-6 sm:px-10 lg:px-16 w-full"
        style={{
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
            className="landing-badge inline-flex items-center gap-2 w-fit mb-7 rounded-full cursor-default"
            style={{ border: "1px solid #58a6ff28", padding: "5px 14px 5px 10px",
              background: "linear-gradient(135deg, #58a6ff0a, transparent)",
              transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#58a6ff60"; el.style.boxShadow = "0 0 12px #58a6ff20"; el.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#58a6ff28"; el.style.boxShadow = "none"; el.style.transform = ""; }}
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
            style={{ fontSize: "clamp(38px, 7vw, 68px)", lineHeight: 1.03, letterSpacing: "-2.5px" }}
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
            style={{ fontSize: 17, color: "#8b949e", lineHeight: 1.7, maxWidth: 480 }}
          >
            A professional-grade editor in your browser. 60+ languages, real-time
            collaboration with live cursors, and an AI that sees your output.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-9">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-lg font-bold text-sm"
              style={{
                background: "#58a6ff", color: "#0a0d13",
                padding: "11px 24px",
                boxShadow: "0 4px 24px #58a6ff35",
                animation: "landing-ctabreathe 3s ease-in-out infinite",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#79c0ff"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 32px #58a6ff60"; el.style.animation = "none"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#58a6ff"; el.style.transform = ""; el.style.boxShadow = "0 4px 24px #58a6ff35"; el.style.animation = "landing-ctabreathe 3s ease-in-out infinite"; }}
            >
              <Play size={14} fill="currentColor" strokeWidth={0} />
              Start coding free
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm"
              style={{ color: "#8b949e", transition: "color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#e6edf3"; el.style.textDecoration = "underline"; el.style.textUnderlineOffset = "3px"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#8b949e"; el.style.textDecoration = "none"; }}
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

        {/* RIGHT — Editor window */}
        <div className="hidden md:block" style={{ perspective: "1000px", animation: "landing-slideInRight 0.75s 0.1s cubic-bezier(.22,1,.36,1) both", position: "relative" }}>
          {/* Behind-editor glow orb */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-40px -60px",
              background: "radial-gradient(ellipse at 55% 45%, #58a6ff28 0%, #7c3aed18 40%, transparent 70%)",
              filter: "blur(32px)",
              zIndex: 0,
              borderRadius: "50%",
            }}
          />
          {/* Gradient border wrapper — ref for parallax tilt */}
          <div
            ref={editorRef}
            className="rounded-xl p-px"
            style={{
              position: "relative",
              zIndex: 1,
              background: "linear-gradient(135deg, #58a6ff70 0%, #58a6ff30 30%, transparent 55%, #7c3aed40 100%)",
              boxShadow: "0 0 0 1px #58a6ff20, 0 32px 80px rgba(0,0,0,.75), 0 0 60px #58a6ff18, 0 0 30px #7c3aed12",
              transition: "box-shadow 0.35s, transform 0.35s, background 0.35s",
              willChange: "transform",
            }}

            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 0 1px #58a6ff35, 0 32px 80px rgba(0,0,0,.78), 0 0 70px #58a6ff22, 0 0 35px #7c3aed16"; el.style.background = "linear-gradient(135deg, #58a6ff80 0%, #58a6ff38 30%, transparent 55%, #7c3aed48 100%)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 0 1px #58a6ff20, 0 32px 80px rgba(0,0,0,.75), 0 0 60px #58a6ff18, 0 0 30px #7c3aed12"; el.style.background = "linear-gradient(135deg, #58a6ff70 0%, #58a6ff30 30%, transparent 55%, #7c3aed40 100%)"; }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #58a6ff35 0%, transparent 40%, #7c3aed20 100%), #0d1117",
              }}
            >
              {/* Toolbar */}
              <div
                className="flex items-center gap-2.5 px-3.5"
                style={{ height: 40, background: "#161b22", borderBottom: "1px solid #21262d" }}
              >
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <span className="rounded-full" style={{ width: 10, height: 10, background: "#ff5f57", display: "block" }} />
                  <span className="rounded-full" style={{ width: 10, height: 10, background: "#febc2e", display: "block" }} />
                  <span className="rounded-full" style={{ width: 10, height: 10, background: "#28c840", display: "block" }} />
                </div>
                {/* Tabs */}
                <div className="flex gap-px ml-2 flex-1">
                  {[
                    { name: "solution.py", active: true },
                    { name: "utils.js",    active: false },
                    { name: "README.md",   active: false },
                  ].map((tab) => (
                    <div
                      key={tab.name}
                      className="text-xs px-3"
                      style={{
                        padding: "3px 12px",
                        borderRadius: "4px 4px 0 0",
                        color: tab.active ? "#e6edf3" : "#6e7681",
                        background: tab.active ? "#0d1117" : "transparent",
                        border: tab.active ? "1px solid #30363d" : "none",
                        borderBottom: tab.active ? "1px solid #0d1117" : "none",
                        marginBottom: tab.active ? -1 : 0,
                      }}
                    >
                      {tab.name}
                    </div>
                  ))}
                </div>
                {/* Presence avatars */}
                <div className="flex items-center ml-auto">
                  {[
                    { label: "Y", color: "#58a6ff", ringClass: "landing-av-ring landing-av-ring-blue" },
                    { label: "S", color: "#d2a8ff", ringClass: "landing-av-ring landing-av-ring-purple" },
                    { label: "K", color: "#3fb950", ringClass: "" },
                  ].map((av, i) => (
                    <div
                      key={av.label}
                      className={`relative flex items-center justify-center rounded-full text-xs font-bold cursor-pointer transition-transform hover:-translate-y-0.5 hover:scale-110 ${av.ringClass}`}
                      style={{
                        width: 22, height: 22,
                        background: av.color,
                        color: "#0d1117",
                        border: "2px solid #161b22",
                        marginLeft: i === 0 ? 0 : -7,
                        zIndex: 3 - i,
                        fontSize: 9,
                      }}
                      title={av.label === "Y" ? "You" : av.label === "S" ? "Sarah" : "Kai"}
                    >
                      {av.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code body */}
              <div className="flex" style={{ minHeight: 300 }}>
                {/* Line numbers */}
                <div
                  className="flex flex-col select-none"
                  style={{
                    background: "#0d1117", borderRight: "1px solid #21262d",
                    padding: "14px 8px 14px 14px", minWidth: 40,
                    fontFamily: "var(--font-geist-mono), monospace", fontSize: 12.5,
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        textAlign: "right", lineHeight: "24px",
                        color: i === 2 ? "#6e7681" : "#3d444d",
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code */}
                <div style={{ padding: "14px 16px", flex: 1, overflow: "hidden", fontFamily: "var(--font-geist-mono), monospace", fontSize: 13 }}>
                  {/* Row 1 */}
                  <div style={{ height: 24, lineHeight: "24px", whiteSpace: "pre" }}>
                    <span style={{ color: "#ff7b72" }}>{"def "}</span>
                    <span style={{ color: "#d2a8ff" }}>binary_search</span>
                    <span style={{ color: "#e6edf3" }}>(</span>
                    <span style={{ color: "#ffa657" }}>arr</span>
                    <span style={{ color: "#e6edf3" }}>{", "}</span>
                    <span style={{ color: "#ffa657" }}>target</span>
                    <span style={{ color: "#e6edf3" }}>):</span>
                  </div>
                  {/* Row 2 — remote cursor typing line */}
                  <div style={{ display: "flex", alignItems: "center", height: 24, whiteSpace: "nowrap", background: "#d2a8ff09", borderRadius: 2, margin: "0 -8px", padding: "0 8px" }}>
                    <span ref={remoteRef} style={{ color: "#3d444d" }}>{"    "}</span>
                    {/* Remote cursor — Sarah */}
                    <span
                      style={{
                        display: "inline-block", width: 2, height: 14,
                        background: "#d2a8ff", marginLeft: 1,
                        verticalAlign: "middle", borderRadius: 1,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute", bottom: 17, left: 0,
                          background: "#d2a8ff", color: "#0d1117",
                          fontSize: 9, fontWeight: 700, padding: "1px 5px",
                          borderRadius: "3px 3px 3px 0", whiteSpace: "nowrap",
                          fontFamily: "var(--font-geist-sans), sans-serif",
                        }}
                      >
                        Sarah
                      </span>
                    </span>
                  </div>
                  {/* Row 3 — active line with own cursor */}
                  <div style={{ display: "flex", alignItems: "center", height: 24, whiteSpace: "nowrap", background: "#58a6ff0a", borderRadius: 2, margin: "0 -8px", padding: "0 8px" }}>
                    <span style={{ color: "#e6edf3" }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style={{ color: "#ffa657" }}>lo</span>
                    <span style={{ color: "#e6edf3" }}>,&nbsp;</span>
                    <span style={{ color: "#ffa657" }}>hi</span>
                    <span style={{ color: "#e6edf3" }}>&nbsp;=&nbsp;</span>
                    <span style={{ color: "#79c0ff" }}>0</span>
                    <span style={{ color: "#e6edf3" }}>,&nbsp;</span>
                    <span style={{ color: "#d2a8ff" }}>len</span>
                    <span style={{ color: "#e6edf3" }}>(</span>
                    <span style={{ color: "#ffa657" }}>arr</span>
                    <span style={{ color: "#e6edf3" }}>)&nbsp;-&nbsp;</span>
                    <span style={{ color: "#79c0ff" }}>1</span>
                    <span style={{ display: "inline-block", width: 2, height: 14, background: "#58a6ff", marginLeft: 1, verticalAlign: "middle", borderRadius: 1, animation: "landing-blink 1.1s step-end infinite" }} />
                  </div>
                  {/* Rows 4-12 — remaining code */}
                  {[
                    [["#ff7b72","    while "],["#ffa657","lo"],["#e6edf3"," <= "],["#ffa657","hi"],["#e6edf3",":"]],
                    [["#e6edf3","        "],["#ffa657","mid"],["#e6edf3"," = ("],["#ffa657","lo"],["#e6edf3"," + "],["#ffa657","hi"],["#e6edf3",") // "],["#79c0ff","2"]],
                    [["#ff7b72","        if "],["#ffa657","arr"],["#e6edf3","["],["#ffa657","mid"],["#e6edf3","] == "],["#ffa657","target"],["#e6edf3",":"]],
                    [["#ff7b72","            return "],["#ffa657","mid"]],
                    [["#ff7b72","        elif "],["#ffa657","arr"],["#e6edf3","["],["#ffa657","mid"],["#e6edf3","] < "],["#ffa657","target"],["#e6edf3",":"]],
                    [["#e6edf3","            "],["#ffa657","lo"],["#e6edf3"," = "],["#ffa657","mid"],["#e6edf3"," + "],["#79c0ff","1"]],
                    [["#ff7b72","        else"],["#e6edf3",":"]],
                    [["#e6edf3","            "],["#ffa657","hi"],["#e6edf3"," = "],["#ffa657","mid"],["#e6edf3"," - "],["#79c0ff","1"]],
                    [["#ff7b72","    return "],["#e6edf3","-"],["#79c0ff","1"]],
                  ].map((row, ri) => (
                    <div key={ri} style={{ height: 24, lineHeight: "24px", whiteSpace: "pre" }}>
                      {row.map(([color, text], ci) => (
                        <span key={ci} style={{ color }}>{text}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div
                className="flex items-center gap-3 px-3.5"
                style={{ height: 28, background: "#161b22", borderTop: "1px solid #21262d" }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="rounded-full"
                    style={{ width: 6, height: 6, background: "#3fb950", animation: "landing-pulse-dot 2s ease-in-out infinite", boxShadow: "0 0 6px #3fb950" }}
                  />
                  <span style={{ fontSize: 10.5, color: "#6e7681" }}>Connected · 3 online</span>
                </div>
                <div className="flex items-center gap-1">
                  <Code2 size={10} color="#6e7681" />
                  <span style={{ fontSize: 10.5, color: "#6e7681" }}>Python 3.12</span>
                </div>
                <span ref={flashRef} className="landing-run-flash" />
                <div className="flex items-center ml-auto">
                  <span style={{ fontSize: 10.5, color: "#6e7681" }}>Ln 3, Col 28 · UTF-8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature pills ── */}
      <div
        className="relative z-10 flex flex-wrap justify-center gap-2.5 px-8 pb-9"
        style={{ width: "100%" }}
      >
        {PILLS.map(({ Icon, label, hoverColor, delay }) => (
          <PillItem key={label} Icon={Icon} label={label} hoverColor={hoverColor} delay={delay} />
        ))}
      </div>

      {/* ── Trust line ── */}
      <p className="relative z-10 text-center" style={{ fontSize: 11, color: "#3d444d", letterSpacing: "0.3px", marginTop: 12, marginBottom: 24 }}>
        No account required &nbsp;·&nbsp; Free to use &nbsp;·&nbsp; Open in seconds
      </p>

      {/* ── Bento Features ── */}
      <BentoSection />

      {/* ── Languages Marquee ── */}
      <LanguagesMarquee />

      {/* ── AI Spotlight ── */}
      <AISpotlight />

      {/* ── Social Proof ── */}
      <UseCases />

      {/* ── CTA Banner ── */}
      <CTABanner />

      {/* ── Footer ── */}
      <LandingFooter />
    </div>
  );
}

function PillItem({
  Icon, label, hoverColor, delay,
}: {
  Icon: React.ElementType;
  label: string;
  hoverColor: string;
  delay: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-1.5 rounded-full text-xs cursor-default select-none"
      style={{
        border: `1px solid ${hovered ? "#58a6ff50" : "#21262d"}`,
        padding: "7px 16px",
        background: hovered ? "#1a2233" : "#161b22",
        color: hovered ? "#e6edf3" : "#8b949e",
        boxShadow: hovered ? "0 0 14px #58a6ff18" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s",
        animation: `landing-pillIn 0.5s ${delay}s both`,
      }}
    >
      <Icon
        size={13}
        style={{
          color: hovered ? hoverColor : "#58a6ff80",
          transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      />
      {label}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   BENTO SECTION
────────────────────────────────────────────────────────── */

function BentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = el.querySelectorAll<HTMLElement>(".landing-fade-up");
            targets.forEach((t, i) => {
              const base = parseFloat(t.dataset.delay ?? "0");
              t.style.animationDelay = `${base + i * 0.06}s`;
              t.classList.add("landing-visible");
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative z-10 w-full px-5 sm:px-10 lg:px-20 py-16 lg:py-24"
      style={{ background: "#0a0d13" }}
    >
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#58a6ff08 1px, transparent 1px), linear-gradient(90deg, #58a6ff08 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      <div style={{ position: "relative" }}>
        {/* Header */}
        <div
          className="landing-fade-up flex items-center gap-2 mb-3"
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#58a6ff" }}
        >
          <span style={{ width: 20, height: 1, background: "#58a6ff60", display: "inline-block" }} />
          Everything you need
        </div>
        <h2
          className="landing-fade-up font-extrabold"
          style={{ fontSize: "clamp(28px, 5vw, 42px)", letterSpacing: "-1.5px", lineHeight: 1.07, marginBottom: 12 }}
        >
          Built for developers<br />who move fast
        </h2>
        <p
          className="landing-fade-up"
          style={{ fontSize: 16, color: "#8b949e", maxWidth: 500, lineHeight: 1.7, marginBottom: 52 }}
        >
          Every tool you need to write, run, share and collaborate — in one tab.
        </p>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: 12,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {/* Row 1 */}
          <BentoCard accent="#58a6ff" gradientClass="blue" delay={0.0}>
            <div
              className="flex items-center justify-center rounded-xl mb-4 flex-shrink-0"
              style={{ width: 40, height: 40, background: "#58a6ff1e", color: "#58a6ff", transition: "transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s" }}
            >
              <Zap size={20} strokeWidth={1.75} />
            </div>
            <div className="font-bold" style={{ fontSize: 18, marginBottom: 8, letterSpacing: "-0.3px" }}>Instant Execution</div>
            <div style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6, maxWidth: 280 }}>
              Sub-second runs across 60+ runtimes. No setup, no waiting, no config.
            </div>
            <TerminalDemo />
          </BentoCard>

          <BentoCard accent="#d2a8ff" gradientClass="purple" delay={0.06}>
            <div
              className="flex items-center justify-center rounded-xl mb-4 flex-shrink-0"
              style={{ width: 40, height: 40, background: "#7c3aed1e", color: "#d2a8ff", transition: "transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s" }}
            >
              <Sparkles size={20} strokeWidth={1.75} />
            </div>
            <div className="font-bold" style={{ fontSize: 18, marginBottom: 8, letterSpacing: "-0.3px" }}>AI Assistant</div>
            <div style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6, maxWidth: 280 }}>
              Context-aware suggestions that see your output and errors — not just your code.
            </div>
            <AISuggestionDemo />
          </BentoCard>

          {/* Row 2 — wide */}
          <BentoCard accent="#3fb950" gradientClass="green" delay={0.12} wide>
            <div className="flex flex-col md:flex-row" style={{ gap: 24, alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  className="flex items-center justify-center rounded-xl mb-4 flex-shrink-0"
                  style={{ width: 40, height: 40, background: "#3fb9501e", color: "#3fb950", transition: "transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s" }}
                >
                  <Users size={20} strokeWidth={1.75} />
                </div>
                <div className="font-bold" style={{ fontSize: 18, marginBottom: 8, letterSpacing: "-0.3px" }}>Real-time Collaboration</div>
                <div style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6 }}>
                  Live cursors, shared sessions and presence avatars. Code together like you&apos;re in the same room.
                </div>
                <div className="flex items-center gap-2 mt-4" style={{ fontSize: 11, color: "#6e7681" }}>
                  <div
                    className="rounded-full"
                    style={{ width: 7, height: 7, background: "#3fb950", boxShadow: "0 0 6px #3fb950", animation: "landing-pulse-dot 2s ease-in-out infinite", flexShrink: 0 }}
                  />
                  3 collaborators online now
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <CollabDemo />
              </div>
            </div>
          </BentoCard>

          {/* Row 3 */}
          <BentoCard accent="#ffa657" gradientClass="orange" delay={0.18}>
            <div
              className="flex items-center justify-center rounded-xl mb-4 flex-shrink-0"
              style={{ width: 40, height: 40, background: "#ffa6571e", color: "#ffa657", transition: "transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s" }}
            >
              <Globe size={20} strokeWidth={1.75} />
            </div>
            <div className="font-bold" style={{ fontSize: 18, marginBottom: 8, letterSpacing: "-0.3px" }}>60+ Languages</div>
            <div style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6, maxWidth: 280 }}>
              Python, Go, Rust, TypeScript, Java and many more — all major runtimes supported.
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {["Python", "Go", "Rust", "TypeScript", "Java", "C#", "Swift", "Kotlin", "Ruby", "+49 more"].map((l) => (
                <span
                  key={l}
                  style={{
                    fontSize: 10.5, padding: "3px 11px", borderRadius: 20,
                    border: "1px solid #30363d", color: "#8b949e", background: "#161b22",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard accent="#ff7b72" gradientClass="red" delay={0.24}>
            <div
              className="flex items-center justify-center rounded-xl mb-4 flex-shrink-0"
              style={{ width: 40, height: 40, background: "#ff7b721e", color: "#ff7b72", transition: "transform 0.3s cubic-bezier(.22,1,.36,1), background 0.3s" }}
            >
              <Share2 size={20} strokeWidth={1.75} />
            </div>
            <div className="font-bold" style={{ fontSize: 18, marginBottom: 8, letterSpacing: "-0.3px" }}>Snippet Sharing</div>
            <div style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6, maxWidth: 280 }}>
              Share runnable code with a single link. Recipients can run it instantly — no account needed.
            </div>
            <CopyButton />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children, accent, gradientClass, delay = 0, wide = false,
}: {
  children: React.ReactNode;
  accent: string;
  gradientClass: "blue" | "purple" | "green" | "orange" | "red";
  delay?: number;
  wide?: boolean;
}) {
  const gradients: Record<string, string> = {
    blue:   "linear-gradient(135deg, #58a6ff12 0%, transparent 55%)",
    purple: "linear-gradient(135deg, #7c3aed16 0%, transparent 55%)",
    green:  "linear-gradient(135deg, #3fb95014 0%, transparent 55%)",
    orange: "linear-gradient(135deg, #ffa65714 0%, transparent 55%)",
    red:    "linear-gradient(135deg, #ff7b7214 0%, transparent 55%)",
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className={`landing-fade-up relative overflow-hidden rounded-2xl ${wide ? "md:col-span-2" : ""}`}
      data-delay={String(delay)}
      style={{
        background: `${gradients[gradientClass]}, #0d1117`,
        border: `1px solid ${hovered ? `${accent}40` : "#21262d"}`,
        padding: 28,
        boxShadow: hovered
          ? `0 0 0 1px ${accent}18, 0 24px 64px rgba(0,0,0,.5), 0 0 40px ${accent}10`
          : "0 0 0 1px transparent, 0 8px 32px rgba(0,0,0,.3)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.3s",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

function TerminalDemo() {
  const [phase, setPhase] = React.useState<"idle" | "running" | "done">("idle");
  const [time, setTime] = React.useState("0.23s");

  useEffect(() => {
    const times = ["0.18s", "0.23s", "0.31s", "0.19s", "0.27s"];
    let cancelled = false;
    let tid: ReturnType<typeof setTimeout>;
    const cycle = () => {
      if (cancelled) return;
      setPhase("running");
      tid = setTimeout(() => {
        if (cancelled) return;
        setTime(times[Math.floor(Math.random() * times.length)]);
        setPhase("done");
        tid = setTimeout(() => {
          if (cancelled) return;
          setPhase("idle");
          tid = setTimeout(cycle, 800);
        }, 3000);
      }, 900);
    };
    tid = setTimeout(cycle, 1200);
    return () => { cancelled = true; clearTimeout(tid); };
  }, []);

  return (
    <div
      className="mt-4 rounded-xl font-mono"
      style={{ background: "#0a0d13", border: "1px solid #21262d", padding: "12px 14px", fontSize: 11.5 }}
    >
      <div className="flex items-center gap-2" style={{ lineHeight: "22px" }}>
        <span style={{ color: "#58a6ff" }}>▶</span>
        <span style={{ color: "#e6edf3" }}>python solution.py</span>
      </div>
      {phase === "running" && (
        <div className="flex items-center gap-2" style={{ lineHeight: "22px" }}>
          <span style={{ color: "#6e7681" }}>Running</span>
          <span style={{ display: "inline-flex", gap: 2 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 3, height: 3, borderRadius: "50%", background: "#6e7681", display: "inline-block",
                  animation: `landing-blink 1s ${i * 0.3}s step-end infinite`,
                }}
              />
            ))}
          </span>
        </div>
      )}
      {phase === "done" && (
        <div style={{ animation: "landing-slide-up 0.3s ease both" }}>
          <div style={{ lineHeight: "22px", color: "#8b949e" }}>
            Result: <span style={{ color: "#e6edf3" }}>index 4</span>
            <span style={{ color: "#6e7681" }}> (found in 3 steps)</span>
          </div>
          <div className="flex items-center gap-2" style={{ lineHeight: "22px" }}>
            <span style={{ color: "#3fb950" }}>✓ Exited</span>
            <span style={{ color: "#ffa657" }}>· {time}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AISuggestionDemo() {
  const FULL = "Your loop has an off-by-one error on line 8.";
  const [text, setText] = React.useState("");
  const [showFix, setShowFix] = React.useState(false);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;
    let tid: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      if (cancelled) return;
      if (idx <= FULL.length) {
        setText(FULL.slice(0, idx++));
        tid = setTimeout(typeChar, 28);
      } else {
        const fixTid = setTimeout(() => { if (!cancelled) setShowFix(true); }, 300);
        tid = setTimeout(() => {
          clearTimeout(fixTid);
          if (cancelled) return;
          idx = 0; setText(""); setShowFix(false);
          tid = setTimeout(typeChar, 400);
        }, 7500);
      }
    };
    tid = setTimeout(typeChar, 900);
    return () => { cancelled = true; clearTimeout(tid); };
  }, []);

  return (
    <div
      className="mt-4 rounded-xl"
      style={{ background: "#7c3aed10", border: "1px solid #7c3aed28", padding: "12px 14px", fontSize: 11.5 }}
    >
      <div className="flex items-center gap-1.5 mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#d2a8ff" }}>
        <Sparkles size={10} strokeWidth={2} />
        Suggestion
      </div>
      <div style={{ color: "#8b949e", lineHeight: 1.6, fontSize: 12, minHeight: 36 }}>
        {text}
        <span style={{ display: "inline-block", width: 1.5, height: 12, background: "#d2a8ff", verticalAlign: "middle", marginLeft: 1, animation: "landing-blink 0.9s step-end infinite" }} />
      </div>
      <div
        className="mt-2 rounded-lg font-mono"
        style={{
          background: "#0a0d13", border: "1px solid #21262d",
          padding: "6px 10px", fontSize: 11, color: "#3fb950",
          opacity: showFix ? 1 : 0,
          transition: "opacity 0.3s ease",
          minHeight: 30,
        }}
      >
        hi = mid - 1
      </div>
    </div>
  );
}

function CollabDemo() {
  const FULL = "    # O(log n) — returns index or -1";
  const remoteRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let idx = 0;
    let dir = 1;
    let cancelled = false;
    let tid: ReturnType<typeof setTimeout>;

    const step = () => {
      if (cancelled) return;
      if (dir === 1) {
        if (idx <= FULL.length) {
          if (remoteRef.current) remoteRef.current.textContent = FULL.slice(0, idx++);
          tid = setTimeout(step, 55 + Math.random() * 40);
        } else {
          tid = setTimeout(() => { dir = -1; step(); }, 3200);
        }
      } else {
        if (idx >= 0) {
          if (remoteRef.current) remoteRef.current.textContent = FULL.slice(0, idx--);
          tid = setTimeout(step, 22);
        } else {
          dir = 1; tid = setTimeout(step, 1200);
        }
      }
    };
    if (remoteRef.current) remoteRef.current.textContent = "    ";
    tid = setTimeout(step, 1600);
    return () => { cancelled = true; clearTimeout(tid); };
  }, []);

  return (
    <div
      className="rounded-xl overflow-hidden font-mono"
      style={{
        background: "linear-gradient(135deg, #58a6ff35 0%, transparent 40%, #7c3aed20 100%), #0d1117",
        border: "1px solid #30363d",
        fontSize: 11.5,
      }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2"
        style={{ height: 32, background: "#161b22", borderBottom: "1px solid #21262d", padding: "0 10px" }}
      >
        <div className="flex gap-1">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <span style={{ fontSize: 10, color: "#6e7681", marginLeft: 6 }}>solution.py</span>
        <div className="flex items-center ml-auto">
          {[{ label: "Y", color: "#58a6ff" }, { label: "S", color: "#d2a8ff" }].map((av, i) => (
            <div
              key={av.label}
              style={{
                width: 18, height: 18, borderRadius: "50%", background: av.color,
                color: "#0d1117", fontSize: 8, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid #161b22", marginLeft: i === 0 ? 0 : -5, zIndex: 2 - i,
              }}
            >{av.label}</div>
          ))}
        </div>
      </div>

      {/* Code body */}
      <div className="flex">
        <div style={{
          background: "#0d1117", borderRight: "1px solid #1e242d",
          padding: "10px 6px 10px 8px", color: "#3d444d",
          fontSize: 10, lineHeight: "20px", textAlign: "right", userSelect: "none",
        }}>
          {[5, 6, 7, 8].map(n => <div key={n}>{n}</div>)}
        </div>
        <div style={{ padding: "10px 10px", flex: 1, overflow: "hidden" }}>
          {/* Line 5 — you */}
          <div style={{ height: 20, lineHeight: "20px", background: "#58a6ff08", borderLeft: "2px solid #58a6ff50", paddingLeft: 6, marginLeft: -10 }}>
            <span style={{ color: "#ff7b72" }}>while </span>
            <span style={{ color: "#ffa657" }}>lo</span>
            <span style={{ color: "#e6edf3" }}> &lt;= </span>
            <span style={{ color: "#ffa657" }}>hi</span>
            <span style={{ color: "#e6edf3" }}>:</span>
            <span style={{ display: "inline-block", width: 1.5, height: 11, background: "#58a6ff", verticalAlign: "middle", marginLeft: 1, animation: "landing-blink 1.1s step-end infinite" }} />
          </div>
          {/* Line 6 — Sarah */}
          <div style={{ height: 20, lineHeight: "20px", background: "#d2a8ff06", borderLeft: "2px solid #d2a8ff40", paddingLeft: 6, marginLeft: -10 }}>
            <span ref={remoteRef} style={{ color: "#6e7681" }}>{"    "}</span>
            <span style={{ display: "inline-block", width: 1.5, height: 11, background: "#d2a8ff", verticalAlign: "middle", marginLeft: 1, animation: "landing-blink 0.9s step-end infinite" }} />
          </div>
          {/* Line 7 */}
          <div style={{ height: 20, lineHeight: "20px" }}>
            <span style={{ color: "#ffa657" }}>    mid</span>
            <span style={{ color: "#e6edf3" }}> = (</span>
            <span style={{ color: "#ffa657" }}>lo</span>
            <span style={{ color: "#e6edf3" }}> + </span>
            <span style={{ color: "#ffa657" }}>hi</span>
            <span style={{ color: "#e6edf3" }}>) // </span>
            <span style={{ color: "#79c0ff" }}>2</span>
          </div>
          {/* Line 8 */}
          <div style={{ height: 20, lineHeight: "20px", color: "#3d444d" }}>{"    ..."}</div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-2" style={{ padding: "5px 12px", borderTop: "1px solid #1e242d", fontSize: 10, color: "#6e7681" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 5px #3fb950", animation: "landing-pulse-dot 2s ease-in-out infinite", flexShrink: 0 }} />
        2 collaborators editing
      </div>
    </div>
  );
}

function CopyButton() {
  const [copied, setCopied] = React.useState(false);

  return (
    <div
      className="flex items-center gap-2 mt-4 rounded-xl font-mono"
      style={{ background: "#0a0d13", border: "1px solid #21262d", padding: "10px 14px", fontSize: 11, color: "#58a6ff" }}
    >
      <Share2 size={11} color="#6e7681" strokeWidth={2} />
      syntaxlab.dev/s/xk9mf2
      <button
        type="button"
        aria-live="polite"
        aria-label={copied ? "Copied to clipboard" : "Copy link"}
        className="ml-auto rounded-md"
        style={{
          fontSize: 10, padding: "4px 10px",
          background: copied ? "#1a2f1a" : "#21262d",
          color: copied ? "#3fb950" : "#8b949e",
          border: `1px solid ${copied ? "#3fb95050" : "#30363d"}`,
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "inherit",
          flexShrink: 0,
        }}
        onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   LANGUAGES MARQUEE
────────────────────────────────────────────────────────── */

const LANGUAGES: [string, string][] = [
  ["Python", "#3776ab"], ["Go", "#00acd7"], ["Rust", "#dea584"],
  ["TypeScript", "#3178c6"], ["JavaScript", "#f7df1e"], ["Java", "#b07219"],
  ["C#", "#239120"], ["Swift", "#ef4035"], ["Kotlin", "#7F52FF"],
  ["Haskell", "#a97bff"], ["Ruby", "#cc342d"], ["PHP", "#4f5d95"],
  ["C++", "#00599c"], ["Scala", "#dc322f"], ["Dart", "#0175c2"],
  ["Elixir", "#6e4a7e"], ["R", "#276dc3"], ["Lua", "#000080"],
  ["Bash", "#4eaa25"], ["Clojure", "#5881d8"], ["Erlang", "#a90533"],
  ["F#", "#378bba"], ["Julia", "#9558b2"], ["Perl", "#39457e"],
];

function LanguagesMarquee() {
  // duplicate for seamless infinite loop
  const items = [...LANGUAGES, ...LANGUAGES];

  return (
    <section
      id="languages"
      className="relative z-10 w-full overflow-hidden"
      style={{
        padding: "56px 0",
        background: "#0d1117",
        borderTop: "1px solid #21262d",
        borderBottom: "1px solid #21262d",
      }}
    >
      <div
        className="text-center mb-6"
        style={{ fontSize: 11, color: "#6e7681", letterSpacing: "2px", textTransform: "uppercase" }}
      >
        Runs on every major runtime
      </div>

      {/* mask-image fades edges */}
      <div
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", animation: "landing-marquee 30s linear infinite" }}>
            {items.map(([name, color], i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{
                  padding: "10px 24px",
                  borderRight: "1px solid #21262d",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#161b22"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#8b949e", fontWeight: 500 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   AI SPOTLIGHT
────────────────────────────────────────────────────────── */

function AISpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = el.querySelectorAll<HTMLElement>(".landing-fade-up");
            targets.forEach((t, i) => {
              t.style.animationDelay = `${i * 0.08}s`;
              t.classList.add("landing-visible");
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const features = [
    {
      Icon: AlertCircle,
      title: "Error explanation",
      desc: "Explains runtime errors in plain English with a one-click fix.",
    },
    {
      Icon: Code2,
      title: "Output-aware suggestions",
      desc: "Sees what your code actually printed, not just what you wrote.",
    },
    {
      Icon: MessageSquare,
      title: "Natural language commands",
      desc: '"Optimise this for large inputs" — and it actually does it.',
    },
  ];

  return (
    <section
      id="ai-spotlight"
      ref={sectionRef}
      className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 px-5 sm:px-10 lg:px-20 py-16 lg:py-24"
      style={{ background: "#0a0d13" }}
    >
      {/* ambient right glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0, top: "50%", transform: "translateY(-50%)",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, #7c3aed14 0%, transparent 65%)",
        }}
      />

      {/* Left column */}
      <div style={{ position: "relative" }}>
        <div
          className="landing-fade-up flex items-center gap-2 mb-3"
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#d2a8ff" }}
        >
          <span style={{ width: 20, height: 1, background: "#d2a8ff60", display: "inline-block" }} />
          AI-powered
        </div>
        <h2
          className="landing-fade-up font-extrabold"
          style={{ fontSize: "clamp(26px, 4.5vw, 38px)", letterSpacing: "-1.2px", lineHeight: 1.08, marginBottom: 16 }}
        >
          An AI that<br />sees your output
        </h2>
        <p
          className="landing-fade-up"
          style={{ fontSize: 15, color: "#8b949e", lineHeight: 1.75, marginBottom: 28 }}
        >
          Most coding assistants only see your code. SyntaxLab&apos;s AI sees the full
          picture — your code, your output, and your errors — so suggestions are actually useful.
        </p>
        <div className="landing-fade-up flex flex-col gap-2.5">
          {features.map(({ Icon, title, desc }) => (
            <AIFeatureRow key={title} Icon={Icon} title={title} desc={desc} />
          ))}
        </div>
      </div>

      {/* Right column — floating window */}
      <div className="landing-fade-up" style={{ alignSelf: "center" }}>
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          background: "#0d1117",
          border: "1px solid #30363d",
          boxShadow: "0 0 0 1px #7c3aed25, 0 32px 80px rgba(0,0,0,.65), 0 0 60px #7c3aed14",
          animation: "landing-float 5s ease-in-out infinite",
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3.5"
          style={{ height: 40, background: "#161b22", borderBottom: "1px solid #21262d" }}
        >
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="rounded-full block" style={{ width: 9, height: 9, background: c }} />
            ))}
          </div>
          <span style={{ fontSize: 11, color: "#6e7681", marginLeft: 6 }}>solution.py — AI Assistant</span>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 16px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 12 }}>
          {/* Code snippet */}
          <div style={{ marginBottom: 12, lineHeight: "20px", whiteSpace: "pre" }}>
            <div><span style={{ color: "#ff7b72" }}>def </span><span style={{ color: "#d2a8ff" }}>binary_search</span><span style={{ color: "#e6edf3" }}>(arr, target):</span></div>
            <div style={{ paddingLeft: 20 }}><span style={{ color: "#ffa657" }}>lo</span><span style={{ color: "#e6edf3" }}>, </span><span style={{ color: "#ffa657" }}>hi</span><span style={{ color: "#e6edf3" }}> = 0, len(arr) - 1</span></div>
            <div style={{ paddingLeft: 20, background: "#ff7b7212", borderLeft: "2px solid #ff7b7260" }}>
              <span style={{ color: "#ff7b72" }}>while </span><span style={{ color: "#ffa657" }}>lo</span><span style={{ color: "#e6edf3" }}> &lt; </span><span style={{ color: "#ffa657" }}>hi</span><span style={{ color: "#e6edf3" }}>:</span>
            </div>
          </div>
          <div style={{ marginBottom: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.5px", color: "#3d444d", textTransform: "uppercase" }}>Output</div>
          <div style={{ lineHeight: "20px", color: "#ff7b72" }}>IndexError: list index out of range</div>
          <div style={{ lineHeight: "20px", color: "#6e7681", marginBottom: 10 }}>&nbsp;&nbsp;at line 8, in binary_search</div>

          {/* AI panel */}
          <div
            style={{
              marginTop: 14,
              background: "#7c3aed10",
              border: "1px solid #7c3aed28",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              className="flex items-center gap-1.5 mb-2"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#d2a8ff" }}
            >
              <Sparkles size={10} strokeWidth={2} />
              AI Analysis
            </div>
            <div style={{ fontFamily: "var(--font-geist-sans), sans-serif", fontSize: 12, color: "#8b949e", lineHeight: 1.65 }}>
              The while loop exits before checking the last element. Your{" "}
              <code style={{ color: "#d2a8ff", fontFamily: "var(--font-geist-mono), monospace" }}>hi</code>{" "}
              boundary is off by one when the array has an even length.
            </div>
            <div
              style={{
                marginTop: 10, background: "#0a0d13", borderRadius: 7,
                padding: "8px 12px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11,
              }}
            >
              <div style={{ color: "#ff7b72" }}>- while lo &lt; hi:</div>
              <div style={{ color: "#3fb950" }}>+ while lo &lt;= hi:</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function AIFeatureRow({ Icon, title, desc }: { Icon: React.ElementType; title: string; desc: string }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="flex gap-3.5 items-start rounded-xl"
      style={{
        padding: "14px 16px",
        border: `1px solid ${hovered ? "#7c3aed35" : "#21262d"}`,
        background: hovered ? "#110d1c" : "#0d1117",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center rounded-lg flex-shrink-0"
        style={{ width: 32, height: 32, background: hovered ? "#7c3aed30" : "#7c3aed1e", color: "#d2a8ff", transition: "background 0.25s" }}
      >
        <Icon size={15} strokeWidth={2} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.55 }}>{desc}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SOCIAL PROOF
────────────────────────────────────────────────────────── */


const USE_CASES = [
  {
    Icon: Zap,
    color: "#ffa657",
    glow: "#ffa65718",
    border: "#ffa65745",
    tag: "Interview prep",
    title: "Ace your next coding interview",
    description: "Practice problems in 60+ languages with instant execution and AI-powered hints. No setup, no IDE downloads — just open and code.",
  },
  {
    Icon: Users,
    color: "#3fb950",
    glow: "#3fb95018",
    border: "#3fb95045",
    tag: "Team workflows",
    title: "Review code together, live",
    description: "Share a session link, paste a snippet, and walk through it in real time. Cursors, edits, and execution all visible to everyone.",
  },
  {
    Icon: Sparkles,
    color: "#d2a8ff",
    glow: "#d2a8ff18",
    border: "#d2a8ff45",
    tag: "Education",
    title: "Teach with runnable examples",
    description: "Explain concepts live with code that actually runs. Students can fork your snippet, modify it, and ask the AI follow-up questions inline.",
  },
];

function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>(".landing-fade-up").forEach((t, i) => {
              t.style.animationDelay = `${i * 0.1}s`;
              t.classList.add("landing-visible");
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full px-5 sm:px-10 lg:px-20 py-14 lg:py-20"
      style={{ background: "#0d1117" }}
    >
      {/* Section label */}
      <div className="landing-fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7681", marginBottom: 12 }}>
          Built for every workflow
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#e6edf3", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
          One editor. Endless uses.
        </h2>
      </div>

      {/* Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          gap: 20,
          maxWidth: 1040,
          margin: "0 auto",
        }}
      >
        {USE_CASES.map(({ Icon, color, glow, border, tag, title, description }, i) => (
          <div
            key={tag}
            className="landing-fade-up"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              padding: "32px 28px",
              borderRadius: 12,
              border: `1px solid ${hovered === i ? border : "#21262d"}`,
              background: hovered === i
                ? `radial-gradient(ellipse at 20% 0%, ${glow} 0%, #0d1117 60%)`
                : "#0d1117",
              transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.22s ease, border-color 0.22s ease, background 0.22s ease",
              cursor: "default",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${color}18`,
                border: `1px solid ${color}35`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Icon size={18} color={color} />
            </div>

            {/* Tag */}
            <div
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color,
                background: `${color}18`,
                border: `1px solid ${color}30`,
                borderRadius: 4,
                padding: "2px 8px",
                marginBottom: 12,
              }}
            >
              {tag}
            </div>

            {/* Title */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", lineHeight: 1.35, marginBottom: 10 }}>
              {title}
            </h3>

            {/* Description */}
            <p style={{ fontSize: 13.5, color: "#8b949e", lineHeight: 1.65 }}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   CTA BANNER
────────────────────────────────────────────────────────── */

function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>(".landing-fade-up").forEach((t, i) => {
              t.style.animationDelay = `${i * 0.1}s`;
              t.classList.add("landing-visible");
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden text-center px-5 sm:px-10 lg:px-20 py-16 lg:py-24"
      style={{ background: "#0a0d13", borderTop: "1px solid #21262d" }}
    >
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#58a6ff07 1px, transparent 1px), linear-gradient(90deg, #58a6ff07 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 70%)",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 70%)",
        }}
      />
      {/* glows */}
      <div className="absolute pointer-events-none" style={{ top: -60, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, #58a6ff1e 0%, transparent 65%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: -80, left: "50%", transform: "translateX(-50%)", width: 400, height: 300, background: "radial-gradient(ellipse, #7c3aed14 0%, transparent 65%)" }} />

      <h2
        className="landing-fade-up font-extrabold"
        style={{ fontSize: "clamp(30px, 5.5vw, 48px)", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 14, position: "relative" }}
      >
        Start writing{" "}
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #58a6ff 0%, #a78bfa 35%, #58a6ff 70%, #a78bfa 100%)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "landing-gradflow 5s linear infinite",
          }}
        >
          better code
        </span>{" "}
        today.
      </h2>
      <p
        className="landing-fade-up"
        style={{ fontSize: 16, color: "#8b949e", marginBottom: 36, position: "relative" }}
      >
        No account required. Open your first file in under 10 seconds.
      </p>
      <div className="landing-fade-up flex flex-col sm:flex-row items-center justify-center gap-3" style={{ position: "relative" }}>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 rounded-xl font-bold"
          style={{
            padding: "13px 28px",
            background: "#58a6ff",
            color: "#0a0d13",
            fontSize: 15,
            animation: "landing-ctabreathe 3s ease-in-out infinite",
            transition: "transform 0.2s, background 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#79c0ff"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 32px #58a6ff50"; el.style.animation = "none"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#58a6ff"; el.style.transform = ""; el.style.boxShadow = ""; el.style.animation = "landing-ctabreathe 3s ease-in-out infinite"; }}
        >
          <Play size={14} fill="currentColor" strokeWidth={0} />
          Start coding free
        </Link>
        <a
          href="https://github.com/skdonepudi/syntaxlab"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl"
          style={{
            padding: "13px 22px",
            color: "#8b949e",
            fontSize: 15,
            border: "1px solid #30363d",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#e6edf3"; el.style.borderColor = "#58a6ff50"; el.style.background = "#21262d"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#8b949e"; el.style.borderColor = "#30363d"; el.style.background = "transparent"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   FOOTER
────────────────────────────────────────────────────────── */

function LandingFooter() {
  const navLinks = [
    { label: "Docs",    href: "#" },
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms",   href: "#" },
  ];

  return (
    <footer
      className="relative z-10"
      style={{ background: "#0d1117" }}
    >
      {/* Gradient separator */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #30363d 20%, #30363d 80%, transparent)" }} />

      <div
        className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0 px-6 sm:px-16 lg:px-20 py-5"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: 26, height: 26, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", boxShadow: "0 2px 8px #58a6ff25", flexShrink: 0 }}
          >
            <Code2 size={13} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold" style={{ fontSize: 14, letterSpacing: "-0.3px", color: "#8b949e", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e6edf3"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8b949e"; }}
          >
            SyntaxLab
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ fontSize: 12, color: "#6e7681", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#8b949e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6e7681"; }}
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: 1, height: 14, background: "#30363d" }} />

          {/* GitHub icon link */}
          <a
            href="https://github.com/skdonepudi/syntaxlab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 30, height: 30,
              border: "1px solid #21262d",
              color: "#6e7681",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#30363d"; el.style.color = "#e6edf3"; el.style.background = "#21262d"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#21262d"; el.style.color = "#6e7681"; el.style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </nav>

        {/* Copyright */}
        <span style={{ fontSize: 11, color: "#3d444d" }}>© 2026 SyntaxLab</span>
      </div>
    </footer>
  );
}
