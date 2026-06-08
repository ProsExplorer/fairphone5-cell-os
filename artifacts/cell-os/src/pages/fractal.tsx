import { useState, useMemo } from "react";
import { FRACTAL_CYCLES } from "@/domain/content/fractalCycles";
import { NINE_SCALE_FLOWS } from "@/domain/content/scales";
import { ZONE_DEPTH_ORDER } from "@/features/explorer/navigation/useExplorerNavigation";
import { computeManifoldMetrics } from "@/domain/content/manifoldMetrics";

const P_COLOR = "#7dd3fc";
const A_COLOR = "#c4b5fd";
const E_COLOR = "#86efac";

const PHASE_COLORS: Record<"perception" | "affect" | "expression", string> = {
  perception: P_COLOR,
  affect: A_COLOR,
  expression: E_COLOR,
};

const PHASE_GLYPHS: Record<"perception" | "affect" | "expression", string> = {
  perception: "門",
  affect: "室",
  expression: "窗",
};

function TriadRow({
  p, a, e,
  pLabel, aLabel, eLabel,
  dimmed,
}: {
  p: string; a: string; e: string;
  pLabel?: string; aLabel?: string; eLabel?: string;
  dimmed?: boolean;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: "0.5rem", alignItems: "start", opacity: dimmed ? 0.6 : 1 }}>
      {([
        [P_COLOR, pLabel ?? "P", p],
        null,
        [A_COLOR, aLabel ?? "A", a],
        null,
        [E_COLOR, eLabel ?? "E", e],
      ] as any[]).map((item, i) => {
        if (item === null) {
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "1.2rem" }}>
              <span style={{ color: "#334155", fontSize: "1rem" }}>→</span>
            </div>
          );
        }
        const [color, label, text] = item;
        return (
          <div key={i} style={{ background: "#0f172a", border: `1px solid ${color}22`, borderRadius: "6px", padding: "0.65rem 0.75rem" }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color, marginBottom: "0.3rem", fontWeight: 600 }}>
              {label}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.45 }}>{text}</div>
          </div>
        );
      })}
    </div>
  );
}

function ZoomDivider({ level, label }: { level: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2rem 0 1.5rem" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #1e293b)" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
        <span style={{ fontSize: "0.6rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.12em" }}>zoom in</span>
        <span style={{ color: "#475569", fontSize: "0.75rem" }}>↓</span>
        <span style={{ fontSize: "0.65rem", color: "#7dd3fc", letterSpacing: "0.08em", fontWeight: 600 }}>{level}</span>
        <span style={{ fontSize: "0.7rem", color: "#475569" }}>{label}</span>
      </div>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #1e293b)" }} />
    </div>
  );
}

function SectionHeader({ level, title, subtitle }: { level: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#7dd3fc", border: "1px solid #1e3a5f", borderRadius: "3px", padding: "2px 7px" }}>
          {level}
        </span>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0.35rem 0 0" }}>{subtitle}</p>}
    </div>
  );
}

