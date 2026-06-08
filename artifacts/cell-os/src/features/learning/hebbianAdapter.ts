import type { CellZoneId } from "@/domain/types";

/**
 * Hebbian Adapter — pure functions that translate the epigenome's raw
 * interaction tensors into manifold-compatible adaptations.
 *
 * "Neurons that fire together, wire together." Each function here is one
 * step in that translation: raw counts → normalized weights → visual or
 * structural adaptations that the organism expresses.
 *
 * All functions are pure: same inputs → same outputs, no side effects.
 * The learning store supplies the inputs; the UI layer consumes the outputs.
 */

const ORGANELLE_TO_ZONE: Record<string, CellZoneId> = {
  "nucleus":               "nucleus",
  "nucleolus":             "nucleus",
  "dna":                   "nucleus",
  "nuclear-pores":         "nucleus",
  "cytoplasm":             "cytoplasm",
  "cytoskeleton":          "cytoskeleton",
  "ribosomes":             "ribosomes",
  "mitochondria":          "mitochondria",
  "golgi-apparatus":       "golgi",
  "vesicles":              "golgi",
  "endoplasmic-reticulum": "endoplasmic-reticulum",
  "cell-membrane":         "membrane",
  "membrane-receptors":    "membrane",
  "lysosomes":             "membrane",
  "vacuole":               "membrane",
};

/**
 * Compute normalized visit intensity per organelle (0–1).
 *
 * Uses sqrt scaling: early visits produce visible glow quickly, but the
 * curve flattens so no single organelle saturates the display. The most-
 * visited organelle always has intensity = 1.0; all others are relative.
 */
export function getOrganelleVisitIntensity(
  organelleVisits: Record<string, number>
): Record<string, number> {
  const values = Object.values(organelleVisits);
  if (values.length === 0) return {};
  const maxVisits = Math.max(1, ...values);
  const result: Record<string, number> = {};
  for (const [id, count] of Object.entries(organelleVisits)) {
    result[id] = Math.sqrt(count / maxVisits);
  }
  return result;
}

/**
 * Aggregate organelle visits up to their containing zone.
 * Returns a normalized 0–1 weight per zone (the most-visited zone = 1.0).
 */
export function getZoneVisitWeights(
  organelleVisits: Record<string, number>
): Record<CellZoneId, number> {
  const zoneSums: Partial<Record<CellZoneId, number>> = {};
  for (const [orgId, count] of Object.entries(organelleVisits)) {
    const zId = ORGANELLE_TO_ZONE[orgId];
    if (zId) zoneSums[zId] = (zoneSums[zId] ?? 0) + count;
  }
  const sumValues = Object.values(zoneSums);
  const maxSum = Math.max(1, ...sumValues);
  const allZones: CellZoneId[] = [
    "nucleus", "cytoplasm", "cytoskeleton", "ribosomes",
    "mitochondria", "golgi", "endoplasmic-reticulum", "membrane",
  ];
  const result = {} as Record<CellZoneId, number>;
  for (const zId of allZones) {
    result[zId] = (zoneSums[zId] ?? 0) / maxSum;
  }
  return result;
}

/**
 * Derive learned biophoton attentionWeights from co-activation counts.
 *
 * The key format matches useLearningStore: "a|b" with a < b lexically.
 * Returns a 0–1 weight (most co-activated pair = 1.0) usable directly
 * as attentionWeight on a BiophotonLink overlay.
 */
export function getLearnedBiophotonWeights(
  coActivations: Record<string, number>
): Record<string, number> {
  const values = Object.values(coActivations);
  if (values.length === 0) return {};
  const maxCount = Math.max(1, ...values);
  const result: Record<string, number> = {};
  for (const [pair, count] of Object.entries(coActivations)) {
    result[pair] = count / maxCount;
  }
  return result;
}

/**
 * Compute fractional σ confidence boosts per substrate node.
 *
 * Max boost is 0.15 — enough to move an "indicative" node (σ = 0.5)
 * toward 0.65, but never enough to reach "verified" (σ = 1.0) on
 * user attention alone. Evidence still requires external validation.
 *
 * The formula: boost = min(0.15, engagement / sqrt(totalInteractions))
 * This grows with focused attention (high engagement, low denominator)
 * and shrinks as the organism grows broader (denominator increases).
 */
export function getConfidenceBoosts(
  substrateEngagement: Record<string, number>,
  totalInteractions: number
): Record<string, number> {
  if (totalInteractions === 0) return {};
  const result: Record<string, number> = {};
  const denom = Math.sqrt(Math.max(1, totalInteractions));
  for (const [id, count] of Object.entries(substrateEngagement)) {
    const boost = Math.min(0.15, count / denom);
    if (boost > 0.001) result[id] = boost;
  }
  return result;
}

/**
 * Parse a co-activation pair key back into the two organelle IDs.
 * "nucleus|ribosomes" → ["nucleus", "ribosomes"]
 */
export function parsePairKey(key: string): [string, string] {
  const [a, b] = key.split("|");
  return [a, b];
}
