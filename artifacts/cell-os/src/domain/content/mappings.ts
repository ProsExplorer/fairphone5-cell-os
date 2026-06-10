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
  },

  // ── FP5 Source-Grounded Link Additions ───────────────────────────────────────
  // These three links wire the newly added substrate nodes (binder-ipc,
  // art-runtime, bionic-libc) to the organelles the FP5 source most directly
  // maps to them (FP5_MANIFOLD_COMPARISON.md §3–4).
  {
    organelleId: "vesicles",
    substrateId: "binder-ipc",
    description: "Vesicles carry cargo between cell compartments as discrete, addressed packets; Binder Parcels carry data between Android processes as discrete, typed IPC messages via /dev/binder's single-copy mmap mechanism. The cargo packet IS the vesicle.",
    rateRange: "< 1ms per Binder transaction (synchronous, verified)",
    relevance: 0.97
  },
  {
    organelleId: "nuclear-pores",
    substrateId: "binder-ipc",
    description: "Nuclear pores are gated channels through which mRNA exits and transcription factors enter — nothing crosses without the correct signal. The ServiceManager is Android's nuclear pore: every Binder service registers its name here, and every client queries here first. All inter-process links are brokered through this one node.",
    rateRange: "O(1) ServiceManager lookup per connection setup",
    relevance: 0.91
  },
  {
    organelleId: "ribosomes",
    substrateId: "art-runtime",
    description: "Ribosomes decode mRNA codons into amino acids through a verify-then-execute cycle; ART's dex2oat verifies DEX bytecode type descriptors before generating native code, then a baseline JIT and optimizing JIT compile hot paths. Both are dedicated machinery for one repeated decoding operation.",
    rateRange: "JIT: 0.2–2ms per method compilation (hot path)",
    relevance: 0.99
  },
  {
    organelleId: "golgi-apparatus",
    substrateId: "art-runtime",
    description: "The Golgi writes destination addresses into cargo as it passes through the cisternae stack; dex2oat writes hardware destination annotations into native .oat/.odex binaries during app installation, routing code to the correct execution unit. Both are sequential refinement in dedicated chambers with addressed dispatch.",
    rateRange: "dex2oat: seconds per app install (AOT compilation)",
    relevance: 0.88
  },
  {
    organelleId: "cytoplasm",
    substrateId: "bionic-libc",
    description: "The cytoplasm is the fluid medium in which all organelles and reactions are suspended — not passive, but the active environment of transformation. Bionic libc is ART's cytoplasm: jemalloc manages every object's heap allocation, pthreads manages every thread, and Bionic's syscall shims are the interface to the kernel nucleus below.",
    rateRange: "jemalloc: ~50–100ns per allocation (thread-local cache path)",
    relevance: 0.95
  },

  // ── Biological Accuracy Roadmap Additions (DEVELOPMENT.md Part 3 H2) ─────────
  // 10 links wiring the 5 new substrate nodes to organelles.
  // All organelleIds and substrateIds verified against frozen IDs.
  // dna→zygote required by Fredholm cooperative-pair rule (see DEVELOPMENT.md §Fredholm).

  // Centrosome/MTOC → Zygote (cooperative pair: nucleus + dna)
  { organelleId: "nucleus", substrateId: "zygote", description: "Nucleus governs Zygote pre-loading: the type system (genome) is pre-loaded into Zygote before any fork, ensuring all child processes inherit the correct chromosome set", relevance: 0.85 },
  { organelleId: "dna", substrateId: "zygote", description: "The genome (dna) is the content that Zygote pre-loads into every fork — verified-boot chain ensures the same signed genome image reaches every child process, exactly as the nucleotide sequence is faithfully copied into every daughter cell at division", relevance: 0.78 },

  // Autophagy → LMKD (lysosomal bulk degradation; NOT the ubiquitin-proteasome system)
  { organelleId: "lysosomes", substrateId: "lmkd", description: "Lysosomes execute autophagy — bulk degradation of cytoplasmic contents when nutrients are scarce or organelles are damaged. LMKD is the Android autophagy axis: when memory pressure rises (mTOR inhibited = low memory signal), LMKD bulk-kills cached background processes in oom_score_adj order. Not the ubiquitin-proteasome system (which is targeted); this is the bulk lysosomal pathway.", relevance: 0.90 },
  { organelleId: "vacuole", substrateId: "lmkd", description: "Vacuole stores excess material and regulates osmotic pressure; under LMKD memory pressure, vacuolar contents (cached process memory) are reclaimed first — equivalent to the vacuole releasing stored reserves during nutrient stress", relevance: 0.70 },

  // Ca²⁺ signaling → PowerHAL
  { organelleId: "mitochondria", substrateId: "powerhal", description: "Mitochondria generate the power gradient; PowerHAL converts power state changes into second-messenger signals exactly as Ca²⁺ flux converts membrane potential into intracellular cascade", relevance: 0.80 },
  { organelleId: "endoplasmic-reticulum", substrateId: "powerhal", description: "ER Ca²⁺ stores buffer the calcium signal; PowerHAL thermal limits buffer the power signal — both provide reserve capacity and prevent spike propagation", relevance: 0.65 },

  // Tight junctions → SELinux
  { organelleId: "cell-membrane", substrateId: "selinux-policy", description: "Cell membrane enforces passage rules; SELinux policy enforces domain transition rules — both are the tight junction sealing adjacent cellular compartments", relevance: 0.95 },
  { organelleId: "nuclear-pores", substrateId: "selinux-policy", description: "Nuclear pores enforce selective transport; SELinux neverallow rules enforce hard transport prohibitions between security domains", relevance: 0.80 },

  // UPS → PackageManager (targeted protein degradation, distinct from LMKD/autophagy)
  { organelleId: "golgi-apparatus", substrateId: "package-manager", description: "Golgi performs final protein sorting and dispatch; PackageManager performs final APK verification, dexopt, and install dispatch — the trans-Golgi Network of Android", relevance: 0.85 },
  { organelleId: "lysosomes", substrateId: "package-manager", description: "Lysosomes handle the endolysosomal degradation arm — receptor-mediated endocytosis routes surface proteins through early/late endosomes to lysosomal hydrolases. PackageManager force-stop and uninstall execute the same targeted removal: a specific named target is identified, routed through a degradation pipeline, and its resources reclaimed. Distinct from the lmkd link (bulk autophagy under pressure) — this is receptor-mediated targeted routing.", relevance: 0.88 },

  // #9 Peroxisomes → Keystore/TEE (DEVELOPMENT.md item 9, frozen-15 backfill)
  // vacuole: isolated storage vault ↔ TEE key vault; nuclear-pores: gated entry ↔ TEE boundary;
  // lysosomes: containment/detox ↔ cryptographic toxic-op isolation.
  // Three distinct incoming zones (cytoplasm, nucleus, cytoplasm) — vacuole+lysosomes from
  // cytoplasm zone but mechanistically distinct; nuclear-pores from nucleus zone → cooperative triad.
  { organelleId: "vacuole", substrateId: "keystore-tee", description: "Vacuole is the cell's isolated storage vault — sequestered from the cytoplasm, used to store reserves that must not be freely accessible. The TEE is Android's key vault: hardware-backed key material is sequestered in the Secure World and never exposed to the Normal World, exactly as vacuolar contents are sequestered from cytoplasmic enzymes.", relevance: 0.91 },
  { organelleId: "nuclear-pores", substrateId: "keystore-tee", description: "Nuclear pores enforce strict gated entry — only correctly tagged molecules pass the nuclear envelope. The TEE boundary (TrustZone world switch) enforces the same hard gating: only vetted, privilege-checked calls may cross from Normal World into Secure World. No bypass exists at the hardware level, exactly as there is no bypass of nuclear pore selectivity.", relevance: 0.88 },
  { organelleId: "lysosomes", substrateId: "keystore-tee", description: "Peroxisomes (mapped here under the frozen-15 constraint) contain H₂O₂ and execute beta-oxidation within a single-membrane enclave, destroying reactive byproducts before they can damage other organelles. The TEE processes cryptographic operations within ARM TrustZone's hard enclave boundary — the 'toxic' key material never leaves the Secure World. Both structures exist precisely to contain the blast radius of dangerous chemistry.", relevance: 0.79 },

  // #13 Membrane potential / ion channels → Kryo670 interrupt subsystem
  // cell-membrane: resting gradient ↔ IRQ priority baseline; threshold crossing ↔ ISR dispatch.
  // membrane-receptors: receptor discrimination ↔ interrupt source identification.
  { organelleId: "cell-membrane", substrateId: "kryo670", description: "The plasma membrane maintains a resting potential via Na⁺/K⁺-ATPase (electrochemical gradient = interrupt priority queue). At threshold, voltage-gated channels open and the action potential fires — non-maskable, must complete. The Kryo 670's interrupt controller maintains per-IRQ priority levels (GIC-500 priority registers = resting gradient). When an IRQ fires at threshold, the hardirq handler is dispatched non-preemptibly, exactly as the action potential propagates without interruption.", relevance: 0.76 },
  { organelleId: "membrane-receptors", substrateId: "kryo670", description: "Membrane receptors discriminate between ligands before triggering a cascade — only the correct molecular key initiates signalling. The Kryo 670 interrupt controller identifies the IRQ source (GIC distributor GICD_ISPENDR register) before dispatching to the correct ISR vector. Receptor discrimination = interrupt source identification; cascade trigger = ISR dispatch.", relevance: 0.72 },

  // #19 Protein chaperones / HSPs → ART Runtime
  // ER is where post-translational folding occurs; ART verify+JIT+deopt is the Android chaperone.
  { organelleId: "endoplasmic-reticulum", substrateId: "art-runtime", description: "The rough ER is the site of post-translational protein folding: BiP/HSP70 binds nascent chains, calnexin/calreticulin monitor glycosylation state, and ERAD (ER-Associated Degradation) routes irreparably misfolded proteins for destruction. ART is the Android chaperone: the verifier checks DEX bytecode correctness before execution (BiP quality gate), the JIT recompiles hot methods when profile data shows suboptimal folding (calnexin-guided refolding), and the interpreter fallback handles code that cannot be optimised (chaperone-assisted slow fold). The deopt path is ERAD — irreparably unoptimisable code is routed back to interpretation.", relevance: 0.84 }
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
    description: "Ultra-weak photon emission may coordinate energy-state signaling between nucleus and mitochondria — the cell's two most information-dense structures. Android analogue: Binder direct method calls, the tightest IPC coupling (synchronous, σ=0.9), brokered through ServiceManager.",
    rateRange: "10–100 photons/cm²/s",
    confidence: "indicative",
    ipcMechanism: "binder",
    couplingSigma: 0.9,
    hubService: "ServiceManager"
  },
  {
    sourceOrganelleId: "nucleus",
    targetOrganelleId: "ribosomes",
    description: "Biophoton coherence has been proposed as a coordination signal across active transcription sites and ribosomal translation clusters. Android analogue: Messenger queues — async but point-to-point (σ=0.7), preserving the directional instruction-to-execution flow.",
    rateRange: "1–50 photons/cm²/s",
    confidence: "indicative",
    ipcMechanism: "messenger",
    couplingSigma: 0.7
  },
  {
    sourceOrganelleId: "endoplasmic-reticulum",
    targetOrganelleId: "golgi-apparatus",
    description: "The protein-trafficking pathway from ER to Golgi may involve biophoton bursts during vesicle budding events. Android analogue: ordered broadcasts — sequential, priority-chained delivery (σ=0.6), matching the cisternae-to-cisternae procession.",
    rateRange: "1–30 photons/cm²/s",
    confidence: "unconfirmed",
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.6
  },
  {
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "nuclear-pores",
    description: "Mitochondrial membrane potential changes produce detectable biophoton bursts; nuclear pores may respond to the optical gradient. Android analogue: unordered broadcasts — fully decoupled, fire-and-forget (σ=0.4), the energy signal broadcast to all waiting receivers.",
    rateRange: "5–80 photons/cm²/s",
    confidence: "indicative",
    ipcMechanism: "unordered-broadcast",
    couplingSigma: 0.4
  },

  // ── Biological Accuracy Roadmap Additions (DEVELOPMENT.md Part 3 H4) ─────────
  // 3 new links completing missing cascade paths; post-add total: 11 biophoton links (9 at H4, +2 in open-items round).
  // No 'id' field on BiophotonLink. ipcMechanism values verified against types.ts.
  {
    sourceOrganelleId: "membrane-receptors",
    targetOrganelleId: "cytoplasm",
    description: "Receptor-activated G-protein cascade — ligand binding at membrane receptor triggers cytoplasmic kinase cascade exactly as GPCR activates cAMP/PKA through the cytoplasm. The signal crosses the membrane boundary and amplifies through the cytoplasmic medium.",
    rateRange: "10–200 photons/cm²/s",
    confidence: "indicative",
    attentionWeight: 0.71,
    couplingSigma: 0.7,
    ipcMechanism: "messenger",
  },
  {
    sourceOrganelleId: "golgi-apparatus",
    targetOrganelleId: "lysosomes",
    description: "Trans-Golgi Network routes misfolded or damaged proteins to lysosomes for degradation via mannose-6-phosphate receptor-mediated vesicle targeting — the APK verification pipeline routes failed packages to forced-uninstall through PackageManager.",
    rateRange: "1–20 photons/cm²/s",
    confidence: "indicative",
    attentionWeight: 0.44,
    couplingSigma: 0.6,
    ipcMechanism: "ordered-broadcast",
  },
  {
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "dna",
    description: "Cytochrome c release from mitochondria during intrinsic apoptosis triggers nuclear DNA fragmentation via caspase-activated DNase (CAD) — LMKD SIGKILL triggers ordered process shutdown including all file descriptor cleanup and memory reclamation.",
    rateRange: "5–60 photons/cm²/s",
    confidence: "indicative",
    attentionWeight: 0.52,
    couplingSigma: 0.9,
    ipcMechanism: "binder",
  },

  // ── Attention-map completion additions (MANIFOLD_ANALYSIS.md §11.5) ──────────
  // Pattern: all biophoton links are cross-zone. Both additions maintain this.
  {
    sourceOrganelleId: "ribosomes",
    targetOrganelleId: "golgi-apparatus",
    description: "Translation pulses in ribosomes may entrain Golgi packaging cadence — the mRNA-to-vesicle coherence pathway mirrored by the ART JIT-to-dex2oat dispatch flow: hot paths JIT-compiled, then written into .oat files for the next install.",
    rateRange: "2–40 photons/cm²/s",
    confidence: "unconfirmed",
    attentionWeight: 0.62,
    ipcMechanism: "messenger",
    couplingSigma: 0.7
  },
  {
    sourceOrganelleId: "dna",
    targetOrganelleId: "ribosomes",
    description: "Genome-origin coherence guiding ribosomal translation forms the transcription loop — the instruction stream to execution engine, closing the expression cycle. Android analogue: verified-boot chain to ART — the code-signing root anchors every execution, Binder-mediated with tight coupling.",
    rateRange: "1–45 photons/cm²/s",
    confidence: "unconfirmed",
    attentionWeight: 0.58,
    ipcMechanism: "binder",
    couplingSigma: 0.9
  },

  // #13 Membrane potential — action potential propagates from membrane to nucleus (gene expression change)
  {
    sourceOrganelleId: "cell-membrane",
    targetOrganelleId: "nucleus",
    description: "Action potential propagation: the membrane potential crossing threshold triggers a cascade that ultimately reaches the nucleus — Ca²⁺ influx activates CaM-kinase IV, which phosphorylates CREB, which modulates gene expression. In Android: a hardirq fires at the membrane (interrupt controller), propagates through the kernel's IRQ thread, crosses the Binder boundary as a system call, and reaches the nucleus (kernel syscall table) where the process state is updated. The tightest IPC path — σ=0.9 because hardirq→syscall is synchronous and non-maskable.",
    rateRange: "1–500 ph/cm²/s",
    confidence: "indicative",
    attentionWeight: 0.83,
    ipcMechanism: "binder",
    couplingSigma: 0.9
  },

  // #19 ER-phagy path — distinct from classical ERAD (ERAD→proteasome; ER-phagy→lysosome).
  // Classical ERAD: retrotranslocation → polyubiquitination → 26S proteasome (NOT lysosomes).
  // ER-phagy (reticulophagy): ER membrane/lumen fragments engulfed by autophagosome → lysosomal fusion.
  // This biophoton link models the ER-phagy axis; the ER→art-runtime substrate link models ERAD.
  {
    sourceOrganelleId: "endoplasmic-reticulum",
    targetOrganelleId: "lysosomes",
    description: "ER-phagy (reticulophagy): when ER quality control is overwhelmed or ER morphology is disrupted, FAM134B/RTN3 receptors flag ER fragments for autophagosomal capture — the ER membrane and its lumenal contents are engulfed and delivered to lysosomes for bulk degradation. This is distinct from classical ERAD (which routes individual misfolded proteins to the 26S proteasome). In Android: the ART interpreter fallback pool (code that has failed JIT optimisation and been demoted) accumulates until the next dexopt cycle, at which point the dex cache is evicted via PackageManager — a bulk, autophagosome-like sweep of accumulated failed-fold material, not a targeted single-protein strike. Ordered broadcast σ=0.6: the ER-phagy signal is directed and sequenced but not synchronous.",
    rateRange: "0.5–15 ph/cm²/s",
    confidence: "indicative",
    attentionWeight: 0.49,
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.6
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