const MODULE_BIJECTION = [
  { module: "domain/types.ts", organelle: "DNA", why: "20 exported type contracts — the complete genome. Never instantiated directly; everything else is derived from it." },
  { module: "domain/content/organelles.ts", organelle: "Nucleolus", why: "Generates descriptions of all organelles, including a description of itself." },
  { module: "domain/content/substrate.ts", organelle: "Mitochondria (hardware)", why: "The actual physical substrate — QCM6490, Hexagon 770, Adreno 643. The real energy-producing machinery." },
  { module: "domain/content/mappings.ts", organelle: "Nuclear pores", why: "ORGANELLE_SUBSTRATE_LINKS are the pores — each entry is one gated crossing between inner domain and outer substrate." },
  { module: "domain/content/constants.ts", organelle: "ATP synthase", why: "One mechanism (λ = 0.7770777) produces all timing tokens: 777ms, 0.777s, 7770ms, SACRED_SEED." },
  { module: "features/explorer/selectors.ts", organelle: "Ribosomes", why: "Translates content arrays (mRNA) into renderable structures (protein). getSubstrateForOrganelle is the codon-reading operation." },
  { module: "features/explorer/useExplorerFlow.ts", organelle: "Cytoplasm", why: "The medium where focus state flows. The reducer is the cytoplasmic processing — pure transformation, no side effects." },
  { module: "features/cell-shell/state/useCellVitalStore.ts", organelle: "Mitochondria (signals)", why: "Pulses on the harmonic clock (T₁₀ = 7770ms). Emits signals with intensity and TTL. Powers all animated components." },
  { module: "features/explorer/navigation/useExplorerNavigation.ts", organelle: "Cytoskeleton", why: "ZONE_DEPTH_ORDER is the actin filament. goInward/goOutward are motor proteins. RELATED_ZONE_JUMPS are geodesic shortcuts." },
  { module: "features/cell-shell/CellShellProvider.tsx", organelle: "Endoplasmic reticulum", why: "Distributed network providing zone metadata (CELL_ZONES) to all components. The ER of zone context." },
  { module: "domain/content/manifoldMetrics.ts", organelle: "Golgi apparatus", why: "Sorts all tensor data, writes confidence addresses, dispatches health metrics to the /metrics surface." },
  { module: "components/CellDiagram.tsx", organelle: "Cell membrane", why: "The visual boundary. All interactions enter here. Private ORGANELLE_ZONE_MAP is the receptor registry." },
  { module: "App.tsx", organelle: "Organism", why: "The outermost container — the complete cell. Provides routing context (extracellular matrix) and the unified surface." },
];

const TENSOR_ZOOM = [
  { rank: "Rank 3", structure: "QI_INTERSECTIONS", cells: "264-cell space · 6.8% populated", bio: "DNA — full genome, FP32, maximum fidelity", precision: "FP32" },
  { rank: "Rank 2", structure: "ORGANELLE_SUBSTRATE_LINKS", cells: "120-cell space · 15.8% populated", bio: "mRNA — targeted excerpt, FP16", precision: "FP16" },
  { rank: "Rank 1", structure: "SUBSTRATE_NODES + CELL_MAPPINGS", cells: "8 + 15 nodes", bio: "tRNA / codon table — INT8 discrete lookup", precision: "INT8" },
  { rank: "Rank 0", structure: "ClaimConfidence σ ∈ {0, ½, 1}", cells: "3-value scalar", bio: "ATP — minimum viable energy token, INT4", precision: "INT4" },
];

const PRECISION_COLOR: Record<string, string> = {
  FP32: "#22d3ee",
  FP16: "#f472b6",
  INT8: "#a3e635",
  INT4: "#fb923c",
};

