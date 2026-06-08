import { useEffect } from "react";
import { useLearningStore } from "./useLearningStore";
import { getZoneForOrganelle } from "./hebbianAdapter";
import type { ExplorerView } from "@/features/explorer/useExplorerFlow";

/**
 * useMembraneObserver — the sole ingestion boundary for the epigenome.
 *
 * UNIVERSAL_MANIFOLD.md §8 establishes that the Membrane zone is the only
 * legal channel through which information crosses the organism boundary.
 * FP5_MANIFOLD_COMPARISON.md §2 confirms this principle empirically: Android's
 * HAL partition (HIDL/AIDL) enforces it at the system/vendor boundary, and
 * the fragility of pre-Project-Treble coupling demonstrates what happens when
 * the principle is violated.
 *
 * This hook formalises that principle for the learning layer. It is the ONLY
 * place where external interactions become epigenome records. All three
 * observation paths (organelle click, substrate click, zone navigation) funnel
 * through this single named boundary — no other component should call
 * learning store record actions directly.
 *
 * The three ingestion events map onto the P→A→E triad:
 *   P  Zone navigation:   user crosses into a new zone → receives it (perception)
 *   A  Click-lock:        user locks focus on an organelle/substrate → transforms
 *                         their model of that structure (affect)
 *   E  [future] Zone departure after lock: understanding expressed outward
 */
export function useMembraneObserver(view: ExplorerView, activeZoneId: string) {
  const recordOrganelleVisit      = useLearningStore((s) => s.recordOrganelleVisit);
  const recordSubstrateEngagement = useLearningStore((s) => s.recordSubstrateEngagement);
  const recordZonePhase           = useLearningStore((s) => s.recordZonePhase);

  // P — Perception: navigating to a zone is the act of receiving it.
  // The zone boundary crossing is the membrane event at the zone scale.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    recordZonePhase(activeZoneId, "perception");
  }, [activeZoneId]);

  // A — Affect: click-lock is deliberate engagement — the user is transforming
  // their model of the structure. Hover is transient; only locks are recorded.
  useEffect(() => {
    if (!view.isLocked) return;
    if (view.activeOrganelle) {
      recordOrganelleVisit(view.activeOrganelle.id);
      const zoneId = getZoneForOrganelle(view.activeOrganelle.id);
      if (zoneId) recordZonePhase(zoneId, "affect");
    }
    if (view.activeSubstrate) {
      recordSubstrateEngagement(view.activeSubstrate.id);
      recordZonePhase(activeZoneId, "affect");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.activeOrganelle?.id, view.activeSubstrate?.id, view.isLocked]);
}
