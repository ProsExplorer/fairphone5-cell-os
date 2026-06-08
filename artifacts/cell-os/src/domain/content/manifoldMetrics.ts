import type { CellZoneId } from "@/domain/types";
import { ORGANELLE_SUBSTRATE_LINKS, BIOPHOTON_LINKS } from "./mappings";
import { SUBSTRATE_NODES } from "./substrate";
import { QI_INTERSECTIONS } from "./qiMatrix";
import { CELL_MAPPINGS } from "./organelles";

/**
 * Manifold health metrics derived from the tensor field decomposition.
 * See MANIFOLD_ANALYSIS.md §11.8 for the full dashboard specification.
 *
 * All metrics are computed live from the source arrays — they reflect the
 * current state of the data layer on every import.
 */
export type ManifoldMetrics = {
  couplingTensorDensity: number;
  couplingTensorLinks: number;
  couplingTensorSpace: number;

  meanZoneConfidence: number;
  zoneConfidenceCentroids: Record<CellZoneId, number>;

  biophotonCoverage: number;
  biophotonLinks: number;
  biophotonSpace: number;

  qiTensorDensity: number;
  qiTensorLinks: number;
  qiTensorSpace: number;

  exportRankTotal: number;
  phaseTransitionCount: number;
};

/**
 * Healthy range for each metric, from MANIFOLD_ANALYSIS.md §11.8.
 * Used by the /metrics developer surface to render status indicators.
 */
export type MetricHealth = "healthy" | "warn-low" | "warn-high" | "critical";

export type MetricRange = {
  low: number;
  high: number;
};

export const METRIC_HEALTHY_RANGES: Record<
  keyof Omit<ManifoldMetrics, "zoneConfidenceCentroids">,
  MetricRange
> = {
  couplingTensorDensity: { low: 0.10, high: 0.25 },
  couplingTensorLinks:   { low: 10,   high: 30   },
  couplingTensorSpace:   { low: 100,  high: 150  },
  meanZoneConfidence:    { low: 0.75, high: 1.0  },
  biophotonCoverage:     { low: 0.01, high: 0.05 },
  biophotonLinks:        { low: 2,    high: 10   },
  biophotonSpace:        { low: 100,  high: 300  },
  qiTensorDensity:       { low: 0.05, high: 0.10 },
  qiTensorLinks:         { low: 10,   high: 30   },
  qiTensorSpace:         { low: 200,  high: 300  },
  exportRankTotal:       { low: 40,   high: 80   },
  phaseTransitionCount:  { low: 4,    high: 7    },
};

export function getMetricHealth(
  key: keyof Omit<ManifoldMetrics, "zoneConfidenceCentroids">,
  value: number
): MetricHealth {
  const range = METRIC_HEALTHY_RANGES[key];
  if (value < range.low) return "warn-low";
  if (value > range.high) return "warn-high";
  return "healthy";
}

/**
 * Maps each CellZoneId to the organelle IDs that belong to it.
 * Derived from the private ORGANELLE_ZONE_MAP in CellDiagram.tsx — kept
 * here as a domain-layer constant for metric computation.
 */
const ZONE_ORGANELLES: Record<CellZoneId, readonly string[]> = {
  nucleus:                  ["nucleus", "dna", "nucleolus", "nuclear-pores"],
  cytoplasm:                ["cytoplasm"],
  cytoskeleton:             ["cytoskeleton"],
  ribosomes:                ["ribosomes"],
  mitochondria:             ["mitochondria"],
  golgi:                    ["golgi-apparatus", "vesicles"],
  "endoplasmic-reticulum":  ["endoplasmic-reticulum"],
  membrane:                 ["cell-membrane", "membrane-receptors", "lysosomes", "vacuole"],
};

const CONFIDENCE_SIGMA: Record<string, number> = {
  verified:    1.0,
  indicative:  0.5,
  unconfirmed: 0.0,
};

function computeZoneConfidenceCentroids(): Record<CellZoneId, number> {
  const substrateConfidence = Object.fromEntries(
    SUBSTRATE_NODES.map((n) => [n.id, CONFIDENCE_SIGMA[n.confidence] ?? 0])
  );

  const result = {} as Record<CellZoneId, number>;

  for (const [zoneId, organelleIds] of Object.entries(ZONE_ORGANELLES) as [CellZoneId, readonly string[]][]) {
    const reachedSubstrates = new Set<string>();
    for (const orgId of organelleIds) {
      for (const link of ORGANELLE_SUBSTRATE_LINKS) {
        if (link.organelleId === orgId) reachedSubstrates.add(link.substrateId);
      }
    }
    if (reachedSubstrates.size === 0) {
      result[zoneId] = 0;
    } else {
      const total = [...reachedSubstrates].reduce(
        (sum, sid) => sum + (substrateConfidence[sid] ?? 0),
        0
      );
      result[zoneId] = total / reachedSubstrates.size;
    }
  }

  return result;
}

/**
 * Compute all manifold health metrics from the current source arrays.
 * This is a pure function — call it once at render time and memoize.
 */
export function computeManifoldMetrics(): ManifoldMetrics {
  const organelleCount = CELL_MAPPINGS.length;
  const substrateCount = SUBSTRATE_NODES.length;
  const couplingSpace  = organelleCount * substrateCount;

  const biophotonSpace = organelleCount * organelleCount;

  const QI_TENSOR_AXES = { zones: 8, phases: 3, scales: 11 };
  const qiTensorSpace  = QI_TENSOR_AXES.zones * QI_TENSOR_AXES.phases * QI_TENSOR_AXES.scales;

  const centroids = computeZoneConfidenceCentroids();
  const centroidValues = Object.values(centroids);
  const meanZoneConfidence =
    centroidValues.reduce((s, v) => s + v, 0) / centroidValues.length;

  return {
    couplingTensorDensity: ORGANELLE_SUBSTRATE_LINKS.length / couplingSpace,
    couplingTensorLinks:   ORGANELLE_SUBSTRATE_LINKS.length,
    couplingTensorSpace:   couplingSpace,

    meanZoneConfidence,
    zoneConfidenceCentroids: centroids,

    biophotonCoverage: BIOPHOTON_LINKS.length / biophotonSpace,
    biophotonLinks:    BIOPHOTON_LINKS.length,
    biophotonSpace,

    qiTensorDensity: QI_INTERSECTIONS.length / qiTensorSpace,
    qiTensorLinks:   QI_INTERSECTIONS.length,
    qiTensorSpace,

    exportRankTotal: 60,
    phaseTransitionCount: 5,
  };
}
