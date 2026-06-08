import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { QUANTIZATION_LAYERS, KQUANT_LEVELS, RUNTIME_OVERHEAD_NOTE } from "@/domain/content/quantizationBiology";
import { QI_INTERSECTIONS } from "@/domain/content/qiMatrix";
import { NINE_SCALE_FLOWS } from "@/domain/content/scales";
import { HARMONIC_CONSTANT } from "@/domain/content/constants";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import type { CellZoneId } from "@/domain/types";
import { ConfidenceBadge } from "@/features/explorer/components/ConfidenceBadge";

// ─── Hexagon 770 four-layer architecture ─────────────────────────────────────

const HEXAGON_LAYERS = [
  {
    id: "hmx",
    name: "HMX",
    full: "Hexagon Matrix eXtensions",
    role: "Transformer kernels — fused multiply-add sequences for attention layers",
    biologicalAnalogue: "Whole-cell coordination — systemic regulation across all organelles",
    color: "#22d3ee",
    precision: "INT8 / INT4",
    confidence: "indicative" as const,
  },
  {
    id: "hta",
    name: "HTA",
    full: "Hexagon Tensor Accelerator",
    role: "Matrix multiply-accumulate (C = A × B). 12 TOPS at INT8. INT32 accumulators preserve chain precision.",
    biologicalAnalogue: "Mitochondria — dedicated hardware for one repeatedly executed operation (oxidative phosphorylation / matrix multiply)",
    color: "#fb923c",
    precision: "INT8 (primary), INT4 (supported)",
    confidence: "verified" as const,
  },
  {
    id: "hvx",
    name: "HVX",
    full: "Hexagon Vector eXtensions",
    role: "1024-bit SIMD — 128 INT8 values per clock, dual units operating in parallel",
    biologicalAnalogue: "Ribosomes — one instruction applied to many substrates simultaneously (SIMD = Single Instruction, Multiple Data)",
    color: "#a3e635",
    precision: "INT8 / INT16",
    confidence: "verified" as const,
  },
  {
    id: "scalar",
    name: "Scalar Core",
    full: "Hexagon Scalar Processor",
    role: "Control flow, branching, integer operations, coordination between vector and tensor units",
    biologicalAnalogue: "Nucleus — the control center that orchestrates all downstream processing units",
    color: "#c084fc",
    precision: "INT8 / INT16 / INT32",
    confidence: "verified" as const,
  },
] as const;

