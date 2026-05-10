"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0d13", color: "#e6edf3", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          {/* Logo mark */}
          <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #58a6ff, #7c3aed)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 4px 20px #58a6ff30" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          {/* Cheeky eyebrow */}
          <p style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace", fontSize: 12, color: "#6e7681", marginBottom: 16, letterSpacing: "0.04em" }}>
            <span style={{ color: "#ff7b72" }}>FATAL</span>
            <span style={{ color: "#6e7681" }}>: </span>
            <span style={{ color: "#ffa657" }}>process.exit</span>
            <span style={{ color: "#6e7681" }}>(1)</span>
          </p>

          <h1 style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace", fontSize: 28, fontWeight: 800, color: "#e6edf3", marginBottom: 12, lineHeight: 1.2 }}>
            App crashed.
          </h1>
          <p style={{ fontSize: 14, color: "#8b949e", marginBottom: 8, maxWidth: 340, margin: "0 auto 8px", lineHeight: 1.6 }}>
            This one&apos;s bad — the whole app threw up.
          </p>
          <p style={{ fontSize: 14, color: "#6e7681", marginBottom: 36, maxWidth: 340, margin: "0 auto 36px", lineHeight: 1.6 }}>
            Try refreshing, or clear your cache and pretend this never happened.
          </p>

          <button
            onClick={reset}
            style={{ padding: "10px 24px", borderRadius: 8, background: "#58a6ff", color: "#0a0d13", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#79c0ff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#58a6ff"; }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
