import { CellDiagram } from "@/components/CellDiagram";
import { InfoPanel } from "../components/InfoPanel";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

type Props = {
  view: ExplorerView;
  perceive: ExplorerPerception;
};

/**
 * CytoplasmPanel — the interactive cell explorer.
 *
 * The cytoplasm is the living medium that fills the cell's interior.
 * This is where exploration starts: a spatial view of the cell with clickable
 * organelles, biophoton communication links, and an info panel that reveals
 * what each structure does as an OS feature.
 */
export function CytoplasmPanel({ view, perceive }: Props) {
  const biophotonLinks = view.relatedBiophotonLinks.map((l) => ({
    sourceId: l.sourceOrganelleId,
    targetId: l.targetOrganelleId,
  }));

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">The Microscopic View</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Every operating system feature maps to a part of the human cell. Click an organelle
          to discover the connection. When an organelle is active, biophoton links illuminate
          its communication partners — the cell's own signalling network.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Cell diagram */}
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

        {/* Info panel */}
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
    </div>
  );
}
