import { CellDiagram } from "@/components/CellDiagram";
import { InfoPanel } from "../components/InfoPanel";
import { CodeSnippet } from "../components/CodeSnippet";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

type Props = {
  view: ExplorerView;
  perceive: ExplorerPerception;
};

const ZONE_MAP_SNIPPET = `// src/components/CellDiagram.tsx
// The architectural bridge between the two layers of Cell OS.
// The diagram renders 15 granular organelle shapes; the zone model
// navigates 8 CellZoneIds. This map is the canonical join between them.

const ORGANELLE_ZONE_MAP: Record<string, CellZoneId> = {
  "nucleus":               "nucleus",      // 核
  "nucleolus":             "nucleus",
  "dna":                   "nucleus",
  "nuclear-pores":         "nucleus",
  "cytoplasm":             "cytoplasm",    // 漿
  "cytoskeleton":          "cytoskeleton", // 骨
  "ribosomes":             "ribosomes",    // 糖
  "mitochondria":          "mitochondria", // 粒
  "golgi-apparatus":       "golgi",        // 高
  "vesicles":              "golgi",
  "endoplasmic-reticulum": "endoplasmic-reticulum", // 網
  "cell-membrane":         "membrane",    // 膜
  "membrane-receptors":    "membrane",
  "lysosomes":             "membrane",
  "vacuole":               "membrane",
};`;

const BIOPHOTON_SNIPPET = `// src/features/explorer/selectors.ts
// Biophoton links are not pre-filtered — they are derived at runtime
// from which organelles are currently active. Click two organelles;
// the links between them (and their zone-mates) become visible.

export function getBiophotonLinks(organelleIds: Set<string>): BiophotonLink[] {
  if (organelleIds.size === 0) return [];
  return BIOPHOTON_LINKS.filter(
    (link) =>
      organelleIds.has(link.sourceOrganelleId) ||
      organelleIds.has(link.targetOrganelleId)
  );
}

// Each link carries an attentionWeight (0–1) that drives stroke width
// in the diagram — mirroring how transformer attention weights
// distribute focus across token pairs.`;

/**
 * CytoplasmPanel — the interactive cell explorer.
 *
 * The cytoplasm is the living medium. This is where exploration starts:
 * a spatial view of the cell with clickable organelles, biophoton links,
 * and an info panel revealing what each structure does as an OS feature.
 */
export function CytoplasmPanel({ view, perceive }: Props) {
  const biophotonLinks = view.relatedBiophotonLinks.map((l) => ({
    sourceId: l.sourceOrganelleId,
    targetId: l.targetOrganelleId,
    attentionWeight: l.attentionWeight ?? 0.5,
  }));

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">The Microscopic View</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Every OS feature maps to a part of the human cell. Click an organelle to discover
          its zone (glyph), OS role, and substrate connections. Biophoton links illuminate
          communication partners — width reflects attention weight.
        </p>
      </div>

      {/* Cell diagram + info panel */}
      <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(34,211,238,0.04)" }}
          />
          <CellDiagram
            activeIds={view.activeOrganelleIds}
            biophotonLinks={biophotonLinks}
            onHover={perceive.hoverOrganelle}
            onClick={perceive.toggleOrganelle}
          />
        </div>

        <div className="lg:sticky lg:top-4 min-h-[360px] flex items-center justify-center">
          <InfoPanel
            organelle={view.activeOrganelle}
            substrate={view.activeSubstrate}
            relatedSubstrate={view.relatedSubstrate}
            relatedOrganelles={view.relatedOrganelles}
            relatedBiophotonLinks={view.relatedBiophotonLinks}
            onSelectSubstrate={perceive.toggleSubstrate}
            onSelectOrganelle={perceive.toggleOrganelle}
          />
        </div>
      </div>

      {/* ── The code driving the diagram ─────────────────────────────── */}
      <div className="max-w-3xl space-y-8 border-t border-white/5 pt-12">
        <div className="space-y-2">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(52,211,153,0.5)" }}>
            The cytoplasm in code
          </p>
          <h3 className="text-lg font-bold text-white">
            How the diagram and the zone model connect
          </h3>
          <p className="text-sm text-muted-foreground/70 leading-relaxed">
            The SVG diagram uses 15 organelle IDs inherited from cell biology.
            The Cell OS navigation model uses 8 zone IDs. One constant map joins them —
            every click on the diagram above routes through this structure.
          </p>
        </div>

        <CodeSnippet filename="src/components/CellDiagram.tsx">
          {ZONE_MAP_SNIPPET}
        </CodeSnippet>

        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          The biophoton links you see when clicking organelles are not hardcoded —
          they are derived at runtime from the active organelle set:
        </p>

        <CodeSnippet filename="src/features/explorer/selectors.ts">
          {BIOPHOTON_SNIPPET}
        </CodeSnippet>
      </div>
    </div>
  );
}
