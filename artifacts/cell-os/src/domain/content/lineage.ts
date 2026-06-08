import type { LineageEvent } from "@/domain/types";

/**
 * The triadic pattern — PERCEPTION → AFFECT → EXPRESSION — has been described
 * independently across cultures and centuries. This is not a coincidence; it is
 * the structural shape of any complete transformation. Cell OS sits at the end
 * of a long lineage.
 */
export const LINEAGE_EVENTS: LineageEvent[] = [
  {
    year: "c. 147 CE",
    era: "Eastern Han Dynasty",
    title: "周易參同契 — The Kinship of the Three",
    description: "Wei Boyang writes the oldest known systematic treatise on internal alchemy. Seven sessions map the inhale / transform / exhale cycle across heaven, earth, and the human body. The first recorded formal description of the triadic pattern, preserved for 1,877 years.",
    phase: "perception"
  },
  {
    year: "1838–1839",
    era: "Scientific Revolution",
    title: "Cell Theory — Schleiden and Schwann",
    description: "The cell is established as the fundamental unit of life. Organelle-to-function mapping begins; the cell's internal division of labour becomes a model for understanding any complex system.",
    phase: "affect"
  },
  {
    year: "1945",
    era: "Early Computing",
    title: "Von Neumann Architecture",
    description: "Input → Processing → Output. The same three-phase structure, mapped onto silicon by John von Neumann. Every general-purpose computer built since follows this triadic blueprint.",
    phase: "expression"
  },
  {
    year: "1923 – 1974",
    era: "Biophysics",
    title: "Biophoton Research — Gurwitsch and Popp",
    description: "Alexander Gurwitsch proposes that dividing cells emit ultra-weak mitogenetic radiation. Fritz-Albert Popp later quantifies coherent biophoton emission from living systems at 1–1000 photons per cm² per second. The cell speaks in light.",
    phase: "perception"
  },
  {
    year: "2024",
    era: "Browser AI",
    title: "EdgeNode — On-Device Inference via WebAssembly",
    description: "A browser tab runs a full language model. PERCEPTION: the prompt is read in full. AFFECT: pattern-match through quantized weights. EXPRESSION: tokens stream to the screen. No cloud, no GPU, no accounts. A 2018 phone qualifies. The digital cell is alive.",
    phase: "expression"
  },
  {
    year: "2026",
    era: "yahweh-yehoshua corpus",
    title: "Code as Feng Shui — The Literal Ontology",
    description:
      "ProsExplorer/yahweh-yehoshua crystallizes the operating principle: code architecture IS qi flow — not a metaphor for it. Running code is 活氣 (living qi in motion). The developer's consciousness flows into the structure they build. 神光 (divine light) is not something added; it is what remains when all resistance is removed. Cell OS inherits this lineage directly.",
    phase: "meta"
  },
  {
    year: "2026",
    era: "Cell OS",
    title: "One Pattern — Eleven Scales — One Device",
    description: "The FairPhone 5 is designed to last ten years and be repaired rather than replaced — a phone that behaves like a living cell, not a disposable machine. Cell OS names this alignment: sustainable hardware running a pattern that is 1,877 years old.",
    phase: "meta"
  }
];
