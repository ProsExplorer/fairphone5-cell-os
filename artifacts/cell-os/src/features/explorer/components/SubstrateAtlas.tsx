import type { SubstrateNode } from "@/domain/types";
import {
  SUBSTRATE_NODES,
  HEXAGON_SUBUNITS,
  STACK_LAYERS,
  QUANT_FORMATS,
  LICENCES
} from "@/domain/content/substrate";
import { getOrganellesForSubstrate } from "../selectors";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface SubstrateAtlasProps {
  isSubstrateHighlighted: (substrateId: string) => boolean;
  hasFocus: boolean;
  onToggleSubstrate: (id: string) => void;
}

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith("hsl")) {
    return color.replace("hsl", "hsla").replace(")", `, ${alpha})`);
  }
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
}

function SubstrateCard({
  node,
  related,
  dimmed,
  onSelect
}: {
  node: SubstrateNode;
  related: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
}) {
  const linkedOrganelles = getOrganellesForSubstrate(node.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      className="text-left glass-panel rounded-2xl p-6 border transition-all duration-300 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      style={{
        opacity: dimmed ? 0.4 : 1,
        borderColor: related ? withAlpha(node.color, 0.6) : "rgba(255,255,255,0.06)",
        boxShadow: related ? `0 8px 32px 0 ${withAlpha(node.color, 0.22)}` : undefined,
        transform: related ? "translateY(-2px)" : undefined
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full shadow-lg shrink-0"
            style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
          />
          <h4 className="text-lg font-bold text-white leading-tight">{node.name}</h4>
        </div>
        <ConfidenceBadge confidence={node.confidence} />
      </div>

      <div className="text-sm font-mono text-muted-foreground mb-3">{node.role}</div>
      <p className="text-sm text-foreground/80 leading-relaxed mb-4">{node.detail}</p>

      <dl className="space-y-1.5 border-t border-white/10 pt-4">
        {node.specs.map((spec) => (
          <div key={spec.label} className="flex items-baseline justify-between gap-4 text-sm">
            <dt className="text-muted-foreground shrink-0">{spec.label}</dt>
            <dd className="text-right text-foreground/90 font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>

      {linkedOrganelles.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {linkedOrganelles.map((organelle) => (
            <span
              key={organelle.id}
              className="px-2 py-0.5 rounded-full text-xs border"
              style={{
                color: organelle.color,
                borderColor: withAlpha(organelle.color, 0.35)
              }}
            >
              {organelle.name}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

export function SubstrateAtlas({
  isSubstrateHighlighted,
  hasFocus,
  onToggleSubstrate
}: SubstrateAtlasProps) {
  return (
    <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Heading */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            The AI Substrate
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-glow">Beneath the Metaphor</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The cell is a model; this is the silicon. The FairPhone 5 runs on the Qualcomm QCM6490, and on-device AI flows through the units below. Select a card to highlight the organelle it maps to, or select an organelle above to light up its hardware.
          </p>
        </div>

        {/* Substrate node cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBSTRATE_NODES.map((node) => {
            const related = isSubstrateHighlighted(node.id);
            return (
              <SubstrateCard
                key={node.id}
                node={node}
                related={related}
                dimmed={hasFocus && !related}
                onSelect={onToggleSubstrate}
              />
            );
          })}
        </div>

        {/* Hexagon sub-units */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Inside the Hexagon 770</h3>
            <p className="text-muted-foreground max-w-2xl">
              The neural engine is itself a small society of specialized units. The internal breakdown is consistent with Qualcomm's Hexagon documentation but is not independently confirmed for this exact part.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEXAGON_SUBUNITS.map((unit) => (
              <div key={unit.name} className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-white leading-tight">{unit.name}</h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{unit.detail}</p>
                <ConfidenceBadge confidence={unit.confidence} />
              </div>
            ))}
          </div>
        </div>

        {/* Software stack */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">The Inference Stack</h3>
            <p className="text-muted-foreground max-w-2xl">
              How a request reaches the accelerators. Each layer passes the graph down; the dispatch layer decides which hardware runs each operation, and the graph is compiled on the first inference call.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <ol className="space-y-3">
              {STACK_LAYERS.map((layer, index) => (
                <li key={layer.id} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="text-white font-semibold">{layer.name}</span>
                    <span className="text-sm text-muted-foreground">{layer.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Quantization table */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Quantization Formats</h3>
            <p className="text-muted-foreground max-w-2xl">
              Lower precision means a smaller memory footprint and a faster hardware path, traded against accuracy. Sizes shown are weights-only, for a one-billion-parameter model.
            </p>
          </div>
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left font-mono uppercase tracking-widest text-xs text-muted-foreground">
                    <th className="p-4 font-medium">Format</th>
                    <th className="p-4 font-medium">Bits / weight</th>
                    <th className="p-4 font-medium">~1B model</th>
                    <th className="p-4 font-medium">Hardware path</th>
                  </tr>
                </thead>
                <tbody>
                  {QUANT_FORMATS.map((row) => (
                    <tr key={row.format} className="border-b border-white/5 last:border-0">
                      <td className="p-4 font-semibold text-white">{row.format}</td>
                      <td className="p-4 text-foreground/85">{row.bitsPerWeight}</td>
                      <td className="p-4 text-foreground/85">{row.modelSize1B}</td>
                      <td className="p-4 text-foreground/85">{row.hardwarePath}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-3 text-xs text-muted-foreground border-t border-white/5">
              GGUF schemes such as Q4_K_M use hierarchical super-blocks; the "K" denotes block structure, not k-means clustering.
            </p>
          </div>
        </div>

        {/* Licences */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Software Licences</h3>
            <p className="text-muted-foreground max-w-2xl">
              The openness of each layer, which governs what can be inspected, modified, or replaced — the substrate's own permission system.
            </p>
          </div>
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left font-mono uppercase tracking-widest text-xs text-muted-foreground">
                    <th className="p-4 font-medium">Component</th>
                    <th className="p-4 font-medium">Licence</th>
                    <th className="p-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {LICENCES.map((row) => (
                    <tr key={row.component} className="border-b border-white/5 last:border-0">
                      <td className="p-4 font-semibold text-white">{row.component}</td>
                      <td className="p-4 font-mono text-foreground/85">{row.licence}</td>
                      <td className="p-4 text-muted-foreground">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Confidence legend */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">How to read the confidence labels</h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                This is a concept explainer. Figures are tagged so claims are not overstated.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <ConfidenceBadge confidence="verified" />
                <span className="text-xs text-muted-foreground">Confirmed by official sources</span>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge confidence="indicative" />
                <span className="text-xs text-muted-foreground">Vendor-declared or estimated</span>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge confidence="unconfirmed" />
                <span className="text-xs text-muted-foreground">Consistent but not verifiable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
