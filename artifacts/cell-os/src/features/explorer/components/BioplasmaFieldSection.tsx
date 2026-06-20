import type { CellZoneId } from "@/domain/types";
import { BIOPLASMA_ZONE_REGISTRY } from "@/domain/content/organelles";
import { useBioplasmaVmem, type VmemProfile } from "@/features/cell-shell/hooks/useBioplasmaVmem";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { BP7_VMEM_PATTERN } from "@/domain/content/bioplasmaPathways";

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
 * BP7 Vmem closed loop: when BP7 is present in the zone's pathways, a profile
 * switcher appears below the card grid. Switching the profile:
 *   1. Persists the selection to localStorage (useBioplasmaVmem)
 *   2. Fires a BP7 pulse signal (bioplasmaSignal)
 *   3. Updates the BP1 membrane baseline glow intensity (initBP1Baseline)
 *
 * Uses only inline styles — Tailwind dynamic class interpolation is
 * invisible to JIT (Cell OS convention from MEMORY.md).
 */

const STATUS_COLORS: Record<string, string> = {
  verified:    "#22d3ee",  // cyan
  indicative:  "#86efac",  // green
  speculative: "#fbbf24",  // amber
  reserved:    "#6b7280",  // gray
};

const DIRECTION_GLYPHS: Record<string, string> = {
  inward:        "→ inward",
  outward:       "← outward",
  bidirectional: "↔ bidirectional",
  broadcast:     "⊕ broadcast",
  readonly:      "◎ read-only",
};

/** BP1 baseline intensities per Vmem profile. */
const VMEM_BASELINE: Record<VmemProfile, number> = {
  cool:        0.10,  // hyperpolarised — minimal glow
  balanced:    0.22,  // homeostatic default
  performance: 0.38,  // depolarised — brighter baseline
};

const VMEM_LABELS: Record<VmemProfile, { label: string; description: string; color: string }> = {
  cool:        { label: "Cool",        description: "Hyperpolarised · minimal dissipation",  color: "#38bdf8" },
  balanced:    { label: "Balanced",    description: "Homeostatic · resting Vmem",            color: "#86efac" },
  performance: { label: "Performance", description: "Depolarised · elevated metabolic pump", color: "#fb923c" },
};

interface Props {
  zoneId: CellZoneId;
}

export function BioplasmaFieldSection({ zoneId }: Props) {
  const pathways = BIOPLASMA_ZONE_REGISTRY[zoneId] ?? [];

  // Always call hooks unconditionally — gate rendering, not hooks.
  const { vmemProfile, setVmemProfile } = useBioplasmaVmem();
  const bioplasmaSignal = useCellVitalStore((s) => s.bioplasmaSignal);
  const initBP1Baseline = useCellVitalStore((s) => s.initBP1Baseline);

  const hasVmem = pathways.some((p) => p.code === "BP7");

  if (pathways.length === 0) return null;

  function handleVmemChange(profile: VmemProfile) {
    setVmemProfile(profile);
    // Fire BP7 signal at the profile-scaled intensity.
    // Intensity passed = baseline / sigma so the σ-weighting in bioplasmaSignal
    // produces exactly the target baseline intensity as the visual output.
    bioplasmaSignal(BP7_VMEM_PATTERN, VMEM_BASELINE[profile] / BP7_VMEM_PATTERN.sigma, 3000);
    // Update the BP1 membrane baseline to match the new profile.
    initBP1Baseline(VMEM_BASELINE[profile]);
  }

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

      {/* BP7 Vmem Profile Switcher — shown only in zones that have BP7 */}
      {hasVmem && (
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem 1.25rem",
          background: "rgba(134,239,172,0.04)",
          border: "1px solid rgba(134,239,172,0.12)",
          borderRadius: "0.5rem",
        }}>
          <div style={{ marginBottom: "0.875rem" }}>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "rgba(134,239,172,0.8)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              BP7 Vmem Profile
            </span>
            <p style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "monospace",
              margin: "0.25rem 0 0 0",
              lineHeight: 1.4,
            }}>
              Morphogenetic membrane potential · persists across sessions
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {(["cool", "balanced", "performance"] as VmemProfile[]).map((profile) => {
              const meta = VMEM_LABELS[profile];
              const isSelected = vmemProfile === profile;
              return (
                <button
                  key={profile}
                  onClick={() => handleVmemChange(profile)}
                  style={{
                    flex: "1 1 120px",
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.375rem",
                    border: `1px solid ${isSelected ? `${meta.color}55` : "rgba(255,255,255,0.07)"}`,
                    background: isSelected ? `${meta.color}12` : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    fontWeight: isSelected ? 700 : 400,
                    color: isSelected ? meta.color : "rgba(255,255,255,0.4)",
                    marginBottom: "0.2rem",
                    transition: "color 0.3s ease",
                  }}>
                    {meta.label}
                  </div>
                  <div style={{
                    fontFamily: "monospace",
                    fontSize: "0.58rem",
                    color: isSelected ? `${meta.color}80` : "rgba(255,255,255,0.2)",
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                  }}>
                    {meta.description}
                  </div>
                  {isSelected && (
                    <div style={{
                      marginTop: "0.35rem",
                      height: "2px",
                      background: meta.color,
                      borderRadius: "1px",
                      opacity: 0.6,
                      width: `${VMEM_BASELINE[profile] * 200}%`,
                      maxWidth: "100%",
                      transition: "width 0.4s ease",
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
