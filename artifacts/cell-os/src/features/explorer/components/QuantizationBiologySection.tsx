import { Link } from "wouter";
import { QUANTIZATION_LAYERS, KQUANT_LEVELS } from "@/domain/content/quantizationBiology";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";
import { HARMONIC_CONSTANT } from "@/domain/content/constants";

const METABOLIC_LABELS: Record<string, string> = {
  maximum:   "Max metabolic cost",
  high:      "High metabolic cost",
  efficient: "Efficient",
  minimal:   "Minimal",
};

/**
 * The Precision Cascade — four quantization formats mapped to their biological
 * analogues. Visually: a compression ladder descending from genome to ATP,
 * with each step representing a halving of precision and a biological analogue.
 */
export function QuantizationBiologySection() {
  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border text-sm font-mono tracking-widest uppercase"
            style={{ borderColor: "rgba(251,191,36,0.3)", color: "#fbbf24" }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            量子化 · Quantization Biology
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            The Precision Cascade
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every halving of bits per weight mirrors a biological compression step.
            The cell has been running this cascade for 3.8 billion years. The Hexagon
            770 runs it in milliseconds.
          </p>
        </div>

        {/* Precision Ladder */}
        <div className="space-y-3">
          {QUANTIZATION_LAYERS.map((layer, i) => {
            const zone = CELL_ZONES[layer.biologicalZone];
            const barWidth = `${layer.compressionRatio * 100}%`;

            return (
              <div
                key={layer.id}
                className="glass-panel rounded-2xl border overflow-hidden transition-all duration-[777ms]"
                style={{ borderColor: `${layer.color}20` }}
              >
                <div className="grid md:grid-cols-[180px_1fr_1fr] gap-0 items-stretch">

                  {/* Format badge */}
                  <div
                    className="flex flex-col items-center justify-center p-6 border-r"
                    style={{ borderColor: `${layer.color}15`, background: `${layer.color}06` }}
                  >
                    <span
                      className="font-mono text-2xl font-bold tracking-wider"
                      style={{ color: layer.color }}
                    >
                      {layer.format}
                    </span>
                    <span className="font-mono text-xs mt-1" style={{ color: `${layer.color}60` }}>
                      {layer.bitsPerWeight} bits / weight
                    </span>
                    <span className="font-mono text-[10px] mt-3 tracking-widest uppercase" style={{ color: `${layer.color}40` }}>
                      {METABOLIC_LABELS[layer.metabolicCost]}
                    </span>
                  </div>

                  {/* Compression bar + stats */}
                  <div className="p-6 border-r flex flex-col justify-center gap-3" style={{ borderColor: `${layer.color}10` }}>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-muted-foreground/50">Memory at 1B params</span>
                      <span style={{ color: layer.color }}>{layer.model1BSize}</span>
                    </div>
                    {/* Bar */}
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-[777ms]"
                        style={{
                          width: barWidth,
                          background: `linear-gradient(to right, ${layer.color}80, ${layer.color})`,
                          boxShadow: `0 0 8px ${layer.color}40`,
                        }}
                      />
                    </div>
                    {/* Compression ratio */}
                    <div className="text-[10px] font-mono text-muted-foreground/30">
                      {layer.compressionRatio < 1
                        ? `${(1 / layer.compressionRatio).toFixed(0)}× smaller than FP32`
                        : "Baseline · full precision"}
                    </div>
                    <p className="text-xs text-muted-foreground/55 leading-relaxed mt-1">{layer.aiStage}</p>
                  </div>

                  {/* Biological analogue */}
                  <div className="p-6 flex flex-col justify-center gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl" style={{ color: `${zone.color}80` }}>{zone.glyph}</span>
                      <span
                        className="text-[10px] font-mono tracking-widest uppercase"
                        style={{ color: `${zone.color}60` }}
                      >
                        {zone.name}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 font-medium leading-snug">{layer.biologicalAnalogue}</p>
                    {layer.note && (
                      <p className="text-xs text-muted-foreground/40 leading-relaxed mt-1 italic">{layer.note}</p>
                    )}
                    <div className="mt-2 text-[10px] font-mono text-muted-foreground/30">
                      {layer.hardwareUnit}
                    </div>
                  </div>
                </div>

                {/* Halving arrow between rows */}
                {i < QUANTIZATION_LAYERS.length - 1 && (
                  <div
                    className="px-6 py-2 border-t flex items-center gap-3"
                    style={{ borderColor: `${layer.color}10`, background: `${layer.color}03` }}
                  >
                    <div className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: `${layer.color}35` }}>
                      ÷ 2 precision
                    </div>
                    <div className="flex-1 h-px" style={{ background: `${layer.color}15` }} />
                    <div className="text-[9px] font-mono" style={{ color: `${layer.color}30` }}>
                      × 2 throughput
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* K-quant fractal structure */}
        <div className="glass-panel rounded-2xl border border-white/5 p-8 space-y-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(163,230,53,0.6)" }}>
              K-Quant Super-Block Structure · Fractal Compression
            </p>
            <h3 className="text-xl font-bold text-white mb-2">
              Three-Level Self-Similar Hierarchy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              The 'K' suffix in Q4_K_M does not mean k-means. It means hierarchical
              super-block quantisation — the same compression principle applied
              recursively at three nested scales. This is a fractal structure.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {KQUANT_LEVELS.map((lvl) => (
              <div
                key={lvl.level}
                className="rounded-xl border p-5 space-y-3"
                style={{ borderColor: `${lvl.color}20`, background: `${lvl.color}05` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center font-mono text-xs font-bold"
                    style={{ borderColor: lvl.color, color: lvl.color }}
                  >
                    {lvl.level}
                  </div>
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: lvl.color }}>
                    {lvl.name}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-white/80 text-sm font-medium">{lvl.biologicalAnalogue}</p>
                  <p className="text-xs text-muted-foreground/55 leading-relaxed">{lvl.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-muted-foreground/35 italic leading-relaxed">
              Harmonic constant τ = {HARMONIC_CONSTANT} — the EdgeNode sampler temperature that tunes
              inference to the same frequency as the visual and system architecture.
            </p>
          </div>
        </div>

        {/* Link to substrate page */}
        <div className="text-center">
          <Link
            href="/substrate"
            className="inline-flex items-center gap-2 px-6 py-3 glass-panel rounded-xl border font-mono text-sm transition-colors"
            style={{ borderColor: "rgba(251,191,36,0.2)", color: "rgba(251,191,36,0.7)" }}
          >
            深入基底 · Deep Substrate Analysis →
          </Link>
        </div>
      </div>
    </section>
  );
}