export default function Fractal() {
  const [activeZone, setActiveZone] = useState<string>("nucleus");
  const metrics = useMemo(() => computeManifoldMetrics(), []);

  const activeCycle = FRACTAL_CYCLES.find((c) => c.zoneId === activeZone);
  const scaleCount = NINE_SCALE_FLOWS.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "#e2e8f0",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "2rem 1.5rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "0.4rem" }}>
          fractal map · macrocosm ↔ microcosm
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.5rem" }}>
          The Code That Describes Itself
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0, maxWidth: "560px" }}>
          Cell OS documents a biological cell mapped to a phone across {scaleCount} scales. The source code is the{" "}
          <span style={{ color: "#7dd3fc" }}>twelfth scale</span> — its architecture is structurally identical to the cell it describes.
          This page is the zoom interface. See <code style={{ color: "#94a3b8" }}>FRACTAL_MAP.md</code> for the formal analysis.
        </p>
      </div>

      {/* ── ZOOM ∞: Universal ─────────────────────────────────────────── */}
      <SectionHeader
        level="ZOOM ∞"
        title="The Universal Pattern"
        subtitle={`P→A→E appears at all ${scaleCount} scales, from quantum vacuum to silicon. The codebase adds a twelfth.`}
      />
      <TriadRow
        pLabel="PERCEPTION"
        aLabel="AFFECT"
        eLabel="EXPRESSION"
        p="A signal is received. Something enters across a boundary. The system registers it."
        a="The signal is transformed in a medium. Work happens. Neither input nor output, but process."
        e="A result exits. Something crosses the boundary outward. The system is changed."
      />
      <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {NINE_SCALE_FLOWS.map((s) => (
          <span key={s.id} style={{ fontSize: "0.7rem", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "3px", padding: "2px 7px", color: "#64748b" }}>
            {s.glyph} {s.scale}
          </span>
        ))}
        <span style={{ fontSize: "0.7rem", background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: "3px", padding: "2px 7px", color: "#7dd3fc", fontWeight: 600 }}>
          ⌗ Source
        </span>
      </div>

      <ZoomDivider level="L1" label="Project" />

      {/* ── ZOOM 1: Project ───────────────────────────────────────────── */}
      <SectionHeader
        level="ZOOM 1"
        title="Project Architecture"
        subtitle="The three source layers map exactly to P→A→E."
      />
      <TriadRow
        pLabel="domain/"
        aLabel="features/"
        eLabel="pages/"
        p="Types + content arrays. The genome — 20 type contracts, 15+ data exports. Never renders. Everything else is derived from it."
        a="Explorer flow, vital store, navigation, selectors. Active processing, state management, signal emission. The cytoplasm."
        e="Home, Philosophy, Substrate, Metrics, Fractal. The rendered membrane — the only layer the user directly touches."
      />
      <div style={{ marginTop: "0.75rem", padding: "0.65rem 0.85rem", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "6px", fontSize: "0.75rem", color: "#64748b" }}>
        Dependency direction: <span style={{ color: P_COLOR }}>domain/</span>{" → "}
        <span style={{ color: A_COLOR }}>features/</span>{" → "}
        <span style={{ color: E_COLOR }}>pages/</span>.
        No reverse imports. This is the mRNA path from nucleus to cytoplasm to membrane.
      </div>

      <ZoomDivider level="L2" label="Zone Manifold" />

      {/* ── ZOOM 2: Zone ──────────────────────────────────────────────── */}
      <SectionHeader
        level="ZOOM 2"
        title="The Zone Manifold"
        subtitle="Each zone contains its own internal P→A→E cycle. Select a zone to explore its fractal interior."
      />
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {ZONE_DEPTH_ORDER.map((z, i) => (
          <button
            key={z}
            onClick={() => setActiveZone(z)}
            style={{
              background: activeZone === z ? "#0f2d4a" : "#0f172a",
              border: `1px solid ${activeZone === z ? "#7dd3fc" : "#1e293b"}`,
              borderRadius: "4px",
              padding: "0.3rem 0.65rem",
              cursor: "pointer",
              fontSize: "0.78rem",
              color: activeZone === z ? "#7dd3fc" : "#64748b",
              transition: "all 0.2s",
            }}
          >
            <span style={{ opacity: 0.5, marginRight: "0.35rem", fontSize: "0.65rem" }}>{i + 1}</span>
            {z}
          </button>
        ))}
      </div>
      {activeCycle && (
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", padding: "1rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94a3b8", marginBottom: "0.5rem" }}>
            {activeCycle.cycleTitle}
          </div>
          <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0 0 0.85rem" }}>{activeCycle.cycleDescription}</p>
          <TriadRow
            p={activeCycle.phases[0].title}
            a={activeCycle.phases[1].title}
            e={activeCycle.phases[2].title}
            pLabel={`P · ${activeCycle.phases[0].scaleLabel}`}
            aLabel={`A · ${activeCycle.phases[1].scaleLabel}`}
            eLabel={`E · ${activeCycle.phases[2].scaleLabel}`}
          />
          {activeCycle.phases[0].hardwareAnalogue && (
            <div style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              {activeCycle.phases.map((ph) => ph.hardwareAnalogue && (
                <div key={ph.id} style={{ fontSize: "0.7rem", color: "#475569", background: "#020817", borderRadius: "4px", padding: "0.4rem 0.55rem", borderLeft: `2px solid ${PHASE_COLORS[ph.id]}44` }}>
                  <span style={{ color: PHASE_COLORS[ph.id], fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>
                    {PHASE_GLYPHS[ph.id]} silicon analogue
                  </span>
                  {ph.hardwareAnalogue}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ZoomDivider level="L3" label="Module Isomorphism" />

      {/* ── ZOOM 3: Module bijection ──────────────────────────────────── */}
      <SectionHeader
        level="ZOOM 3"
        title="Module ↔ Organelle Bijection"
        subtitle="Every source module maps to exactly one organelle. The import graph is the organelle communication graph."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {MODULE_BIJECTION.map(({ module, organelle, why }) => (
          <div
            key={module}
            style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.75rem", alignItems: "start", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "6px", padding: "0.6rem 0.85rem" }}
          >
            <div>
              <code style={{ fontSize: "0.73rem", color: "#7dd3fc" }}>{module}</code>
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "0.1rem" }}>
              <span style={{ color: "#334155", fontSize: "0.8rem" }}>≅</span>
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", color: "#86efac", fontWeight: 600 }}>{organelle}</span>
              <p style={{ fontSize: "0.7rem", color: "#475569", margin: "0.2rem 0 0" }}>{why}</p>
            </div>
          </div>
        ))}
      </div>

      <ZoomDivider level="L4" label="Interaction Cycle" />

      {/* ── ZOOM 4: Interaction ───────────────────────────────────────── */}
      <SectionHeader
        level="ZOOM 4"
        title="The Interaction Cycle"
        subtitle="Every user interaction is a molecular-scale P→A→E cycle completing in ~777ms."
      />
      <TriadRow
        pLabel="HOVER / TOGGLE"
        aLabel="REDUCER"
        eLabel="RENDER"
        p="HOVER_ORGANELLE or TOGGLE_ORGANELLE dispatched from CellDiagram.tsx. The membrane receptor has bound its ligand."
        a="reducer in useExplorerFlow computes {focus, locked}. Pure function. No side effects. The intracellular cascade."
        e="ExplorerView flows to InfoPanel + SubstrateAtlas. React renders. The gene has been expressed."
      />
      <div style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "6px", padding: "0.65rem 0.85rem", fontSize: "0.75rem" }}>
          <div style={{ color: "#c4b5fd", fontWeight: 600, marginBottom: "0.3rem" }}>Lock = high-affinity binding</div>
          <div style={{ color: "#64748b" }}>
            <code>locked = true</code> is the confirmed signal. HOVER events are the low-affinity ligands that dissociate before triggering the cascade. CLEAR is endocytosis — the receptor is internalized.
          </div>
        </div>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "6px", padding: "0.65rem 0.85rem", fontSize: "0.75rem" }}>
          <div style={{ color: "#facc15", fontWeight: 600, marginBottom: "0.3rem" }}>Breath = pacemaker pulse</div>
          <div style={{ color: "#64748b" }}>
            T₁₀ = 7770ms. The breath fires whether or not an interaction occurs — the pacemaker cell that keeps the UI alive. <code>breathCount</code> is the cell's clock.
          </div>
        </div>
      </div>

      <ZoomDivider level="L5" label="Tensor Fixed Point" />

      {/* ── ZOOM 5: Tensor ────────────────────────────────────────────── */}
      <SectionHeader
        level="ZOOM 5"
        title="Tensor Compression Cascade"
        subtitle="The data structures compress from rank-3 to rank-0 — the same cascade as FP32 → INT4 quantization."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {TENSOR_ZOOM.map(({ rank, structure, cells, bio, precision }, i) => {
          const color = PRECISION_COLOR[precision];
          return (
            <div
              key={rank}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 1fr 1fr auto",
                gap: "0.75rem",
                alignItems: "center",
                background: "#0f172a",
                border: `1px solid ${color}22`,
                borderRadius: "6px",
                padding: "0.6rem 0.85rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.7rem", color, fontWeight: 700 }}>{rank}</span>
              </div>
              <div>
                <code style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{structure}</code>
                <div style={{ fontSize: "0.65rem", color: "#475569", marginTop: "0.15rem" }}>{cells}</div>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{bio}</div>
              <div>
                <span style={{ fontSize: "0.68rem", color, border: `1px solid ${color}44`, borderRadius: "3px", padding: "2px 5px", fontWeight: 600 }}>
                  {precision}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "0.75rem", padding: "0.65rem 0.85rem", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "6px", fontSize: "0.75rem", color: "#64748b", fontFamily: "monospace" }}>
        Q^(z,p,s) → T^i_j → T_μ^sub → σ ∈ {"{"} 0, ½, 1 {"}"}
        <span style={{ marginLeft: "1.5rem", color: "#334155" }}>// tensor contracts exactly as FP32 → FP16 → INT8 → INT4</span>
      </div>

      {/* ── Self-Reference ────────────────────────────────────────────── */}
      <div style={{ marginTop: "3rem", borderTop: "1px solid #1e293b", paddingTop: "2rem" }}>
        <SectionHeader
          level="FIXED POINT"
          title="The Self-Reference"
          subtitle="The recursion closes. The map is the territory."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          {[
            {
              title: "FRACTAL_CYCLES describes selectors.ts",
              body: "The ribosomes zone cycle: 'mRNA codon arrives → peptide bond → ribosome translocates'. selectors.ts IS this cycle — organelle ID (codon) → lookup (bond) → substrate array (protein). The description is the code.",
              color: A_COLOR,
            },
            {
              title: "QUANTIZATION_LAYERS maps module ranks",
              body: "FP32→INT4 maps to nucleus→mitochondria. Module export ranks follow the same cascade: types.ts (20) → content (1–6) → selectors (5) → pages (1 each). The precision cascade is the rank cascade.",
              color: P_COLOR,
            },
            {
              title: "Silicon scale describes its own execution",
              body: "NINE_SCALE_FLOWS scale 11 (Silicon) describes on-device inference — the hardware Cell OS will run on. The last documented scale and the scale of the documentation are the same scale. The recursion closes.",
              color: E_COLOR,
            },
          ].map(({ title, body, color }) => (
            <div key={title} style={{ background: "#0f172a", borderLeft: `3px solid ${color}`, borderRadius: "0 6px 6px 0", padding: "0.75rem 0.85rem" }}>
              <div style={{ fontSize: "0.73rem", fontWeight: 600, color, marginBottom: "0.4rem" }}>{title}</div>
              <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "#0a0f1a", border: "1px solid #1e3a5f", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "0.65rem" }}>
            Manifold state at this moment
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
            {[
              { label: "Coupling tensor", value: `${(metrics.couplingTensorDensity * 100).toFixed(1)}%`, sub: `${metrics.couplingTensorLinks} / ${metrics.couplingTensorSpace} cells` },
              { label: "Mean confidence", value: metrics.meanZoneConfidence.toFixed(3), sub: "zone centroid σ̄" },
              { label: "Biophoton coverage", value: `${(metrics.biophotonCoverage * 100).toFixed(2)}%`, sub: `${metrics.biophotonLinks} links` },
            ].map(({ label, value, sub }) => (
              <div key={label}>
                <div style={{ fontSize: "0.65rem", color: "#475569", marginBottom: "0.2rem" }}>{label}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#4ade80", fontVariantNumeric: "tabular-nums" }}>{value}</div>
                <div style={{ fontSize: "0.65rem", color: "#334155" }}>{sub}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#334155", margin: "0.85rem 0 0" }}>
            These numbers describe the current density of the self-similar structure. As the codebase grows, they are the codebase's vital signs — its confidence in its own mapping.
            Full dashboard at <a href="/metrics" style={{ color: "#7dd3fc", textDecoration: "none" }}>/metrics</a>.
          </p>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #1e293b", paddingTop: "1rem", marginTop: "2.5rem", fontSize: "0.72rem", color: "#334155" }}>
        Fractal Map · Cell OS · Scale 12 of the P→A→E invariance · See FRACTAL_MAP.md for the formal analysis
      </footer>
    </div>
  );
}
