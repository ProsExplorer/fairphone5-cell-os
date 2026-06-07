import { SubstrateAtlas } from "../components/SubstrateAtlas";
import type { ExplorerView, ExplorerPerception } from "../useExplorerFlow";

type Props = {
  view: ExplorerView;
  perceive: ExplorerPerception;
};

/**
 * CytoskeletonPanel — the AI substrate structural lattice.
 *
 * The cytoskeleton provides the structural framework that holds the cell's shape
 * and positions its organelles. Here it maps to the Fairphone 5's hardware
 * substrate: Hexagon 770 DSP, Adreno 643 GPU, Kryo 670 CPU — the silicon
 * scaffolding on which everything else runs.
 *
 * Cross-zone state: clicking a substrate node highlights related organelles
 * in the CytoplasmPanel's CellDiagram, and vice versa — the view persists
 * as the user navigates between zones.
 */
export function CytoskeletonPanel({ view, perceive }: Props) {
  return (
    <SubstrateAtlas
      isSubstrateHighlighted={view.isSubstrateHighlighted}
      hasFocus={view.hasFocus}
      onToggleSubstrate={perceive.toggleSubstrate}
    />
  );
}
