/**
 * Domain contracts — the 氣道 (qi paths) of Cell OS.
 *
 * These types define the shape of every channel that data flows through,
 * from perception (input) to affect (processing) to expression (output).
 * They are kept strict and explicit so signals move without ambiguity.
 */

/** How well a stated fact is supported by the source material. */
export type ClaimConfidence = "verified" | "indicative" | "unconfirmed" | "speculative";

/**
 * The eight cellular zone identifiers — canonical axis A of the qi tensor.
 * Defined here in the domain layer so features, content, and UI can all
 * import from one source without circular dependencies.
 */
export type CellZoneId =
  | "nucleus"
  | "cytoplasm"
  | "cytoskeleton"
  | "ribosomes"
  | "mitochondria"
  | "golgi"
  | "endoplasmic-reticulum"
  | "membrane";

/** A biological structure mapped to an operating-system feature. */
export type Organelle = {
  id: string;
  name: string;
  osFeature: string;
  explanation: string;
  analogy: string;
  color: string;
};

/** One labelled fact about a piece of hardware or software. */
export type SpecRow = {
  label: string;
  value: string;
  confidence?: ClaimConfidence;
};

export type SubstrateCategory = "soc" | "compute" | "memory" | "stack" | "format";

/** A node in the FairPhone 5 AI substrate (a chip, bus, or software layer). */
export type SubstrateNode = {
  id: string;
  name: string;
  category: SubstrateCategory;
  role: string;
  detail: string;
  specs: SpecRow[];
  confidence: ClaimConfidence;
  color: string;
};

/** A directed link from an organelle to a substrate node. */
export type OrganelleSubstrateLink = {
  organelleId: string;
  substrateId: string;
  /** Human-readable explanation of why this organelle maps to this substrate. */
  description?: string;
  /** Representative rate, precision range, or throughput descriptor for this link. */
  rateRange?: string;
  /**
   * Manifold-derived relevance score (0–1) for this link.
   * 1.0 = primary/canonical mapping; lower values indicate weaker or derived mappings.
   * Derived from the tensor completion analysis in MANIFOLD_ANALYSIS.md §11.2.
   */
  relevance?: number;
};

/** One sub-unit inside a larger compute block (e.g. the Hexagon's four engines). */
export type SubUnit = {
  name: string;
  detail: string;
  confidence: ClaimConfidence;
};

/** One layer of the Android NNAPI / QNN software stack. */
export type StackLayer = {
  id: string;
  name: string;
  detail: string;
};

/** One numeric precision format used for model weights. */
export type QuantFormat = {
  format: string;
  bitsPerWeight: string;
  modelSize1B: string;
  hardwarePath: string;
};

/** A software-licence row. */
export type Licence = {
  component: string;
  licence: string;
  notes: string;
};

/** One phase of the perception -> affect -> expression flow. */
export type TriadPhase = {
  id: "perception" | "affect" | "expression";
  glyph: string;
  title: string;
  gate: string;
  codeRole: string;
  cellRole: string;
  chipRole: string;
};

/**
 * One scale in the eleven-scale 尺度不變性 (Scale Invariance) table.
 * The same PERCEPTION→AFFECT→EXPRESSION pattern described at a particular
 * level of reality — from symbolic to silicon.
 */
export type ScaleFlow = {
  id: string;
  scale: string;
  glyph: string;
  description: string;
  perception: string;
  affect: string;
  expression: string;
  confidence: ClaimConfidence;
};

/**
 * A documented or proposed biophoton communication link between two organelles.
 * Ultra-weak photon emission (1–1000 photons/cm²/s) from living cells is an
 * emerging biophysics research area.
 *
 * attentionWeight (0–1): the relative coherence strength of this link,
 * interpreted as an analogue of the attention mechanism in transformer inference.
 * This framing is interpretive, not empirically measured.
 *
 * ipcMechanism: the Android IPC mechanism that most closely mirrors this
 * biophoton link's coupling strength and dispatch pattern, grounded in the
 * Fairphone 5 source (FP5_MANIFOLD_COMPARISON.md §3). Each mechanism carries
 * a documented σ coupling value: Binder=0.9, Messenger=0.7, ordered=0.6, unordered=0.4.
 *
 * couplingSigma: the quantitative coupling strength from FP5 §3 (0–1).
 * Distinct from the rateRange-derived proxy weight — this is the Android-IPC-
 * grounded value, not the biophysical midpoint proxy.
 *
 * hubService: the Android service or kernel node that mediates this link
 * (e.g., "ServiceManager" — the index-2 maximum through which all Binder
 * connections are brokered, per MANIFOLD_ANALYSIS.md §1.3).
 */
export type BiophotonLink = {
  sourceOrganelleId: string;
  targetOrganelleId: string;
  description: string;
  rateRange: string;
  confidence: ClaimConfidence;
  /**
   * The spectral band of photon emission for this pathway, derived from
   * BIOPHOTON_RESEARCH.md §4–§5. Guides downstream spectral rendering.
   * UV=200–380nm, blue-green=400–550nm, red=570–670nm, NIR=700–900nm, deep-NIR=900–1400nm.
   */
  wavelengthBand?: "UV" | "blue-green" | "red" | "NIR" | "deep-NIR";
  attentionWeight?: number;
  ipcMechanism?: "binder" | "messenger" | "ordered-broadcast" | "unordered-broadcast";
  couplingSigma?: number;
  hubService?: string;
};