// ─── Phase styles ─────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<string, string> = {
  perception: "#22d3ee",
  affect:     "#a3e635",
  expression: "#c084fc",
};

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 border-t border-white/5 scroll-mt-20">
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Substrate() {
  const [activeZoneFilter, setActiveZoneFilter] = useState<CellZoneId | "all">("all");
  const [activePhaseFilter, setActivePhaseFilter] = useState<"all" | "perception" | "affect" | "expression">("all");

  const filteredIntersections = QI_INTERSECTIONS.filter((ix) => {
    if (activeZoneFilter !== "all" && ix.zoneId !== activeZoneFilter) return false;
    if (activePhaseFilter !== "all" && ix.phaseId !== activePhaseFilter) return false;
    return true;
  });

  // Silicon scale — the 10th scale
  const siliconScale = NINE_SCALE_FLOWS.find((s) => s.id === "silicon");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px]"
          style={{ background: "rgba(251,191,36,0.05)" }}
        />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Cell OS
          </Link>
          <div className="hidden md:flex items-center gap-5 text-[11px] font-mono text-muted-foreground/50">
            <a href="#cascade" className="hover:text-white transition-colors">Cascade</a>
            <a href="#hexagon" className="hover:text-white transition-colors">Hexagon</a>
            <a href="#breath" className="hover:text-white transition-colors">One Breath</a>
            <a href="#matrix" className="hover:text-white transition-colors">Qi Matrix</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-32">

        {/* Page header */}
        <header className="pt-16 pb-14 space-y-5">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(251,191,36,0.55)" }}>
            Cell OS · Deep Substrate
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            The Substrate<br />
            <span className="text-muted-foreground font-light">as Organism</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The FairPhone 5's Qualcomm QCM6490 runs the same PERCEPTION → AFFECT → EXPRESSION
            cycle that the mitochondrion has been running for 1.5 billion years. This page makes
            that mapping explicit and verifiable.
          </p>
        </header>

        {/* ── §1 PRECISION CASCADE ─────────────────────────────────────────── */}
        <Section id="cascade">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(251,191,36,0.5)" }}>
            § 1 — The Precision Cascade
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            FP32 → FP16 → INT8 → INT4
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Four quantization formats. Each halves the bytes per weight. Each maps to a biological
            compression step — from the full genome to the minimum viable energy packet.
          </p>

          <div className="space-y-2 mb-10">
            {QUANTIZATION_LAYERS.map((layer, i) => {
              const zone = CELL_ZONES[layer.biologicalZone];
              return (
                <div
                  key={layer.id}
                  className="glass-panel rounded-2xl border overflow-hidden"
                  style={{ borderColor: `${layer.color}18` }}
                >
                  <div className="grid sm:grid-cols-[160px_1fr_1fr] items-stretch">
                    {/* Format */}
                    <div
                      className="flex flex-col items-center justify-center p-5 sm:border-r"
                      style={{ borderColor: `${layer.color}10`, background: `${layer.color}05` }}
                    >
                      <span className="font-mono text-xl font-bold" style={{ color: layer.color }}>{layer.format}</span>
                      <span className="font-mono text-[10px] mt-1" style={{ color: `${layer.color}55` }}>{layer.bitsPerWeight} bits</span>
                      <span className="font-mono text-[10px] mt-1" style={{ color: `${layer.color}40` }}>{layer.model1BSize} / 1B params</span>
                    </div>
                    {/* Bar + stage */}
                    <div className="p-5 sm:border-r flex flex-col justify-center gap-2" style={{ borderColor: `${layer.color}10` }}>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${layer.compressionRatio * 100}%`,
                            background: `linear-gradient(to right, ${layer.color}60, ${layer.color})`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground/60 leading-relaxed">{layer.aiStage}</p>
                      <p className="text-[10px] font-mono text-muted-foreground/30">{layer.hardwareUnit}</p>
                    </div>
                    {/* Biological analogue */}
                    <div className="p-5 flex flex-col justify-center gap-1">
                      <div className="flex items-center gap-2">
                        <span style={{ color: `${zone.color}70` }}>{zone.glyph}</span>
                        <span className="font-mono text-[10px]" style={{ color: `${zone.color}55` }}>{zone.name}</span>
                      </div>
                      <p className="text-sm text-white/70 leading-snug">{layer.biologicalAnalogue}</p>
                      {layer.note && (
                        <p className="text-[11px] text-muted-foreground/35 italic mt-1">{layer.note}</p>
                      )}
                    </div>
                  </div>
                  {i < QUANTIZATION_LAYERS.length - 1 && (
                    <div className="px-5 py-1.5 border-t flex items-center gap-3" style={{ borderColor: `${layer.color}08` }}>
                      <span className="text-[9px] font-mono" style={{ color: `${layer.color}30` }}>÷ 2 precision · × 2 throughput</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* K-quant */}
          <div className="glass-panel rounded-xl border border-white/5 p-6 space-y-5">
            <h3 className="font-bold text-white">K-Quant Super-Block — Fractal Compression</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hierarchical super-block quantisation: the same compression principle applied
              recursively at three nested scales. A fractal structure in hardware.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {KQUANT_LEVELS.map((lvl, i) => (
                <div key={lvl.level} className="flex-1 flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5"
                    style={{ borderColor: lvl.color, color: lvl.color }}
                  >
                    {lvl.level}
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold" style={{ color: lvl.color }}>{lvl.name}</p>
                    <p className="text-[11px] text-white/60">{lvl.biologicalAnalogue}</p>
                    <p className="text-[11px] text-muted-foreground/40 mt-0.5">{lvl.role}</p>
                  </div>
                  {i < KQUANT_LEVELS.length - 1 && (
                    <div className="hidden sm:flex items-center self-center text-muted-foreground/20 text-xs">→</div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/30 italic border-t border-white/5 pt-4">{RUNTIME_OVERHEAD_NOTE}</p>
          </div>
        </Section>

        {/* ── §2 HEXAGON ARCHITECTURE ────────────────────────────────────────── */}
        <Section id="hexagon">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(251,191,36,0.5)" }}>
            § 2 — Hexagon 770 · Four-Layer Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Silicon Has Organelles Too
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            The Hexagon 770's four nested subsystems mirror the cell's organelle hierarchy.
            Each layer specialises for one type of operation — the same design principle,
            evolved in silicon and carbon independently.
          </p>

          <div className="space-y-3">
            {HEXAGON_LAYERS.map((layer, i) => (
              <div
                key={layer.id}
                className="glass-panel rounded-xl border overflow-hidden"
                style={{ borderColor: `${layer.color}18` }}
              >
                <div className="p-6 grid sm:grid-cols-[120px_1fr_1fr] gap-6 items-start">
                  {/* Layer ID */}
                  <div>
                    <span className="font-mono text-2xl font-bold" style={{ color: layer.color }}>{layer.name}</span>
                    <p className="font-mono text-[9px] mt-1 text-muted-foreground/40">{layer.full}</p>
                    <div className="mt-2">
                      <ConfidenceBadge confidence={layer.confidence} />
                    </div>
                  </div>
                  {/* Role */}
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground/40 mb-1">Hardware Role</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{layer.role}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/30 mt-2">Precision: {layer.precision}</p>
                  </div>
                  {/* Biological analogue */}
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground/40 mb-1">Biological Analogue</p>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">{layer.biologicalAnalogue}</p>
                  </div>
                </div>
                {i < HEXAGON_LAYERS.length - 1 && (
                  <div className="h-px bg-white/5" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 glass-panel rounded-xl border border-white/5 p-5">
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              <span className="text-white font-medium">Scale invariance at 4 code levels:</span>{" "}
              System → Service → Function → Line maps to HMX → HTA → HVX → Scalar Core.
              The same triadic pattern at each level of abstraction. The Feng Shui Manifesto
              identified this in software architecture; it reappears in silicon.
            </p>
          </div>
        </Section>

        {/* ── §3 ONE INFERENCE = ONE BREATH ──────────────────────────────────── */}
        <Section id="breath">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(251,191,36,0.5)" }}>
            § 3 — 硅 · Silicon Scale
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            One Inference = One Cellular Breath
          </h2>

          {siliconScale && (
            <div
              className="glass-panel rounded-2xl border p-8 space-y-8"
              style={{ borderColor: "rgba(251,191,36,0.15)" }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl" style={{ color: "rgba(251,191,36,0.6)" }}>{siliconScale.glyph}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{siliconScale.scale}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{siliconScale.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 border-t border-white/5 pt-8">
                {(["perception", "affect", "expression"] as const).map((ph) => (
                  <div key={ph} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PHASE_COLORS[ph] }} />
                      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: PHASE_COLORS[ph] }}>
                        {ph}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{siliconScale[ph]}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase">Harmonic Constant</p>
                  <p className="font-mono text-lg" style={{ color: "rgba(251,191,36,0.7)" }}>τ = {HARMONIC_CONSTANT}</p>
                  <p className="text-xs text-muted-foreground/40">Temperature of the sampler at expression</p>
                </div>
                <ConfidenceBadge confidence={siliconScale.confidence} />
              </div>

              <a
                href="https://harmony-ecosystem.replit.app/edge-node/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl border text-sm font-mono transition-colors"
                style={{ borderColor: "rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.7)" }}
              >
                Run one inference on EdgeNode
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </Section>

        {/* ── §4 QI MATRIX ───────────────────────────────────────────────────── */}
        <Section id="matrix">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(251,191,36,0.5)" }}>
            § 4 — Qi Tensor Matrix
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            18 High-Signal Intersections
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            The full tensor is 8 zones × 3 phases × 11 scales = 264 cells. These 18 curated
            intersections are where all three axes illuminate each other most sharply.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveZoneFilter("all")}
                className="px-3 py-1 rounded-full border font-mono text-[10px] tracking-widest uppercase transition-all"
                style={{
                  borderColor: activeZoneFilter === "all" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)",
                  color: activeZoneFilter === "all" ? "white" : "rgba(255,255,255,0.4)",
                  background: activeZoneFilter === "all" ? "rgba(255,255,255,0.05)" : "transparent",
                }}
              >
                All zones
              </button>
              {(Object.keys(CELL_ZONES) as CellZoneId[]).map((zId) => {
                const z = CELL_ZONES[zId];
                return (
                  <button
                    key={zId}
                    onClick={() => setActiveZoneFilter(zId)}
                    className="px-3 py-1 rounded-full border font-mono text-[10px] tracking-widest uppercase transition-all"
                    style={{
                      borderColor: activeZoneFilter === zId ? `${z.color}60` : `${z.color}20`,
                      color: activeZoneFilter === zId ? z.color : `${z.color}50`,
                      background: activeZoneFilter === zId ? `${z.color}08` : "transparent",
                    }}
                  >
                    {z.glyph} {z.name}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              {(["all", "perception", "affect", "expression"] as const).map((ph) => (
                <button
                  key={ph}
                  onClick={() => setActivePhaseFilter(ph)}
                  className="px-3 py-1 rounded-full border font-mono text-[10px] tracking-widest uppercase transition-all"
                  style={{
                    borderColor: activePhaseFilter === ph
                      ? ph === "all" ? "rgba(255,255,255,0.3)" : `${PHASE_COLORS[ph]}60`
                      : "rgba(255,255,255,0.08)",
                    color: activePhaseFilter === ph
                      ? ph === "all" ? "white" : PHASE_COLORS[ph]
                      : "rgba(255,255,255,0.3)",
                    background: activePhaseFilter === ph ? "rgba(255,255,255,0.04)" : "transparent",
                  }}
                >
                  {ph}
                </button>
              ))}
            </div>
          </div>

          {/* Intersection cards */}
          <div className="space-y-4">
            {filteredIntersections.length === 0 && (
              <div className="text-center py-16 text-muted-foreground/30 font-mono text-sm">
                No intersections match the current filter.
              </div>
            )}
            {filteredIntersections.map((ix) => {
              const zone = CELL_ZONES[ix.zoneId];
              return (
                <div
                  key={ix.id}
                  className="glass-panel rounded-xl border p-6 space-y-3"
                  style={{ borderColor: `${zone.color}15` }}
                >
                  {/* Axis labels */}
                  <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono tracking-[0.18em] uppercase">
                    <span
                      className="px-2 py-0.5 rounded border"
                      style={{ borderColor: `${zone.color}30`, color: zone.color, background: `${zone.color}08` }}
                    >
                      {zone.glyph} {zone.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded border"
                      style={{ borderColor: `${PHASE_COLORS[ix.phaseId]}30`, color: PHASE_COLORS[ix.phaseId], background: `${PHASE_COLORS[ix.phaseId]}08` }}
                    >
                      {ix.phaseId}
                    </span>
                    <span className="px-2 py-0.5 rounded border border-white/10 text-muted-foreground/40">
                      {ix.scaleId}
                    </span>
                    <span className="ml-auto">
                      <ConfidenceBadge confidence={ix.evidence} />
                    </span>
                  </div>

                  <h3 className="font-bold text-white">{ix.title}</h3>
                  <p className="text-sm text-muted-foreground/75 leading-relaxed">{ix.narrative}</p>

                  {ix.hardwareAnalogue && (
                    <p className="text-[11px] font-mono text-muted-foreground/35 border-t border-white/5 pt-3">
                      硅 Silicon: {ix.hardwareAnalogue}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* Footer */}
        <footer className="pt-14 flex items-center justify-between text-[11px] font-mono text-muted-foreground/25">
          <span>尺度不變性 · {HARMONIC_CONSTANT}</span>
          <div className="flex items-center gap-4">
            <Link href="/philosophy" className="hover:text-muted-foreground/60 transition-colors">
              Philosophy →
            </Link>
            <Link href="/" className="hover:text-muted-foreground/60 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Cell OS
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
