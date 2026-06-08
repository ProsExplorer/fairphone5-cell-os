import { useMemo } from "react";
import { CellDiagram } from "@/components/CellDiagram";
import { InfoPanel } from "../components/InfoPanel";
import { CodeSnippet } from "../components/CodeSnippet";
import { useLearningStore } from "@/features/learning/useLearningStore";
import {
  getOrganelleVisitIntensity,
  getLearnedBiophotonWeights,
} from "@/features/learning/hebbianAdapter";
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

const BINDER_NATIVE_SNIPPET = `status_t BBinder::transact(
    uint32_t code, const Parcel& data, Parcel* reply, uint32_t flags)
{
  data.setDataPosition(0);
  if (reply != nullptr && (flags & FLAG_CLEAR_BUF)) {
    reply->markSensitive();
  }
  status_t err = NO_ERROR;
  switch (code) {
    case PING_TRANSACTION:
      err = pingBinder();
      break;
    default:
      err = onTransact(code, data, reply, flags);
      break;
  }
  return err;
}`;

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
  // Organism memory: derive per-organelle visit intensity and learned
  // biophoton weights from the epigenome. Both update reactively as
  // the user interacts with the cell, closing the adaptation loop.
  const organelleVisits = useLearningStore((s) => s.organelleVisits);
  const coActivations   = useLearningStore((s) => s.coActivations);

  const visitIntensity = useMemo(
    () => getOrganelleVisitIntensity(organelleVisits),
    [organelleVisits]
  );

  const learnedWeights = useMemo(
    () => getLearnedBiophotonWeights(coActivations),
    [coActivations]
  );

  // Blend base attentionWeight with learned co-activation strength.
  // Learned weight adds up to +0.4 on top of the genomic baseline,
  // clamped at 1.0. Links between frequently co-explored organelles
  // visibly thicken — expressing what the organism has learned to attend to.
  const biophotonLinks = view.relatedBiophotonLinks.map((l) => {
    const pairKey = [l.sourceOrganelleId, l.targetOrganelleId].sort().join("|");
    const learned  = learnedWeights[pairKey] ?? 0;
    const base     = l.attentionWeight ?? 0.5;
    return {
      sourceId: l.sourceOrganelleId,
      targetId: l.targetOrganelleId,
      attentionWeight: Math.min(1.0, base + learned * 0.4),
    };
  });

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
            visitIntensity={visitIntensity}
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

        {/* ── Native reality ──────────────────────────────────────── */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(52,211,153,0.3)" }}>
            The kernel this maps to
          </p>
          <p className="text-sm text-muted-foreground/60 leading-relaxed">
            In Android, the cytoplasm is{" "}
            <code className="font-mono text-xs" style={{ color: "rgba(52,211,153,0.55)" }}>Binder.cpp</code>.
            Every process — camera, AI inference, clipboard, keystore — communicates
            by passing through <code className="font-mono text-xs text-white/40">BBinder::transact()</code>.
            There is no other path. One fluid, all organelles.
          </p>
          <CodeSnippet
            filename="platform/frameworks/native/libs/binder/Binder.cpp"
            language="c++"
            sourceUrl="https://android.googlesource.com/platform/frameworks/native/+/refs/heads/master/libs/binder/Binder.cpp"
          >{BINDER_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      </div>
    </div>
  );
}
