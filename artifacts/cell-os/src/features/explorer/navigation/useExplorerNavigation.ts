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

export type ExplorerNavigation = {
  activeZone: CellZoneId;
  selectZone: (zone: CellZoneId) => void;
  goInward: () => void;
  goOutward: () => void;
  canGoInward: boolean;
  canGoOutward: boolean;
  depthIndex: number; // 0 = innermost, 7 = outermost
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

  return {
    activeZone,
    selectZone,
    goInward,
    goOutward,
    canGoInward: currentIndex > 0,
    canGoOutward: currentIndex < ZONE_DEPTH_ORDER.length - 1,
    depthIndex: currentIndex,
  };
}
