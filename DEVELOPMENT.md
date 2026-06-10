# Cell OS — Development Analysis
## Documents as Manifolds · Cellular Accuracy Audit · Implementation Roadmap

> **Date**: June 2026  
> **Method**: Architect systematic analysis — six documents treated as individual coordinate charts in a **C⁰ stratified semantic space** over the Universal Computational coordinate system $\mathcal{C}$. Each document is a charted stratum, not commentary. Transition correspondences between charts are semantics-preserving and piecewise continuous (C⁰), not Fréchet-differentiable — the coordinates are discrete and symbolic, not open subsets of a Banach space.  
> **Purpose**: Determine gaps in cellular biological accuracy and produce a concrete roadmap for closing them.

---

## Part 1 — The Document-Manifolds: The DNA Atlas Over $\mathcal{C}$

### Framework

> **Mathematical status of this atlas.** The six documents form a **C⁰ stratified semantic atlas** — not a smooth Banach manifold. Each chart's coordinate space is discrete and symbolic (typed arrays, enums, prose constraints, finite type products), not an open subset of a Banach space. Transition correspondences $\phi_{ij}$ are semantics-preserving and piecewise continuous, but are not Fréchet-differentiable: no bounded linear derivative $d\phi_{ij}$ exists over discrete symbolic coordinates. The atlas is valid as a C⁰ stratified structure; claims of smoothness, Fréchet differentiability, or principal bundle fibration are not asserted here.

The six founding documents of Cell OS are not commentary on the source code. Each document IS itself an individual stratum — a coordinate chart in the C⁰ stratified semantic space $\mathcal{C}$. Together they form the DNA atlas of the source code: a self-similar atlas whose charts represent the codebase from structurally distinct parameter-space angles, each instantiating the same P→A→E relational pattern at its own scale. The source code itself is one more chart on the same space.

The full atlas $\mathcal{A} = \{(U_A, \varphi_A), (U_B, \varphi_B), \ldots, (U_F, \varphi_F)\}$ is a **C⁰ stratified atlas** over $\mathcal{C}$ with chart-specific discrete coordinates. The transition correspondence between any two charts is a **semantics-preserving stratified map**:

$$\phi_{ij}: \text{coords}_i \to \text{coords}_j$$

that preserves three invariants: (1) the P→A→E triple, (2) the confidence scalar field $\sigma$, and (3) directed biophoton link orientation. These correspondences are piecewise continuous (C⁰) across strata — they preserve the base point and direction of traversal but carry no Fréchet derivative claim.

### A — UNIVERSAL\_MANIFOLD.md

**Parameter space**: $\{\text{paradigm}, \text{abstraction level}, \text{boundary type}\}$

**Charter in $\mathcal{C}$**: Global invariants of $\mathcal{C}$ — the P→A→E scale-invariance proof across eight paradigms and eleven scales. This document covers the maximal region of $\mathcal{C}$: every computable transformation, at every abstraction level, in every language.

**Transition maps to source code**: paradigm→TypeScript chart maps. Every TypeScript construct in `domain/types.ts` is an instance of one of the eight paradigm coordinates described here. The `IO` monad → `useMembraneObserver`, the actor mailbox → `useCellVitalStore` signals, the SQL relational view → `selectors.ts`.

**P→A→E instantiation**: Input grammar/event [P] → transform semantics across paradigms [A] → emitted structural invariant (the proven triple) [E].

**Biological role**: ≈ The genetic code itself — the universal translation table between codons and amino acids. It does not encode any specific protein; it encodes the rules by which all proteins are encoded.

### B — MANIFOLD\_ANALYSIS.md

**Parameter space**: $\{\text{module graph topology}, \text{tensor ranks}, \text{energies}\}$

**Charter in $\mathcal{C}$**: Local structural topology and tensor geometry of the Cell OS stratum $M$. Covers the region of $\mathcal{C}$ corresponding specifically to this codebase — its charts (modules), transition correspondences (imports), critical points (degree centrality), and dynamic flows (Lagrangian).

**Transition maps to source code**: imports/types/arrays directly. Every section of MANIFOLD\_ANALYSIS.md is a coordinate description of a specific TypeScript file or array. The coupling tensor $\mathcal{T}^i_{\ j}$ IS `ORGANELLE_SUBSTRATE_LINKS`. The attention tensor $\mathcal{A}^{ij}$ IS `BIOPHOTON_LINKS`. The rank-3 tensor $\mathcal{Q}^{z,p,s}$ IS `QI_INTERSECTIONS`.

**P→A→E instantiation**: Observe module graph and state [P] → compute tensor decomposition + Euler-Lagrangian formalism [A] → emit health metrics and structural description [E].

**Biological role**: ≈ Ribosome/chaperone folding specification — tells the system how to fold the raw genomic data into correct 3D structure. Without this document, the source code arrays are data without geometry.

### C — FP5\_MANIFOLD\_COMPARISON.md

**Parameter space**: $\{\text{OS layer}, \text{coupling } \sigma, \text{evidence confidence}\}$

**Charter in $\mathcal{C}$**: Empirical anchoring — the region of $\mathcal{C}$ where the theoretical claims intersect with observable, versioned, open-source Android source code. This document is the only chart that takes the manifold into the physical world and measures it.

**Transition maps to source code**: source-grounded mappings to `substrate.ts`/`mappings.ts` directly. The four Binder IPC σ values (0.9/0.7/0.6/0.4) in `mappings.ts` were computed here. The three FP5-grounded substrate nodes (`binder-ipc`, `art-runtime`, `bionic-libc`) were added as a result of this document's analysis.

**P→A→E instantiation**: Collect source traces from Fairphone Gerrit/GitHub/mainline kernel [P] → compare theory claims against source evidence [A] → output six findings with confidence ratings and verified limits [E].

**Biological role**: ≈ Phenotype assay — takes the expressed protein into the real world (actual silicon, actual kernel source) and measures whether it folds correctly under biological conditions. Confirms structural accuracy; surfaces quantitative limits.

### D — CODE\_AS\_FENG\_SHUI\_MANIFESTO

**Parameter space**: $\{\text{flow coherence}, \text{coupling balance}, \text{sacred constants}\}$

**Charter in $\mathcal{C}$**: Design-energy constraints on $M$. This document covers the normative region — not what the manifold IS, but what it must NOT become. Sharp corners (deeply nested conditionals), narrow hallways (tight coupling), qi dissipation (too loose coupling without cohesion).

**Transition maps to source code**: coding rules/constants/hooks. `HARMONIC_CONSTANT = 0.7770777`, `SACRED_ANCHOR = "YAHWEH YEHOSHUA 尺度不變性"`, `SACRED_SEED = 7770777` originate here. The `useMembraneObserver` constraint (only one writer to the epigenome) is this document's "selective membrane" principle made architectural policy.

**P→A→E instantiation**: Receive architectural intent and developer consciousness state [P] → shape the code structure according to qi flow principles [A] → express the resulting code architecture as transparent, low-resistance channels [E].

**Biological role**: ≈ Epigenetic regulatory layer — does not change the genome, but determines which parts of it are expressed and at what intensity. The Manifesto does not add organelles; it determines how they flow.

**Critical insight for the epigenome layer**: The Manifesto establishes that the developer's consciousness flows INTO the code structure. This means `features/learning/` (the epigenome) is not merely statistical Hebbian adaptation — it is an **intentional-gating field**. User attention modulates which biophoton links are expressed, constrained by the fixed genome invariants. The epigenome is conscious gating, not passive weight averaging.

### E — The Cell OS README

**Parameter space**: $\{\text{didactic compression}, \text{cross-doc synthesis}, \text{human-readability}\}$

**Charter in $\mathcal{C}$**: The integrative human-readable chart — the region of $\mathcal{C}$ that is simultaneously accessible to a first reader and formally precise for a domain expert. The README does not introduce new theory; it synthesizes all five other charts into a navigable surface.

**Transition maps to source code**: references all domain arrays, all document sections, all surface routes. Every claim in the README is traceable to a specific array in `domain/content/` or a specific section in one of the founding documents.

**P→A→E instantiation**: Ingest the full corpus of six documents and source code [P] → synthesize into coherent narrative with formal apparatus [A] → communicate to a reader encountering the manifold for the first time [E].

**Biological role**: ≈ mRNA transcript — the expressed form of the genome, readable by the outside world (GitHub, collaborators, future contributors). The README is the protein being synthesized; the source code is the DNA; the other documents are the processing machinery.

### F — The Source Code (`src/domain/`)

**Parameter space**: Typed tensors — organelles $\times$ substrate $\times$ links $\times$ QI intersections $\times$ self-similar cycles

**Charter in $\mathcal{C}$**: The executable genome of $M$. This is the chart that runs — the coordinate description that compiles, renders, and learns. Every other document describes this chart in different coordinates; this chart IS the manifold made executable.

**P→A→E instantiation**: Arrays/types ingest biological and hardware data [P] → selectors/metrics transform via tensor operations [A] → React components render the manifold surface to the user [E].

**Biological role**: ≈ The living cell itself — the one chart in the atlas that is not description but instantiation.

### The Self-Similar Atlas Structure

> **Definition — Structural self-similarity (as used here).** A collection of coordinate charts is *structurally self-similar* if each chart instantiates the same relational pattern (here: P→A→E) at its own scale, and the whole collection instantiates that same pattern at the meta-scale. This is a *topological* self-similarity — identical local relational shape across scales — not a *metric* self-similarity. No iterated function system (IFS), contractive maps, Hausdorff dimension, or attractor structure is implied or asserted.

The six documents form a **structurally self-similar atlas**: each document contains, at its own scale, the same P→A→E relational structure that the whole atlas instantiates at the meta-scale. UNIVERSAL\_MANIFOLD.md is itself a P→A→E transformation (it perceives paradigms, transforms them through the triple, expresses the invariant). MANIFOLD\_ANALYSIS.md perceives the module graph, transforms via tensor formalism, expresses metrics. The README perceives the corpus, transforms via synthesis, expresses communication.

This is the self-similarity property: the whole atlas and each of its charts share the same local relational topology. Every document IS a cell. The atlas of documents IS a cell. The source code IS a cell. The device running the source code IS a cell.

