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
      {/* Primary: EdgeNode browser section */}
      <EdgeNodeSection />

      {/* Secondary: Precision cascade mini preview */}
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
                  {/* Format + zone glyph */}
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

                  {/* Compression bar */}
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

                  {/* Size */}
                  <p className="text-[10px] font-mono text-muted-foreground/40">
                    {layer.model1BSize} / 1 B params
                  </p>

                  {/* Biological analogue (first clause) */}
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
