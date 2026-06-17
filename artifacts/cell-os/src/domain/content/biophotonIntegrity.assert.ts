/**
 * Biophoton canonical pathway integrity assertions.
 *
 * Run with:  pnpm --filter @workspace/cell-os run test:biophoton
 *
 * Asserts that the BIOPHOTON_LINKS array always satisfies the four
 * invariants required by BIOPHOTON_RESEARCH.md §5 and the §14 audit:
 *   1. Exactly 18 links (the post-§13 canonical count)
 *   2. All P1–P7 required source→target tuples are present
 *   3. Every link carries a non-empty wavelengthBand
 *   4. Every link's couplingSigma is within the tier bounds for its confidence level
 */

import assert from "node:assert/strict";
import { BIOPHOTON_LINKS } from "./mappings.js";

type Confidence = "verified" | "indicative" | "speculative" | "unconfirmed";

interface RequiredPath {
  code: "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7";
  source: string;
  target: string;
}

const REQUIRED_PATHS: RequiredPath[] = [
  { code: "P1", source: "mitochondria",          target: "nucleus"            },
  { code: "P2", source: "endoplasmic-reticulum",  target: "mitochondria"      },
  { code: "P3", source: "cell-membrane",          target: "membrane-receptors" },
  { code: "P4", source: "nucleus",                target: "cytoplasm"          },
  { code: "P5", source: "cytoskeleton",           target: "mitochondria"       },
  { code: "P6", source: "cell-membrane",          target: "nucleus"            },
  { code: "P7", source: "mitochondria",           target: "mitochondria"       },
];

const SIGMA_BOUNDS: Record<Confidence, { min: number; max: number }> = {
  verified:    { min: 0.75, max: 1.00 },
  indicative:  { min: 0.50, max: 0.75 },
  speculative: { min: 0.30, max: 0.50 },
  unconfirmed: { min: 0.30, max: 0.50 },
};

// ── Assertion 1: canonical count ─────────────────────────────────────────────
assert.equal(
  BIOPHOTON_LINKS.length,
  18,
  `BIOPHOTON_LINKS must contain exactly 18 entries (canonical post-§13 set). Found ${BIOPHOTON_LINKS.length}.`
);

// ── Assertion 2: P1–P7 required tuples ───────────────────────────────────────
for (const p of REQUIRED_PATHS) {
  const exists = BIOPHOTON_LINKS.some(
    l => l.sourceOrganelleId === p.source && l.targetOrganelleId === p.target
  );
  assert.ok(
    exists,
    `Missing required canonical pathway ${p.code}: ${p.source} → ${p.target} is not present in BIOPHOTON_LINKS.`
  );
}

// ── Assertion 3: wavelengthBand populated on every link ───────────────────────
const missingBand = BIOPHOTON_LINKS.filter(
  l => !l.wavelengthBand || l.wavelengthBand.trim().length === 0
).map(l => `${l.sourceOrganelleId}→${l.targetOrganelleId}`);

assert.equal(
  missingBand.length,
  0,
  `Every biophoton link must define wavelengthBand (BIOPHOTON_RESEARCH.md §13 D4). Missing on: ${missingBand.join(", ")}`
);

// ── Assertion 4: couplingSigma within confidence-tier bounds ─────────────────
for (const l of BIOPHOTON_LINKS) {
  const id = `${l.sourceOrganelleId}→${l.targetOrganelleId}`;
  const sigma = l.couplingSigma as number;
  assert.ok(
    Number.isFinite(sigma),
    `${id} has non-numeric couplingSigma: ${String(sigma)}`
  );
  const bounds = SIGMA_BOUNDS[l.confidence as Confidence];
  assert.ok(
    sigma >= bounds.min && sigma <= bounds.max,
    `${id} (${l.confidence}) has couplingSigma=${sigma} outside tier range [${bounds.min}, ${bounds.max}]. ` +
    `See BIOPHOTON_RESEARCH.md §9.4 for calibration rules.`
  );
}

console.log(
  "✓ Biophoton integrity: 18 links · P1–P7 tuples present · wavelengthBand complete · σ tiers valid"
);
