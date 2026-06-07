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
