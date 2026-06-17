import { Link } from "wouter";

export default function PaeFlow() {
  const src = `${import.meta.env.BASE_URL}cell-os-pae-flow.html`;

  return (
    <div
      style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "#0f172a" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: "36px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#0a0f1e",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Courier New, monospace" }}>
          <Link
            href="/"
            style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            ← Cell OS
          </Link>
          <span style={{ color: "rgba(255,255,255,0.08)", fontSize: "11px" }}>·</span>
          <span style={{ color: "rgba(167,139,250,0.7)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            流 Perception · Affect · Expression
          </span>
          <span style={{ color: "rgba(255,255,255,0.08)", fontSize: "11px" }}>·</span>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "10px" }}>
            15 Organelles · Triadic Signal Flow · Android IPC · Biophoton σ-weights
          </span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", fontFamily: "Courier New, monospace", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
        >
          open full ↗
        </a>
      </div>
      <iframe
        src={src}
        title="Cell OS Perception · Affect · Expression Flow"
        style={{ flex: 1, width: "100%", border: "none", display: "block" }}
      />
    </div>
  );
}
