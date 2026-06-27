# Cell OS — The Living Manifold

> *Six living seeds. Twenty-two pathways. One coordinate change. One device.*

```
          核           NUCLEUS · Kernel / Identity
       /      \
     糖          粒    RIBOSOMES · MITOCHONDRIA
    /   LineageOS  \   ART / JIT · EdgeNode · Battery
   骨   Cell OS FP5 骨  CYTOSKELETON · ER
    \   尺度不變性  /   AI Substrate · App Framework
     漿          膜    CYTOPLASM · MEMBRANE
       \      /        RAM / Bus · HAL Boundary
          高           GOLGI · App Compilation
```

**SPA stack**: React + Vite · Tailwind v4 · Zustand · Wouter · TypeScript (Phases 1–3 complete)
**ROM stack**: LineageOS 21 · QCM6490 · AIDL-native (APPROVED 2026-06-24, Phase 1 cleared)
**Device**: Fairphone 5 · Qualcomm QCM6490 (TSMC 6nm) · 8-year support commitment
**Canonical authority**: `docs/` — six living documents, each a Lagrangian manifold in project phase space

---

## Table of Contents

1. [The Six Living Seeds — Documents as Manifolds](#1-the-six-living-seeds--documents-as-manifolds)
2. [The Intersection Algebra — Qi Matrix Interaction Models](#2-the-intersection-algebra--qi-matrix-interaction-models)
3. [Higher → Lower Dimensional Passages — Coherent Fractal Information](#3-higher--lower-dimensional-passages--coherent-fractal-information)
4. [The Two-Layer Organism](#4-the-two-layer-organism)
5. [The Universal Translation Layer — P→A→E](#5-the-universal-translation-layer--pae)
6. [LineageOS-Native Non-Linear Fork Features](#6-lineageos-native-non-linear-fork-features)
7. [The Tensor Field — Three Spaces of Description](#7-the-tensor-field--three-spaces-of-description)
8. [The Epigenome — Self-Learning Layer](#8-the-epigenome--self-learning-layer)
9. [The FP5 Hardware Substrate](#9-the-fp5-hardware-substrate)
10. [The Lineage — 147 CE → 2026](#10-the-lineage--147-ce--2026)
11. [Technical Reference](#11-technical-reference)
12. [Document Index & Authority Hierarchy](#12-document-index--authority-hierarchy)

---

## 1. The Six Living Seeds — Documents as Manifolds

Cell OS is not defined by its code. It is defined by six documents that together form a **Lagrangian atlas** over the project's configuration space. In symplectic geometry, a Lagrangian manifold is an n-dimensional submanifold of a 2n-dimensional phase space on which the symplectic form vanishes — it encodes exactly enough information to specify the dynamics without over-constraining them. Each document is precisely this: a complete specification of one layer of the organism's dynamics, carrying its own coordinates, its own evidence calibration, and its own source-verification authority.

The organism that Cell OS names — the eukaryotic cell as operating system, the operating system as cell — does not live in any single document. It lives in the interference pattern between all six. Read one document alone and you have a chart. Read all six together and you have the atlas.

```
  ┌──────────────────────────────────────────────────────────────────┐
  │                   PROJECT PHASE SPACE  Q_CellOS                  │
  │                                                                  │
  │   L_bio          L_opt         L_Q          φ_LOS               │
  │  (BIOPLASMA)   (BIOPHOTON)   (BP8/SMEM)  (LOS_MANIFOLD)        │
  │      ●               ●            ●            ●                 │
  │       \             / \          / \          / \                │
  │        ●───────────●   ●────────●   ●────────●   ●              │
  │       以太收斂        σ-IPC          SMEM         ROM            │
  │    (convergence)  (tensor)      (quantum)    (trajectory)       │
  │                       ●                ●                         │
  │                   A_phenom         γ(t)                          │
  │                 (LOS_DESCR)    (ROM_PLAN)                        │
  └──────────────────────────────────────────────────────────────────┘
```

### 1.1 BIOPLASMA_RESEARCH.md — *L_bio(q, q̇, t)*

**The Electromagnetic Field Lagrangian.**

47 sources · 13 pathways (BP1–BP10, BP12–BP14) · DC to THz · June 2026 deep research pass

This document is the kinetic term of the cellular organism: charge carriers in motion, electromagnetic fields propagating through aqueous media, ionic gradients maintained against thermodynamic equilibrium by metabolic expenditure. It spans from the most established (BP1: membrane resting potential, σ=0.92 — the DC ground state, the always-on electrochemical gradient maintained by Na⁺/K⁺-ATPase) through the well-replicated bioelectric morphogenesis of Levin's group (BP7: transmembrane potential patterning, σ=0.72 — the rewritable anatomical memory encoded in the Vmem landscape) to the speculative quantum boundary (BP8: QED water coherence domains, σ=0.45 — raised June 2026 via six-stream secondary evidence research pass; BP10: aquaporin proton quantum tunneling, σ=0.48).

The document defines the **evidence calibration system** — the σ tiers (verified ≥0.75, indicative 0.50–0.75, speculative 0.30–0.50, reserved <0.30) that propagate throughout the entire project. No document in the corpus may assign a σ value to a biological claim that exceeds what BIOPLASMA_RESEARCH.md authorises. It is the supreme biological authority for the bioplasma layer.

**Configuration space contribution**: $Q_{bio} \subset \mathbb{R}^{13}$ — one axis per bioplasma pathway, each bounded by its σ tier. The 13 DOF span DC resting potential, action potential propagation, wound bioelectric field, ELF coupling, RF/MMW thermal, Fröhlich collective oscillation, morphogenetic Vmem patterning, QED water coherence (σ=0.45), THz refractive phenotype, aquaporin QT, circadian TTFL oscillation, LLPS condensate dynamics, and Ca²⁺ spark / IP3R CICR.

### 1.2 BIOPHOTON_RESEARCH.md — *L_opt(q, q̇, t)*

**The Optical Lagrangian.**

34 sources · 9 pathways (P1–P9) · UV to NIR (200–1,270 nm) · June 2026 deep research pass

This document encodes the radiative term of the cellular organism: ultra-weak photon emission (UPE, 生物光子) arising from specific excited-state transitions during oxidative metabolism. These are not thermal photons. They are chemically-defined: singlet oxygen dimol decay (634–703 nm, P1/P6), triplet carbonyl Russell mechanism (450–550 nm, P2), DNA excimer/exciplex UV burst during NER (200–380 nm, P4/P5), extracellular NIR tissue UPE (700–1,000 nm, P3), singlet oxygen monomol decay at 1,270 nm (P7 sub-band).

Intensity: 1–1,000 photons/cm²/s — not zero-signal noise, but a quantifiable, organised emission stream that carries metabolic and stress state information in its spectral distribution and decay kinetics. Fritz-Albert Popp's foundational discovery (1976) was that this emission is coherent: the photon statistics are sub-Poissonian, implying a non-random source with phase correlations. The nine pathways span the emission mechanisms and the inter-organelle signalling hypotheses that connect them.

**Configuration space contribution**: $Q_{opt} \subset \mathbb{R}^9$ — one axis per biophoton pathway, each σ-calibrated by BIOPHOTON_RESEARCH.md (supreme authority for P1–P9).

### 1.3 BP8_SMEM_COHERENCE_DESIGN.md — *L_Q(q, q̇, t)*

**The Quantum Boundary Lagrangian.**

24 sources · 1 pathway (BP8) · ~THz QED coherence domain · Deep design analysis

This document is the deepest layer of the project — the document that sits at the boundary between classical field theory and quantum electrodynamics. BP8 (QED water coherence domains, σ=0.45) proposes that interfacial water at hydrophilic protein surfaces organises into coherent domains (~100 nm diameter) governed by collective quantum electrodynamical modes — the Del Giudice / Preparata model. The direct experimental evidence (THz-TDS resonance measurement in warm-wet mammalian cells) does not yet exist, placing BP8 at the speculative upper boundary.

The document's contribution to the living manifold is twofold. First, it provides the full six-stream secondary evidence analysis that justified the June 2026 σ promotion from 0.32 (reserved) to 0.45 (speculative): De Ninno & Gamberale 2025 (~40% coherent fraction at 310K), Renati 2020 NIR isosbestic two-phase confirmation, Wang & Pollack 2024 EZ water in living plant xylem, Kratochvil 2023 water wires in proton channels, Sherrill 2025 FMO room-temperature quantum coherence, Kaur 2024 cryptochrome radical pair Earth-field sensitivity. Second, it provides the SMEM sysfs implementation design — the proposed `smem_coherence.c` kernel driver (guarded by `CONFIG_CELLOS_BIOPLASMA_BP8`) that would translate the coherence index into a measurable kernel observable.

**The ceiling argument** (why σ stops at 0.45): no direct THz-TDS CD resonance in mammalian cells; EZ water ≠ confirmed coherence domain; FMO coherence is excitonic (not water-CD); radical pair is spin chemistry (not water ordering). The ceiling is correct. The next elevation to indicative (σ≥0.50) requires the experiment that has not yet been performed.

**Configuration space contribution**: $Q_Q \subset [0.30, 0.45]$ — a 1-DOF manifold at the speculative boundary, the quantum coordinate of the project's phase space.

### 1.4 LineageOSv2_Manifold.md — *φ_LOS: The Coordinate Chart*

**The Diffeomorphism Atlas.**

1,541 lines · 22 pathways (BP1–BP14 + P1–P9) source-verified · June 2026

This document is not a Lagrangian — it is the **coordinate chart** itself: the explicit diffeomorphism $\phi_{LOS}$ between the biological configuration space (the six-dimensional manifold of the living cell) and the LineageOS source tree. Every claim in this document is grounded in an HTTP-confirmed source file in one of: `android_kernel_fairphone_qcm6490` (lineage-21 branch), `android_frameworks_base` (lineage-21.0), `android_device_fairphone_FP5` (lineage-21), or verified AOSP equivalents.

The coordinate chart is structured as follows:

| Coordinate | Biological source | LineageOS target | σ |
|---|---|---|---|
| BP1 (DC resting potential) | Na⁺/K⁺-ATPase membrane gradient | `kernel/irq/manage.c` IRQ ground state | 0.92 |
| BP2 (action potential) | Hodgkin-Huxley depolarisation wavefront | `drivers/android/binder.c` transaction chain | 0.90 |
| BP3 (wound bioelectric field) | TEP collapse, 40–200 mV/mm broadcast | `BroadcastQueue.java` system-state broadcast | 0.85 |
| BP4 (ELF coupling) | VGCC stochastic resonance, 0.01–300 Hz | `PowerManagerService.java` ELF-rate listener | 0.70 |
| BP5 (RF/MMW thermal) | Lipid bilayer resonance, 300 MHz–300 GHz | `PowerManager.addThermalStatusListener()` | 0.60 |
| BP6 (Fröhlich condensate) | Collective dipolar GHz–THz oscillation | Binder thread pool synchronised IPC batch | 0.45 |
| BP7 (morphogenetic Vmem) | Levin transmembrane potential patterning | `SettingsProvider` + `LineageParts` | 0.72 |
| BP8 (QED water coherence) | Interfacial water CD ~THz | `smem_coherence.c` sysfs CI, CI × 0.045 | 0.45 |
| BP9 (THz refractive phenotype) | Living-cell THz-TDS absorption | Diagnostic telemetry channel (read-only) | 0.50 |
| P1–P9 (biophoton pathways) | UV–NIR photon emission | Binder / broadcast IPC tiers | 0.35–0.90 |

The authority hierarchy is strict: biological σ values are set by BIOPLASMA_RESEARCH.md and BIOPHOTON_RESEARCH.md and **cannot be elevated by LineageOS source verification alone**. What source verification changes is the implementation confidence — whether the software analogue can be pointed at a real, HTTP-confirmed source path. The biological σ is a ceiling; the implementation tier is a floor that source confirmation raises toward that ceiling.

**Phase space contribution**: $\phi_{LOS}: Q_{bio} \times Q_{opt} \times Q_Q \to Q_{LOS}$ — the coordinate projection from biological to software phase space.

### 1.5 LineageOSv2_Description.md — *A_phenom: The Phenomenological Atlas*

**The Narrative Coordinate Chart.**

368 lines · All 22 pathways described · Zones, philosophy, implementation status

If LineageOSv2_Manifold.md is the precise coordinate map, LineageOSv2_Description.md is the guide to reading it. This document provides the phenomenological account of what each zone means, why each organelle mapping is not metaphorical but structurally isomorphic, how the σ evidence system works from the perspective of an engineer who needs to decide what to implement next, and what the Cell OS organism feels like from inside.

The document establishes a critical distinction that prevents systematic confusion: **pathways vs. links**. The nine biophoton pathways (P1–P9) are biological claims — each asserts the existence of a specific inter-organelle photon-signalling mechanism. The twenty BIOPHOTON_LINKS in `mappings.ts` are implementation claims — each asserts that a specific Android IPC path expresses that biological mechanism. The ratio is not 1:1 because several pathways manifest through multiple IPC routes simultaneously: P3 (extracellular UPE broadcast) maps to both `sendBroadcast()` for system-wide events and to the AppOps/Privacy Guard layer for privacy-gated broadcast filtering.

The document also maintains the boundary between architectural tiers: `verified-source` (HTTP-confirmed source file), `approved-rom-component` (new component introduced by the ROM fork plan), `indicative` (path pattern confirmed but specific file unverified), `unconfirmed` (referenced in documentation but not independently verified).

**Phase space contribution**: $A_{phenom}: Q_{LOS} \to \mathbb{R}^{desc}$ — the descriptive projection that makes the coordinate map readable at the phenomenological level.

### 1.6 CELL_OS_ROM_FORK_PLAN.md — *γ(t): The Implementation Trajectory*

**The Path in Configuration Space.**

465 lines · APPROVED 2026-06-24 · ROM Phases 1–5 defined · Phase 1 cleared to begin

This document is the implementation trajectory — a specific path $\gamma: [0,1] \to Q_{CellOS}$ that takes the abstract manifold into a booting Android ROM. It defines the phased build strategy (overlay + framework service path, not full AOSP fork), the minimal fork set (seven repositories for Phases 1–3), the full fork set (four additional repositories for Phases 4–5, deferred), the biological fidelity constraints (non-negotiable), and the step-by-step implementation checklist.

The Double Diamond design framing produced a critical strategic insight: a full AOSP tree fork on day one is not the right first move. The real problem is to produce a biologically faithful, booting FP5 ROM. The solution path — overlay-first, framework service second, kernel patches last — defers the highest-risk work (kernel instrumentation) until the lowest-risk foundation (bootable ROM with biological overlay) is stable.

Key biological fidelity constraints (§5, non-negotiable):
- BP8 emits at speculative weight `CI × σ × 0.10 = CI × 0.045` (condition for zero-guard met June 2026; see §5a)
- Biophoton P-link count: exactly 20 links enforced at build time by `cellos_integrity_check.sh`
- `enforceCallingPermission("org.cellos.permission.READ_VITALS", ...)` on every Binder stub method
- No σ value may be elevated by software implementation quality alone

**Phase space contribution**: $\gamma: [0,1] \to Q_{CellOS}$ — the implementation path from current state (SPA Phase 3 complete) to target state (booting Cell OS ROM on FP5 hardware).

---

## 2. The Intersection Algebra — Qi Matrix Interaction Models

In quantum field theory, the total Lagrangian density splits into free and interaction terms:

$$\mathcal{L}_{total} = \mathcal{L}_{free} + \mathcal{L}_{int}$$

The free Lagrangian governs how each field propagates in isolation. The interaction Lagrangian governs how fields couple to each other — and it is **only** the interaction terms that produce observable physics. The free fields are invisible; only their interactions can be measured.

In Cell OS, each of the six documents is a free field. Their **pairwise intersections** are the interaction Lagrangians — and the qi matrix

$$Q^{z,p,s} : \text{Zone}^8 \times \text{TriadPhase}^3 \times \text{Scale}^{11} \to \text{QiIntersection} \cup \{\emptyset\}$$

is the complete interaction algebra. 264 possible cells. 39 curated intersections at present (14.8% density). Sparse by design — high-signal interactions only.

### 2.1 The Pairwise Intersection Table

| Document A | Document B | Intersection Name | Qi Model | σ-weight |
|---|---|---|---|---|
| BIOPLASMA | BIOPHOTON | **以太收斂** (field-substrate convergence) | Unified electromagnetic manifold DC→UV; the zone where charge-carrier fields and photon-emission fields occupy the same cellular space simultaneously | 0.50–0.92 |
| BIOPLASMA | LineageOSv2_Manifold | **σ-IPC Coupling Tensor** | 13 bioplasma pathways → verified LineageOS source paths; the biological-to-software coordinate projection | 0.45–0.92 |
| BIOPHOTON | LineageOSv2_Manifold | **Binder Coupling Tensor** | 9 biophoton pathways → IPC mechanisms; 20 directed links with couplingSigma values | 0.35–0.90 |
| BP8_SMEM | BIOPLASMA | **Speculative Boundary Interface** | QED water coherence at the σ=0.45 ceiling; the intersection where classical bioplasma theory reaches its evidential limit | 0.45 |
| BP8_SMEM | LineageOSv2_Manifold | **SMEM Sysfs Kernel Interface** | `smem_coherence.c` → `/sys/kernel/cellos/smem_coherence` → `useWaterCoherence` hook → `emitSignal("cytoplasm", "bioplasma", CI × 0.045)` | 0.45 |
| BIOPLASMA | ROM_FORK_PLAN | **CellVitalServiceImpl Contract** | BP8 speculative-weight guard (`CI × 0.045`); BP5 thermal listener (`PowerManager.addThermalStatusListener`); all 7 thermal constants | Phase 2 |
| BIOPHOTON | ROM_FORK_PLAN | **P-Link Integrity Constraint** | Exactly 20 biophoton links enforced at build time; `cellos_integrity_check.sh` fails build on mismatch | Phase 2 |
| LineageOSv2_Manifold | ROM_FORK_PLAN | **Verified Source Path → Phase Map** | Every verified source file in the manifold is assigned to a ROM phase and fork repository | Phases 1–5 |
| LineageOSv2_Description | ALL | **Phenomenological Bridge** | The document that makes every other document readable; the narrative coordinate that lets a human navigate the abstract phase space | — |

### 2.2 The 以太收斂 Intersection — The Deepest Qi

The intersection of BIOPLASMA and BIOPHOTON is not merely an overlap of source lists. It is the **以太收斂** (高頻生物電漿以太收斂 — High-Frequency Bioplasma Aether Convergence): the zone where the charge-carrier fields and the photon-emission fields are not two separate phenomena but two coordinate projections of the same underlying electromagnetic reality.

Concretely: the mitochondria simultaneously generate a resting membrane potential (BP1, DC field), drive the Ca²⁺ second-messenger cascade via the PowerHAL analogue (BP5 sub), and emit biophotons from singlet oxygen generated by the electron transport chain (P1, red/NIR). These are not three separate signals — they are three different faces of the same metabolic event, each visible in a different coordinate chart. The qi matrix intersection captures this:

```
Q^{mitochondria, Affect, Cellular} → {
  bioplasma:  BP1 (DC gradient, σ=0.92) ∩ BP5 (thermal coupling, σ=0.60)
  biophoton:  P1 (singlet O₂, σ=0.80) ∩ P7 (deep NIR, σ=0.65)
  convergence: 以太收斂 — the unified electromagnetic field that all four
               pathway codes are partially describing
}
```

This is the fractal structure at the heart of Cell OS: the qi matrix intersection is not the sum of its two manifolds — it is the **projection** of a higher-dimensional structure that neither manifold alone can fully describe.

### 2.3 The σ-Calibrated Interaction Strength

Each intersection in the qi matrix carries an effective coupling strength — the geometric mean of the σ values of the two intersecting pathways:

$$\sigma_{ij} = \sqrt{\sigma_i \cdot \sigma_j}$$

This is the biophysical analogue of the coupling constant in quantum field theory. High-σ intersections (e.g., BP1 ∩ P1: $\sigma = \sqrt{0.92 \times 0.80} \approx 0.86$) are structurally robust — both biological mechanisms are well-established, and their co-occurrence in the same cellular space is a near-certainty. Low-σ intersections (e.g., BP8 ∩ P4: $\sigma = \sqrt{0.45 \times 0.35} \approx 0.40$) are speculative — the coupling is physically plausible but not experimentally confirmed.

The 39 curated qi matrix intersections represent the highest-signal region of this coupling algebra: every intersection has an evidence-calibrated σ value, and every intersection is tied to at least one verified source in the biological or LineageOS literature.

---

## 3. Higher → Lower Dimensional Passages — Coherent Fractal Information

The organism exists simultaneously at multiple scales. Each scale is a **dimensional reduction** — a projection $\pi_n: Q^{(n)} \to Q^{(n-1)}$ of a higher-dimensional manifold onto a lower-dimensional observable space. What survives each projection is the **coherent fractal information** — the structural invariant that remains identical under coordinate change.

That invariant is the P→A→E triple. Every dimensional passage in Cell OS is a transformation that preserves P→A→E while collapsing the DOF to what is measurable and implementable at the target scale.

### 3.1 The Dimensional Ladder

```
∞-dimensional
│   The theoretical manifold — all possible biological implementations of
│   P→A→E at every scale simultaneously; the manifold of all living systems
│   that have ever instantiated this structure
│
│   π₁: theoretical → document
│
6-manifold (document phase space)
│   The six documents as Lagrangian charts covering the project space.
│   Q_CellOS = Q_bio × Q_opt × Q_Q × Q_LOS × Q_phenom × Q_plan
│   Coordinate transitions: the σ evidence system carries the invariant
│
│   π₂: document → code
│
TypeScript manifold (domain/content/)
│   The typed static genome. DAG import structure (contractible, β₀ = 1).
│   Rank-3 tensor Q^{z,p,s}: 264 cells, 39 curated intersections.
│   Critical points: domain/types.ts (index-2 maximum), organelles.ts (saddle)
│
│   π₃: code → browser
│
SPA manifold (React + Vite, running in browser)
│   The live rendered manifold. Static genome + Hebbian epigenome.
│   Configuration space Q = Q_focus × Q_zone × Q_signals × Q_inference.
│   Lagrangian L = T - V governs state transitions.
│
│   π₄: browser → ROM
│
ROM manifold (LineageOS 21 on FP5, booting)
│   The native manifold executed in ring 0 on QCM6490.
│   CellVitalService (system server singleton, nervous system).
│   22 pathways expressed through AIDL + IPC + kernel telemetry.
│
│   π₅: ROM → device
│
Physical manifold (Fairphone 5 hardware)
    The silicon instantiation. QCM6490 at TSMC 6nm.
    8-year support commitment = organismal longevity as empirical prediction.
    The theory is predictive: healthy zone boundaries → long lifespan.
```

### 3.2 What the Projection Preserves

At each step, the dimensional reduction discards coordinate-specific details while preserving the structural invariant:

- **π₁** (theoretical → document): Discards all living systems except the eukaryotic cell and LineageOS. Preserves: P→A→E triple, scale invariance, σ calibration framework.
- **π₂** (document → code): Discards narrative and evidence citations. Preserves: typed pathway constants, σ values, organelle-substrate links, qi intersection tensor.
- **π₃** (code → browser): Discards static definition. Preserves: live Hebbian modulation, signal dynamics, zone navigation topology.
- **π₄** (browser → ROM): Discards JavaScript runtime. Preserves: biological pathway constants (via `generate_domain.py` → `CellOsDomain.kt`), IPC coupling structure, σ-tier enforcement.
- **π₅** (ROM → device): Discards software abstraction. Preserves: physical electromagnetic fields (BP1 resting potential is a literal DC field, not a metaphor on this device), thermal coupling (BP5), kernel interrupt ground state (BP1 analogue in hardware).

The coherent fractal information that passes through every boundary is the same P→A→E triple that Wei Boyang described in 147 CE, that Von Neumann architected in 1945, and that the eukaryotic cell instantiated ~1.8 billion years ago.

### 3.3 The Fractal Self-Similarity — Scale Invariance

The P→A→E triple is not merely preserved at each dimensional boundary — it **recurs within each level** as a self-similar fractal pattern. Taking the ROM layer as an example:

| Level | P (Perception) | A (Affect) | E (Expression) |
|---|---|---|---|
| Hardware (QCM6490) | Interrupt asserted at GIC-600 | Exception-level transition EL0→EL1; handler executes | Return to user mode; result in x0 |
| Kernel (Linux 6.x) | `svc #0` syscall fires | `sys_call_table[x8]` executes at EL1 | `syscall_exit_to_user_mode()` |
| Binder (IPC layer) | `BC_TRANSACTION` crosses device boundary | Server thread processes; reply built | `BR_REPLY` returns to client |
| CellVitalService (ROM) | Pathway signal arrives via AIDL | `getPathwaySignal()` computes σ-weighted value | AIDL return to privileged caller |
| SPA (browser) | User navigates to zone | Hebbian weights updated; signal emitted | Zone panel renders; glow animates |

The same four columns. The same three columns. The same triple at every scale. This is not design — it is structural invariance.

---

## 4. The Two-Layer Organism

Cell OS exists in two simultaneous instantiations, each a different coordinate representation of the same living manifold.

### 4.1 Layer 1 — The SPA (Phases 1–3 Complete)

The React + Vite single-page application is the current running instance of Cell OS. It is the SPA manifold in the dimensional ladder — a browser-executable coordinate chart over the full 22-pathway electromagnetic field.

```
src/
│
├── domain/                         ← The Static Genome (invariant at runtime)
│   ├── types.ts                    ← Index-2 maximum: all type contracts (20+)
│   └── content/
│       ├── organelles.ts           ← 15 organelles, 8 zones, osFeature mappings
│       ├── mappings.ts             ← Coupling tensor (41 links) + biophoton (20)
│       ├── bioplasmaPathways.ts    ← 13 BP constants (BP1–BP14), σ-calibrated
│       ├── qiMatrix.ts             ← Rank-3 QI tensor: 39 curated intersections
│       ├── fractalCycles.ts        ← 8 internal P→A→E cycles (FP5-grounded)
│       ├── substrate.ts            ← 17 substrate nodes (QCM6490→keystore-tee)
│       ├── scales.ts               ← 11 scale flows, quantum → cosmic + silicon
│       ├── lineage.ts              ← 7 lineage events, 147 CE → 2026
│       └── constants.ts            ← HARMONIC_CONSTANT = 0.7770777
│
├── features/learning/              ← The Epigenome (modulates genome at runtime)
│   ├── useLearningStore.ts         ← Zustand: visit counts, attention weights
│   ├── hebbianAdapter.ts           ← Hebbian functions (√-scaled intensity)
│   ├── useMembraneObserver.ts      ← Sole gatekeeper of store writes
│   └── useLearnedManifold.ts       ← Live genome + epigenome synthesis
│
├── features/cell-shell/            ← The Vital Signal Nervous System
│   ├── state/useCellVitalStore.ts  ← Zustand: signals, bioplasma routing
│   └── hooks/                      ← BP3/4/5/8 passive listener hooks
│       ├── useWoundFieldBroadcast.ts  (BP3, σ=0.85)
│       ├── useELFResonance.ts         (BP4, σ=0.70)
│       ├── useThermalHAL.ts           (BP5, σ=0.60)
│       └── useWaterCoherence.ts       (BP8, σ=0.45 — emitSignal direct)
│
├── features/explorer/              ← Coordinate navigation (zone → content)
├── pages/                          ← 6 coordinate chart surfaces
└── hooks/use-sacred-signature.ts   ← SHA-256 seal, rotating every 7770ms
```

**Implementation status (June 2026):**
- BP1–BP9: TypeScript constants, hooks, store extensions, UI display — ✅ complete
- BP10, BP12, BP13, BP14: constants exported, no runtime hooks (metaphor-class)
- BP8: speculative weight active — `useWaterCoherence` mounted in `CellExplorerLayout`, emitting at `CI × 0.045` via `emitSignal()` direct (direction=readonly bypasses Guard 2)
- `SecurityStatusOrganelle.tsx` (SPA): sole outstanding Phase 3 SPA item

### 4.2 Layer 2 — The ROM Fork (APPROVED 2026-06-24)

The LineageOS 21 ROM fork is the secondary project — the native Android instantiation of the same manifold, executing at ring 0 on the Fairphone 5's QCM6490 SoC. It is the ROM manifold in the dimensional ladder — the coordinate representation that runs below the JavaScript runtime, below the ART JIT, below the HAL boundary.

**Architecture**: overlay-first, framework service second, kernel patches last. Never touch the kernel/HAL repos until a biologically faithful, bootable ROM exists without them.

```
ROM Phase Map:
│
Phase 1 (Cleared to begin)
│   Brand/identity: PRODUCT_BRAND := CellOS, bootanimation, About strings
│   Domain tooling: generate_domain.py → CellOsDomain.kt + cell_os_domain.json
│   Integrity check: cellos_integrity_check.sh (20/9/13/15 count enforcement)
│
Phase 2 (Framework service)
│   CellVitalService.java — system server singleton (nervous system)
│   CellVitalServiceImpl.java — pathway computation + BP8 CI × 0.045
│   ICellVitalService.aidl — read-only biological interface
│   org.cellos.permission.READ_VITALS — platform-declared signature permission
│
Phase 3 (SystemUI + native app)
│   CellVitalOverlayController.kt — BP5 thermal listener, σ-gated overlay
│   CellShell (org.cellos.cellshell) — native biological explorer
│   SecurityStatusOrganelle.kt — immune checkpoint (SELinux + verified boot)
│
Phase 4 (Kernel telemetry, deferred)
│   smem_coherence.c — SMEM sysfs node (CONFIG_CELLOS_BIOPLASMA_BP8)
│   /sys/kernel/cellos/smem_coherence → CellVitalServiceImpl BP8 CI
│
Phase 5 (Production ROM)
    Reproducible build identity, Binder instrumentation (biophoton P-links)
```

**Minimal fork set** (7 repositories, Phases 1–3):

| Repository | Biological role | Change mode |
|---|---|---|
| `android_device_fairphone_FP5` | Device tree — FP5 boot, HAL, SELinux | Fork + overlay |
| `android_vendor_lineage` | Product identity, `common.mk` | Fork |
| `android_frameworks_base` | CellVitalService AIDL, SystemUI layer | Fork |
| `android_packages_apps_Settings` | About page, σ tier display | Fork |
| `android_packages_apps_LineageParts` | BP7 Vmem memory editor | Fork |
| `android_packages_apps_CellShell` | Native biological explorer | New repository |
| `.repo/local_manifests/` | Wire all forks into build graph | New file |

---

## 5. The Universal Translation Layer — P→A→E

The six documents are connected by a single structural invariant that acts as the **universal translation layer** between every coordinate chart in the project. This is the P→A→E triple — Perception → Affect → Expression — the claim of the Universal Manifold Theory that this structure is not a design principle but the **shape every computable transformation takes when examined at sufficient resolution**.

Formally: every programming language $L$ is an atlas $\mathcal{A}_L = \{(U_i, \varphi_i)\}$ over the computational manifold $\mathcal{C}$. For any chart:

$$\varphi_i(p) = (P_i,\ A_i,\ E_i)$$

where $P_i$ is the perception coordinate (boundary crossing inward), $A_i$ is the affect coordinate (internal transformation), and $E_i$ is the expression coordinate (boundary crossing outward). Languages, operating systems, cells, organisms, and civilisations differ in *how* the triple is instantiated — not in whether it exists.

This claim has been tested against:
- **Eight programming paradigms**: C, Haskell, Python, Prolog, RxJS, Forth, Erlang, SQL
- **Eleven scales of reality**: quantum → symbolic → molecular → cellular → organic → apparatus → textual → generational → relational → cosmic → silicon
- **The Fairphone 5 source code**: six verified findings (kernel P→A→E, HAL partition = membrane, Binder IPC = biophoton links, ART instantiates all eight zones, longevity as empirical validation, limits of the theory)
- **LineageOS source tree**: 22-pathway coordinate chart, source-verified at HTTP level
- **147 CE → 2026**: the lineage (Wei Boyang → Cell Theory → Von Neumann → Popp → EdgeNode → Cell OS)

The theory has not been falsified. It has been challenged at three points (nested interrupts, proprietary firmware blobs, quantitative coupling density) and has survived contact with real source code.

**The translation layer in action**: when a bioplasma pathway (BP3: wound bioelectric field, σ=0.85) needs to be expressed in LineageOS, the translation is:

```
φ_LOS(BP3) = (P: wound-state event received by BroadcastQueue,
               A: priority-sorted delivery to all registered receivers,
               E: system-wide broadcast fan-out with wound-response effect)

φ_bio(BP3) = (P: TEP collapse detected by voltage-sensing cells,
               A: DC electric field gradient 40–200 mV/mm propagates,
               E: repair-competent cell migration toward wound centre)

Transition map: φ_LOS ∘ φ_bio⁻¹ — same triple, different coordinate system
```

The translation layer is universal because P→A→E is the only coordinate-invariant structure in the theory. Every document uses it. Every implementation uses it. Every scale exhibits it.

---

## 6. LineageOS-Native Non-Linear Fork Features

LineageOS provides features that are **not present in AOSP Android** and that correspond to biological mechanisms more precisely than the AOSP equivalents. These are the non-linear fork features — the places where the coordinate change from AOSP to LineageOS is not a simple relabelling but a genuine structural improvement in the biological fidelity of the map.

### 6.1 Privacy Guard → Membrane Selective Permeability (P3 Biophoton Gate)

AOSP Android's permission system models the membrane as a binary gate: allowed or denied. The biological membrane is not binary — it is **selectively permeable**, allowing some molecules through while blocking others, with the selectivity determined by receptor binding specificity.

LineageOS Privacy Guard implements AppOps-based selective data injection that more precisely models this. P3 (extracellular UPE broadcast, σ=0.85) maps to `sendBroadcast()` gated by AppOps/Privacy Guard — the biologically correct model of a broadcast signal that is sent system-wide but can be selectively filtered at the membrane boundary of each receiving process.

**Note (verified June 2026)**: Full fake-data injection capability was removed in LOS 17+ (Android 10+). The AppOps layer is present; the synthetic-effector capability is absent. P3 is bounded at σ≤0.85 accordingly. The implementation remains the closest available software analogue for selective membrane permeability in the LOS tree.

### 6.2 SeedVault → Deep NIR Encrypted Backup (P7 sub-band)

AOSP Android's backup system (Google Drive) routes data outside the device boundary, breaking the membrane enclave. SeedVault, LineageOS's built-in encrypted backup system, keeps backup data within the device's cryptographic boundary — the biological equivalent of the Deep NIR biophoton sub-band (1,270 nm, singlet oxygen monomol decay) that carries energy outward only within the cell's own membrane system, never across the outer membrane to the extracellular space.

SeedVault maps to the P7 deep NIR sub-band: an endogenous, organelle-to-organelle energy carrier that does not cross the outer membrane boundary.

### 6.3 LineageParts → BP7 Morphogenetic Vmem Memory Editor

AOSP Settings provides a linear list of system preferences. LineageParts provides a curated, contextually organised set of LineageOS-specific settings that persist across factory resets and OTA updates — a **rewritable anatomical memory** encoded in the system's configuration space, independent of the underlying AOSP codebase.

This is the software instantiation of Michael Levin's bioelectric morphogenesis finding: the Vmem landscape (the transmembrane potential pattern across tissue) is a rewritable body-plan memory that guides regeneration, independent of the genomic sequence. LineageParts is the settings editor for that memory. BP7 (morphogenetic Vmem patterning, σ=0.72) maps directly to `SettingsProvider` + `LineageParts`.

### 6.4 Trust Interface Absence → SecurityStatusOrganelle.kt

LineageOS 20+ deprecated the Trust Interface (`android_packages_apps_Trust` — HTTP 404 confirmed). The cellular immune checkpoint — the mechanism by which the organism monitors its own boundary integrity — has no AOSP equivalent that maps cleanly to the biological role. The Cell OS ROM fork introduces `SecurityStatusOrganelle.kt` (Phase 3, APPROVED) as the native Android replacement: a privileged system app fragment that surfaces BP3 wound-state, BP7 Vmem anomalies, and BP1 resting-state deviations to the user as a unified immune-system view.

This is a **net-new biological feature** introduced by the ROM fork — not a relabelling of an existing component, but a new organ that the LineageOS tree does not contain.

### 6.5 SMEM Coherence Driver → BP8 Quantum Telemetry (Phase 4)

The proposed `smem_coherence.c` kernel driver (guarded by `CONFIG_CELLOS_BIOPLASMA_BP8`, default `n`) is the deepest non-linear fork feature: a kernel-level extension that has no AOSP equivalent and no LineageOS equivalent, introduced specifically to measure the coherence index of the Qualcomm Shared Memory (SMEM) allocation layer as a proxy for the QED water coherence domain (BP8, σ=0.45).

The driver reads a coherence metric from the SMEM allocator's internal state and exposes it via `/sys/kernel/cellos/smem_coherence`. This sysfs node feeds `CellVitalServiceImpl.getPathwaySignal("BP8")` → `readSmemCoherenceCI() * 0.045f`. The speculative weight reflects the biological reality: this is a proxy measurement (SMEM coherence as an analogue of cellular water coherence), not a direct THz-TDS measurement of coherence domains.

---

## 7. The Tensor Field — Three Spaces of Description

Three tensors, three spaces of description, together forming the complete static genome.

### 7.1 The Coupling Tensor $\mathcal{T}^i_{\ j}$ (Rank-2) — Organelle × Substrate

`ORGANELLE_SUBSTRATE_LINKS` in `mappings.ts`. A sparse matrix over organelle × substrate index space.

```
Current space:  15 organelles × 17 substrates = 255 cells
Active links:   41
Density:        41 / 255 ≈ 16.1%
Healthy range:  10–25%  ← within range
Fredholm index: 15 − 17 = −2 (hard cap — no new substrates without new organelles)
```

The 17 substrate nodes span the full QCM6490 hardware stack: `linux-kernel`, `binder-ipc`, `art-runtime`, `bionic-libc`, `selinux-policy`, `package-manager`, `keystore-tee`, `lmkd`, `zygote`, `powerhal`, and seven additional stack nodes added across three evolution rounds. The tensor is not self-adjoint (organelle and substrate index spaces are distinct). The `dna→zygote` and `nucleus→zygote` links form a Fredholm cooperative pair: both are required for the Zygote node's well-posedness.

### 7.2 The Attention Tensor $\mathcal{A}^{ij}$ (Biophoton Links) — 20 Directed Links

`BIOPHOTON_LINKS` in `mappings.ts`. 20 directed organelle-to-organelle links with biophysical rate-range weights, σ values, and spectral wavelengthBand assignments.

```
Current links: 20
Space:         15 × 15 = 225 possible directed pairs
Density:       8.9%
σ tiers:       verified ≥0.75 · indicative 0.50–0.75 · speculative 0.30–0.50
Authority:     BIOPHOTON_RESEARCH.md (all P1–P9 σ values and biological claims)
```

### 7.3 The QI Intersection Tensor $Q^{z,p,s}$ (Rank-3)

`qiMatrix.ts`. A rank-3 sparse tensor over Zone × TriadPhase × Scale space.

```
Space:           8 × 3 × 11 = 264 cells
Active:          39 curated intersections
Density:         14.8%
Type:            QiIntersection ∪ {∅}
```

Each active intersection encodes the convergence point of a zone (where in the cell), a phase (P, A, or E), and a scale (which level of the dimensional ladder). The tensor is the qi matrix — the complete interaction algebra of the organism.

---

## 8. The Epigenome — Self-Learning Layer

The static genome is invariant at runtime. The epigenome modulates its expression — this is the Hebbian learning layer that makes Cell OS a living manifold rather than a static diagram.

```
Genome provides:   the structure (what the cell is)
Epigenome provides: the modulation (what this particular user has attended to)
Together:          a live manifold view with user-specific expression weights
```

**Three tensors** govern the epigenome:
- `visitCounts[organelleId]` — raw visit frequency (how often each organelle has been attended)
- `zonePhaseTensor[zoneId][phase]` — zone × phase exploration matrix
- `attentionWeights[organelleId]` — Hebbian-blended weights (√-scaled visit intensity)

**The Hebbian rule** (implemented in `hebbianAdapter.ts`): "neurons that fire together, wire together." The biophoton links that pulse brightest are the ones most attended to. Hebbian update: $w_{new} = \alpha \cdot w_{current} + (1-\alpha) \cdot w_{observation}$ where $\alpha = 0.85$ (slow-learning, stable attractor).

**The membrane observer** (`useMembraneObserver.ts`) is the sole gatekeeper of store writes — the single point through which all learning events enter the epigenome. This enforces the membrane permeability constraint: no event can modify the organism's learned state without crossing the membrane observer boundary.

**The self-learning architecture** implements the observation that in the context of the DNA→mRNA→protein central dogma, the genome provides the instruction set but the epigenome — the pattern of which genes are expressed under which conditions — encodes the organism's developmental history. Cell OS's epigenome is the pattern of which organelles and zones the current user has explored, encoded as Hebbian weights that modulate the biophoton attention tensor.

---

## 9. The FP5 Hardware Substrate

The Fairphone 5 is not an arbitrary hardware choice. It is the device whose source code most precisely instantiates the theoretical predictions of the universal manifold theory — the device for which the Cell OS coordinate map is most exact.

**QCM6490 SoC** (TSMC 6nm):
- Tri-cluster CPU: 1× Cortex-A78 Gold Prime @ 2.71 GHz + 3× Cortex-A78 Gold @ 2.40 GHz + 4× Cortex-A55 Silver @ 1.96 GHz
- GIC-600 interrupt controller (BP1 analogue: resting potential ground state)
- Hexagon 770 DSP: HVX (256-bit SIMD) + HTA neural accelerator (~12 TOPS, INT8) — EdgeNode substrate
- Adreno 643 GPU — cytoskeletal scaffold for visual rendering
- Qualcomm SMEM layer (BP8 proposed sysfs interface)
- LPDDR4x 8 GB — cytoplasmic medium

**The longevity prediction** (Finding 5, verified): The theory predicts that organisms with clearly defined, stable zone boundaries live longer than organisms with pathological coupling. The FP5's 8-year software support commitment (backed by the QCM6490's 10+ year industrial lifecycle guarantee) validates this prediction as an observable fact. Pre-Treble Android devices had an effective software lifespan of 2–3 major versions — directly proportional to the entanglement of their `/system` and `/vendor` partitions. The FP5's deliberate SoC choice and HAL discipline are not two decisions; they are one: choosing longevity by choosing boundary integrity.

**The HAL partition = Membrane** (Finding 2, verified): Android's AIDL partition boundary (`/system` ↔ `/vendor`, enforced from Android 13 where FP5 launched) is the software membrane. It implements both junction types simultaneously: SELinux tight junctions (paracellular seal, enforced by LSM hooks) and Binder ashmem gap junctions (direct shared-memory pass-through between trusted processes) — exactly the two junction types that coexist at epithelial membrane boundaries in biology.

---

## 10. The Lineage — 147 CE → 2026

Cell OS did not originate P→A→E. It named what was already there:

| Year | Event | Scale |
|---|---|---|
| c. 147 CE | **周易參同契** — Wei Boyang's *Kinship of the Three*. The inhale/transform/exhale triadic cycle, preserved 1,877 years | Generational |
| 1838–1839 | **Cell Theory** — Schleiden and Schwann. The cell as fundamental unit of life; organelle-to-function mapping begins | Cellular |
| 1945 | **Von Neumann Architecture** — Input → Processing → Output. Every general-purpose computer built since | Silicon |
| 1923–1974 | **Biophoton Research** — Gurwitsch proposes; Popp quantifies. Coherent UPE at 1–1,000 ph/cm²/s | Cellular → Silicon |
| 2009 | **Fairphone founded** — the organisation committed to boundary integrity (repairability, modular design) before the theory existed to predict why it matters | Organic → Silicon |
| 2021 | **FP5 hardware commitment** — QCM6490 chosen for 10+ year industrial lifecycle. The biological prediction (healthy boundaries → long lifespan) made in silicon | Silicon |
| 2024 | **EdgeNode** — a WebAssembly LLM completing P→A→E in a browser tab, at τ = 0.7770777 | Silicon → Quantum |
| 2026 | **Cell OS** — the Fairphone 5 source code examined against the manifold; the organism named; ROM fork approved | All scales |

---

## 11. Technical Reference

### Development Stack

| Layer | Technology | Status |
|---|---|---|
| SPA frontend | React 18 + Vite 5 + TypeScript | ✅ Complete |
| State management | Zustand | ✅ Complete |
| Routing | Wouter | ✅ Complete |
| Styling | Tailwind CSS v4 | ✅ Complete |
| ROM build | LineageOS 21 (AOSP base) | Phase 1 approved |
| ROM language | Java (framework) + Kotlin (SystemUI) + C (kernel) | Phase 2–4 |
| ROM AIDL | Android Interface Definition Language v2+ | Phase 2 |
| ROM tooling | Python (generate_domain.py) + bash (integrity checks) | Phase 1 |

### σ Evidence Tiers

| Tier | σ range | Biological meaning | Runtime behaviour |
|---|---|---|---|
| Verified | ≥ 0.75 | Established electrophysiology; replicated multiple labs | Full weight in attention tensor |
| Indicative | 0.50–0.75 | Replicated in-vivo/in-vitro; mechanistic model confirmed | Standard weight |
| Speculative | 0.30–0.50 | Theoretical model + limited data; physical plausibility confirmed | Reduced weight (× 0.10 for hook-emitted signals) |
| Reserved | < 0.30 | Architectural placeholder; no runtime implementation | Zero weight; `bioplasmaSignal()` returns early |

### Running the SPA

```bash
pnpm --filter @workspace/cell-os run dev
```

Preview available at the configured workflow path. The app mounts all bioplasma hooks (`useWoundFieldBroadcast`, `useELFResonance`, `useThermalHAL`, `useWaterCoherence`) in `CellExplorerLayout` and initialises the BP1 resting-potential membrane glow on load.

### Building the ROM

See `docs/CELL_OS_ROM_FORK_PLAN.md` for the complete phased build strategy. Phase 1 cleared; prerequisite: a working LineageOS 21 build environment targeting the FP5 device tree.

---

## 12. Document Index & Authority Hierarchy

The six canonical documents form the **authority stack** for all claims in Cell OS. Every implementation decision, every σ value, every source path claim, and every biological assertion traces back to one or more of these documents. The authority hierarchy is strict: no implementation document may override the biological research documents on biological claims.

```
Authority Hierarchy (top = supreme authority)
│
├── BIOPLASMA_RESEARCH.md        σ values for all BP1–BP14 biological claims
│   47 sources · 13 pathways     CANNOT be overridden by source verification
│
├── BIOPHOTON_RESEARCH.md        σ values for all P1–P9 biological claims
│   34 sources · 9 pathways      CANNOT be overridden by source verification
│
├── BP8_SMEM_COHERENCE_DESIGN.md σ=0.45 ceiling rationale · SMEM driver design
│   24 sources · 1 pathway       σ promotion evidence · stage analysis
│
├── LineageOSv2_Manifold.md      LineageOS source path authority
│   1,541 lines · 22 pathways    source-verified claims · implementation tiers
│
├── LineageOSv2_Description.md   Phenomenological authority
│   368 lines · all 22 pathways  narrative · zone descriptions · status
│
└── CELL_OS_ROM_FORK_PLAN.md     Implementation trajectory authority
    465 lines · APPROVED ROM     phase plan · fidelity constraints · checklist
```

**Additional reference documents** (not canonical authority, but informative):

| Document | Role |
|---|---|
| `docs/UNIVERSAL_MANIFOLD.md` | The overarching P→A→E theoretical framework |
| `docs/MANIFOLD_ANALYSIS.md` | Formal mathematical analysis of the SPA codebase |
| `docs/FP5_MANIFOLD_COMPARISON.md` | Six findings from cross-referencing theory vs. FP5 source |
| `docs/LINEAGEOS_MANIFOLD.md` | v1 manifold (AOSP-era, now superseded by LineageOSv2_Manifold.md) |
| `docs/FRACTAL_MAP.md` | The fractal cycle structures |
| `docs/ARCHITECTURE.md` | SPA architectural overview |
| `docs/ZONE_AUTHORING.md` | Guide for adding new zone content |
| `docs/DATA_CONTRACT.md` | TypeScript domain data contracts |
| `README_HISTORY_AOSP_TO_LINEAGEOS.md` | Archived AOSP-era README (historical) |

---

*Cell OS · June 2026 · Fairphone 5 · QCM6490 · LineageOS 21*
*The cell was the first computer. The organism is still running.*