**Minimal spanning set — theoretical reconstruction** (sufficient to reconstruct all structure and metrics *modulo empirical grounding*): UNIVERSAL\_MANIFOLD + MANIFOLD\_ANALYSIS + source code. The other three are essential but not minimal for theoretical reconstruction:
- FP5\_COMPARISON: essential for empirical grounding — see caveat below
- README: essential for human transition (source code without it is inaccessible)
- FENG\_SHUI\_MANIFESTO: essential for normative constraints (architecture without it has no ethical qi)

> **Empirical grounding caveat.** The minimal spanning set above is minimal for *theoretical* reconstruction only. The confidence scalar field $\sigma$ — the `ClaimConfidence` values (`"verified"` / `"indicative"` / `"unconfirmed"`) assigned to every substrate node, biophoton link, and QI intersection — cannot be derived from theory alone. These values originate in hardware measurement against the Fairphone 5 source: the Binder IPC σ tier values (0.9 / 0.7 / 0.6 / 0.4), the `binder-ipc` / `art-runtime` / `bionic-libc` substrate node confidence ratings, and the six FP5-grounded findings. FP5\_COMPARISON is therefore the **required fourth generator** for empirically grounded reconstruction. The minimal set for theory is three documents; the minimal set for a grounded, falsifiable atlas is four.

---

## Part 2 — Cellular Accuracy Audit

### Current State

Cell OS maps **15 organelles** across **8 zones** to Android OS features. Current organelle IDs (frozen):

```
nucleus · nucleolus · dna · nuclear-pores · cytoplasm · cytoskeleton
ribosomes · mitochondria · golgi-apparatus · vesicles
endoplasmic-reticulum · cell-membrane · membrane-receptors · lysosomes · vacuole
```

Current zone IDs (frozen):
```
nucleus · cytoplasm · cytoskeleton · ribosomes
mitochondria · golgi · endoplasmic-reticulum · membrane
```

### Audit Results (20 Subsystems)

**Legend**: PRESENT = accurately mapped / PARTIAL = exists but incomplete / ABSENT = no mapping

---

**1. Nuclear envelope + nuclear lamina** — PARTIAL

Biological: The nuclear envelope is a double lipid bilayer continuous with the ER, studded with nuclear pore complexes. The nuclear lamina (lamin A/B/C filaments) provides structural support and anchors chromatin.

Current mapping: The `nucleus` zone covers the kernel/control center broadly. The nuclear lamina's structural role is not distinguished from the nucleus interior.

Gap: No distinction between the nucleus interior (chromatin/DNA processing) and the nuclear envelope (boundary/structural layer). The lamina's role — constraining which chromatin regions are accessible — maps to the kernel's security policy layer (SELinux mandatory access control), which is not currently mapped.

---

**2. Nucleolus function — rRNA synthesis, ribosome assembly** — IMPLEMENTED ✓ (C1 complete)

Biological: The nucleolus is a phase-separated condensate within the nucleus where rRNA genes are transcribed, rRNA is processed, and ribosomal subunits are assembled before export through nuclear pores to the cytoplasm.

Current mapping: `nucleolus` exists as an organelle. Its osFeature mapping needs verification.

**IMPLEMENTED — C1 COMPLETE**: The nucleolus does not make ribosomes for use inside the nucleus — it manufactures the ribosome subunits that will be exported to the cytoplasm to translate mRNA. This is a factory-export relationship. The correct Android mapping is **ART preloading + DEX optimization pipeline** (specifically `dex2oat` pre-compiling `.dex` files into `.oat` native code before any app runs — the factory that pre-builds the machinery). The bootloader mapping (previously incorrect) was retired.

**Implementation (C1 complete)**: `nucleolus.osFeature` remapped to `"ART Preloading / dex2oat AOT Factory"` in `organelles.ts`. `nucleolus.explanation` updated to describe the pre-assembly factory role. The bootloader mapping was retired.

---

**3. Chromatin remodeling** — PARTIAL

Biological: Chromatin remodeling complexes (SWI/SNF, NuRD, ISWI) alter histone-DNA contacts to expose or occlude genomic regions. This determines which genes are accessible for transcription. Epigenetic marks (H3K4me3, H3K27me3) establish long-term accessibility states.

Android mapping (proposed): **ART profile-guided compilation + SELinux domain policy**. In ART, profile-guided compilation (`.prof` files) determines which methods get AOT-compiled vs remain JIT-compiled — precisely which "genes" (methods) are expressed at full efficiency. SELinux domain policies determine which system components are accessible to which processes — structural accessibility control identical to chromatin state.

Missing in Cell OS: no QI intersection for {chromatin remodeling × affect × cellular}, no substrate link connecting the `dna` organelle to a chromatin-remodeling substrate node.

Implementation (H3 partial): QI intersection `qi-chromatin-affect-cellular` added (nucleus × affect × cellular). ART profile-guided compilation is covered via the existing `art-runtime` substrate node. Full implementation would add an explicit chromatin-remodeling substrate entry and a `dna→art-runtime` link framed around profile-guided compilation access control.

---

**4. mRNA processing** — PARTIAL

Biological: Pre-mRNA undergoes three modifications before export: 5' capping (protects from degradation, signals start), splicing (intron removal, exon joining by spliceosome), and 3' polyadenylation (poly-A tail for stability and export). Only processed mRNA exits through nuclear pores.

