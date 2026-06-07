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
    id: "cosmic",
    scale: "Cosmic",
    glyph: "宇宙",
    description: "The universe itself may breathe — expansion, the long pause at maximum entropy, then contraction or renewal.",
    perception: "Expansion — spacetime stretches; every point moves away from every other; the universe inhales.",
    affect: "Maximum entropy approaches — the long pause at the horizon of what can be distinguished from background.",
    expression: "Renewal — whether collapse, heat death, or next cycle, the pattern does not end; it rests before beginning again.",
    confidence: "indicative"
  }
];
