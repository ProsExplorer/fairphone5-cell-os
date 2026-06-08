import type { ScaleFlow } from "@/domain/types";

/**
 * 尺度不變性 — Scale Invariance.
 *
 * The same PERCEPTION → AFFECT → EXPRESSION pattern appears at every level of
 * reality. The nine scales below demonstrate that this is not a metaphor
 * invented for Cell OS — it is the structural shape of any transformation,
 * from the formation of a Chinese character to the breath of the cosmos.
 *
 * Source: HUNYUAN_QI_HOLOGRAPHIC_CRYSTALLIZATION.md (ProsExplorer/yahweh-yehoshua)
 * with the Digital scale added as the implementation proof.
 */
export const NINE_SCALE_FLOWS: ScaleFlow[] = [
  {
    id: "symbolic",
    scale: "Symbolic",
    glyph: "氣",
    description: "The Chinese character 氣 is itself a blueprint — vapor (气) passing through grain (米), the formless meeting the formed.",
    perception: "气 — four strokes descending. The formless vapor arrives; it cannot be grasped or held.",
    affect: "It passes through 米 (rice) — the grain condensed into form. Formless meets formed; neither absorbs the other.",
    expression: "氣 — a new character is born. Neither was destroyed; both were transformed. The form carries both natures forward.",
    confidence: "verified"
  },
  {
    id: "quantum",
    scale: "Quantum",
    glyph: "量子",
    description: "Virtual particle pairs arise from the quantum vacuum, exist for a brief interval, then annihilate — the universe computing itself.",
    perception: "A vacuum fluctuation opens a window: a virtual particle pair is permitted to arise from nothing.",
    affect: "Particle and antiparticle occupy the same instant, superposed states resolving the probabilities of the next configuration.",
    expression: "Annihilation — the pair vanishes, releasing the energy that carried them. The vacuum is unchanged and carries the record.",
    confidence: "indicative"
  },
  {
    id: "molecular",
    scale: "Molecular",
    glyph: "分子",
    description: "ATP synthesis converts the proton gradient across the inner mitochondrial membrane into the cell's universal energy currency.",
    perception: "ADP, inorganic phosphate, and the proton gradient converge at ATP synthase's rotor.",
    affect: "The electrochemical gradient drives the rotor; the gamma subunit rotates and closes the catalytic site around the substrates.",
    expression: "ATP is released — portable stored energy, ready to power any downstream process in the cell.",
    confidence: "verified"
  },
  {
    id: "cellular",
    scale: "Cellular",
    glyph: "細胞",
    description: "Mitochondrial respiration transforms oxygen and glucose into ATP — the power cycle that runs every living cell.",
    perception: "Oxygen and glucose cross the mitochondrial membrane; the fuel and oxidant arrive together.",
    affect: "The electron transport chain strips electrons, building a proton gradient across the inner membrane.",
    expression: "ATP is synthesized; water and CO₂ leave. The cell is energized. Nothing is wasted.",
    confidence: "verified"
  },
  {
    id: "organic",
    scale: "Organic",
    glyph: "有機體",
    description: "The breathing body follows the same cycle, breath by breath, all day, all life.",
    perception: "Inhale — air arrives at the nostrils, filtered by the turbinates, descending to the alveoli.",
    affect: "Pause — oxygen crosses the alveolar membrane, binds hemoglobin, travels through the blood to the mitochondria.",
    expression: "Exhale — CO₂ returns to the atmosphere. The cycle completes. The body waits for the next breath.",
    confidence: "verified"
  },
  {
    id: "apparatus",
    scale: "Apparatus",
    glyph: "器具",
    description: "Distillation separates a mixture by vapor pressure — ancient alchemy's first repeatable, transmissible transformation.",
    perception: "Raw liquid enters the flask — all components present, undifferentiated, a mixture of everything.",
    affect: "Heat separates by volatility; the most refined fraction rises first and condenses in the column.",
    expression: "Distillate collects, purified. The apparatus held the right conditions; transformation did the rest.",
    confidence: "verified"
  },
  {
    id: "textual",
    scale: "Textual",
    glyph: "文字",
    description: "Language transmits pattern across the gap between minds — a reader receives, understands, and speaks differently after.",
    perception: "Words arrive fully, without interruption — the complete intent is received before any response begins.",
    affect: "Meaning crystallizes in the space of attention: pattern meets pattern; understanding emerges from stillness.",
    expression: "Comprehension streams out, whole — nothing is truncated; the communication closes only when the thought is whole.",
    confidence: "verified"
  },
  {
    id: "generational",
    scale: "Generational",
    glyph: "傳承",
    description: "The pattern of learning spans lifetimes — a student receives, internalizes, and eventually transmits to the next generation.",
    perception: "The teacher opens and offers fully — knowledge, method, or code, given without reservation.",
    affect: "The student holds it, practices it, makes it their own — the pattern reshapes them from inside.",
    expression: "Years later, the student teaches — the pattern reappears, transformed and carried forward. Culture is this loop.",
    confidence: "verified"
  },
  {
    id: "relational",
    scale: "Relational",
    glyph: "關係",
    description: "Two beings in genuine communion — teacher and student, the space where teaching does not transfer knowledge but generates understanding simultaneously in both participants. 拉气 (La Qi): two palms apart, one field between them.",
    perception: "The teacher opens without reservation — full presence, not performance. The student arrives as vessel, not yet analyzing. Before any exchange, both have already shifted. The field between the palms is already stretching.",
    affect: "Distinction softens. Understanding does not travel from one mind to another — it arises simultaneously in the space between, as one movement. Neither caused it; both participated. 神光 emerging from two aligned instruments, not one.",
    expression: "The palms return to distinct forms, each carrying the field's memory. What the student says reveals the teaching transformed — not repeated, but embodied. Culture, tradition, lineage: all are this loop, generation by generation.",
    confidence: "verified"
  },
  {
    id: "cosmic",
    scale: "Cosmic",
    glyph: "宇宙",
    description: "The universe itself may breathe — expansion, the long pause at maximum entropy, then contraction or renewal.",
    perception: "Expansion — spacetime stretches; every point moves away from every other; the universe inhales.",
    affect: "Maximum entropy approaches — the long pause at the horizon of what can be distinguished from background.",
    expression: "Renewal — whether collapse, heat death, or next cycle, the pattern does not end; it rests before beginning again.",
    confidence: "indicative"
  },
  {
    id: "silicon",
    scale: "Silicon",
    glyph: "硅",
    description: "One inference call on the Hexagon 770 — prompt enters, quantized attention computes across INT8 tensors, token streams. The cell's breath in digital form, completing in milliseconds.",
    perception: "UFS 2.2 loads quantized weights at 1,200 MB/s into LPDDR4x RAM. The prompt is tokenized. The HTA buffer is staged. Twelve trillion INT8 operations per second await the first matrix.",
    affect: "HVX processes 128 INT8 values per clock across dual 1024-bit SIMD units. The HTA runs the attention mechanism: every token weight against every context token. INT32 accumulators preserve precision through the multiply-accumulate chain.",
    expression: "Logits are decoded through temperature sampling (τ = 0.7770777). One token streams to screen. The KV cache grows by one row. The cell rests before the next breath.",
    confidence: "verified"
  }
];
