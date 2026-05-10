/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Code2, Zap, Users, Sparkles, Upload, Sun, Play, PlayCircle } from "lucide-react";

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
      tid = setTimeout(sparkle, 600 + Math.random() * 900);
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
            "linear-gradient(#58a6ff12 1px, transparent 1px), linear-gradient(90deg, #58a6ff12 1px, transparent 1px)",
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
          top: 40, right: -60, width: 700, height: 600,
          background:
            "radial-gradient(ellipse at 65% 35%, #58a6ff22 0%, #7c3aed14 45%, transparent 70%)",
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
        className="relative flex items-center justify-between px-8 z-10"
        style={{
          height: 54,
          background: "rgba(10, 13, 19, 0.75)",
          borderBottom: "1px solid #30363d30",
          backdropFilter: "blur(12px)",
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
        className="relative z-10 grid items-center gap-16 px-12 mx-auto w-full"
        style={{
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 1280,
          paddingTop: 96,
          paddingBottom: 72,
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
            style={{ fontSize: 68, lineHeight: 1.03, letterSpacing: "-2.5px" }}
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

        {/* RIGHT — Editor window */}
        <div style={{ perspective: "1000px", animation: "landing-slideInRight 0.75s 0.1s cubic-bezier(.22,1,.36,1) both", position: "relative" }}>
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
              transition: "box-shadow 0.35s, transform 0.35s",
              willChange: "transform",
            }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "#0d1117",
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
        style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}
      >
        {PILLS.map(({ Icon, label, hoverColor, delay }) => (
          <PillItem key={label} Icon={Icon} label={label} hoverColor={hoverColor} delay={delay} />
        ))}
      </div>

      {/* ── Footer note ── */}
      <div
        className="relative z-10 text-center pb-6"
        style={{ fontSize: 11, color: "#3d444d", letterSpacing: "0.3px" }}
      >
        No account required &nbsp;·&nbsp; Free to use &nbsp;·&nbsp; Open in seconds
      </div>
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
