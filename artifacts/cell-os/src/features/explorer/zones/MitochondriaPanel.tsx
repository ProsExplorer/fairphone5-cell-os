import { Link } from "wouter";
import { EdgeNodeSection } from "../components/EdgeNodeSection";
import { QUANTIZATION_LAYERS } from "@/domain/content/quantizationBiology";
import { CELL_ZONES } from "@/features/cell-shell/CellShellProvider";

/**
 * MitochondriaPanel — the power zone: EdgeNode + precision cascade.
 *
 * Mitochondria are the cell's power plants — they convert raw fuel into
 * usable ATP through a chain of increasingly efficient reactions. Here this
 * maps to two parallel ideas:
 *
 * 1. EdgeNode: the Fairphone 5's on-device LLM running entirely on local
 *    silicon, generating intelligence without a cloud connection. Living proof
 *    that a phone can think for itself.
 *
 * 2. Precision Cascade: the quantization ladder FP32→FP16→INT8→INT4 is the
 *    same chain of efficiency — same information, less energy. ATP = INT4 =
 *    minimum viable token.
 *
 * The full quantization analysis lives on /substrate.
 */
export function MitochondriaPanel() {
  return (
    <div>
      {/* Primary: EdgeNode hero section */}
      <EdgeNodeSection />

      {/* Why the Mitochondria? — the two structural reasons */}
      <div className="px-6 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-10">

          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-2">
              Why the Mitochondria?
            </p>
            <h3 className="text-2xl font-bold text-white mb-3">Two reasons. Same structure.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              The mapping is not metaphor. The mitochondrion and the EdgeNode share an identical
              architectural principle — repeated at two different scales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Reason 1 — Power independence */}
            <div
              className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4"
              style={{ borderColor: "#fb923c18" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">粒</span>
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#fb923c" }}
                >
                  Power Independence
                </span>
              </div>

              <p className="text-sm text-foreground/85 leading-relaxed">
                Mitochondria make the cell <em>energetically autonomous</em>. They take raw fuel —
                glucose and oxygen — and generate ATP entirely from within. No external energy source.
                No dependency. The cell can sustain itself.
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The Fairphone 5 running an LLM on the Hexagon DSP does the same thing
                computationally: it generates intelligence entirely from local silicon.
                No cloud. No accounts. No GPU. The phone can think for itself.
              </p>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{ color: "#fb923c" }}
              >
                "The Proof" is that it actually runs. That was not obvious until it did.
              </p>
            </div>

            {/* Reason 2 — Efficiency cascade */}
            <div
              className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4"
              style={{ borderColor: "#fb923c18" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">⚡</span>
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "#fb923c" }}
                >
                  Efficiency Cascade
                </span>
              </div>

              <p className="text-sm text-foreground/85 leading-relaxed">
                The mitochondrion's electron transport chain is a cascade of progressive extraction.
                Electrons step through four protein complexes — I → II → III → IV → ATP synthase —
                each stage building the proton gradient. The minimum viable output is one ATP molecule:
                the smallest unit of chemical energy that can power anything downstream.
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                The quantization precision cascade is structurally identical:{" "}
                <span className="font-mono" style={{ color: "#fb923c" }}>FP32 → FP16 → INT8 → INT4</span>.
                Same information content. Less energy (and memory bandwidth) at each step.
              </p>
              <p
                className="text-sm font-mono font-bold leading-relaxed"
                style={{ color: "#fb923c" }}
              >
                ATP = INT4 = the minimum viable token.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Precision cascade mini preview */}
      <div className="px-6 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Precision Cascade</h3>
              <p className="text-sm text-muted-foreground">
                FP32 → INT4 · Same information, less energy. ATP = minimum viable token.
              </p>
            </div>
            <Link
              href="/substrate"
              className="text-[11px] font-mono transition-colors shrink-0"
              style={{ color: "rgba(251,191,36,0.6)" }}
            >
              Full analysis →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUANTIZATION_LAYERS.map((layer) => {
              const zone = CELL_ZONES[layer.biologicalZone];
              return (
                <div
                  key={layer.id}
                  className="glass-panel rounded-xl border p-4 space-y-2.5"
                  style={{ borderColor: `${layer.color}15` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm" style={{ color: layer.color }}>
                      {layer.format}
                    </span>
                    <span
                      className="text-base leading-none"
                      style={{ color: `${zone.color}55` }}
                    >
                      {zone.glyph}
                    </span>
                  </div>

                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.round(layer.compressionRatio * 100)}%`,
                        background: layer.color,
                        opacity: 0.75,
                      }}
                    />
                  </div>

                  <p className="text-[10px] font-mono text-muted-foreground/40">
                    {layer.model1BSize} / 1 B params
                  </p>

                  <p className="text-[10px] text-muted-foreground/55 leading-snug">
                    {layer.biologicalAnalogue.split("·")[0].trim()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
