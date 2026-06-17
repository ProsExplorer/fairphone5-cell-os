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
 * This file exports curated intersections — the ones where the three axes
 * illuminate each other most sharply. They are chosen for conceptual coherence
 * and evidence quality, not for their count's sacred geometry.
 * Current count: 36 of 264 (≈ 13.6%). Do not encode product logic around counts.
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

  // ── MITOCHONDRIA (biophoton quantum addition — BIOPHOTON_RESEARCH.md §13) ──────

  {
    id: "mitochondria-perception-quantum",
    zoneId: "mitochondria",
    phaseId: "perception",
    scaleId: "quantum",
    title: "ROS Photon Readout — Quantum Perception of Energy State",
    narrative:
      "Mitochondria are the cell's dominant ultra-weak photon emitters, with reported emission in the 570–670 nm band and intensities spanning roughly 10–1000 photons/cm²/s (Verified). At Complex I and III, reactive oxygen species initiate lipid-peroxidation chain reactions that generate delayed luminescent photon emission. This emission is not decorative noise; it is a quantum-scale readout of oxidative state — the mitochondrion externalizing its own energetic condition as light. Perception here is the cell sensing its own energy budget at the lowest measurable quantum granularity, before any downstream signaling cascade begins.",
    hardwareAnalogue: "PowerHAL thermal/power state sensing at SoC energy-floor granularity",
    substrateIds: ["powerhal"],
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

  // ── NUCLEUS (biophoton quantum addition — BIOPHOTON_RESEARCH.md §13) ────────────

  {
    id: "nucleus-affect-quantum",
    zoneId: "nucleus",
    phaseId: "affect",
    scaleId: "quantum",
    title: "Tautomeric Processing — Genome Affected by Quantum Uncertainty",
    narrative:
      "DNA base-pair tautomerization (keto↔enol, amino↔imino) is a quantum-tunnelling process with an error floor on the order of 10⁻⁸ per base pair. Recent reports of UV biophoton emission from DNA (200–380 nm, Pietruszka & Marzec 2024) indicate that these quantum transitions are accompanied by measurable photon output. The nucleus is therefore not only receiving stochastic error pressure but being actively shaped by it — while simultaneously emitting UV coherent light as a byproduct of quantum base-pair processing. Affect at this scale is the genome being transformed by quantum uncertainty during information processing, and announcing that transformation through light.",
    hardwareAnalogue: "ART verifier type-error propagation reshaping downstream JIT compilation graph",
    substrateIds: ["art-runtime"],
    evidence: "indicative",
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
  },

  // ── MEMBRANE (biophoton quantum addition — BIOPHOTON_RESEARCH.md §13) ──────────

  {
    id: "membrane-expression-quantum",
    zoneId: "membrane",
    phaseId: "expression",
    scaleId: "quantum",
    title: "Bystander Emission — Quantum State Expressed Across Cell Boundaries",
    narrative:
      "Bystander biophoton signaling demonstrates that cells can transmit state information optically across extracellular space without direct contact (Verified, P3 pathway). Reported visible-band emission (roughly 400–700 nm) can induce downstream epigenetic effects in neighboring cells, implying functional information transfer across the membrane boundary. This is quantum expression: the cell exporting its internal quantum state as coherent light to surrounding receivers. The membrane is the emission interface — the point where intracellular quantum uncertainty becomes intercellular message. Expression at this scale is not leakage; it is a deliberate photonic broadcast across the cell boundary.",
    hardwareAnalogue: "Android unordered broadcast intent crossing process boundaries to all registered receivers",
    substrateIds: ["binder-ipc"],
    evidence: "verified",
  },

  // ── QI Slot Multi-Occupancy Policy ──────────────────────────────────────────
  // The tensor allows multi-occupancy of a zone×phase×scale slot when the two
  // intersections address genuinely distinct biological sub-mechanisms at the same
  // coordinate. Two pre-existing multi-occupied slots:
  //   cytoplasm × affect × cellular — occupied by both "cytoplasm-affect-cellular"
  //     (signal amplification via kinase cascade) and "qi-ups-affect-cellular"
  //     (ubiquitin-proteasome targeted degradation). These are mechanistically
  //     orthogonal: amplification vs. degradation.
  //   membrane × perception × cellular — occupied by both "membrane-perception-cellular"
  //     (NNAPI graph partitioning) and "qi-gapjunction-perception-cellular"
  //     (Binder shared-memory direct channel). These are also mechanistically
  //     orthogonal: discriminative gating vs. direct-pass-through.
  // This is an explicit editorial decision. All three new open-items slots
  // (cytoplasm×affect×apparatus, membrane×affect×silicon,
  //  endoplasmic-reticulum×affect×silicon) are singly occupied.

  // ── Biological Accuracy Roadmap Additions (DEVELOPMENT.md Part 3 H3) ─────────
  // 8 new intersections; post-add running total at that point: 33 of 264 ≈ 12.5% (now 36/13.6% after Phase 1).
  // All field names verified against QiIntersection type in types.ts.

  {
    id: "qi-chromatin-affect-cellular",
    zoneId: "nucleus",
    phaseId: "affect",
    scaleId: "cellular",
    title: "Chromatin Remodeling as Epigenetic Gate",
    narrative:
      "SWI/SNF complexes alter histone-DNA contacts to open or occlude genomic regions — histone H3K4me3 marks active regions, H3K27me3 marks silenced ones. In Android, ART profile-guided compilation (.prof files) opens or closes method JIT-compilation: H3K4me3 = hot method (AOT-compiled), H3K27me3 = interpreted-only method. dex2oat --compiler-filter=speed-profile is the chromatin remodeling complex. Affect at the cellular scale is the decision about which genes are accessible — not expression, but the gating of expression.",
    hardwareAnalogue: "ART profile-guided compilation (.prof files), dex2oat --compiler-filter=speed-profile",
    evidence: "indicative",
  },
  {
    id: "qi-mrna-perception-silicon",
    zoneId: "ribosomes",
    phaseId: "perception",
    scaleId: "silicon",
    title: "mRNA Processing as DEX Pipeline",
    narrative:
      "Pre-mRNA undergoes spliceosome processing (U1/U2/U4/U5/U6 snRNPs remove introns), 5-prime capping (CBC cap-binding complex), and 3-prime polyadenylation (CPSF) before nuclear export — only the processed transcript reaches the ribosome. The DEX pipeline is structurally isomorphic: dex2oat verify stage removes invalid instructions (splicing), D8 desugaring adapts bytecode for the target runtime (exon modification), ART quickening opcodes mark hot paths (5-prime cap). Only processed DEX exits to the runtime. The ribosome perceives the finished transcript; the ribosomal zone perceives the finished DEX.",
    hardwareAnalogue: "dex2oat verify stage, D8 desugaring, ART quickening opcodes",
    evidence: "indicative",
  },
  {
    id: "qi-calcium-affect-molecular",
    zoneId: "endoplasmic-reticulum",
    phaseId: "affect",
    scaleId: "molecular",
    title: "Calcium Signal as Power HAL Second Messenger",
    narrative:
      "IP3R (inositol 1,4,5-trisphosphate receptor) opens ER Ca²⁺ channels → [Ca²⁺]i rises from 100nM to 1μM in milliseconds → calmodulin binds Ca²⁺ → CaM-kinase II cascade activates. SERCA pumps restore ER stores within seconds. In Android: a thermal threshold crossing triggers Power HAL IPower::powerHint() → CPU frequency governor adjusts clocks in milliseconds → downstream services adapt. Both are discrete, fast, reversible second-messenger signals — a molecular-scale affect that resets without lasting structural change.",
    hardwareAnalogue: "Power HAL IPower::powerHint(), CPU frequency governor, thermal zone thresholds",
    evidence: "indicative",
  },
  {
    id: "qi-ups-affect-cellular",
    zoneId: "cytoplasm",
    phaseId: "affect",
    scaleId: "cellular",
    title: "Ubiquitin-Proteasome as PackageManager Targeted Degradation",
    narrative:
      "UBA1 (E1) activates ubiquitin → UBE2D (E2) conjugates → RING/HECT E3 ligase recognizes the specific substrate by its degradation signal (degron) → poly-ubiquitin chain attached → 26S proteasome (19S+20S) unfolds and cleaves that specific target → ubiquitin recycled. Critically: UPS acts on individual proteins with typed recognition — it is not bulk degradation. PackageManager is the correct Android analogue: it recognises a specific APK by package name (E3 degron recognition), executes force-stop or uninstall against exactly that target (26S proteasome cleavage), and frees its storage (ubiquitin recycling). Process-level bulk killing (LMKD) maps to the lysosomal autophagy pathway, not the UPS.",
    hardwareAnalogue: "PackageManager force-stop, pm uninstall, dexopt cleanup",
    evidence: "indicative",
  },
  {
    id: "qi-cellcycle-perception-generational",
    zoneId: "nucleus",
    phaseId: "perception",
    scaleId: "generational",
    title: "Cell Cycle as Android Boot-to-Update Lifecycle",
    narrative:
      "G0 (quiescent, Cyclin D low) = cached background process. G1 (Cyclin D/CDK4 active) = Application.onCreate(). S phase (Cyclin E/CDK2) = asset loading and database init. G2 (Cyclin B/CDK1 building) = idle foreground with memory check. M phase (mitosis, SAC/Mad2 checkpoint) = OTA update and reboot. Checkpoints: p53/p21 DNA damage checkpoint = StrictMode; spindle assembly checkpoint (Mad2 delays anaphase until all chromosomes attached) = ANR watchdog (kills if main thread does not complete within 5 seconds). Perception at the generational scale is the nucleus registering which phase of the lifecycle it is in.",
    hardwareAnalogue: "Application.onCreate(), ActivityManager lifecycle, OTA update pipeline, ANR watchdog (5s timeout)",
    evidence: "indicative",
  },
  {
    id: "qi-apoptosis-expression-organic",
    zoneId: "mitochondria",
    phaseId: "expression",
    scaleId: "organic",
    title: "Apoptosis as Ordered Process Termination",
    narrative:
      "Intrinsic apoptosis: Bcl-2/Bax/Bak family balance tips pro-apoptotic → MOMP (mitochondrial outer membrane permeabilization) → cytochrome c released → Apaf-1 apoptosome forms → caspase-9 activated → caspase-3 executes fragmentation. In Android: oom_score_adj weighting = Bcl-2 family balance. LMKD SIGKILL = cytochrome c release. onStop() → onDestroy() → process exit = caspase cascade. Non-inflammatory: memory freed cleanly, no system crash. Expression at the organic scale is the organism releasing a unit that has served its purpose — cleanly, with signal integrity preserved.",
    hardwareAnalogue: "LMKD SIGKILL, ActivityManager.forceStopPackage(), onStop/onDestroy lifecycle",
    evidence: "indicative",
  },
  {
    id: "qi-gapjunction-perception-cellular",
    zoneId: "membrane",
    phaseId: "perception",
    scaleId: "cellular",
    title: "Gap Junctions as Binder Shared Memory",
    narrative:
      "Connexin-43 (GJA1) hexamers (connexons) align between adjacent cells to form direct aqueous channels. Ions, cAMP, IP3, and small molecules pass directly — no exocytosis/endocytosis intermediary. In Android: ashmem (anonymous shared memory) and memfd create direct memory-mapped channels between processes. The Binder single-copy mmap mechanism (/dev/binder BINDER_MMAP ioctl) is the closest structural homologue: one kernel-side write, two process-side reads, zero intermediate copy. Gap junctions and Binder mmap share the same architectural principle — direct pass-through bypassing the exocytotic default.",
    hardwareAnalogue: "ashmem/memfd, Binder mmap single-copy, /dev/binder BINDER_MMAP ioctl",
    evidence: "indicative",
  },
  {
    id: "qi-ecm-perception-apparatus",
    zoneId: "membrane",
    phaseId: "perception",
    scaleId: "apparatus",
    title: "ECM / Integrin as Sensor HAL Mechanotransduction",
    narrative:
      "α/β integrin heterodimers bind ECM proteins (fibronectin, collagen) → conformational change activates focal adhesion kinase (FAK) and Src → Rho GTPase cascade (RhoA/Rac1/Cdc42) → cytoskeletal reorganization and gene expression changes. ECM stiffness drives mechanotransduction — the physical environment shapes the organism. In Android: SensorManager HAL receives physical environment signals → ContextHub (STM32) processes → adaptive battery, adaptive display, adaptive Wi-Fi respond. The apparatus perceives through its physical attachment to the world.",
    hardwareAnalogue: "SensorManager HAL, ContextHub (STM32), adaptive battery API, LocationManager",
    evidence: "indicative",
  },

  // ── Open Items: #9 Peroxisomes, #13 Membrane Potential, #19 Chaperones ─────────
  // 3 new intersections; running total at that point: 33 of 264 = 12.5% (now 36/13.6% after Phase 1).
  // QI density enters amber-high but all three are biologically grounded (not speculative).

  {
    id: "qi-peroxisome-affect-apparatus",
    zoneId: "cytoplasm",
    phaseId: "affect",
    scaleId: "apparatus",
    title: "Peroxisomal ROS Containment as TEE Cryptographic Enclave",
    narrative:
      "Peroxisomes are single-membrane enclaves that generate H₂O₂ as a metabolic byproduct and immediately destroy it via catalase — the danger is produced and neutralised within the same boundary, never reaching the cytoplasm. This is not incidental containment; it is the peroxisome's principal architectural property. The Keystore/TEE implements the identical principle: ARM TrustZone partitions the SoC into Normal World and Secure World, and cryptographic key operations are performed entirely inside the Secure World — the 'toxic' key material is generated, used, and stored without ever being exported to the Normal World. The blast radius of compromise is confined to the enclave, exactly as peroxisomal H₂O₂ is confined to the organelle. Under the frozen-15 organelle constraint, this function is carried by the cytoplasm/vacuole/lysosomes cluster; when the 16th organelle slot opens, a dedicated peroxisome organelle should be added with osFeature 'Keystore/StrongBox TEE'.",
    hardwareAnalogue: "ARM TrustZone, KeyMint HAL, StrongBox / keystore2, keymintd isolated process",
    substrateIds: ["keystore-tee", "selinux-policy"],
    evidence: "indicative",
  },
  {
    id: "qi-membranepotential-affect-silicon",
    zoneId: "membrane",
    phaseId: "affect",
    scaleId: "silicon",
    title: "Membrane Potential / Action Potential as IRQ Priority Cascade",
    narrative:
      "The plasma membrane maintains a resting potential of −70 mV via the Na⁺/K⁺-ATPase pump, establishing an electrochemical gradient across the bilayer — a standing potential difference held in precise equilibrium by continuous ion pumping. Voltage-gated Na⁺ channels (Nav1.x) open when the membrane depolarises past threshold (≈ −55 mV), triggering an all-or-nothing action potential that propagates non-decrementally along the membrane. This is the fastest signalling mechanism in biology — non-maskable, must complete before any other signal can fire. The Kryo 670 CPU implements the silicon homologue: each IRQ line has a hardware priority level held in the GIC-500 interrupt controller's priority register (= resting gradient). When an interrupt fires above the CPU's current priority mask threshold (= depolarisation threshold), the GIC preempts the running code and dispatches the hardirq handler non-preemptibly — no other lower-priority interrupt can interrupt a running hardirq, exactly as no competing signal can abort an action potential mid-propagation. The affect phase is where the gradient transforms: it is not the perception of the stimulus (receptor binding / IRQ assertion) but the active work of propagation and cascade — the moment the potential becomes signal.",
    hardwareAnalogue: "Kryo 670 GIC-500 interrupt priority registers, hardirq handler dispatch, /proc/interrupts",
    substrateIds: ["kryo670", "qcm6490"],
    evidence: "indicative",
  },
  {
    id: "qi-chaperone-affect-silicon",
    zoneId: "endoplasmic-reticulum",
    phaseId: "affect",
    scaleId: "silicon",
    title: "Protein Chaperone / HSP Folding as ART Verify–JIT–Deopt Loop",
    narrative:
      "Molecular chaperones (HSP70, HSP90, GroEL/GroES, BiP, calnexin) do not carry information about the final folded structure — they prevent aggregation and provide a protected environment in which the polypeptide chain can sample conformations and find its native state. If refolding fails after repeated chaperone cycles, the protein is handed to the canonical ERAD pathway: retrotranslocation through the Sec61 or Hrd1 translocon, polyubiquitination by RING E3 ligases (HRD1, gp78), extraction by p97/VCP ATPase, and delivery to the 26S proteasome for proteolysis. A parallel pathway — ER-phagy (reticulophagy) — routes bulk ER contents to lysosomes via autophagosomal capture; this is distinct from ERAD and acts on ER structure rather than individual misfolded proteins. Three chaperone modes map precisely to three ART execution modes: (1) BiP initial binding and release cycles = ART verifier checking DEX bytecode correctness before any execution begins — the quality gate before the chain is extended; (2) Calnexin/calreticulin refolding with glycan trimming = JIT recompilation of hot methods guided by profile data — the chaperone revisits the chain after it has run and refolds it into a faster native form; (3) Chaperone fallback to interpreter mode when JIT cannot optimise = HSP90 holdover-client state, where the protein remains functional but slower, still chaperoned, never reaching independent native fold. The affect phase captures the transformation work — not the perception of a newly synthesised chain arriving at the ER (that is perception), but the active folding labour inside the ER lumen.",
    hardwareAnalogue: "ART verifier (dex2oat --verify-at-runtime), JIT compiler (profile-guided recompile), deopt/interpreter fallback, ER-phagy → ART dex cache eviction (PackageManager dexopt cleanup)",
    substrateIds: ["art-runtime"],
    evidence: "indicative",
  },

  // ── Document Secretion — Phase 1 (ARCHITECT_REPORT_2026-06-10.md Phase 1) ──
  // 3 new intersections anchoring the PDF/document secretion feature in the tensor.
  // Post-add total: 36 of 264 = 13.6%.
  // Biological framing: PDF = secretion product (exocytosis), not neurotransmitter.
  // ER role: execution environment (WebView/Chromium context), NOT synthesis origin.
  // Content assembly begins at Golgi per ARCHITECT_AUDIT finding #11.

  {
    id: "qi-secretion-expression-textual",
    zoneId: "golgi",
    phaseId: "expression",
    scaleId: "textual",
    title: "Document Secretion — Golgi Packages the Word",
    narrative:
      "The trans-Golgi Network (TGN) is the Cell OS post office: it receives proteins from the cis-Golgi stack, applies address labels (mannose-6-phosphate for lysosomal targeting, signal peptide cleavage for constitutive secretion), and dispatches them in correctly addressed vesicles. dex2oat performs the same operation at the silicon scale — it writes destination addresses (method dispatch tables, oat-file section offsets) into the native code stream before any execution begins. The PDF renderer performs it at the textual scale: the document layout engine writes page-number addresses and cross-reference tables into the PDF stream before the file is sealed. In all three cases, Expression at the textual scale is the act of addressing — of making the outgoing packet findable by whoever receives it. The word is not yet released; it has been packaged, addressed, and loaded onto the vesicle.",
    hardwareAnalogue: "trans-Golgi Network dispatch, dex2oat method dispatch tables, PDF cross-reference table + page layout addressing",
    substrateIds: ["package-manager", "bionic-libc"],
    evidence: "indicative",
  },
  {
    id: "qi-exocytosis-expression-organic",
    zoneId: "membrane",
    phaseId: "expression",
    scaleId: "organic",
    title: "Exocytosis — Membrane Releases the Artifact",
    narrative:
      "SNARE proteins (v-SNARE on the vesicle, t-SNARE on the target membrane) zipper together, driving bilayer fusion in a millisecond. The vesicle membrane merges with the plasma membrane; its contents are expelled into the extracellular space — a point of no return. The cargo has completed the full secretory arc: synthesis → folding → Golgi packaging → vesicle transport → membrane fusion → extracellular release. In Cell OS, a PDF download is the digital homologue: the blob URL is created, the anchor click fires, the file crosses the browser membrane into the user's filesystem — exocytosis. At the organic scale, breath exhaled is the purest expression: air that was inside is now outside; the chest has committed. The lung does not retrieve what it has exhaled. Expression is complete when the artifact has crossed the membrane boundary and can no longer be recalled.",
    hardwareAnalogue: "SNARE-mediated vesicle fusion, browser Blob URL download, file system write via anchor[download]",
    substrateIds: ["binder-ipc"],
    evidence: "indicative",
  },
  {
    id: "qi-document-perception-textual",
    zoneId: "membrane",
    phaseId: "perception",
    scaleId: "textual",
    title: "Document Import — Membrane Receives the Text",
    narrative:
      "Receptor-mediated endocytosis: a ligand binds a membrane receptor (clathrin-coated pit assembles), the membrane invaginates, a vesicle pinches off carrying the ligand-receptor complex inward — the extracellular signal has been internalised without breaching the membrane's general permeability. The payload is routed to an endosome, then to a lysosome for processing, or recycled back to the membrane if the receptor is to be reused. In Cell OS, importing a PDF is receptor-mediated endocytosis at the textual scale: the user drops a file onto the membrane (the drag-and-drop zone), the File API reads the bytes, the document is routed to the correct processing compartment (the Golgi/ER rendering context). Perception at the textual scale is the moment the external document becomes internal state — the membrane has received it, the vesicle has pinched off, the text is now inside.",
    hardwareAnalogue: "File API / FileReader, drag-and-drop event, DataTransfer.files, Blob internalization",
    substrateIds: ["nnapi", "binder-ipc"],
    evidence: "indicative",
  },
];
