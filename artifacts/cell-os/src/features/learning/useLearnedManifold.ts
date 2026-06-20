import { useMemo } from "react";
import { useLearningStore } from "./useLearningStore";
import {
  getOrganelleVisitIntensity,
  getZoneVisitWeights,
  getLearnedBiophotonWeights,
  getConfidenceBoosts,
  getZonePhaseIntensity,
  applyBioplasmaManifoldModulation,
} from "./hebbianAdapter";
import type { CellZoneId } from "@/domain/types";
import { BIOPLASMA_ZONE_REGISTRY } from "@/domain/content/organelles";

/**
 * The learned state of the manifold — adaptations derived from the
 * epigenome's accumulated interaction tensors.
 *
 * This is the organism's "phenotype": the static genome (types.ts,
 * mappings.ts) does not change, but its expression — glow intensities,
 * biophoton weights, confidence gradients — adapts to observed usage.
 */
export type LearnedManifold = {
  /** Normalized visit intensity per organelle (0–1, sqrt-scaled). */
  organelleVisitIntensity: Record<string, number>;
  /** Normalized visit weight per zone (0–1, most-visited = 1). */
  zoneVisitWeights: Record<CellZoneId, number>;
  /** Learned attentionWeight per co-activated pair. Key: "a|b" sorted. */
  learnedBiophotonWeights: Record<string, number>;
  /** Fractional σ boost per substrate node (max 0.15). */
  confidenceBoosts: Record<string, number>;
  /**
   * Zone × TriadPhase exploration intensity — 2D projection of Q^{z,p,s}
   * onto (zone, phase) axes. Each value is 0–1 relative to the most-
   * explored (zone, phase) cell. Reflects how deeply each zone has been
   * explored across its P→A→E triad.
   */
  zonePhaseIntensity: Record<string, { perception: number; affect: number; expression: number }>;
  /**
   * Bioplasma-modulated zone weights — Hebbian visit weights boosted by
   * active bioplasma pathway density per zone.
   * Verified pathways (σ ≥ 0.75) contribute up to +18%; indicative +14%; speculative +9%.
   * Used to subtly increase baseline ring opacity/glow in CellMapNav.
   */
  bioplasmaZoneWeights: Record<CellZoneId, number>;
  /** Total click-lock interactions observed across all sessions. */
  totalInteractions: number;
  /** True once ≥ 5 intentional interactions have been recorded. */
  isAdapted: boolean;
};

export function useLearnedManifold(): LearnedManifold {
  const organelleVisits      = useLearningStore((s) => s.organelleVisits);
  const coActivations        = useLearningStore((s) => s.coActivations);
  const substrateEngagement  = useLearningStore((s) => s.substrateEngagement);
  const zonePhaseExploration = useLearningStore((s) => s.zonePhaseExploration);
  const totalInteractions    = useLearningStore((s) => s.totalInteractions);

  return useMemo(() => {
    const zoneVisitWeights = getZoneVisitWeights(organelleVisits);
    return {
      organelleVisitIntensity: getOrganelleVisitIntensity(organelleVisits),
      zoneVisitWeights,
      learnedBiophotonWeights: getLearnedBiophotonWeights(coActivations),
      confidenceBoosts:        getConfidenceBoosts(substrateEngagement, totalInteractions),
      zonePhaseIntensity:      getZonePhaseIntensity(zonePhaseExploration),
      bioplasmaZoneWeights:    applyBioplasmaManifoldModulation(zoneVisitWeights, BIOPLASMA_ZONE_REGISTRY),
      totalInteractions,
      isAdapted: totalInteractions >= 5,
    };
  }, [organelleVisits, coActivations, substrateEngagement, zonePhaseExploration, totalInteractions]);
}