/** One event in the deep lineage timeline of the triadic pattern. */
export type LineageEvent = {
  year: string;
  era: string;
  title: string;
  description: string;
  phase: "perception" | "affect" | "expression" | "meta";
};

/** One factual row about the EdgeNode browser LLM. */
export type EdgeNodeFact = {
  label: string;
  value: string;
  detail: string;
  confidence: ClaimConfidence;
};

// ─── Quantization Biology ─────────────────────────────────────────────────────

/**
 * One level in the precision cascade that maps hardware quantization formats
 * to their biological analogues. FP32→INT4 is a 4-step compression where each
 * step halves the bytes per weight — mirroring how the cell progressively
 * compresses information from genome (FP32) to the minimum viable energy
 * packet (INT4 / ATP).
 */
export type QuantizationLayer = {
  id: string;
  format: "FP32" | "FP16" | "INT8" | "INT4";
  bitsPerWeight: number;
  bytesPerWeight: number;
  model1BSize: string;
  biologicalAnalogue: string;
  biologicalZone: CellZoneId;
  aiStage: string;
  hardwareUnit: string;
  compressionRatio: number;
  metabolicCost: "maximum" | "high" | "efficient" | "minimal";
  confidence: ClaimConfidence;
  glyph: string;
  color: string;
  note?: string;
};

// ─── Qi Matrix ────────────────────────────────────────────────────────────────

/**
 * One intersection in the 3-axis qi tensor:
 *   A (zone, 8) × B (triad phase, 3) × C (scale, 11) = 264 cells.
 *
 * QI_INTERSECTIONS contains curated high-signal intersections — the ones
 * where the three axes illuminate each other most clearly.
 * Current count: 39 of 264 (≈ 14.8%). Do not encode product logic around counts.
 */
export type QiIntersection = {
  id: string;
  zoneId: CellZoneId;
  phaseId: "perception" | "affect" | "expression";
  scaleId: string;
  title: string;
  narrative: string;
  hardwareAnalogue?: string;
  substrateIds?: string[];
  evidence: ClaimConfidence;
};

// ─── Fractal Cycles ───────────────────────────────────────────────────────────

/**
 * One triadic phase within a zone's internal P→A→E cycle.
 * Maximum navigator depth is 2 (zone → phase → scale narrative) to prevent UI regress.
 */
export type FractalPhase = {
  id: "perception" | "affect" | "expression";
  title: string;
  description: string;
  scaleLabel: string;
  hardwareAnalogue?: string;
};

export type FractalCycle = {
  zoneId: CellZoneId;
  cycleTitle: string;
  cycleDescription: string;
  phases: readonly [FractalPhase, FractalPhase, FractalPhase];
};

// ─── Bioplasma Pathways ──────────────────────────────────────────────────────

/**
 * Classification of how literally plasma physics criteria apply
 * to the biological medium.
 */
export type PlasmaLiteralness =
  | "literal-quasi-plasma"     // BP1: membrane sheath (genuine charge separation)
  | "electrolyte-analogy"      // BP2, BP3, BP7: structured ion flux
  | "field-coherence-analogy"; // BP4, BP5, BP6, BP8, BP9: EM field coupling

/** Evidence-calibrated confidence tiers for bioplasma phenomena. */
export type BioplasmaStatus =
  | "verified"    // σ ≥ 0.75: established electrophysiology
  | "indicative"  // 0.50–0.75: replicated in-vivo/in-vitro results
  | "speculative" // 0.30–0.50: theoretical models with limited data
  | "reserved";   // < 0.30: architectural placeholder, no runtime implementation

/**
 * A bioplasma pathway (BP1–BP9) representing an endogenous electric
 * or electromagnetic field interaction and its LineageOS software analogue.
 *
 * Source of truth for σ values: BIOPLASMA_RESEARCH.md.
 * Source of truth for lineageosPath: LineageOSv2_Manifold.md §5.
 *
 * Invariants enforced at runtime:
 *   - status === "reserved" → bioplasmaSignal() returns early (BP8)
 *   - organelleRoute.direction === "readonly" → never drives routing (BP9)
 */
export interface BioplasmaPathway {
  code: "BP1" | "BP2" | "BP3" | "BP4" | "BP5" | "BP6" | "BP7" | "BP8" | "BP9";
  sigma: number;
  status: BioplasmaStatus;
  carrier: string;
  frequencyRange: string;
  plasmaLiteralness: PlasmaLiteralness;
  lineageosPath: string | null;
  organelleRoute: {
    source: string;
    target: string;
    direction: "inward" | "outward" | "bidirectional" | "broadcast" | "readonly";
  };
  ipcAnalogue: string;
  isMetaphor: boolean;
}
