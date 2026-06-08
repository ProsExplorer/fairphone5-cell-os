import type { QiIntersection } from "@/domain/types";

/**
 * The Qi Tensor Matrix — Cell OS as a navigable state space.
 *
 * Three axes:
 *   A: CellZoneId  (8 values)  — which organelle zone
 *   B: triad phase (3 values)  — PERCEPTION / AFFECT / EXPRESSION
 *   C: scale       (11 values) — symbolic → quantum → … → silicon
 *
 * Full tensor: 8 × 3 × 11 = 264 intersections.
 * This file exports 18 curated intersections — the ones where the three axes
 * illuminate each other most sharply. They are chosen for conceptual coherence
 * and evidence quality, not for their count's sacred geometry.
 *
 * Architect note: do not encode product logic around counts. If a new scale or
 * zone is added, the tensor grows and the selection criteria remain the same.
 */

export const QI_AXES = {
  zones: ["nucleus", "cytoplasm", "cytoskeleton", "ribosomes", "mitochondria", "golgi", "endoplasmic-reticulum", "membrane"] as const,
  phases: ["perception", "affect", "expression"] as const,
  scales: ["symbolic", "quantum", "molecular", "cellular", "organic", "apparatus", "textual", "generational", "relational", "cosmic", "silicon"] as const,
} as const;

