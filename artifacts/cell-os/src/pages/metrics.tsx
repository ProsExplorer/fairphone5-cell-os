import { useMemo } from "react";
import {
  computeManifoldMetrics,
  getMetricHealth,
  METRIC_HEALTHY_RANGES,
  type ManifoldMetrics,
  type MetricHealth,
} from "@/domain/content/manifoldMetrics";
import { ZONE_CONFIDENCE_ORDER, RELATED_ZONE_JUMPS } from "@/features/explorer/navigation/useExplorerNavigation";

const HEALTH_COLOR: Record<MetricHealth, string> = {
  healthy:    "#4ade80",
  "warn-low": "#facc15",
  "warn-high":"#fb923c",
  critical:   "#f87171",
};

const HEALTH_LABEL: Record<MetricHealth, string> = {
  healthy:    "healthy",
  "warn-low": "low",
  "warn-high":"high",
  critical:   "critical",
};

type MetricKey = keyof Omit<ManifoldMetrics, "zoneConfidenceCentroids">;

const METRIC_META: Array<{
  key: MetricKey;
  label: string;
  description: string;
  format: (v: number) => string;
}> = [
  {
    key: "couplingTensorDensity",
    label: "Coupling Tensor Density",
    description: "ORGANELLE_SUBSTRATE_LINKS / (organelles × substrates). Below 10 % = underlinked; above 25 % = overcoupled.",
    format: (v) => `${(v * 100).toFixed(1)}%`,
  },
  {
    key: "couplingTensorLinks",
    label: "Coupling Tensor Links",
    description: "Raw count of ORGANELLE_SUBSTRATE_LINKS entries.",
    format: (v) => String(v),
  },
  {
    key: "meanZoneConfidence",
    label: "Mean Zone Confidence",
    description: "Average confidence centroid σ̄ across all 8 zones. Dropping centroid = adding unconfirmed claims.",
    format: (v) => v.toFixed(3),
  },
  {
    key: "biophotonCoverage",
    label: "Biophoton Coverage",
    description: "BIOPHOTON_LINKS / organelles². Above 5 % = links no longer selective.",
    format: (v) => `${(v * 100).toFixed(2)}%`,
  },
  {
    key: "biophotonLinks",
    label: "Biophoton Links",
    description: "Raw count of BIOPHOTON_LINKS entries.",
    format: (v) => String(v),
  },
  {
    key: "qiTensorDensity",
    label: "QI Tensor Density",
    description: "QI_INTERSECTIONS / (8 × 3 × 11). Below 5 % = too sparse; above 10 % = losing selectivity.",
    format: (v) => `${(v * 100).toFixed(1)}%`,
  },
  {
    key: "qiTensorLinks",
    label: "QI Tensor Entries",
    description: "Raw count of QI_INTERSECTIONS entries.",
    format: (v) => String(v),
  },
  {
    key: "exportRankTotal",
    label: "Export Rank Total",
    description: "Sum of exported symbols across all modules. Rapid growth = type proliferation / leaky abstractions.",
    format: (v) => String(v),
  },
  {
    key: "phaseTransitionCount",
    label: "Phase Transitions",
    description: "Count of discrete state-jump types. Each new transition = a new UX mode requiring justification.",
    format: (v) => String(v),
  },
];

function MetricRow({
  label,
  description,
  value,
  formatted,
  health,
  range,
}: {
  label: string;
  description: string;
  value: number;
  formatted: string;
  health: MetricHealth;
  range: { low: number; high: number };
}) {
  const color = HEALTH_COLOR[health];
  return (
    <div
      style={{
        borderLeft: `3px solid ${color}`,
        paddingLeft: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.25rem" }}>
        <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#e2e8f0" }}>{label}</span>
        <span style={{ fontSize: "1.4rem", fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
          {formatted}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color,
            opacity: 0.85,
            border: `1px solid ${color}`,
            borderRadius: "3px",
            padding: "1px 5px",
          }}
        >
          {HEALTH_LABEL[health]}
        </span>
      </div>
      <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "0 0 0.25rem" }}>{description}</p>
      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
        healthy range: {range.low} – {range.high}
      </span>
    </div>
  );
}