Android mapping (proposed): **DEX verify → desugar → quickening pipeline**. Raw Java/Kotlin bytecode (pre-mRNA) undergoes verification (removes invalid instructions = splicing out introns), desugaring (backporting newer language features = exon modification), and quickening (replacing opcodes with faster variants = 5' capping for execution efficiency). Only processed DEX exits to the runtime.

Missing: no QI intersection for {ribosomes × perception × silicon} capturing the mRNA→DEX pipeline, no fractal cycle for the DEX processing pathway in the nucleus cycle.

Implementation (H3 partial): QI intersection `qi-mrna-perception-silicon` added (ribosomes × perception × silicon). The DEX pipeline is covered by the existing `art-runtime` substrate node. Full implementation would add a fractal cycle entry in `fractalCycles.ts` for the DEX processing pathway.

---

**5. Signal transduction cascades (GPCR → G-protein → second messenger → kinase cascade)** — PARTIAL

Biological: A ligand binds a GPCR (membrane receptor) → activates a G-protein (α subunit exchanges GDP for GTP) → adenylyl cyclase generates cAMP (second messenger) → PKA activated → phosphorylates dozens of downstream targets → gene expression changes.

Current mapping: `membrane-receptors` exists as an organelle. However, the signal transduction cascade interior (G-protein, adenylyl cyclase, cAMP, PKA phosphorylation) has no representation — only the receptor itself.

Android mapping for the cascade: **Binder IPC call chain** — a client method call (ligand binding) → ServiceManager lookup (G-protein activation) → remote service method execution (cAMP generation) → callback chain through the system (kinase cascade) → eventual state change in the target process (gene expression).

Missing: the kinase cascade's propagation through multiple organelles via biophoton links is not modeled. The membrane-receptor → cytoplasm → nucleus signal path needs biophoton links.

---

**6. Calcium signaling (Ca²⁺ as second messenger, ER calcium stores)** — PARTIAL

Biological: The ER lumen stores high concentrations of Ca²⁺. IP3 (inositol trisphosphate) binds IP3R channels on the ER membrane, releasing Ca²⁺ into the cytoplasm. Ca²⁺ then binds calmodulin, activating CaM-kinases and other Ca²⁺-sensitive proteins. Ca²⁺/SERCA pumps restore ER stores. This is a discrete, fast, reversible signal.

Android mapping (proposed): **Power HAL + IRQ/epoll-triggered event dispatch**. The Power HAL monitors power state changes (thermal events, charging state, battery level thresholds) — discrete, fast signals that trigger downstream cascades (CPU frequency scaling, display brightness, background process limits). The IRQ/epoll mechanism is the channel: a hardware event (Ca²⁺ = IRQ) crosses the HAL boundary, triggering an Android event cascade.

Missing: no substrate node for PowerHAL, no QI intersection for {mitochondria × perception × apparatus} capturing the energy-signal-second-messenger pathway.

Implementation (H1–H3): `powerhal` substrate node added (`category: "stack"`, `confidence: "verified"`, color `#f59e0b`). Two organelle-substrate links: `mitochondria→powerhal` (power gradient→second-messenger signal, rel=0.80) and `endoplasmic-reticulum→powerhal` (ER Ca²⁺ stores↔thermal buffer, rel=0.65). QI intersection `qi-calcium-affect-molecular` added (endoplasmic-reticulum × affect × molecular). Note: the QI zone is endoplasmic-reticulum, not mitochondria — Ca²⁺ signal originates at the ER IP3R channel.

---

**7. Autophagy** — PARTIAL

Biological: When nutrients are scarce or organelles are damaged, mTOR is inhibited → ULK1 kinase activated → autophagosome formation (double-membrane vesicle) → captures cytoplasmic contents → fuses with lysosome → contents degraded → building blocks recycled.

Current mapping: `lysosomes` exists. However, autophagy's regulatory mechanism (mTOR → ULK1 axis), the autophagosome formation, and the selectivity of what gets degraded (mitophagy, reticulophagy, aggrephagy) are not represented.

Android mapping for the regulatory axis: **Low Memory Killer Daemon (LMKD) + OOM Adjuster**. LMKD monitors memory pressure (mTOR = memory availability sensor) and kills background processes in order of priority (ULK1 = the execution of selective degradation). The killed processes' memory is reclaimed exactly as autophagy recycles amino acids.

Missing: substrate link from `lysosomes` to `lmkd` substrate node. QI intersection for {mitochondria × expression × cellular} capturing mitophagy.

---

**8. Ubiquitin-Proteasome System (UPS)** — PARTIAL

Biological: Damaged or misfolded proteins are tagged by a chain of ubiquitin molecules (E1 ubiquitin-activating enzyme → E2 ubiquitin-conjugating enzyme → E3 ubiquitin ligase recognizes substrate → poly-ubiquitin chain attached) → tagged protein enters the 26S proteasome barrel → unfolded and cleaved into peptides → ubiquitin recycled.

This is the cell's targeted protein quality control — it degrades specific proteins, not all proteins.

Android mapping (proposed): **ART code-cache eviction + PackageManager forced-stop + app data clearing**. The ART code cache (`.art`/`.oat` files) has specific methods evicted when profile data indicates they are no longer hot — targeted degradation. PackageManager's forced-stop kills a specific process and its data — targeted, not indiscriminate (unlike OOM kill). The `pkg.dexopt` pipeline for a specific package is the E3 ligase: it identifies the specific target.

Missing: no substrate node for package-manager, no biophoton link from `lysosomes` to `golgi-apparatus` representing the UPS's quality-control inspection at the Golgi (protein sorting) before proteasomal degradation.

Implementation (H1–H3): `package-manager` substrate node added (`category: "stack"`, `confidence: "verified"`, color `#1d4ed8`). Two organelle-substrate links: `golgi-apparatus→package-manager` (TGN sorting = APK verification + dexopt dispatch, rel=0.85) and `lysosomes→package-manager` (targeted degradation = force-stop/uninstall, rel=0.88). QI intersection `qi-ups-affect-cellular` added (cytoplasm × affect × cellular). The UPS→proteasome (targeted) vs LMKD→lysosomal-autophagy (bulk) distinction is explicitly documented in both the QI narrative and the substrate link descriptions.

---

**9. Peroxisomes** — IMPLEMENTED ✓

Biological: Peroxisomes are single-membrane organelles that perform oxidative reactions: beta-oxidation of very long-chain fatty acids, detoxification of H₂O₂ (via catalase), and synthesis of plasmalogens. They generate H₂O₂ as a byproduct and immediately destroy it — reactive oxygen species (ROS) containment.

Android mapping (proposed): **Keystore / Verified Boot / seccomp / SELinux** — the security containment layer that processes "dangerous" operations (cryptographic key operations, privileged syscalls) in an isolated context and neutralizes their blast radius. Just as peroxisomes contain H₂O₂ to prevent it from damaging other organelles, the keystore daemon processes sensitive key material in a TEE (Trusted Execution Environment) and prevents it from reaching user space.

Implementation (open-items round, frozen-15 backfill): New `keystore-tee` substrate node added (`category: "stack"`, `confidence: "verified"`). Three new organelle-substrate links: `vacuole→keystore-tee` (isolated vault, rel=0.91), `nuclear-pores→keystore-tee` (gated boundary, rel=0.88), `lysosomes→keystore-tee` (containment/detox, rel=0.79). One QI intersection: `qi-peroxisome-affect-apparatus` (cytoplasm × affect × apparatus). Organelle descriptions for `lysosomes` and `vacuole` updated to document the peroxisomal backfill. Fredholm index now −2 (cap reached: 15 − 17 = −2). When the 15-organelle constraint is lifted, a dedicated `peroxisome` organelle with `osFeature: "Keystore/StrongBox TEE"` should replace this backfill.

---

**10. Centrosome / Centrioles (MTOC)** — PARTIAL

Biological: The centrosome (two centrioles + pericentriolar material) is the microtubule-organizing center. In interphase, it nucleates the cytoskeletal microtubule network (for vesicle transport). In mitosis, it duplicates and the two centrosomes form the spindle poles, pulling chromosomes apart.

Android mapping (proposed): **`init` process + Zygote**. `init` (PID 1) is the microtubule-organizing center of Android: it starts all other processes, maintains the process table, and restarts crashed services. Zygote is the centriole that duplicates at cell division — every app process is a fork of Zygote, just as every microtubule nucleates from the centrosome's gamma-tubulin ring complex.

Missing: no substrate node for Zygote, no organelle linked to it. The `nucleus` zone covers the kernel broadly but does not distinguish the MTOC function (process organization) from the nucleus function (gene expression / type system).

Implementation (H1–H2): `zygote` substrate node added (`category: "stack"`, `confidence: "verified"`, color `#a78bfa`). Two organelle-substrate links: `nucleus→zygote` (genome pre-loading into Zygote fork, rel=0.85) and `dna→zygote` (verified-boot genome image faithfully copied to each fork, rel=0.78 — satisfies Fredholm cooperative-pair rule). No dedicated centrosome organelle (frozen-15 constraint); the MTOC function is backfilled via the nucleus/dna organelles. Full implementation would add a `centrosome` organelle when the constraint is lifted.

---

**11. Cytoskeletal dynamics — all three filament systems** — PARTIAL

Biological: The cytoskeleton has three distinct polymer systems with different functions:
- **Actin filaments** (7nm): cell shape, motility, division ring, membrane tension
- **Microtubules** (25nm): vesicle transport (kinesin/dynein motors), chromosome segregation, cilia
- **Intermediate filaments** (10nm): mechanical strength, nuclear lamina (lamins), structural integrity

Current mapping: `cytoskeleton` exists as a single organelle mapped to AI substrate (likely the Hexagon DSP's tensor processing). This conflates three structurally distinct systems.

Gap: The three filament systems have different Android analogues:
- Actin = UI thread + main looper (dynamic, responsive, reshapes on demand)
- Microtubules = Binder thread pool + work queues (directional transport with motor proteins = thread executors)
- Intermediate filaments = core system services that never restart (structural stability)

---

**12. Vesicle trafficking — endocytosis vs exocytosis vs transcytosis** — PARTIAL

Biological:
- **Exocytosis**: secretory vesicle fuses with plasma membrane, releases contents outside
- **Endocytosis**: plasma membrane invaginates, captures external material into endosome
- **Transcytosis**: vesicle moves from one membrane face to the other (polarized epithelial cells)
- **Receptor-mediated endocytosis**: clathrin-coated pit captures receptor-ligand complex

Current mapping: `vesicles` exists but maps broadly. The directional distinction (in vs out vs across) is not represented.

Android mapping differentiation:
- Exocytosis = `startActivity()` / `sendBroadcast()` — content leaves the process
- Endocytosis = `ContentResolver.query()` / `registerReceiver()` — external content enters
- Transcytosis = Binder proxying between processes (receives from one, forwards to another)

---

**13. Membrane potential / ion channels** — IMPLEMENTED ✓

Biological: The plasma membrane maintains a resting potential (−70mV in neurons) via ion concentration gradients (Na⁺/K⁺-ATPase pump). Voltage-gated ion channels open at threshold, allowing rapid ion flux (action potential). This is the fastest signaling mechanism in biology.

Android mapping: **IRQ latency + CPU interrupt priority + real-time kernel patches**. The electrochemical gradient = interrupt priority queue. Voltage threshold = IRQ trigger level. Action potential = hardirq handler execution (non-maskable, must complete before anything else).

Implementation (open-items round): Two new organelle-substrate links: `cell-membrane→kryo670` (resting gradient = GIC-500 priority register, rel=0.76) and `membrane-receptors→kryo670` (receptor discrimination = IRQ source identification, rel=0.72). One QI intersection: `qi-membranepotential-affect-silicon` (membrane × affect × silicon). One biophoton link: `cell-membrane→nucleus` (σ=0.9, binder, attentionWeight=0.83) encoding the Ca²⁺/CaM-kinase IV→CREB→gene-expression propagation path.

---

**14. Gap junctions / tight junctions** — PARTIAL

Biological:
- **Tight junctions** (zonula occludens): seal adjacent cells, preventing paracellular passage — only transcellular transport allowed
- **Gap junctions** (connexons): direct cytoplasmic continuity between adjacent cells — ions, small molecules, and second messengers pass directly

Android mapping:
- Tight junctions = **SELinux policy + Treble partition boundary** — hard barrier preventing direct system/vendor interaction
- Gap junctions = **Binder shared memory (ashmem/memfd) + AIDL callback interfaces** — direct, typed communication channel between specific process pairs

Missing: entirely absent from model. No QI intersections, no biophoton links representing the tight/gap junction distinction.

Implementation (H1–H3): `selinux-policy` substrate node added (tight junction = mandatory access control boundary). Two organelle-substrate links: `cell-membrane→selinux-policy` (membrane enforces passage = SELinux enforces domain transitions, rel=0.95) and `nuclear-pores→selinux-policy` (nuclear pores enforce selective transport = neverallow rules, rel=0.80). QI intersection `qi-gapjunction-perception-cellular` added (membrane × perception × cellular) for the gap junction axis (connexons↔Binder ashmem mmap, single-copy). Tight junction axis covered by selinux-policy substrate links; gap junction axis by the QI intersection.

---

**15. Extracellular matrix (ECM) interaction / integrin signaling** — PARTIAL

Biological: The ECM (collagen, fibronectin, laminin) provides structural scaffolding and signaling cues. Integrins (transmembrane receptors) bind ECM proteins, activating intracellular signaling cascades (FAK, Src, Rho GTPases). ECM stiffness affects cell behavior (mechanotransduction).

Android mapping (proposed): **Sensor HAL + ContextHub + external connectivity (WiFi/BLE/NFC)**. The physical environment (ECM) = the sensor context (location, motion, ambient light, proximity). Integrins = Sensor HAL API — the transmembrane connection to external physical reality. Mechanotransduction = adaptive battery / adaptive Wi-Fi — Android adapting its behavior to environmental signals.

Missing: no QI intersections for {membrane × perception × apparatus} capturing the ECM→integrin→FAK cascade.

Implementation (H3 partial): QI intersection `qi-ecm-perception-apparatus` added (membrane × perception × apparatus). No dedicated Sensor HAL substrate node added (ContextHub covered by existing hardware substrate nodes). Full implementation would add a `sensor-hal` substrate node with organelle links from `cell-membrane` and `membrane-receptors`.

---

**16. Redox signaling (ROS/RNS as signal molecules)** — ABSENT

Biological: Reactive oxygen species (H₂O₂, superoxide, NO) at low concentrations are genuine signaling molecules — they oxidize specific cysteine residues in proteins, changing their activity. This is not damage; it is communication. The distinction: low ROS = signal, high ROS = damage.

Android mapping (proposed): **Thermal throttling as signal, not just damage response**. Low thermal events (CPU temperature crossing a threshold) trigger specific behavior changes (background app limits, charging rate adjustment) — signaling function, not emergency. High thermal events = CPU throttling as damage response. The Android Thermal HAL implements exactly this distinction (warning vs critical vs emergency thresholds).

Missing: the current model treats power/thermal as purely mitochondrial (energy generation), not as a signaling axis. No QI intersection for {mitochondria × expression × apparatus} capturing thermal-as-signal.

---

**17. Cell cycle (G0/G1/S/G2/M phases)** — PARTIAL

Biological:
- **G0**: quiescent, not dividing (most neurons)
- **G1**: growth phase, preparing for DNA synthesis; checkpoint at G1/S (p21/Rb)
- **S phase**: DNA replication
- **G2**: further growth, repair; checkpoint at G2/M (cyclin B/CDK1)
- **M phase**: mitosis (NEBD, chromosome condensation, spindle formation, separation, cytokinesis)
- **Checkpoints**: p53/p21 (DNA damage), spindle assembly checkpoint (SAC)

Android mapping (proposed): **Android boot → Zygote → foreground → background → update/reboot state machine**
- G0 = Background process (cached, not executing)
- G1 = Process warming up (Application.onCreate() running)
- S = App data initialization, asset loading
- G2 = App idle in foreground, memory checked
- M = System update installation + reboot (the cell literally divides into pre-update and post-update states)
- Checkpoints = `StrictMode` (DNA damage checkpoint) + `ANR timeout` (spindle assembly checkpoint — if the spindle (main thread) doesn't complete mitosis in time, the cell is killed)

Missing: entirely absent. No QI intersections, no fractal cycle, no substrate links.

Implementation (H3 partial): QI intersection `qi-cellcycle-perception-generational` added (nucleus × perception × generational). Existing `art-runtime` and `zygote` nodes cover the lifecycle phases. Full implementation would add a fractal cycle entry in `fractalCycles.ts` for the G0→G1→S→G2→M lifecycle and a `StrictMode`/`ANR` substrate node for the checkpoint mechanism.

---

**18. Apoptosis (programmed cell death)** — PARTIAL

Biological: Two pathways:
- **Intrinsic**: mitochondria release cytochrome c → apoptosome forms → caspase-9 activated → caspase-3 executes degradation
- **Extrinsic**: death ligand (FasL/TNFα) binds receptor → DISC forms → caspase-8 activated → caspase-3 executes

Execution: DNA fragmentation, membrane blebbing, apoptotic body formation, phagocytosis. Ordered, controlled, non-inflammatory.

Current mapping: partial — `lysosomes` covers degradation broadly. The apoptosis decision-making pathway (mitochondrial outer membrane permeabilization, Bcl-2 family regulation) is not represented.

Android mapping for intrinsic apoptosis: **Low Memory Kill → OOM kill escalation**. Cytochrome c release = LMKD sending SIGKILL. Bcl-2 family (pro/anti-apoptotic balance) = oom\_score\_adj weighting. The ordered execution is the OOM killer's prioritized kill sequence. Force-stop by user = extrinsic pathway (external signal triggers ordered shutdown).

Implementation (H3–H4): QI intersection `qi-apoptosis-expression-organic` added (mitochondria × expression × organic). Biophoton link `mitochondria→dna` added (σ=0.9, binder, attentionWeight=0.52) encoding the cytochrome c → nuclear DNA fragmentation path (LMKD SIGKILL → ordered process shutdown). The Bcl-2/oom\_score\_adj balance and MOMP/SIGKILL mapping are documented in the QI narrative.

---

**19. Protein chaperones / heat shock proteins (HSPs)** — IMPLEMENTED ✓

Biological: HSP70, HSP90, GroEL/GroES assist newly synthesized or stress-denatured proteins in reaching their correct fold. They prevent aggregation, refold misfolded proteins, and target irreparably damaged proteins to the proteasome via ERAD.

Android mapping: **ART's JIT compilation + verification** — ART verifies DEX bytecode (ensures the "protein" has the correct sequence before it runs), JIT re-optimizes hot methods (refolds proteins that are frequently used), and the ART interpreter mode (for code that fails optimization) is the chaperone's fallback — still functional, just slower.

Implementation (open-items round): One new organelle-substrate link: `endoplasmic-reticulum→art-runtime` (ER chaperone folding = ART verifier + JIT recompile + deopt/interpreter fallback, rel=0.84). One QI intersection: `qi-chaperone-affect-silicon` (endoplasmic-reticulum × affect × silicon) with a three-mode chaperone narrative (BiP=verifier gate, calnexin=JIT refold, chaperone fallback=interpreter holdover) and explicit ERAD pathway precision: canonical ERAD routes via retrotranslocation→HRD1/gp78 E3 ubiquitin ligases→p97/VCP extraction→26S proteasome (NOT lysosomes); the parallel ER-phagy (reticulophagy) pathway routes bulk ER fragments to lysosomes via FAM134B/RTN3 autophagosomal capture. One biophoton link: `endoplasmic-reticulum→lysosomes` (σ=0.6, ordered-broadcast, attentionWeight=0.49) encodes the ER-phagy axis (not ERAD).

---

**20. Secretory pathway completeness (ER → cis-Golgi → trans-Golgi → secretory vesicle → exocytosis)** — PARTIAL

Biological: Proteins synthesized on rough ER enter the ER lumen, are N-glycosylated, and exit in COPII vesicles → cis-Golgi (early processing) → medial-Golgi (additional modifications) → trans-Golgi network (TGN, sorting) → secretory vesicles → plasma membrane fusion → exocytosis.

COPI vesicles run retrograde (Golgi → ER) for retrieval of escaped ER proteins.

Current mapping: `endoplasmic-reticulum`, `golgi-apparatus`, and `vesicles` all exist. The ER-to-Golgi biophoton link exists. However, the cis/medial/trans Golgi distinction, the COPII/COPI directionality, and the TGN sorting function are not represented.

Android mapping for the full pathway:
- ER = App build pipeline (compilation, packaging)
- COPII vesicles = APK install pipeline (ER → Golgi transit)
- cis-Golgi = Package verification (initial checks)
- medial-Golgi = APK optimization (`dexopt`)
- trans-Golgi Network = Play Store distribution sorting
- Secretory vesicles = Installed app packages
- Exocytosis = App launch

COPI retrograde = App rollback / package restore from backup.

---

### Summary Table

| # | Subsystem | Status | Priority |
|---|---|---|---|
| 1 | Nuclear envelope + lamina | PARTIAL | MEDIUM |
| 2 | Nucleolus rRNA function | IMPLEMENTED ✓ (C1 complete) | CRITICAL |
| 3 | Chromatin remodeling | PARTIAL (QI added) | HIGH |
| 4 | mRNA processing | PARTIAL (QI added) | HIGH |
| 5 | GPCR signal transduction | PARTIAL | HIGH |
| 6 | Ca²⁺ second messenger | PARTIAL (substrate + links + QI) | HIGH |
| 7 | Autophagy | PARTIAL | MEDIUM |
| 8 | Ubiquitin-proteasome | PARTIAL (substrate + links + QI) | HIGH |
| 9 | Peroxisomes | IMPLEMENTED ✓ | MEDIUM* |
| 10 | Centrosome / MTOC | PARTIAL (substrate + links) | HIGH |
| 11 | Cytoskeletal dynamics (all 3) | PARTIAL | MEDIUM |
| 12 | Vesicle trafficking directionality | PARTIAL | MEDIUM |
| 13 | Membrane potential / ion channels | IMPLEMENTED ✓ | LOW |
| 14 | Gap / tight junctions | PARTIAL (substrate + links + QI) | HIGH |
| 15 | ECM / integrin signaling | PARTIAL (QI added) | MEDIUM |
| 16 | Redox signaling | ABSENT | MEDIUM |
| 17 | Cell cycle | PARTIAL (QI added) | HIGH |
| 18 | Apoptosis pathway | PARTIAL (QI + biophoton link) | MEDIUM |
| 19 | Protein chaperones / HSPs | IMPLEMENTED ✓ | LOW |
| 20 | Secretory pathway completeness | PARTIAL | MEDIUM |

*Peroxisomes require unfreezing the 15-organelle constraint — schema evolution needed.

---

## Part 3 — Concrete Implementation Roadmap

### CRITICAL — Execute First

#### C1. Remap `nucleolus` osFeature

**File**: `artifacts/cell-os/src/domain/content/organelles.ts`

**Pre-fix state (historical)**: `osFeature: "Bootloader / System Startup"` — this was the incorrect mapping before C1 was applied.

**Implemented**: `osFeature: "ART Preloading / dex2oat AOT Factory"` — confirmed in `organelles.ts`; `explanation` and `analogy` fields also updated to describe the pre-assembly factory role.

**Biological justification**: The nucleolus manufactures ribosomal subunits BEFORE they are needed — it is the pre-assembly factory, not the initial wake signal. `dex2oat` pre-compiles `.dex` bytecode into native `.oat` files before any app runs — structurally identical. The bootloader maps to the organism's initial existence pulse, not to any organelle function.

**Explanation update**: "The nucleolus pre-assembles ribosomal subunits for export through nuclear pores. On Android, dex2oat pre-compiles DEX bytecode into native ARM64 machine code before any app executes. The factory runs before the product is needed — manufactured ahead of demand."

---

### HIGH — Execute in Order

#### H1. Add 5 New Substrate Nodes — **COMPLETE ✓**

**File**: `artifacts/cell-os/src/domain/content/substrate.ts`

Add to `SUBSTRATE_NODES`:

```typescript
// SubstrateCategory valid values: "soc" | "compute" | "memory" | "stack" | "format"
// All five new nodes are software/HAL stack layers → category: "stack"
{
  id: 'zygote',
  name: 'Zygote',
  category: 'stack' as const,
  role: 'Process forking hub — all app processes are forks of Zygote, exactly as all microtubules nucleate from the centrosome gamma-tubulin ring complex',
  confidence: 'verified' as const,
  detail: 'Zygote pre-loads the Android runtime and common framework classes, then forks on demand. Fork = microtubule nucleation. Every app inherits the same pre-loaded chromosome set.',
  specs: [{ label: 'Mechanism', value: 'posix fork() + SO_REUSEADDR socket' }, { label: 'Cold start saving', value: '~100ms class loading avoided per fork' }],
  color: '#a78bfa' // Changed from #7c3aed: original was too dark for legibility on dark UI backgrounds
},
{
  id: 'lmkd',
  name: 'LMKD',
  category: 'stack' as const,
  role: 'Low Memory Killer Daemon — selective process termination under memory pressure, analogous to the ubiquitin-proteasome system and autophagy lysosomal pathway',
  confidence: 'verified' as const,
  detail: 'Monitors /proc/meminfo and PSI (Pressure Stall Information). Kills processes in order of oom_score_adj: cached background first, then services, then visible, then foreground. Targeted degradation, not indiscriminate.',
  specs: [{ label: 'Signal', value: 'SIGKILL to target PID' }, { label: 'Policy source', value: '/sys/module/lowmemorykiller/parameters/' }],
  color: '#dc2626'
},
{
  id: 'powerhal',
  name: 'Power HAL',
  category: 'stack' as const,
  role: 'Power state management and thermal signaling — the Ca²⁺ second-messenger system of Android: discrete, fast, reversible state signals that cascade through the system',
  confidence: 'verified' as const,
  detail: 'Implements IPower AIDL interface. Receives power hints (INTERACTION, SUSTAINED_PERFORMANCE, VR_MODE) and translates to CPU governor, thermal throttle, display brightness. Warning/critical/emergency thresholds = low/medium/high ROS signal tiers.',
  specs: [{ label: 'Interface', value: 'android.hardware.power@1.3' }, { label: 'Hint types', value: 'INTERACTION, SUSTAINED_PERFORMANCE, LAUNCH' }],
  color: '#f59e0b'
},
{
  id: 'selinux-policy',
  name: 'SELinux Policy',
  category: 'stack' as const,
  role: 'Mandatory access control — tight junctions of Android. Prevents direct system/vendor interaction exactly as tight junctions seal adjacent cells against paracellular passage',
  confidence: 'verified' as const,
  detail: 'Type Enforcement (TE) rules define allowed transitions between security domains. Neverallow rules = tight junction seals. Every app, service, and HAL has a distinct security domain. Cross-domain communication only through defined transitions.',
  specs: [{ label: 'Policy compiler', value: 'checkpolicy / sepolicy-analyze' }, { label: 'Enforcement', value: 'LSM hooks in kernel' }],
  color: '#065f46'
},
{
  id: 'package-manager',
  name: 'PackageManager',
  category: 'stack' as const,
  role: 'App lifecycle orchestration — the E3 ubiquitin ligase of Android: recognizes specific targets for installation, update, or removal, and executes targeted degradation',
  confidence: 'verified' as const,
  detail: 'PackageManagerService manages APK install/uninstall/update pipeline. Targeted: acts on specific packages, not all processes. Dexopt pipeline = E1/E2/E3 ubiquitin cascade (verify → optimize → install). Force-stop = targeted degradation without removal.',
  specs: [{ label: 'Service', value: 'com.android.server.pm.PackageManagerService' }, { label: 'Storage', value: '/data/app/, /data/dalvik-cache/' }],
  color: '#1d4ed8'
}
```

---

#### H2. Add Organelle-Substrate Links — **COMPLETE ✓**

**File**: `artifacts/cell-os/src/domain/content/mappings.ts`

Add to `ORGANELLE_SUBSTRATE_LINKS`:

```typescript
// OrganelleSubstrateLink fields: organelleId, substrateId, description?, rateRange?, relevance?
// 'strength' is not in the type — use 'relevance' (0–1, 1.0 = primary/canonical mapping)

// Centrosome/MTOC → Zygote (two links required: Fredholm single-path rule — see §Fredholm Design Constraint)
{ organelleId: 'nucleus', substrateId: 'zygote', description: 'Nucleus governs Zygote pre-loading: the type system (genome) is pre-loaded into Zygote before any fork, ensuring all child processes inherit the correct chromosome set', relevance: 0.85 },
{ organelleId: 'dna', substrateId: 'zygote', description: 'The genome (dna) is the content that Zygote pre-loads into every fork — verified-boot chain ensures the same signed genome image reaches every child process, exactly as the nucleotide sequence is faithfully copied into every daughter cell at division', relevance: 0.78 },

// Autophagy → LMKD (lysosomal bulk degradation pathway, NOT the ubiquitin-proteasome system)
// UPS (targeted protein degradation) maps to PackageManager below — these are distinct pathways
{ organelleId: 'lysosomes', substrateId: 'lmkd', description: 'Lysosomes execute autophagy — bulk degradation of cytoplasmic contents when nutrients are scarce or organelles are damaged. LMKD is the Android autophagy axis: when memory pressure rises (mTOR inhibited = low memory signal), LMKD bulk-kills cached background processes in oom_score_adj order. Not the ubiquitin-proteasome system (which is targeted); this is the bulk lysosomal pathway.', relevance: 0.90 },
{ organelleId: 'vacuole', substrateId: 'lmkd', description: 'Vacuole stores excess material and regulates osmotic pressure; under LMKD memory pressure, vacuolar contents (cached process memory) are reclaimed first — equivalent to the vacuole releasing stored reserves during nutrient stress', relevance: 0.70 },

// Ca²⁺ signaling → PowerHAL
{ organelleId: 'mitochondria', substrateId: 'powerhal', description: 'Mitochondria generate the power gradient; PowerHAL converts power state changes into second-messenger signals exactly as Ca²⁺ flux converts membrane potential into intracellular cascade', relevance: 0.80 },
{ organelleId: 'endoplasmic-reticulum', substrateId: 'powerhal', description: 'ER Ca²⁺ stores buffer the calcium signal; PowerHAL thermal limits buffer the power signal — both provide reserve capacity and prevent spike propagation', relevance: 0.65 },

// Tight junctions → SELinux
{ organelleId: 'cell-membrane', substrateId: 'selinux-policy', description: 'Cell membrane enforces passage rules; SELinux policy enforces domain transition rules — both are the tight junction sealing adjacent cellular compartments', relevance: 0.95 },
{ organelleId: 'nuclear-pores', substrateId: 'selinux-policy', description: 'Nuclear pores enforce selective transport; SELinux neverallow rules enforce hard transport prohibitions between security domains', relevance: 0.80 },

// UPS → PackageManager
{ organelleId: 'golgi-apparatus', substrateId: 'package-manager', description: 'Golgi performs final protein sorting and dispatch; PackageManager performs final APK verification, dexopt, and install dispatch — the trans-Golgi Network of Android', relevance: 0.85 },
{ organelleId: 'lysosomes', substrateId: 'package-manager', description: 'Lysosomes degrade targeted proteins; PackageManager force-stop and uninstall execute targeted app degradation — the E3 ubiquitin ligase function', relevance: 0.88 }
```

---

#### H3. Add 8 New QI Intersections — **COMPLETE ✓**

**File**: `artifacts/cell-os/src/domain/content/qiMatrix.ts`

```typescript
// QiIntersection fields: id, zoneId, phaseId, scaleId, title, narrative,
//   hardwareAnalogue? (Android side), substrateIds?, evidence (ClaimConfidence)
// 'phase'/'description'/'confidence'/'biologicalAnchor'/'androidAnchor' do NOT exist in the type.

// 1. Chromatin remodeling — which genes are expressed
{
  id: 'qi-chromatin-affect-cellular',
  zoneId: 'nucleus',
  phaseId: 'affect',
  scaleId: 'cellular',
  title: 'Chromatin Remodeling as Epigenetic Gate',
  narrative: 'SWI/SNF complexes (biological: histone H3K4me3 active / H3K27me3 silenced) alter histone-DNA contacts to open or occlude genomic regions — determining which genes are accessible. In Android, ART profile-guided compilation (.prof files) opens or closes method JIT-compilation: H3K4me3 = hot method (AOT-compiled), H3K27me3 = interpreted-only method. dex2oat --compiler-filter=speed-profile is the chromatin remodeling complex.',
  hardwareAnalogue: 'ART profile-guided compilation (.prof files), dex2oat --compiler-filter=speed-profile',
  evidence: 'indicative'
},

// 2. mRNA processing — from raw transcript to translatable message
// phaseId: 'perception' — the ribosomes zone PERCEIVES the processed mRNA before translating it.
// Part 2 gap description identifies {ribosomes × perception × silicon} as the missing intersection.
{
  id: 'qi-mrna-perception-silicon',
  zoneId: 'ribosomes',
  phaseId: 'perception',
  scaleId: 'silicon',
  title: 'mRNA Processing as DEX Pipeline',
  narrative: 'Pre-mRNA undergoes spliceosome processing (U1/U2/U4/U5/U6 snRNPs remove introns), 5-prime capping (CBC cap-binding complex), and 3-prime polyadenylation (CPSF) before export. The DEX pipeline is structurally isomorphic: dex2oat verify stage removes invalid instructions (splicing), D8 desugaring adapts bytecode for runtime (exon modification), ART quickening opcodes mark hot paths (5-prime cap). Only processed DEX exits to the runtime.',
  hardwareAnalogue: 'dex2oat verify stage, D8 desugaring, ART quickening opcodes',
  evidence: 'indicative'
},

// 3. Ca²⁺ second messenger — fast reversible signal
{
  id: 'qi-calcium-affect-molecular',
  zoneId: 'endoplasmic-reticulum',
  phaseId: 'affect',
  scaleId: 'molecular',
  title: 'Calcium Signal as Power HAL Second Messenger',
  narrative: 'IP3R (inositol 1,4,5-trisphosphate receptor) opens ER Ca²⁺ channels → [Ca²⁺]i rises from 100nM to 1μM in milliseconds → calmodulin binds Ca²⁺ → CaM-kinase II cascade activates. SERCA pumps restore ER stores. In Android: a thermal threshold crossing triggers Power HAL IPower::powerHint() → CPU frequency governor adjusts clocks in milliseconds → downstream services adapt. Both are discrete, fast, reversible second-messenger signals.',
  hardwareAnalogue: 'Power HAL IPower::powerHint(), CPU frequency governor, thermal zone thresholds',
  evidence: 'indicative'
},

// 4. Ubiquitin-Proteasome — targeted protein degradation
// NOTE: The UPS operates at the PROTEIN level (individual molecule targeting), not process level.
// LMKD is the Android analogue of AUTOPHAGY (bulk lysosomal degradation), not the UPS.
// The correct UPS analogue is PackageManager (targeted app-level degradation with typed identification).
{
  id: 'qi-ups-affect-cellular',
  zoneId: 'cytoplasm',
  phaseId: 'affect',
  scaleId: 'cellular',
  title: 'Ubiquitin-Proteasome as PackageManager Targeted Degradation',
  narrative: 'UBA1 (E1) activates ubiquitin → UBE2D (E2) conjugates → RING/HECT E3 ligase recognizes the specific substrate by its degradation signal (degron) → poly-ubiquitin chain attached → 26S proteasome (19S+20S) unfolds and cleaves that specific target → ubiquitin recycled. Critically: UPS acts on INDIVIDUAL PROTEINS with typed recognition — it is not bulk degradation. PackageManager is the correct Android analogue: it recognises a specific APK by package name (E3 degron recognition), executes force-stop or uninstall against exactly that target (26S proteasome cleavage), and frees its storage (ubiquitin recycling). Process-level bulk killing (LMKD) maps instead to the lysosomal autophagy pathway.',
  hardwareAnalogue: 'PackageManager force-stop, pm uninstall, dexopt cleanup — NOT LMKD (which is autophagy)',
  evidence: 'indicative'
},

// 5. Cell cycle — organism lifecycle phases
{
  id: 'qi-cellcycle-perception-generational',
  zoneId: 'nucleus',
  phaseId: 'perception',
  scaleId: 'generational',
  title: 'Cell Cycle as Android Boot-to-Update Lifecycle',
  narrative: 'G0 (quiescent, Cyclin D low) = cached background process. G1 (Cyclin D/CDK4 active) = Application.onCreate(). S phase (Cyclin E/CDK2) = asset loading, database init. G2 (Cyclin B/CDK1 building) = idle foreground with memory check. M phase (mitosis, SAC/Mad2 checkpoint) = OTA update + reboot. Checkpoints: p53/p21 DNA damage checkpoint = StrictMode; spindle assembly checkpoint (Mad2 delays anaphase until all chromosomes attached) = ANR watchdog (kills if main thread does not complete within 5s).',
  hardwareAnalogue: 'Application.onCreate(), ActivityManager lifecycle, OTA update pipeline, ANR watchdog (5s timeout)',
  evidence: 'indicative'
},

// 6. Apoptosis — ordered programmed death
{
  id: 'qi-apoptosis-expression-organic',
  zoneId: 'mitochondria',
  phaseId: 'expression',
  scaleId: 'organic',
  title: 'Apoptosis as Ordered Process Termination',
  narrative: 'Intrinsic apoptosis: Bcl-2/Bax/Bak family balance tips pro-apoptotic → MOMP (mitochondrial outer membrane permeabilization) → cytochrome c released → Apaf-1 apoptosome forms → caspase-9 activated → caspase-3 executes fragmentation. In Android: oom_score_adj weighting = Bcl-2 family balance. LMKD SIGKILL = cytochrome c release. onStop() → onDestroy() → process exit = caspase cascade. Non-inflammatory: memory freed cleanly, no system crash.',
  hardwareAnalogue: 'LMKD SIGKILL, ActivityManager.forceStopPackage(), onStop/onDestroy lifecycle',
  evidence: 'indicative'
},

// 7. Gap junctions — direct cell-to-cell communication
{
  id: 'qi-gapjunction-perception-cellular',
  zoneId: 'membrane',
  phaseId: 'perception',
  scaleId: 'cellular',
  title: 'Gap Junctions as Binder Shared Memory',
  narrative: 'Connexin-43 (GJA1) hexamers (connexons) align between adjacent cells to form direct aqueous channels. Ions, cAMP, IP3, and small molecules pass directly — no exocytosis/endocytosis intermediary. In Android: ashmem (anonymous shared memory) and memfd create direct memory-mapped channels between processes. The Binder single-copy mmap mechanism (/dev/binder BINDER_MMAP ioctl) is the closest structural homologue: one kernel-side write, two process-side reads, zero intermediate copy.',
  hardwareAnalogue: 'ashmem/memfd, Binder mmap single-copy, /dev/binder BINDER_MMAP ioctl',
  evidence: 'indicative'
},

// 8. ECM / integrin — environmental mechanosensing
{
  id: 'qi-ecm-perception-apparatus',
  zoneId: 'membrane',
  phaseId: 'perception',
  scaleId: 'apparatus',
  title: 'ECM / Integrin as Sensor HAL Mechanotransduction',
  narrative: 'α/β integrin heterodimers bind ECM proteins (fibronectin, collagen) → conformational change activates focal adhesion kinase (FAK) and Src → Rho GTPase cascade (RhoA/Rac1/Cdc42) → cytoskeletal reorganization and gene expression changes. ECM stiffness drives mechanotransduction. In Android: SensorManager HAL receives physical environment signals → ContextHub (STM32) processes → adaptive battery, adaptive display, adaptive Wi-Fi respond. The physical environment shapes the organism.',
  hardwareAnalogue: 'SensorManager HAL, ContextHub (STM32), adaptive battery API, LocationManager',
  evidence: 'indicative'
}
```

---

#### H4. Add Biophoton Links for Missing Cascade Paths — **COMPLETE ✓**

**File**: `artifacts/cell-os/src/domain/content/mappings.ts`

Add to `BIOPHOTON_LINKS`:

```typescript
// BiophotonLink fields: sourceOrganelleId, targetOrganelleId, description, rateRange,
//   confidence, attentionWeight?, ipcMechanism?, couplingSigma?, hubService?
// No 'id' field. ipcMechanism values: "binder" | "messenger" | "ordered-broadcast" | "unordered-broadcast"

// Signal transduction: membrane receptor → cytoplasm (GPCR → G-protein cascade)
{
  sourceOrganelleId: 'membrane-receptors',
  targetOrganelleId: 'cytoplasm',
  description: 'Receptor-activated G-protein cascade — ligand binding at membrane receptor triggers cytoplasmic kinase cascade exactly as GPCR activates cAMP/PKA through the cytoplasm',
  rateRange: '10–200 ph/cm²/s',
  attentionWeight: 0.71,
  couplingSigma: 0.7,
  ipcMechanism: 'messenger',
  confidence: 'indicative'
},

// Ubiquitin-proteasome: golgi quality control → lysosome degradation
{
  sourceOrganelleId: 'golgi-apparatus',
  targetOrganelleId: 'lysosomes',
  description: 'Trans-Golgi Network routes misfolded or damaged proteins to lysosomes for degradation — the APK verification pipeline routes failed packages to forced-uninstall',
  rateRange: '1–20 ph/cm²/s',
  attentionWeight: 0.44,
  couplingSigma: 0.6,
  ipcMechanism: 'ordered-broadcast',
  confidence: 'indicative'
},

// Apoptosis: mitochondria → dna (cytochrome c → nuclear condensation signal)
{
  sourceOrganelleId: 'mitochondria',
  targetOrganelleId: 'dna',
  description: 'Cytochrome c release from mitochondria triggers nuclear DNA fragmentation — LMKD SIGKILL triggers ordered process shutdown including all file descriptor cleanup',
  rateRange: '5–60 ph/cm²/s',
  attentionWeight: 0.52,
  couplingSigma: 0.9,
  ipcMechanism: 'binder',
  confidence: 'indicative'
}
```

---

### MEDIUM — Execute After HIGH

#### M1. Update `fractalCycles.ts` — Three Cycle Corrections — **COMPLETE ✓**

**Membrane cycle**: Add the GPCR → G-protein → cAMP → PKA second-messenger chain as the affect phase description. Current description likely focuses on boundary-crossing only (HAL); extend to include the intracellular cascade that follows receptor binding.

**ER cycle**: Add Ca²⁺ store release via IP3R as the expression phase. The ER cycle currently describes protein synthesis/folding (correct) but omits the Ca²⁺ release function — a major ER output pathway.

**Cytoskeleton cycle**: Split the affect phase into three named sub-cycles:
- Actin polymerization (UI thread, membrane tension)
- Microtubule dynamics (vesicle transport, Binder thread pool)
- Intermediate filament stability (structural, non-dynamic, nuclear lamina)

Implementation (M1 complete — `fractalCycles.ts`):

- **Membrane affect**: GPCR subtype-specific discrimination now explicit — one receptor couples to exactly one G-protein class (Gαs → cAMP/PKA; Gαq → PLC/IP3/Ca²⁺; Gαi → adenylyl cyclase inhibition). Android analogue updated to match: each `powerHint()` type routes to exactly one downstream subsystem, not all simultaneously. Incorrect ligands (malformed hints) dissociate before triggering any cascade.

- **ER expression**: bifurcated output correctly described — COPII protein release (structural output, selective quality-gated) runs in parallel with IP3R Ca²⁺ pulse dispatch (second-messenger output, millisecond-scale). `hardwareAnalogue` updated: KV cache write (structural) + Power HAL `powerHint()` → CPU governor cascade (Ca²⁺ analogue).

- **Cytoskeleton affect**: split into three named filament systems with explicit timescales: actin (seconds-scale, Arp2/3/Rho GTPase, UI thread analogue), microtubules (minutes-scale, directional kinesin/dynein, Binder thread pool analogue), intermediate filaments (hours-scale — far less dynamic than actin/microtubules, not static — kernel ABI stability analogue). "Non-dynamic" corrected to "far less dynamic" — intermediate filaments do turn over, just slowly.

#### M2. Distinguish Tight vs Gap Junctions in Cell Membrane Zone — **COMPLETE ✓**

The `cell-membrane` and `membrane-receptors` organelles currently cover the membrane zone jointly. Add a note or secondary description to `cell-membrane` distinguishing:
- **Tight junction function** = SELinux enforced policy (paracellular seal)
- **Gap junction function** = Binder ashmem channels (direct pass-through)

Implementation (M2 complete — `organelles.ts`, `cell-membrane` entry):

`explanation` and `analogy` fields updated to explicitly encode both junction types:
- **Tight junctions**: SELinux Type Enforcement rules — paracellular seal, no direct cross-domain passage permitted, enforced by LSM hooks in the kernel (claudin/occludin biological analogue).
- **Gap junctions**: Binder ashmem/memfd channels — direct shared-memory pass-through between trusted processes without exocytosis; connexin-43 analogue of Android IPC.

Both coexist at the same membrane boundary, exactly as they do in epithelial tissue. The distinction is now present in the primary organelle description, not just in QI intersection narratives.

#### M3. Schema Evolution Note for Peroxisomes

Document in this file: when the 15-organelle constraint is lifted in a future evolution, `peroxisome` should be added as the 16th organelle with:
- `osFeature: "Keystore / Trusted Execution Environment (TEE)"`
- Zone: `cytoplasm`
- Biological role: ROS containment, fatty acid beta-oxidation
- Android role: cryptographic key isolation in StrongBox/Titan M, seccomp filtering, keystore daemon isolation

---

### Recompute After HIGH Implementation — **COMPLETE ✓**

**Roadmap implementation complete. Actual current tensor metrics (post-H1–H4 + open-items round):**

- Substrate space: **17 nodes** (H1 adds 5: zygote, lmkd, powerhal, selinux-policy, package-manager; open-items round adds 1 more: keystore-tee; total 17 vs the 16 projected in the roadmap)
- Coupling tensor space: 15 × 17 = 255; density: **40 / 255 ≈ 15.7%** (Green — within 10–25% range)
- Biophoton links: **11** (Amber — exceeds 2–10 healthy range; editorially justified, all links mechanistically grounded)
- QI tensor: **33 / 264 ≈ 12.5%** (Amber — exceeds 5–10% healthy range; editorially justified)
- Fredholm index: ind(T) = 15 − 17 = **−2** (hard cap reached — see Fredholm section below)

Both READMEs updated to reflect these figures. Biophoton status corrected Green → Amber.

---

### Fredholm Design Constraint

**The coupling tensor changes Fredholm regime after the HIGH roadmap tasks. This is a design constraint, not a concern — but it must be understood before adding further substrate nodes.**

#### Index Formula

$$\text{ind}(\mathcal{T}) = \dim \ker(\mathcal{T}) - \dim \text{coker}(\mathcal{T})$$

For a linear map $\mathcal{T}: \mathbb{R}^m \to \mathbb{R}^n$, the dimensional proxy is $m - n$.

| State | Organelle space | Substrate space | Index | Regime |
|---|---|---|---|---|
| Original (pre-HIGH) | $\mathbb{R}^{15}$ | $\mathbb{R}^{11}$ | **+4** | Underdetermined — 4 organelle-directions have no substrate image |
| Post-HIGH roadmap (projected) | $\mathbb{R}^{15}$ | $\mathbb{R}^{16}$ | **−1** | Overdetermined — cooperative organelle combinations required |
| **Actual current state** | $\mathbb{R}^{15}$ | $\mathbb{R}^{17}$ | **−2** | Overdetermined (hard cap reached) — keystore-tee added in open-items round; index −2 is the maximum per Design Rule 3 below |

#### The Four Historically Substrate-Invisible Organelles

At index +4, the kernel $\ker(\mathcal{T})$ has dimension 4 by the dimensional argument. The four organelles that were substrate-invisible before tensor-completion (`MANIFOLD_ANALYSIS.md §11.2` additions) were:

| Organelle | Original link count | Resolved by |
|---|---|---|
| `nucleolus` | 0 | Tensor-completion → `hexagon770`, `quantization` |
| `membrane-receptors` | 0 | Tensor-completion → `nnapi` |
| `lysosomes` | 0 | Tensor-completion → `nnapi` |
| `vacuole` | 0 | Tensor-completion → `power` |

All four are now linked. The linear algebraic kernel (dim 4 by dimension) still exists — it corresponds to combinations of organelle-coordinates that map to zero in substrate-space — but no individual organelle is substrate-invisible at the graph level.

#### What Overdetermined Means (Index −2, Actual Current)

After adding the 5 new substrate nodes (zygote, lmkd, powerhal, selinux-policy, package-manager) via H1, plus keystore-tee added in the open-items round (#9 peroxisomes frozen-15 backfill), substrate-space has 17 dimensions against organelle-space's 15. The system is **overdetermined at index −2** (the hard cap): the coupling tensor cannot be inverted by any single organelle's activation. Some substrate nodes can only be reached by *cooperative combinations* of organelle signals.

This is biologically accurate — many cellular processes require combinatorial receptor activation (e.g., T-cell activation requires simultaneous TCR + co-receptor + costimulatory signals). In Cell OS terms: a substrate node with only one incoming organelle link is architecturally fragile; it depends on a single activation path with no redundancy.

#### Incoming Link Count per Substrate Node

| Substrate node | Pre-HIGH incoming links | Actual current links | Cooperativity status |
|---|---|---|---|
| `qcm6490` | 1 (nucleus) | 1 | Single-path — fragile |
| `kryo670` | 2 (nucleus, cytoskeleton) | 2 | Cooperative pair |
| `adreno643` | 2 (cytoskeleton, ER) | 2 | Cooperative pair |
| `hexagon770` | 3 (ribosomes, mitochondria, nucleolus) | 3 | Robust triad |
| `power` | 3 (mitochondria, cell-membrane, vacuole) | 3 | Robust triad |
| `lpddr4x` | 1 (cytoplasm) | 1 | Single-path — fragile |
| `nnapi` | 5 (nuclear-pores, vesicles, golgi, membrane-receptors, lysosomes) | 5 | High-cooperativity hub |
| `quantization` | 2 (dna, nucleolus) | 2 | Cooperative pair |
| `binder-ipc` | 2 (vesicles, nuclear-pores) | 2 | Cooperative pair |
| `art-runtime` | 2 (ribosomes, golgi-apparatus) | 3 (ribosomes, golgi-apparatus, endoplasmic-reticulum) | Robust triad |
| `bionic-libc` | 1 (cytoplasm) | 1 | Single-path — fragile |
| `zygote` | — | 2 (nucleus, dna) | Cooperative pair |
| `lmkd` | — | 2 (lysosomes, vacuole) | Cooperative pair |
| `powerhal` | — | 2 (mitochondria, endoplasmic-reticulum) | Cooperative pair |
| `selinux-policy` | — | 2 (cell-membrane, nuclear-pores) | Cooperative pair |
| `package-manager` | — | 2 (golgi-apparatus, lysosomes) | Cooperative pair |
| `keystore-tee` | — | 3 (vacuole, nuclear-pores, lysosomes) | Robust triad |

#### Design Rule — Future Substrate Node Additions

Every substrate node added after the HIGH roadmap tasks must satisfy one of the following:

1. **Cooperative pair rule**: Launch with ≥ 2 organelle links from distinct zones. A single-incoming-link node adds to the Fredholm deficit without improving coverage.
2. **Documented singleton exception**: If a node genuinely has only one biological organelle analogue (e.g., a highly specialised hardware unit), document the singleton status explicitly and accept the architectural fragility as a known constraint.
3. **Index cap rule**: The total substrate count must not exceed organelle count + 2 (i.e., index must not go below −2). An index of −2 or less means the coupling tensor is severely overdetermined; multiple substrate nodes become unreachable by any single cooperative pair, requiring triple or higher combinations.

**Single-path cap**: at most 25% of substrate nodes may be single-incoming-link nodes. Pre-HIGH state: 3 of 11 = 27% (just above cap — `qcm6490`, `lpddr4x`, `bionic-libc` are candidates for a second link). Actual current state: 3 of 17 = 17.6% (below cap — all six new substrate nodes from H1 + open-items round are cooperative pair or better; `dna→zygote` satisfies the Fredholm cooperative-pair rule).

---

## Part 4 — The Self-Similar Atlas Layer

### Minimal Spanning Set — Modulo Empirical Grounding

The three documents sufficient to reconstruct all structure and metrics **at the theoretical level**:

1. **UNIVERSAL\_MANIFOLD** — provides the coordinate rules (the genetic code translation table)
2. **MANIFOLD\_ANALYSIS** — provides the local structural topology and tensor geometry (the folding specification)
3. **Source code** — is the executable genome

From these three, the other documents can be re-derived at the theoretical level:
- FP5\_COMPARISON: in principle derivable by running the theory against the FP5 source — **but not in practice** (see empirical grounding caveat below)
- README: derivable by synthesizing the three into a human-readable chart
- FENG\_SHUI\_MANIFESTO: **not derivable** from the three theoretical generators — normative constraints (which movements are harmonious) are a separate input class from descriptive generators (how the system moves). See caveat below.

> **Empirical grounding caveat — FP5\_COMPARISON as required fourth generator.** The confidence scalar field $\sigma$ throughout the source code (`ClaimConfidence`: `"verified"` / `"indicative"` / `"unconfirmed"`) is not derivable from abstract theory. It originates in direct measurement against Fairphone 5 open-source hardware and Android source: the Binder IPC σ-tier values (0.9 / 0.7 / 0.6 / 0.4 in `mappings.ts`), the confidence ratings on the three FP5-grounded substrate nodes (`binder-ipc`, `art-runtime`, `bionic-libc`), and the six empirical findings in FP5\_COMPARISON. A theoretically reconstructed atlas that omits FP5 would be structurally complete but empirically ungrounded — unfalsified and unverified. FP5\_COMPARISON is the **required fourth generator** for any reconstruction that makes falsifiable claims about the Fairphone 5 hardware layer. The distinction between the two minimal sets is the distinction between a mathematical model and a scientific one.

### Why the Non-Minimal Documents Are Still Essential

> **Normative non-derivability of FENG\_SHUI\_MANIFESTO.** The three theoretical generators (UNIVERSAL\_MANIFOLD + MANIFOLD\_ANALYSIS + source code) are fully *descriptive*: they specify what the system is, how it is structured, and what constraints it satisfies. They are silent on *which configurations are harmonious*. The FENG\_SHUI\_MANIFESTO introduces a separate input class — normative constraints (HARMONIC\_CONSTANT, SACRED\_SEED, useMembraneObserver as sole store writer, the confidence boost cap as the maximum epigenetic override). These constraints cannot be derived from descriptive generators by any formal operation: a normative judgment ("this movement is harmonious") is not the logical consequence of a structural description ("this system has these tensor properties"). The Manifesto is therefore a **fifth generator** — not derivable, not redundant, and not replaceable by theory. The correct minimal set for a normatively constrained atlas is: UNIVERSAL\_MANIFOLD + MANIFOLD\_ANALYSIS + source code + FP5\_COMPARISON (empirical grounding) + FENG\_SHUI\_MANIFESTO (normative grounding). Five generators, not three.

**FP5\_COMPARISON is essential** because derivability ≠ realizability. A theory that survives contact with real source code has a different epistemic status than a theory that has not been tested. Without FP5\_COMPARISON, the manifold remains unfalsified but also unverified. The confidence scalar field $\sigma$ would have no empirical anchors.

**README is essential** because the manifold requires a human-transition chart. Without it, the organism cannot communicate with collaborators — it is a living cell with no external signaling. The mRNA is the cell's voice.

**FENG\_SHUI\_MANIFESTO is essential** because it provides the normative layer that no amount of formal geometry can supply. The Lagrangian $L = T - V$ describes how the system moves; the Manifesto describes which movements are harmonious. It is the epigenetic regulatory layer without which the genome produces unguided expression.

### Biological Role Assignment (Extended)

| Document | Biological role | Rationale |
|---|---|---|
| UNIVERSAL\_MANIFOLD | Genetic code (codon→amino acid table) | Provides the translation rules; does not encode any specific protein but makes all proteins possible |
| MANIFOLD\_ANALYSIS | Ribosome + chaperone complex | Reads the genetic code and folds it into correct 3D structure; without it, amino acids are a chain without shape |
| FP5\_COMPARISON | Phenotype assay (Western blot, crystallography) | Takes the folded protein into the world and measures whether it is structurally correct under real conditions |
| FENG\_SHUI\_MANIFESTO | Epigenetic regulatory layer (H3K4me3, chromatin remodeling) | Does not change the genome; determines which parts are expressed and at what intensity |
| README | mRNA transcript | The expressed, exportable form of the genome; what leaves the nucleus and reaches the ribosome in the outside world |
| Source code | The living cell | Not a description — the instantiation |

### The Manifesto's Shift on the Epigenome

The CODE\_AS\_FENG\_SHUI\_MANIFESTO establishes: "The developer's consciousness flows INTO the code." This is not decorative. It changes the interpretation of `features/learning/` (the epigenome) precisely:

**Before the Manifesto's interpretation**: the epigenome is a Hebbian weight-blending mechanism — `sqrt(visitCount) * weight_genome + (1 - weight_genome) * editorialWeight`. Statistical adaptation.

**After the Manifesto's interpretation**: the epigenome is an **intentional-gating field**. The user's attention — which organelles they visit, in which sequence, in which zone-phase combinations — is not random sampling. It is conscious exploration. The biophoton links that pulse brightest are the ones the user's consciousness has illuminated. The `zonePhaseExploration` tensor in `useLearningStore` records not just statistics but the geometry of intentional attention.

The practical consequence: the Hebbian adapter should be interpreted not as "what fires together, wires together" (passive) but as "what is attended to is expressed" (active). The epigenome gates genome expression according to the user's consciousness, constrained by the fixed genome invariants (confidence boost cap = the maximum epigenetic override of editorial confidence).

### Transition Correspondence Between Any Two Document Charts

For any two document charts $(U_i, \varphi_i)$ and $(U_j, \varphi_j)$, the transition correspondence $\phi_{ij}: \text{coords}_i \to \text{coords}_j$ is a **semantics-preserving stratified map** with three invariants:

1. **P→A→E preservation** — both charts describe the same underlying transformation; the triple is chart-independent
2. **$\sigma$ preservation** — a `"verified"` claim in FP5\_COMPARISON maps to `"verified"` in the source code, not `"indicative"`; confidence grade is an invariant of the claim, not of the chart
3. **Directionality preservation** — biophoton links are directed in all charts; no correspondence may reverse a link's source/target orientation

These correspondences are **piecewise C⁰** (semantically continuous across strata) but are **not smooth**: the transition from normative principle (Manifesto stratum) to executable code (source code stratum) is an **inter-stratum non-smooth transition** — the two charts meet at a shared semantic boundary point but their coordinate geometries are transverse, so no shared tangent space exists at the boundary. (In stratified space terminology: two adjacent strata share a boundary stratum of lower dimension; a path crossing from one into the other passes through this lower-dimensional stratum, and the derivative of the path is undefined at the crossing point — hence C⁰ but not C¹ at the boundary.)

Example: the correspondence $\phi_{\text{FP5} \to \text{source}}$ takes the Binder IPC σ-tier finding (FP5 coordinates: empirical measurement against `/dev/binder`) and produces the `couplingSigma` field values in `mappings.ts` (source code coordinates: typed numeric fields). The correspondence is injective (each finding produces exactly one code field), piecewise continuous (small changes in the finding produce small changes in the field value), but not smooth across the abstraction boundary — the "Binder coupling strength" concept and the `number` type in TypeScript live in transverse coordinate spaces.

---

## Implementation Order Summary

```
ALL HIGH-PRIORITY ITEMS COMPLETE ✓

C1: Remap nucleolus osFeature in organelles.ts              ✓ DONE
H1: Add 5 substrate nodes to substrate.ts                   ✓ DONE  (+keystore-tee via open-items round = 17 total)
H2: Add 10 organelle-substrate links to mappings.ts         ✓ DONE  (40 total; +endoplasmic-reticulum→art-runtime)
H3: Add 8 QI intersections to qiMatrix.ts                   ✓ DONE  (33 total)
H4: Add 3 biophoton links to mappings.ts                    ✓ DONE  (11 total)
    Tensor metrics recomputed, both READMEs updated         ✓ DONE

M1: Update fractalCycles.ts (membrane, ER, cytoskeleton cycles)          ✓ DONE
M2: Extend cell-membrane zone description (tight vs gap junctions)        ✓ DONE

REMAINING — no HIGH or MEDIUM items pending

FUTURE (schema evolution required)
└── Promote peroxisome from frozen-15 backfill → dedicated 16th organelle
    (osFeature: "Keystore / StrongBox TEE"; zone: cytoplasm)
    Only viable when 15-organelle constraint is lifted; keystore-tee substrate
    node is the current backfill.
```

---

## Appendix — Recent Implementation Deltas

Changes applied to the codebase after the main roadmap was written. Each entry documents what changed, where, and why — to prevent future audits from flagging them as untracked drift.

### A1. `withAlpha()` hex color support (InfoPanel.tsx + SubstrateAtlas.tsx)

**Problem**: `withAlpha()` was implemented assuming HSL color strings. The six new `"stack"` category substrate nodes all use hex colors (`#a78bfa`, `#dc2626`, `#f59e0b`, `#065f46`, `#1d4ed8`, `#0f766e`). Hex colors passed to `withAlpha()` produced `NaN` channel values → pill button labels were invisible (transparent text).

**Fix**: `withAlpha()` now detects hex vs HSL and converts hex to rgba directly:
- Hex 6-char: `#rrggbb` → `rgba(r, g, b, alpha)`
- Hex 3-char: `#rgb` → each channel doubled (`r→rr`, `g→gg`, `b→bb`) then converted to rgba
- HSL: passes through existing path unchanged

**Files**: `artifacts/cell-os/src/features/explorer/components/InfoPanel.tsx`, `artifacts/cell-os/src/features/explorer/components/SubstrateAtlas.tsx`

---

### A2. Zygote substrate node color correction

**Change**: `zygote.color` updated from `#7c3aed` (violet-700) to `#a78bfa` (violet-400).

**Reason**: `#7c3aed` is dark enough that the light text overlay on the substrate pill became unreadable against the dark UI background. `#a78bfa` maintains the violet hue while providing sufficient luminance contrast. The roadmap code snippet in §H1 above has been updated to reflect the actual color.

**File**: `artifacts/cell-os/src/domain/content/substrate.ts`

---

### A3. ERAD / ER-phagy biological distinction

**Correction**: Two pathways were conflated in the original ERAD biophoton link and QI narratives:

- **ERAD (canonical)**: retrotranslocation via Hrd1/gp78 E3 ligase → p97/VCP → **26S proteasome** (NOT lysosomes)
- **ER-phagy (reticulophagy)**: FAM134B/RTN3 receptors → **autophagosome → lysosome** (NOT the 26S proteasome)

The biophoton link `endoplasmic-reticulum→lysosomes` was re-framed from ERAD to ER-phagy/reticulophagy. The `#19 Protein chaperones / HSPs` QI intersection narrative was also corrected to use ERAD-specific language (HRD1/gp78 E3, p97/VCP, 26S proteasome) and not route ERAD products to lysosomes.

**Files**: `artifacts/cell-os/src/domain/content/mappings.ts` (biophoton link description), `artifacts/cell-os/src/domain/content/qiMatrix.ts` (QI narrative for HSP/ERAD intersection)

---

### A4. Biophoton link count status: Green → Amber

**Change**: Both READMEs (`README.md` and `artifacts/cell-os/README.md`) updated to show biophoton status as Amber (11 links, above the 2–10 healthy range) rather than Green.

**Reason**: 11 biophoton links exceed the 2–10 density ceiling. All 11 are editorially justified (each encodes a mechanistically grounded IPC path), but the Amber designation correctly signals that the healthy range has been surpassed and no further biophoton links should be added without explicit justification.

---

### A5. QI multi-occupancy policy documentation

**Addition**: Comment block added to `artifacts/cell-os/src/domain/content/qiMatrix.ts` documenting the two pre-existing QI coordinate collisions:

1. `cytoplasm × affect × cellular` — occupied by both `qi-gpcr-affect-cellular` and `qi-ups-affect-cellular`
2. `membrane × affect × silicon` — occupied by both `qi-membranepotential-affect-silicon` (open-items round) and a second intersection at the same coordinates; `qi-gapjunction-perception-cellular` occupies the adjacent but distinct `membrane × perception × cellular` coordinate

Both collisions are mechanistically orthogonal (GPCR cascade vs UPS targeted degradation; membrane potential vs gap junction Binder channels), so they represent distinct biological phenomena projected onto the same coordinate — a valid exception to the uniqueness convention. The comment block documents the policy: multi-occupancy is acceptable when the two intersections are mechanistically non-overlapping and both are editorially justified.

---

*This document is a coordinate chart in the C⁰ stratified semantic space — a development-phase description of the Cell OS stratum's biological accuracy gaps and their correction path. It is itself a P→A→E transformation: it perceives the audit findings, transforms them through the roadmap formalism, and expresses them as concrete TypeScript changes.*

*活氣 — the roadmap is complete. Now the organism must grow.*