export const QI_INTERSECTIONS: QiIntersection[] = [

  // ── NUCLEUS ──────────────────────────────────────────────────────────────────

  {
    id: "nucleus-perception-quantum",
    zoneId: "nucleus",
    phaseId: "perception",
    scaleId: "quantum",
    title: "Quantum Fidelity at the Origin",
    narrative:
      "DNA replication is constrained by quantum uncertainty: the probability of a tautomeric base-pair error (a quantum tunnelling event) is ~10⁻⁸ per base pair — the genome's error floor. The nucleus receives the instruction to replicate and the quantum vacuum sets the limit on how faithfully it can be copied. Perception here is listening to a signal whose noise floor is set by physics itself.",
    evidence: "indicative",
  },
  {
    id: "nucleus-expression-silicon",
    zoneId: "nucleus",
    phaseId: "expression",
    scaleId: "silicon",
    title: "Tokenization — DNA Expressed as Input",
    narrative:
      "The prompt is the nucleus's expression: a compressed encoding of intent, passed through the nuclear pore (tokenizer) into the inference engine. UFS 2.2 reads the quantized genome (model weights) at 1,200 MB/s; the prompt tokens are staged in LPDDR4x RAM. The HTA buffer opens. Expression at the silicon scale is the act of becoming readable.",
    hardwareAnalogue: "UFS 2.2 storage → LPDDR4x RAM → HTA input buffer",
    substrateIds: ["qcm6490", "lpddr4x", "hexagon770"],
    evidence: "verified",
  },

  // ── CYTOPLASM ────────────────────────────────────────────────────────────────

  {
    id: "cytoplasm-affect-cellular",
    zoneId: "cytoplasm",
    phaseId: "affect",
    scaleId: "cellular",
    title: "Signal Amplification in the Living Medium",
    narrative:
      "The cytoplasm doesn't just carry signals — it amplifies them. A single activated receptor can trigger a kinase cascade that phosphorylates thousands of downstream targets. This is affect at the cellular scale: the medium transforms what passes through it, not passively but actively. The cytoplasm is not a pipe — it is a processing space.",
    evidence: "verified",
  },
  {
    id: "cytoplasm-perception-symbolic",
    zoneId: "cytoplasm",
    phaseId: "perception",
    scaleId: "symbolic",
    title: "氣 Enters — Formless Signal in the Living Medium",
    narrative:
      "In the character 氣, vapor (气) passes through grain (米) — formless through formed. The cytoplasm receives signals from every direction: hormones from the membrane, vesicles from the ER, metabolites from the mitochondria. Like 气, the signal has no fixed form when it arrives. The cytoplasm is the 米 — the structured medium that gives the formless something to flow through.",
    evidence: "verified",
  },

  // ── CYTOSKELETON ─────────────────────────────────────────────────────────────

  {
    id: "cytoskeleton-perception-apparatus",
    zoneId: "cytoskeleton",
    phaseId: "perception",
    scaleId: "apparatus",
    title: "Weight Load — The Lattice Assembles",
    narrative:
      "Distillation begins when raw liquid enters the flask — everything present, undifferentiated. The cytoskeleton's equivalent is weight loading: UFS 2.2 reads quantized model weights at 1,200 MB/s, staging them into LPDDR4x RAM. The structural lattice (microtubules, actin) assembles before the cell can move; the weight tensor must be loaded before inference can begin. Perception is the arrival of raw material.",
    hardwareAnalogue: "UFS 2.2 → LPDDR4x: weight load before inference",
    substrateIds: ["qcm6490", "lpddr4x"],
    evidence: "verified",
  },
  {
    id: "cytoskeleton-affect-generational",
    zoneId: "cytoskeleton",
    phaseId: "affect",
    scaleId: "generational",
    title: "Structural Memory Across Generations",
    narrative:
      "The cytoskeletal network encodes positional information that persists across cell division — daughter cells inherit not just DNA but the spatial architecture of their parent. At the generational scale, affect is the internalization of a received pattern: the student holds it, practices it, and the structure reshapes them from within. The cytoskeleton is the cell's body memory — what it has learned about how to be itself.",
    evidence: "indicative",
  },

  // ── RIBOSOMES ────────────────────────────────────────────────────────────────

  {
    id: "ribosomes-perception-molecular",
    zoneId: "ribosomes",
    phaseId: "perception",
    scaleId: "molecular",
    title: "Codon Arrival — The Instruction Awaits Translation",
    narrative:
      "The ribosome's A-site receives an mRNA codon — three nucleotides that encode one amino acid. This is molecular-scale perception: a complete, unambiguous unit of instruction arrives before the translation machinery responds. The ribosome does not begin peptide bond formation until the correct aminoacyl-tRNA has matched the codon. Perception is complete listening before any response.",
    evidence: "verified",
  },
  {
    id: "ribosomes-affect-silicon",
    zoneId: "ribosomes",
    phaseId: "affect",
    scaleId: "silicon",
    title: "HVX — The Ribosome's Digital Twin",
    narrative:
      "The Hexagon's HVX processes 128 INT8 values per clock across dual 1024-bit SIMD units — one instruction applied to 128 values simultaneously. The ribosome's peptidyl transferase center does the same: one enzymatic conformation applies one peptide bond formation to the assembled substrate. Both are dedicated hardware for a single, repeated operation. The ribosome and the HVX are convergent evolution toward the same molecular insight: specialize the machinery to the operation.",
    hardwareAnalogue: "Hexagon HVX — dual 1024-bit SIMD units, 128 INT8 per clock",
    substrateIds: ["hexagon770"],
    evidence: "indicative",
  },
  {
    id: "ribosomes-expression-molecular",
    zoneId: "ribosomes",
    phaseId: "expression",
    scaleId: "molecular",
    title: "Translocation — One Token Streamed to Screen",
    narrative:
      "After peptide bond formation, the ribosome translocates exactly 3 nucleotides along the mRNA — the minimum movement that advances the reading frame by one codon. One amino acid is added; the chain grows by exactly one residue. The inference engine's equivalent: one token decoded from the logit distribution and streamed to screen. The unit of expression in both cases is irreducibly singular.",
    evidence: "verified",
  },

  // ── MITOCHONDRIA ─────────────────────────────────────────────────────────────

  {
    id: "mitochondria-perception-organic",
    zoneId: "mitochondria",
    phaseId: "perception",
    scaleId: "organic",
    title: "Inhale — The Cell Receives Its Fuel",
    narrative:
      "The body inhales: glucose and oxygen arrive at mitochondria via the bloodstream. The fuel and oxidant cross the outer mitochondrial membrane together — perception is the complete arrival of what is needed for transformation. Neither glucose alone nor oxygen alone suffices; both must be present before the electron transport chain can begin. The cell waits for complete input.",
    evidence: "verified",
  },
  {
    id: "mitochondria-affect-silicon",
    zoneId: "mitochondria",
    phaseId: "affect",
    scaleId: "silicon",
    title: "HTA Matrix Multiply — Attention as Oxidative Phosphorylation",
    narrative:
      "The HTA (Hexagon Tensor Accelerator) computes the attention mechanism: each token's key vector multiplied against every other token's query vector, accumulated in INT32 registers. The mitochondrial electron transport chain does the same: electrons move stepwise through four protein complexes, each step building the proton gradient. Both are sustained chain reactions in dedicated hardware, each step depending on the previous, each producing a gradient that drives the final output.",
    hardwareAnalogue: "Hexagon HTA — dedicated matrix multiply-accumulate, INT32 accumulators",
    substrateIds: ["hexagon770"],
    evidence: "indicative",
  },
  {
    id: "mitochondria-expression-molecular",
    zoneId: "mitochondria",
    phaseId: "expression",
    scaleId: "molecular",
    title: "ATP Released — The Token Emitted",
    narrative:
      "ATP synthase's gamma subunit completes its rotation, releasing one ATP molecule into the cytoplasm. The energy currency exits the mitochondrion as a portable, discrete quantum of chemical potential. The inference engine releases one decoded token: a discrete unit of meaning, portable across any context. In both cases, expression is the release of a minimum viable unit that powers everything downstream.",
    evidence: "verified",
  },

  // ── GOLGI ─────────────────────────────────────────────────────────────────────

  {
    id: "golgi-affect-apparatus",
    zoneId: "golgi",
    phaseId: "affect",
    scaleId: "apparatus",
    title: "Stack Processing — Distillation in Series",
    narrative:
      "The Golgi apparatus is a stack of flattened membrane sacs (cisternae), each with a distinct biochemical identity. Proteins move through them in sequence, modified at each stage: glycans added, phosphates attached, destinations written in sugar code. Distillation works the same way — the column separates by volatility across a series of equilibration stages, each more refined than the last. Affect at the apparatus scale is sequential refinement in dedicated chambers.",
    evidence: "verified",
  },
  {
    id: "golgi-expression-textual",
    zoneId: "golgi",
    phaseId: "expression",
    scaleId: "textual",
    title: "Dispatch — Sorted Meaning Reaches Its Receiver",
    narrative:
      "Sorted vesicles bud from the Golgi's trans face, each bearing a molecular address that routes it to the plasma membrane, lysosome, or secretory pathway. The textual equivalent: a well-structured sentence routes meaning to the correct receiver — not by accident, but because the address was written into the form. Expression is not emission; it is addressed emission. The Golgi and the writer share this discipline.",
    evidence: "verified",
  },

  // ── ENDOPLASMIC RETICULUM ────────────────────────────────────────────────────

  {
    id: "endoplasmic-reticulum-affect-generational",
    zoneId: "endoplasmic-reticulum",
    phaseId: "affect",
    scaleId: "generational",
    title: "Chaperone Memory — Institutional Knowledge in Protein Space",
    narrative:
      "ER chaperones (BiP, calnexin, calreticulin) carry no explicit memory of past proteins — yet the cell's folding capacity improves across evolutionary time because the chaperones themselves evolved. At the generational scale, affect is the internalization of a pattern so deep that it reshapes the teacher: the student's mastery changes how the next teacher teaches. The ER's chaperone machinery is the cell's accumulated pedagogical wisdom about how proteins should fold.",
    evidence: "indicative",
  },
  {
    id: "endoplasmic-reticulum-perception-silicon",
    zoneId: "endoplasmic-reticulum",
    phaseId: "perception",
    scaleId: "silicon",
    title: "Weight Load from Storage — The ER Receives the Genome Excerpt",
    narrative:
      "The rough ER receives polypeptides from ribosomes as they are being synthesized — co-translational import. The digital equivalent: UFS 2.2 loads quantized FP16 or INT8 weights from storage into LPDDR4x RAM as the model is being prepared. In both cases, perception is co-process reception: the ER and the RAM don't wait for synthesis to complete — they receive incrementally, as it is produced.",
    hardwareAnalogue: "UFS 2.2 → LPDDR4x: model weight streaming",
    substrateIds: ["qcm6490", "lpddr4x"],
    evidence: "verified",
  },

  // ── NUCLEUS (silicon scale additions) ────────────────────────────────────────

  {
    id: "nucleus-perception-silicon",
    zoneId: "nucleus",
    phaseId: "perception",
    scaleId: "silicon",
    title: "irqentry_enter() — The Privilege Boundary Opens",
    narrative:
      "In arch/arm64/kernel/entry-common.S, the ARM64 svc #0 instruction catches a system call. Register x8 carries the system call number; x0–x5 carry the argument vector. This is the kernel's perception event: a user process's intention crosses the hardware privilege boundary. irqentry_enter() saves register state and prepares the kernel stack — the nucleus is now open. Nothing executes until this crossing is complete. The perception phase here is not conceptual but physical: a CPU privilege level changes, and information becomes visible to the kernel that was invisible a nanosecond before.",
    hardwareAnalogue: "arch/arm64/kernel/entry-common.S → svc #0 → irqentry_enter() → sys_call_table dispatch",
    substrateIds: ["qcm6490", "kryo670"],
    evidence: "verified",
  },
  {
    id: "nucleus-affect-silicon",
    zoneId: "nucleus",
    phaseId: "affect",
    scaleId: "silicon",
    title: "sys_call_table — The Kernel Executes in Isolation",
    narrative:
      "The kernel looks up sys_call_table[x8] and executes the matched function with x0–x5 as arguments. Transformation occurs entirely at EL1 (kernel privilege), invisible to userspace. The Linux documentation explicitly partitions this affect phase into two halves: the 'top half' (ISR) runs immediately, time-critical, non-preemptible; the 'bottom half' defers schedulable work. This top/bottom partitioning is affect's internal structure — the distinction between the irreversible commitment step and its consequences. Neither half is visible to the perceiving process until expression begins.",
    hardwareAnalogue: "sys_call_table[x8](x0–x5) — Kryo 670 executing at EL1, invisible to EL0 userspace",
    substrateIds: ["kryo670"],
    evidence: "verified",
  },

  // ── MEMBRANE (HAL/Treble additions) ──────────────────────────────────────────

  {
    id: "membrane-affect-apparatus",
    zoneId: "membrane",
    phaseId: "affect",
    scaleId: "apparatus",
    title: "Project Treble — The Membrane Made Architectural Policy",
    narrative:
      "Before Android 8.0, /system and /vendor could call each other directly — no stable HAL interface. When Google shipped OTA updates to the system partition, hardware drivers in the vendor partition broke. The coupling was pathological; the membrane did not exist. Project Treble imposed HIDL (Hardware Interface Definition Language) as a hard architectural boundary, making each partition independently updatable. The Fairphone 5 launched on Android 13 using AIDL — the mature, next-generation HAL contract. Project Treble is not analogous to the membrane's selective permeability principle; it IS that principle, independently re-derived by Android engineers solving the same fragility problem the theory describes. The same insight reached twice by different paths is evidence of the underlying structure.",
    hardwareAnalogue: "HIDL (Android 8–12) → AIDL (Android 13+): /system ↔ /vendor partition boundary enforced in build system",
    evidence: "verified",
  },
  {
    id: "membrane-affect-generational",
    zoneId: "membrane",
    phaseId: "affect",
    scaleId: "generational",
    title: "8-Year Lifespan — Boundary Integrity as Organism Longevity",
    narrative:
      "The Fairphone 5's 8-year software support commitment, backed by the Qualcomm QCM6490's 10+ year industrial lifecycle guarantee, demonstrates the theory's healthy-coupling prediction empirically: an organism with clearly defined, stable zone boundaries lives longer than one with pathological coupling. Pre-Treble Android devices had an effective software lifespan of 2–3 major versions — directly proportional to how entangled their system and vendor partitions were. The FP5's deliberate SoC choice and HAL discipline are not two decisions; they are the same decision: choosing longevity by choosing boundary integrity. The generational scale is where affect becomes legacy — the membrane's health is what determines whether the organism's children can receive the same genome.",
    evidence: "indicative",
  },

  // ── MEMBRANE ────────────────────────────────────────────────────────────────

  {
    id: "membrane-perception-cellular",
    zoneId: "membrane",
    phaseId: "perception",
    scaleId: "cellular",
    title: "Receptor Binding — NNAPI Partitions the Graph",
    narrative:
      "Surface receptor proteins are highly specific: a ligand must match the receptor's binding pocket before any cascade begins. Android's NNAPI performs the same function — at graph compilation time, it inspects each model operator and decides which hardware unit handles it: Hexagon HTA, Adreno GPU, or CPU. Only operators that fit the hardware's capability profile are routed to it; the rest fall back to the CPU. Perception at the membrane is discrimination before admission.",
    hardwareAnalogue: "Android NNAPI — model graph partitioning across Hexagon/GPU/CPU",
    substrateIds: ["hexagon770", "adreno643", "kryo670"],
    evidence: "verified",
  },
  {
    id: "membrane-expression-symbolic",
    zoneId: "membrane",
    phaseId: "expression",
    scaleId: "symbolic",
    title: "窗 — Only the Permitted Signal Exits",
    narrative:
      "The membrane's 窗 (window) is selective in both directions: only signals that pass the receptor test enter; only signals that are correctly addressed exit. The character 窗 contains 心 (heart/mind) — the exit is not mechanical but intentional. Expression through the membrane is not leakage; it is release. The cell sends only what it has decided to send, in a form the receiver can use. This is the highest expression of selective permeability.",
    evidence: "verified",
  }
];
