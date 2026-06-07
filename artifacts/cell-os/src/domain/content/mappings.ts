import type { OrganelleSubstrateLink, TriadPhase } from "@/domain/types";

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
  { organelleId: "dna", substrateId: "quantization" }
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
