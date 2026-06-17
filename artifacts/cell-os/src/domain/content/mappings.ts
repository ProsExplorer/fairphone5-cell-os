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
  { organelleId: "endoplasmic-reticulum", substrateId: "art-runtime", description: "The rough ER is the site of post-translational protein folding: BiP/HSP70 binds nascent chains, calnexin/calreticulin monitor glycosylation state, and ERAD (ER-Associated Degradation) routes irreparably misfolded proteins for destruction. ART is the Android chaperone: the verifier checks DEX bytecode correctness before execution (BiP quality gate), the JIT recompiles hot methods when profile data shows suboptimal folding (calnexin-guided refolding), and the interpreter fallback handles code that cannot be optimised (chaperone-assisted slow fold). The deopt path is ERAD — irreparably unoptimisable code is routed back to interpretation.", relevance: 0.84 },

  // ── Document Secretion substrate link (ARCHITECT_REPORT_2026-06-10.md Phase 1) ──
  // golgi-apparatus → bionic-libc (the only genuinely new link; vesicles→binder-ipc already exists).
  // Post-add total: 41 links (41/255 = 16.1%).
  { organelleId: "golgi-apparatus", substrateId: "bionic-libc", description: "Golgi cisternae process cargo sequentially through cis→medial→trans stacks, each adding or trimming modifications in a defined order. jemalloc (Bionic's slab allocator) manages sequential heap frames in the same assembly-line pattern — each slab is a cisterna, each allocation a cargo unit addressed and dispatched to the correct memory region. Document assembly (the PDF blob construction) runs entirely on the heap: every page object, font descriptor, and cross-reference table is a jemalloc allocation that the Golgi assembles before the vesicle is sealed.", relevance: 0.77 }
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
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "nucleus",
    description: "Mitochondria-to-nucleus retrograde biophoton signaling (P1 — BIOPHOTON_RESEARCH.md §5): ROS-induced ultra-weak photon emission from mitochondrial Complex I/III propagates toward the nucleus as a stress-state signal, coordinating nuclear gene expression response to metabolic load. This is the canonical retrograde direction — the mitochondrion reports its oxidative state to the nucleus, not the reverse. Android analogue: Binder oneway async message from a background service to the system server — the energy subsystem signals the kernel supervisor without blocking, σ=0.65 (indicative, biologically calibrated), brokered through ServiceManager.",
    rateRange: "10–1000 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "NIR",
    ipcMechanism: "binder",
    couplingSigma: 0.65,
    hubService: "ServiceManager"
  },
  {
    sourceOrganelleId: "nucleus",
    targetOrganelleId: "ribosomes",
    description: "Biophoton coherence has been proposed as a coordination signal across active transcription sites and ribosomal translation clusters — nucleus-to-ribosome anterograde instruction flow. Android analogue: Messenger queues — async but point-to-point (σ=0.65), preserving the directional instruction-to-execution flow.",
    rateRange: "1–50 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "blue-green",
    ipcMechanism: "messenger",
    couplingSigma: 0.65
  },
  {
    sourceOrganelleId: "endoplasmic-reticulum",
    targetOrganelleId: "golgi-apparatus",
    description: "The protein-trafficking pathway from ER to Golgi may involve biophoton bursts during vesicle budding events — speculative pathway with no direct experimental evidence of photon coordination at this junction. Android analogue: ordered broadcasts — sequential, priority-chained delivery (σ=0.45, speculative tier), matching the cisternae-to-cisternae procession.",
    rateRange: "1–30 photons/cm²/s",
    confidence: "speculative",
    wavelengthBand: "red",
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.45
  },
  {
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "nuclear-pores",
    description: "Mitochondrial membrane potential changes produce detectable biophoton bursts; the nuclear pore complex may act as an optical receiver, responding to the NIR gradient from the mitochondria as part of the P1 retrograde pathway. Android analogue: unordered broadcasts from the energy subsystem to all gated kernel interfaces — fire-and-forget (σ=0.55, biologically recalibrated to indicative floor).",
    rateRange: "5–80 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "NIR",
    ipcMechanism: "unordered-broadcast",
    couplingSigma: 0.55
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
    wavelengthBand: "blue-green",
    attentionWeight: 0.71,
    couplingSigma: 0.65,
    ipcMechanism: "messenger",
  },
  {
    sourceOrganelleId: "golgi-apparatus",
    targetOrganelleId: "lysosomes",
    description: "Trans-Golgi Network routes misfolded or damaged proteins to lysosomes for degradation via mannose-6-phosphate receptor-mediated vesicle targeting — the APK verification pipeline routes failed packages to forced-uninstall through PackageManager.",
    rateRange: "1–20 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "red",
    attentionWeight: 0.44,
    couplingSigma: 0.6,
    ipcMechanism: "ordered-broadcast",
  },
  {
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "dna",
    description: "Mitochondria-to-DNA retrograde biophoton signal (partial P1 pathway, proximal arc): cytochrome c release and ROS-driven photon emission reach the DNA directly, complementing the mitochondria→nucleus retrograde link. Cytochrome c also triggers nuclear DNA fragmentation via caspase-activated DNase (CAD) — LMKD SIGKILL triggers ordered process shutdown including all file descriptor cleanup and memory reclamation.",
    rateRange: "5–60 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "red",
    attentionWeight: 0.52,
    couplingSigma: 0.70,
    ipcMechanism: "binder",
  },

  // ── Attention-map completion additions (MANIFOLD_ANALYSIS.md §11.5) ──────────
  // Pattern: all biophoton links are cross-zone. Both additions maintain this.
  {
    sourceOrganelleId: "ribosomes",
    targetOrganelleId: "golgi-apparatus",
    description: "Translation pulses in ribosomes may entrain Golgi packaging cadence — the mRNA-to-vesicle coherence pathway mirrored by the ART JIT-to-dex2oat dispatch flow: hot paths JIT-compiled, then written into .oat files for the next install. Speculative: no direct evidence of ribosome-Golgi biophoton coupling in the literature.",
    rateRange: "2–40 photons/cm²/s",
    confidence: "speculative",
    wavelengthBand: "blue-green",
    attentionWeight: 0.62,
    ipcMechanism: "messenger",
    couplingSigma: 0.45
  },
  {
    sourceOrganelleId: "dna",
    targetOrganelleId: "ribosomes",
    description: "Genome-origin UV coherence guiding ribosomal translation forms the transcription loop — DNA emits in the UV band (200–380 nm, Pietruszka & Marzec 2024) and this photon signal may entrain ribosomal translation cadence. The instruction stream to execution engine, closing the expression cycle. Android analogue: verified-boot chain to ART — the code-signing root anchors every execution. Speculative: photon-mediated transcription coupling is proposed but not directly measured.",
    rateRange: "1–10 photons/cm²/s",
    confidence: "speculative",
    wavelengthBand: "UV",
    attentionWeight: 0.58,
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.40
  },

  // #13 Membrane potential — action potential propagates from membrane to nucleus (gene expression change)
  {
    sourceOrganelleId: "cell-membrane",
    targetOrganelleId: "nucleus",
    description: "Action potential propagation (P6 partial — BIOPHOTON_RESEARCH.md §5): the membrane potential crossing threshold triggers a cascade that ultimately reaches the nucleus — Ca²⁺ influx activates CaM-kinase IV, which phosphorylates CREB, which modulates gene expression. Biophoton emission accompanies membrane depolarization in the blue-green band. In Android: a hardirq fires at the membrane (interrupt controller), propagates through the kernel's IRQ thread, crosses the Binder boundary as a system call, and reaches the nucleus (kernel syscall table) where the process state is updated. σ=0.60 (indicative, biologically recalibrated from over-confident 0.9).",
    rateRange: "1–500 ph/cm²/s",
    confidence: "indicative",
    wavelengthBand: "blue-green",
    attentionWeight: 0.83,
    ipcMechanism: "binder",
    couplingSigma: 0.60
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
    wavelengthBand: "red",
    attentionWeight: 0.49,
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.6
  },

  // ── Secretory pathway completion (ARCHITECT_REPORT_2026-06-10.md Phase 1) ──
  // Two biophoton links completing the ER→Golgi→vesicle→membrane arc.
  // Post-add total: 13 biophoton links (5.8% of 225 directed pairs — amber-high).
  // Both are cross-zone links (ER-zone → golgi-zone; golgi-zone → membrane-zone).

  // COPII vesicle budding: rough ER synthesises → COPII coat assembles → vesicle buds toward Golgi.
  // The ER→Golgi biophoton link already exists (Golgi processing cadence).
  // This adds the parallel ER→vesicle direct budding path (bypasses cis-Golgi in some cargo routes).
  {
    sourceOrganelleId: "endoplasmic-reticulum",
    targetOrganelleId: "vesicles",
    description: "COPII vesicle budding from the rough ER: Sec23/Sec24 cargo-adaptor complex captures transmembrane cargo, Sec13/Sec31 outer coat polymerises, vesicle buds from the ER exit site (ERES). The ER does not wait for the Golgi — COPII budding is a direct ER→vesicle path for certain cargo (collagen, large secretory proteins). In Android: ART dex2oat emits compiled method stubs directly into memory-mapped vesicles (shared-memory segments) without routing through the full PackageManager pipeline, for pre-compiled boot-image methods.",
    rateRange: "2–30 ph/cm²/s",
    confidence: "indicative",
    wavelengthBand: "red",
    attentionWeight: 0.55,
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.6
  },

  // SNARE-mediated vesicle docking: v-SNARE (VAMP/synaptobrevin) on secretory vesicle zippers
  // with t-SNARE (syntaxin + SNAP-25) on plasma membrane → bilayer fusion → exocytosis.
  // Directed, point-to-point: the vesicle knows its destination (σ=0.7, messenger).
  {
    sourceOrganelleId: "vesicles",
    targetOrganelleId: "cell-membrane",
    description: "SNARE-mediated secretory vesicle docking and fusion with the plasma membrane: v-SNARE (VAMP2/synaptobrevin) on the vesicle zippers with t-SNARE complex (syntaxin-1 + SNAP-25) on the plasma membrane, driving lipid bilayer merger in milliseconds. Calcium-triggered (synaptotagmin Ca²⁺ sensor). This is the final exocytosis step — the vesicle membrane becomes part of the plasma membrane, and its contents are released extracellularly. In Android: a Binder transaction delivers a completed result buffer to the requesting process — the data crosses the process membrane boundary in a single messenger call, one write, one read, no intermediate copy.",
    rateRange: "5–80 ph/cm²/s",
    confidence: "indicative",
    wavelengthBand: "blue-green",
    attentionWeight: 0.65,
    ipcMechanism: "messenger",
    couplingSigma: 0.7
  },

  // ── Canonical Pathway Additions (BIOPHOTON_RESEARCH.md §13 — Architect Audit) ──
  // 5 missing P-series pathways from the canonical 7-pathway graph (§5).
  // Post-add total: 18 biophoton links. All IDs verified against frozen-15 organelle set.
  // σ values biologically calibrated per §9.4 (Verified≥0.75, Indicative 0.50–0.75, Speculative 0.30–0.50).

  // P2 — ER ↔ Mitochondria contact-site coupling (Indicative, §5 P2, PMC3699878)
  // ER-mitochondria contact sites (MAMs) regulate Ca²⁺ transfer and oxidative stress coupling.
  {
    sourceOrganelleId: "endoplasmic-reticulum",
    targetOrganelleId: "mitochondria",
    description: "ER-mitochondria membrane contact sites (MAMs): the smooth ER forms physical tether contacts with the outer mitochondrial membrane, transferring Ca²⁺ and lipid precursors. PDI-ERO1 oxidative folding in the ER lumen generates ROS that drive biophoton emission in the red band — this signal propagates across the contact site to the mitochondrion. Android analogue: Messenger async callback from the App Framework layer to the power service — async, point-to-point, neither layer blocks the other (σ=0.55, indicative, biologically calibrated per §9.4).",
    rateRange: "5–100 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "red",
    ipcMechanism: "messenger",
    couplingSigma: 0.55
  },

  // P3 — Cell-to-cell bystander biophoton signaling (Verified, §5 P3, PMC3840296, PMC10606557 2024)
  // Verified pathway: cells emit visible-band photons that induce epigenetic changes in neighbors.
  {
    sourceOrganelleId: "cell-membrane",
    targetOrganelleId: "membrane-receptors",
    description: "Bystander biophoton cell-to-cell signaling (P3 — Verified, §5): the plasma membrane emits coherent visible-band photons (400–700 nm) that traverse extracellular space and are received by membrane receptors of neighboring cells, inducing epigenetic changes without direct contact. This is the highest-confidence inter-cellular biophoton pathway (Verified, 2013–2024 literature). Android analogue: unordered broadcast intent — fire-and-forget across all process boundaries, received by all registered listeners simultaneously. σ=0.80 (biologically calibrated — the strongest verified inter-cellular coupling, higher than the IPC baseline).",
    rateRange: "10–500 photons/cm²/s",
    confidence: "verified",
    wavelengthBand: "blue-green",
    ipcMechanism: "unordered-broadcast",
    couplingSigma: 0.80
  },

  // P4 — Nucleus → Cytoplasm UV emission (Speculative, §5 P4)
  // DNA tautomeric transitions emit UV photons; these may diffuse into the cytoplasm as signals.
  {
    sourceOrganelleId: "nucleus",
    targetOrganelleId: "cytoplasm",
    description: "Nuclear UV biophoton emission (P4 — Speculative, §5): DNA tautomeric base-pair transitions (keto↔enol, amino↔imino) emit UV photons in the 200–380 nm band (Pietruszka & Marzec 2024). These photons diffuse from the nucleus into the cytoplasm and may serve as a quantum state broadcast — the nucleus announcing its replication or repair activity to the cytoplasmic medium. Speculative: UV emission from DNA is verified, but cytoplasmic reception as a functional signal is proposed. Android analogue: ordered broadcast from kernel to userspace — the nucleus (kernel) emits a priority-chained signal into the cytoplasm (userspace medium), σ=0.35 (speculative tier, §9.4).",
    rateRange: "1–10 photons/cm²/s",
    confidence: "speculative",
    wavelengthBand: "UV",
    ipcMechanism: "ordered-broadcast",
    couplingSigma: 0.35
  },

  // P5 — Cytoskeleton microtubule waveguide routing (Indicative, §5 P5)
  // Microtubules proposed as biophoton waveguides routing signals between organelles.
  {
    sourceOrganelleId: "cytoskeleton",
    targetOrganelleId: "mitochondria",
    description: "Microtubule biophoton waveguide (P5 — Indicative, §5): the cytoskeleton's microtubule network has been proposed as a biological optical fiber, guiding near-infrared photons between organelles through total internal reflection within the hollow microtubule lumen. This would allow long-range biophoton routing — cytoskeleton as the fiber-optic backbone of the cell's light communication network. Android analogue: Binder thread pool routing — the thread pool routes IPC requests to the correct execution unit exactly as the microtubule routes the photon to the correct organelle (σ=0.60, indicative).",
    rateRange: "1–50 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "NIR",
    ipcMechanism: "binder",
    couplingSigma: 0.60
  },

  // P7 — Mitochondria lateral synchronization (Indicative, §5 P7, PMC10560087 2023)
  // Non-contact mitochondria-to-mitochondria biophoton synchronization (verified in 2023).
  {
    sourceOrganelleId: "mitochondria",
    targetOrganelleId: "mitochondria",
    description: "Mitochondria-to-mitochondria lateral biophoton synchronization (P7 — Indicative, §5): non-contact mitochondrial communication documented in 2023 (PMC10560087) — spatially separated mitochondria synchronize their membrane potential oscillations through ultra-weak photon signals without direct membrane contact. This lateral sync maintains coherent network-wide energy output across the mitochondrial population. Self-directed link represents the intra-population coupling: each mitochondrion is simultaneously emitter and receiver of the synchronizing signal. Android analogue: Messenger async messaging within a service cluster — each node receives and re-emits state to maintain cohort synchronization (σ=0.65, indicative, biologically calibrated).",
    rateRange: "5–200 photons/cm²/s",
    confidence: "indicative",
    wavelengthBand: "red",
    ipcMechanism: "messenger",
    couplingSigma: 0.65
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
