import type { CellZoneId } from "@/domain/types";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";
import { NucleusPanel } from "../zones/NucleusPanel";
import { CytoplasmPanel } from "../zones/CytoplasmPanel";
import { CytoskeletonPanel } from "../zones/CytoskeletonPanel";
import { RibosomesPanel } from "../zones/RibosomesPanel";
import { MitochondriaPanel } from "../zones/MitochondriaPanel";
import { GolgiPanel } from "../zones/GolgiPanel";
import { EndoplasmicReticulumPanel } from "../zones/EndoplasmicReticulumPanel";
import { MembranePanel } from "../zones/MembranePanel";

type Props = {
  activeZone: CellZoneId;
  view: ExplorerView;
  perceive: ExplorerPerception;
};

/**
 * ZoneContentViewport — renders the content panel for the active zone.
 *
 * The key={activeZone} remounts the panel on each zone change, which:
 * - Resets scroll position to top on every navigation
 * - Resets any local UI state (open accordions, hover state, etc.)
 * - Creates a clean visual transition for each zone
 */
export function ZoneContentViewport({ activeZone, view, perceive }: Props) {
  return (
    <main
      key={activeZone}
      className="flex-1 overflow-y-auto animate-in fade-in duration-[777ms]"
    >
      {activeZone === "nucleus" && (
        <NucleusPanel />
      )}
      {activeZone === "cytoplasm" && (
        <CytoplasmPanel view={view} perceive={perceive} />
      )}
      {activeZone === "cytoskeleton" && (
        <CytoskeletonPanel view={view} perceive={perceive} />
      )}
      {activeZone === "ribosomes" && (
        <RibosomesPanel />
      )}
      {activeZone === "mitochondria" && (
        <MitochondriaPanel />
      )}
      {activeZone === "golgi" && (
        <GolgiPanel view={view} perceive={perceive} />
      )}
      {activeZone === "endoplasmic-reticulum" && (
        <EndoplasmicReticulumPanel />
      )}
      {activeZone === "membrane" && (
        <MembranePanel />
      )}
    </main>
  );
}
