import type { CellZoneId } from "@/domain/types";
import { BIOPLASMA_ZONE_REGISTRY } from "@/domain/content/organelles";

/**
 * BioplasmaFieldSection — displays active bioplasma pathways for a given zone.
 *
 * Renders an inline card grid. No collapsible — these are always-visible
 * because they are part of the zone's base biology, not optional detail.
 *
 * Each card shows:
 *   - Code badge (BP1–BP9) + status badge (verified / indicative / speculative / reserved)
 *   - σ confidence score as a numeric value + horizontal bar
 *   - Carrier description and frequency range
 *   - IPC analogue (marked "metaphor" if isMetaphor === true)
 *   - Route direction + read-only / reserved flags
 *
 * Uses only inline styles — Tailwind dynamic class interpolation is
 * invisible to JIT (Cell OS convention from MEMORY.md).
 */

const STATUS_COLORS: Record<string, string> = {
  verified:   "#22d3ee",   // cyan
  indicative: "#86efac",   // green
  speculative: "#fbbf24",  // amber
  reserved:   "#6b7280",   // gray
};

const DIRECTION_GLYPHS: Record<string, string> = {
  inward:       "→ inward",
  outward:      "← outward",
  bidirectional: "↔ bidirectional",
  broadcast:    "⊕ broadcast",
  readonly:     "◎ read-only",
};

interface Props {
  zoneId: CellZoneId;
}

export function BioplasmaFieldSection({ zoneId }: Props) {
  const pathways = BIOPLASMA_ZONE_REGISTRY[zoneId] ?? [];

  if (pathways.length === 0) return null;

  return (
    <section style={{ marginTop: "3rem", marginBottom: "2rem" }}>
      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.25rem", opacity: 0.6 }}>⚡</span>
        <div>
          <h3 style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "1rem", margin: 0 }}>
            Bioplasma Field Layer
          </h3>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", margin: "0.2rem 0 0 0", fontFamily: "monospace" }}>
            endogenous EM field pathways · LineageOSv2_Manifold.md §5
          </p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "0.75rem",
      }}>
        {pathways.map((pw) => {
          const color = STATUS_COLORS[pw.status] ?? "#6b7280";
          const isDisabled = pw.status === "reserved";

          return (
            <div
              key={pw.code}
              style={{
                background: isDisabled ? "rgba(255,255,255,0.02)" : `${color}08`,
                border: `1px solid ${isDisabled ? "rgba(255,255,255,0.06)" : `${color}22`}`,
                borderRadius: "0.5rem",
                padding: "0.875rem 1rem",
                opacity: isDisabled ? 0.55 : 1,
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color,
                  background: `${color}18`,
                  padding: "0.15rem 0.45rem",
                  borderRadius: "0.25rem",
                  letterSpacing: "0.05em",
                }}>
                  {pw.code}
                </span>
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: `${color}bb`,
                  background: `${color}10`,
                  padding: "0.1rem 0.35rem",
                  borderRadius: "0.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  {pw.status}
                </span>
                {pw.organelleRoute.direction === "readonly" && (
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    color: "rgba(251,191,36,0.7)",
                    background: "rgba(251,191,36,0.08)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "0.2rem",
                  }}>
                    READ-ONLY
                  </span>
                )}
              </div>

              {/* σ bar */}
              <div style={{ marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                    σ confidence
                  </span>
                  <span style={{ fontSize: "0.65rem", color, fontFamily: "monospace", fontWeight: 600 }}>
                    {pw.sigma.toFixed(2)}
                  </span>
                </div>
                <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${pw.sigma * 100}%`,
                    background: color,
                    borderRadius: "1px",
                    opacity: isDisabled ? 0.4 : 0.7,
                  }} />
                </div>
              </div>

              {/* Carrier */}
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", margin: "0 0 0.3rem 0", lineHeight: 1.4 }}>
                {pw.carrier}
              </p>

              {/* Frequency + direction row */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "0.1rem 0.35rem",
                  borderRadius: "0.2rem",
                }}>
                  {pw.frequencyRange}
                </span>
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "0.1rem 0.35rem",
                  borderRadius: "0.2rem",
                }}>
                  {DIRECTION_GLYPHS[pw.organelleRoute.direction] ?? pw.organelleRoute.direction}
                </span>
              </div>

              {/* IPC analogue */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "0.4rem",
                marginTop: "0.4rem",
              }}>
                <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
                  {pw.isMetaphor ? "metaphor · " : "analogue · "}
                </span>
                <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                  {pw.ipcAnalogue}
                </span>
              </div>

              {/* Source path */}
              {pw.lineageosPath && (
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.18)",
                  margin: "0.3rem 0 0 0",
                  wordBreak: "break-all",
                  lineHeight: 1.3,
                }}>
                  {pw.lineageosPath}
                </p>
              )}
              {!pw.lineageosPath && (
                <p style={{
                  fontFamily: "monospace",
                  fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.15)",
                  margin: "0.3rem 0 0 0",
                  fontStyle: "italic",
                }}>
                  no LineageOS implementation
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