export default function Metrics() {
  const m = useMemo(() => computeManifoldMetrics(), []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "#e2e8f0",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "2rem 1.5rem",
        maxWidth: "820px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "0.4rem" }}>
          developer surface · Cell OS manifold
        </div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.5rem" }}>
          Manifold Health Metrics
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
          Live tensor field statistics computed from the source arrays.
          See <code style={{ color: "#94a3b8" }}>MANIFOLD_ANALYSIS.md §11.8</code> for interpretation.
        </p>
      </div>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "1.25rem" }}>
          Tensor Field Metrics
        </h2>
        {METRIC_META.map(({ key, label, description, format }) => {
          const value = m[key] as number;
          const health = getMetricHealth(key, value);
          return (
            <MetricRow
              key={key}
              label={label}
              description={description}
              value={value}
              formatted={format(value)}
              health={health}
              range={METRIC_HEALTHY_RANGES[key]}
            />
          );
        })}
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "1.25rem" }}>
          Zone Confidence Centroids (σ̄)
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
          {(Object.entries(m.zoneConfidenceCentroids) as [string, number][]).map(([zone, sigma]) => {
            const color = sigma >= 1.0 ? "#4ade80" : sigma >= 0.5 ? "#facc15" : "#f87171";
            const isConfidenceFirst = ZONE_CONFIDENCE_ORDER.includes(zone as any) &&
              ZONE_CONFIDENCE_ORDER.indexOf(zone as any) < 5;
            return (
              <div
                key={zone}
                style={{
                  background: "#0f172a",
                  border: `1px solid ${color}22`,
                  borderRadius: "6px",
                  padding: "0.65rem 0.85rem",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}>
                  <span>{zone}</span>
                  {isConfidenceFirst && (
                    <span style={{ color: "#4ade80", fontSize: "0.65rem" }}>evidence-first</span>
                  )}
                </div>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
                  {sigma.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "1.25rem" }}>
          Geodesic Zone Jumps
        </h2>
        <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "1rem" }}>
          Non-sequential zone pairs with reduced effective distance in the biophoton-corrected metric g<sub>ij</sub>.
          See MANIFOLD_ANALYSIS.md §11.3.
        </p>
        {RELATED_ZONE_JUMPS.map(([a, b]) => (
          <div
            key={`${a}-${b}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "#0f172a",
              border: "1px solid #1e3a5f",
              borderRadius: "6px",
              padding: "0.65rem 1rem",
              marginBottom: "0.5rem",
              fontSize: "0.85rem",
            }}
          >
            <span style={{ color: "#7dd3fc", fontWeight: 600 }}>{a}</span>
            <span style={{ color: "#475569" }}>↔</span>
            <span style={{ color: "#7dd3fc", fontWeight: 600 }}>{b}</span>
            <span style={{ color: "#475569", marginLeft: "auto", fontSize: "0.72rem" }}>
              {a === "nucleus" && b === "mitochondria" ? "d_g = 3.45 (graph: 4)" : "d_g = 0.84 (biophoton coupled)"}
            </span>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "1.25rem" }}>
          Evidence-First Zone Tour
        </h2>
        <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "1rem" }}>
          Confidence-gradient traversal order (MANIFOLD_ANALYSIS.md §11.4). Visits fully-grounded zones (σ̄ = 1.0) before partially-grounded (σ̄ = 0.5).
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem" }}>
          {ZONE_CONFIDENCE_ORDER.map((zone, i) => {
            const sigma = m.zoneConfidenceCentroids[zone] ?? 0;
            const color = sigma >= 1.0 ? "#4ade80" : "#facc15";
            return (
              <div key={zone} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    background: "#0f172a",
                    border: `1px solid ${color}44`,
                    borderRadius: "4px",
                    padding: "0.3rem 0.65rem",
                    fontSize: "0.78rem",
                    color,
                  }}
                >
                  <span style={{ color: "#475569", marginRight: "0.35rem", fontSize: "0.65rem" }}>{i + 1}</span>
                  {zone}
                </div>
                {i < ZONE_CONFIDENCE_ORDER.length - 1 && (
                  <span style={{ color: "#334155", fontSize: "0.8rem" }}>→</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #1e293b", paddingTop: "1rem", fontSize: "0.72rem", color: "#334155" }}>
        Hidden developer surface · /metrics · Cell OS · Manifold Analysis rev 2
      </footer>
    </div>
  );
}
