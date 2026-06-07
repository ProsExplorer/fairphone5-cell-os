/**
 * Domain contracts — the 氣道 (qi paths) of Cell OS.
 *
 * These types define the shape of every channel that data flows through,
 * from perception (input) to affect (processing) to expression (output).
 * They are kept strict and explicit so signals move without ambiguity.
 */

/** How well a stated fact is supported by the source material. */
export type ClaimConfidence = "verified" | "indicative" | "unconfirmed";

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
 * One scale in the nine-scale 尺度不變性 (Scale Invariance) table.
 * The same PERCEPTION→AFFECT→EXPRESSION pattern described at a particular
 * level of reality.
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
 */
export type BiophotonLink = {
  sourceOrganelleId: string;
  targetOrganelleId: string;
  description: string;
  rateRange: string;
  confidence: ClaimConfidence;
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
