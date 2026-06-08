import { useState, useCallback } from "react";
import type { CellZoneId } from "@/domain/types";

/**
 * Biological depth order — nucleus is the innermost zone, membrane is outermost.
 * Navigating through this array from index 0 to 7 is the "inside out" journey
 * through the cell's architecture.
 */
export const ZONE_DEPTH_ORDER: CellZoneId[] = [
  "nucleus",
  "cytoplasm",
  "cytoskeleton",
  "ribosomes",
  "mitochondria",
  "golgi",
  "endoplasmic-reticulum",
  "membrane",
];

/**
 * Evidence-first traversal order — zones sorted by descending confidence
 * centroid (σ̄), derived from the manifold's confidence gradient field.
 * (MANIFOLD_ANALYSIS.md §11.4)
 *
 * σ̄ = 1.0: nucleus, cytoplasm, cytoskeleton, golgi, endoplasmic-reticulum
 * σ̄ = 0.5: ribosomes, mitochondria, membrane
 *
 * Within each confidence tier the depth ordering is preserved.
 */
export const ZONE_CONFIDENCE_ORDER: CellZoneId[] = [
  "nucleus",
  "cytoplasm",
  "cytoskeleton",
  "golgi",
  "endoplasmic-reticulum",
  "ribosomes",
  "mitochondria",
  "membrane",
];

/**
 * Geodesically close zone pairs that are not sequential in ZONE_DEPTH_ORDER.
 * Derived from the biophoton-corrected zone metric g_ij.
 * (MANIFOLD_ANALYSIS.md §11.3)
 *
 * nucleus ↔ mitochondria: effective geodesic distance 3.45 vs graph distance 4.
 * ER ↔ golgi: adjacent with additional biophoton coupling (d = 0.84).
 */
export const RELATED_ZONE_JUMPS: ReadonlyArray<readonly [CellZoneId, CellZoneId]> = [
  ["nucleus", "mitochondria"],
  ["endoplasmic-reticulum", "golgi"],
] as const;

/** Returns the set of geodesically related (non-sequential) zones for a given zone. */
export function getRelatedZones(zoneId: CellZoneId): CellZoneId[] {
  const related: CellZoneId[] = [];
  for (const [a, b] of RELATED_ZONE_JUMPS) {
    if (a === zoneId) related.push(b);
    else if (b === zoneId) related.push(a);
  }
  return related;
}

export type ExplorerNavigation = {
  activeZone: CellZoneId;
  selectZone: (zone: CellZoneId) => void;
  goInward: () => void;
  goOutward: () => void;
  canGoInward: boolean;
  canGoOutward: boolean;
  depthIndex: number;
  /** Geodesically related zones — non-sequential but informationally close. */
  relatedZones: CellZoneId[];
  /** Jump directly to a geodesically related zone. */
  jumpToZone: (zone: CellZoneId) => void;
};

/**
 * useExplorerNavigation — controls which zone is active.
 *
 * Starts at "cytoplasm" — the interior medium of the cell, the most immediately
 * explorable space. The user navigates inward toward the nucleus or outward to
 * the membrane via the spatial controls or the zone map.
 */
export function useExplorerNavigation(
  initial: CellZoneId = "cytoplasm"
): ExplorerNavigation {
  const [activeZone, setActiveZone] = useState<CellZoneId>(initial);

  const selectZone = useCallback((zone: CellZoneId) => {
    setActiveZone(zone);
  }, []);

  const currentIndex = ZONE_DEPTH_ORDER.indexOf(activeZone);

  const goInward = useCallback(() => {
    setActiveZone((z) => {
      const i = ZONE_DEPTH_ORDER.indexOf(z);
      return i > 0 ? ZONE_DEPTH_ORDER[i - 1] : z;
    });
  }, []);

  const goOutward = useCallback(() => {
    setActiveZone((z) => {
      const i = ZONE_DEPTH_ORDER.indexOf(z);
      return i < ZONE_DEPTH_ORDER.length - 1 ? ZONE_DEPTH_ORDER[i + 1] : z;
    });
  }, []);

  const jumpToZone = useCallback((zone: CellZoneId) => {
    setActiveZone(zone);
  }, []);

  return {
    activeZone,
    selectZone,
    goInward,
    goOutward,
    canGoInward: currentIndex > 0,
    canGoOutward: currentIndex < ZONE_DEPTH_ORDER.length - 1,
    depthIndex: currentIndex,
    relatedZones: getRelatedZones(activeZone),
    jumpToZone,
  };
}
