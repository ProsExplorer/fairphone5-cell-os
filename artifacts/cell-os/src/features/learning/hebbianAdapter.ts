import type { CellZoneId, BioplasmaPathway } from "@/domain/types";

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

/**
 * Look up the zone for a given organelle ID.
 * Returns null for unknown IDs (e.g., diagram-only shapes not in the zone map).
 */
export function getZoneForOrganelle(organelleId: string): CellZoneId | null {
  return ORGANELLE_TO_ZONE[organelleId] ?? null;
}

/**
 * Derive the attentionWeight proxy from a BiophotonLink's rateRange string.
 *
 * MANIFOLD_ANALYSIS.md §2.4 defines the proxy weight as:
 *   w_ij = (r_min + r_max) / (2 × r_max_global)
 * where r_max_global = 100 ph/cm²/s (the maximum observed rate).
 *
 * This replaces the `attentionWeight ?? 0.5` fallback that was using an
 * arbitrary default rather than the theoretically-grounded midpoint proxy.
 *
 * Example: "10–100 ph/cm²/s" → (10+100)/(2×100) = 0.55
 */
const RATE_GLOBAL_MAX = 100;

export function parseRateRangeProxy(rateRange: string): number {
  const match = rateRange.match(/(\d+)[–\-](\d+)/);
  if (!match) return 0.5;
  const lo = parseFloat(match[1]);
  const hi = parseFloat(match[2]);
  return (lo + hi) / 2 / RATE_GLOBAL_MAX;
}

/**
 * Blend a base attentionWeight with a learned co-activation weight using
 * bounded interpolation rather than fixed additive blending.
 *
 * The formula closes half the remaining gap between base and 1.0, weighted
 * by the learned strength. This preserves dynamic range: a link already at
 * w=0.55 can grow toward 0.775 at most (at full learned strength), never
 * saturating to 1.0 from a single learning pass.
 *
 * Compare to the fixed `+0.4` addend which could push links near saturation
 * and compress selectivity between strongly- and weakly-coupled pairs.
 */
export function blendAttentionWeight(base: number, learnedWeight: number): number {
  return base + (1 - base) * learnedWeight * 0.5;
}

/**
 * Apply bioplasma manifold modulation to zone weights.
 *
 * Boosts zone weights based on which bioplasma pathways are active in each zone.
 * Verified pathways (σ ≥ 0.75) boost by up to 18%; indicative by 14%; speculative by 9%.
 * Reserved pathways (BP8) are skipped entirely.
 *
 * The result is bounded to [0, 1] so no zone can saturate from bioplasma alone.
 * This modulation is additive on top of Hebbian visit weights — the two learning
 * channels are complementary, not competitive.
 *
 * @param zoneWeights  Existing zone visit weights from getZoneVisitWeights()
 * @param zoneRegistry BIOPLASMA_ZONE_REGISTRY from organelles.ts
 */
export function applyBioplasmaManifoldModulation(
  zoneWeights: Record<CellZoneId, number>,
  zoneRegistry: Partial<Record<CellZoneId, BioplasmaPathway[]>>
): Record<CellZoneId, number> {
  const modulated = { ...zoneWeights };
  const allZones = Object.keys(modulated) as CellZoneId[];
  for (const zoneId of allZones) {
    const pathways = zoneRegistry[zoneId];
    if (!pathways || pathways.length === 0) continue;
    for (const pw of pathways) {
      if (pw.status === "reserved") continue;
      const boostFactor = pw.sigma >= 0.75 ? 0.18 : pw.sigma >= 0.50 ? 0.14 : 0.09;
      modulated[zoneId] = Math.min(1.0, modulated[zoneId] + pw.sigma * boostFactor);
    }
  }
  return modulated;
}

/**
 * Derive normalized zone × triad-phase exploration intensities.
 *
 * Input key format: "${zoneId}|${phase}" (from useLearningStore.recordZonePhase).
 * Returns nested { [zoneId]: { perception, affect, expression } } all in [0,1],
 * normalized so the most-explored (zone, phase) cell = 1.0.
 *
 * Maps onto the Q^{z,p,s} rank-3 tensor's zone-phase marginal
 * (MANIFOLD_ANALYSIS.md §2.5) — this is the 2D projection of that tensor
 * onto the (zone, triad-phase) axes, collapsing the scale axis.
 */
export function getZonePhaseIntensity(
  zonePhaseExploration: Record<string, number>
): Record<string, { perception: number; affect: number; expression: number }> {
  const values = Object.values(zonePhaseExploration);
  if (values.length === 0) return {};
  const maxCount = Math.max(1, ...values);
  const result: Record<string, { perception: number; affect: number; expression: number }> = {};
  for (const [key, count] of Object.entries(zonePhaseExploration)) {
    const sep = key.lastIndexOf("|");
    const zoneId = key.slice(0, sep);
    const phase  = key.slice(sep + 1) as "perception" | "affect" | "expression";
    if (!result[zoneId]) result[zoneId] = { perception: 0, affect: 0, expression: 0 };
    result[zoneId][phase] = count / maxCount;
  }
  return result;
}
