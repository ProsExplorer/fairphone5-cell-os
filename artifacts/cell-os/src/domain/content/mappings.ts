import type { OrganelleSubstrateLink, TriadPhase, BiophotonLink } from "@/domain/types";

/**
 * The cross-link between the cell metaphor and the real AI substrate. Defined
 * once, in one direction; both forward and reverse lookups are derived from it
 * by the explorer's selectors. A single source keeps the two views coherent.
 */
export const ORGANELLE_SUBSTRATE_LINKS: OrganelleSubstrateLink[] = [
  { organelleId: "nucleus", substrateId: "qcm6490" },
  { organelleId: "nucleus", substrateId: "kryo670" },
  { organelleId: "cytoskeleton", substrateId: "kryo670" },
  { organelleId: "cytoskeleton", substrateId: "adreno643" },
  { organelleId: "endoplasmic-reticulum", substrateId: "adreno643" },
  { organelleId: "ribosomes", substrateId: "hexagon770" },
  { organelleId: "mitochondria", substrateId: "hexagon770" },
  { organelleId: "mitochondria", substrateId: "power" },
  { organelleId: "cell-membrane", substrateId: "power" },
  { organelleId: "cytoplasm", substrateId: "lpddr4x" },
  { organelleId: "nuclear-pores", substrateId: "nnapi" },
  { organelleId: "vesicles", substrateId: "nnapi" },
  { organelleId: "golgi-apparatus", substrateId: "nnapi" },
  { organelleId: "dna", substrateId: "quantization" },

  // ── Tensor-completion additions (MANIFOLD_ANALYSIS.md §11.2) ────────────────
  // These five links complete the four previously unlinked organelles.
  // relevance scores are manifold-derived (substrate affinity analysis).
  {
    organelleId: "nucleolus",
    substrateId: "hexagon770",
    description: "The nucleolus pre-assembles ribosomal machinery through dense, repetitive rRNA synthesis — in Cell OS this maps to boot-time preparation of Hexagon tensor paths for sustained matrix work.",
    rateRange: "INT8 primary · up to 12 TOPS (indicative)",
    relevance: 0.93
  },
  {
    organelleId: "nucleolus",
    substrateId: "quantization",
    description: "Ribosome assembly compresses genomic complexity into executable units; analogously, quantization packs full-precision weights into deployable tiers, trading fidelity for throughput.",
    rateRange: "FP32 → INT4 packing cascade",
    relevance: 0.89
  },
  {
    organelleId: "membrane-receptors",
    substrateId: "nnapi",
    description: "Receptors classify incoming signals before intracellular cascades fire; NNAPI / QNN likewise classifies graph operations and dispatches each to the correct execution unit — CPU, GPU, or Hexagon.",
    rateRange: "Graph partition at compile / first-run",
    relevance: 0.94
  },
  {
    organelleId: "lysosomes",
    substrateId: "nnapi",
    description: "Lysosomes clear obsolete cellular cargo through selective degradation; the dispatch layer evicts stale compiled graphs and reallocates delegate slots during model lifecycle turnover.",
    rateRange: "Delegate / compiled-graph eviction cycle",
    relevance: 0.82
  },
  {
    organelleId: "vacuole",
    substrateId: "power",
    description: "Vacuolar pressure regulates the cell's osmotic balance and storage; sustained file-system I/O and memory pressure directly reshape the SoC's thermal and power envelope.",
    rateRange: "~3–5W sustained I/O envelope (indicative)",
    relevance: 0.78
  }
];

/**
 * Biophoton inter-organelle communication links.
 *
 * Living cells emit ultra-weak coherent light — documented in peer-reviewed
 * biophysics literature (Popp et al., 1974–2010). These links represent
 * proposed or observed biophoton signaling pathways between organelle pairs.
 * Confidence is "indicative" (emerging research) or "unconfirmed" (proposed).
 *
 * Source: Fritz-Albert Popp, "Biophotons — The Light in Our Cells", 2003;
 *         general biophysics literature.
 */
export const BIOPHOTON_LINKS: BiophotonLink[] = [
  {
    sourceOrganelleId: "nucleus",
    targetOrganelleId: "mitochondria",
    description: "Ultra-weak photon emission may coordinate energy-state signaling between nucleus and mitochondria — the cell's two most information-dense structures.",
    rateRange: "10–100 photons/cm²/s",
    confidence: "indicative"
  },
  {
    sourceOrganelleId: "nucleus",
    targetOrganelleId: "ribosomes",
    description: "Biophoton coherence has been proposed as a coordination signal across active transcription sites and ribosomal translation clusters.",
    rateRange: "1–50 photons/cm²/s",
    confidence: "indicative"
  },
  {
    sourceOrganelleId: "endoplasmic-reticulum",
    targetOrganelleId: "golgi-apparatus",
    description: "The protein-trafficking pathway from ER to Golgi may involve biophoton bursts during vesicle budding events.",
    rateRange: "1–30 photons/cm²/s",
    confidence: "unconfirmed"
  },
  {
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "nuclear-pores",
    description: "Mitochondrial membrane potential changes produce detectable biophoton bursts; nuclear pores may respond to the optical gradient.",
    rateRange: "5–80 photons/cm²/s",
    confidence: "indicative"
  },

  // ── Attention-map completion additions (MANIFOLD_ANALYSIS.md §11.5) ──────────
  // Pattern: all biophoton links are cross-zone. Both additions maintain this.
  {
    sourceOrganelleId: "ribosomes",
    targetOrganelleId: "golgi-apparatus",
    description: "Translation pulses in ribosomes may entrain Golgi packaging cadence — the mRNA-to-vesicle coherence pathway mirrored by the runtime-to-dispatch flow in on-device inference.",
    rateRange: "2–40 photons/cm²/s",
    confidence: "unconfirmed",
    attentionWeight: 0.62
  },
  {
    sourceOrganelleId: "dna",
    targetOrganelleId: "ribosomes",
    description: "Genome-origin coherence guiding ribosomal translation forms the transcription loop — the instruction stream to execution engine, closing the expression cycle.",
    rateRange: "1–45 photons/cm²/s",
    confidence: "unconfirmed",
    attentionWeight: 0.58
  }
];

/**
 * The triadic flow that the manifesto describes and that this app is built
 * around: signals are perceived, processed, then expressed. The same shape
 * recurs in the diagram's code, in the living cell, and in the phone's AI
 * pipeline — one pattern at three scales.
 */
export const TRIAD_PHASES: TriadPhase[] = [
  {
    id: "perception",
    glyph: "門",
    title: "Perception",
    gate: "The door — what is allowed in",
    codeRole: "Typed inputs and event handlers receive a signal at the edge.",
    cellRole: "Membrane receptors and nuclear pores admit what may enter.",
    chipRole: "Sensors and the NNAPI entry point accept a unit of work."
  },
  {
    id: "affect",
    glyph: "室",
    title: "Affect",
    gate: "The room — where work happens",
    codeRole: "Pure functions derive new state in one open space, without tangled branches.",
    cellRole: "The cytoplasm and organelles transform what was received.",
    chipRole: "The CPU, GPU, and Hexagon compute the result."
  },
  {
    id: "expression",
    glyph: "窗",
    title: "Expression",
    gate: "The window — what flows back out",
    codeRole: "Results leave through clear outputs and callbacks, never trapped.",
    cellRole: "Vesicles and the Golgi package and ship products outward.",
    chipRole: "The result returns to the app and onto the screen."
  }
];
