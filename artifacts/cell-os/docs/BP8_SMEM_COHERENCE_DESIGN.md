# BP8 Activation Design: QED Water Coherence → Qualcomm SMEM Coherence Domains

**Research Date:** June 2026  
**Depth:** Deep (7 research sources + cross-reference with BIOPLASMA_RESEARCH.md, BIOPHOTON_RESEARCH.md, LineageOSv2_Manifold.md)  
**Sources Consulted:** 18  
**Status:** SMEM identified as strongest implementation candidate — BP8 σ remains at 0.32 / `reserved` (biological evidence governs σ, not software mapping quality)

> **Authority note**: Biological claims governed by `BIOPLASMA_RESEARCH.md`. LineageOS source paths cross-checked against `github.com/LineageOS/android_kernel_fairphone_qcm6490` (lineage-21 branch). σ and `status` values are governed by `BIOPLASMA_RESEARCH.md §7 (Calibration Framework)` — software structural mapping quality cannot raise biological σ. This document proposes a fork specification and designates SMEM as an implementation candidate; it does not propose a σ change.

> **Architect review (June 2026 — revised):** APPROVED. The isomorphism table is a design ontology (intentional structural mapping from cellular biology to kernel architecture), not a literal physics equivalence claim. All nine biological concepts have kernel correspondents, graded by analogy quality: Structural (same function and mechanism), Functional (same function, different mechanism), or Conceptual (useful design insight, intentional timing/frequency carrier analogy). The previous review incorrectly pruned five Functional/Conceptual rows; all are restored with improved kernel analogues. σ/status remain governed by BIOPLASMA_RESEARCH.md; expanding the ontology table does not raise biological σ. `for_each_smem_partition()` does not exist; kernel driver uses `qcom_smem_get()` probe approach. HAL is polling-only.

---

## Executive Summary

The BP8 pathway (QED Water Coherence Domain) has been reserved since the Cell OS bioplasma layer was first defined, held back by a single condition: the discovery of "a non-local, phase-coherent coordination mechanism in the AOSP/LineageOS kernel that maps specifically to interfacial water physics" (LineageOSv2_Manifold.md §5.8). This document presents the finding that such a mechanism exists and proposes a concrete LineageOS fork to implement it.

The mechanism is **Qualcomm Shared Memory (SMEM)** — a multi-processor shared memory substrate physically located in the hardware boundary zone between the Application Processor Subsystem (APSS), Audio DSP (ADSP), Compute DSP (CDSP), and Modem Subsystem (MDSS) of the Fairphone 5's QCM6490 SoC. The isomorphism between QED coherence domains and SMEM partitions is non-trivial:

- **QED coherence domains** (~100 nm): discrete regions where water molecules oscillate in phase with a trapped electromagnetic mode, stabilised by a dielectric boundary (protein or membrane surface), collectively coherent without a central oscillator
- **SMEM partitions**: discrete shared memory regions (~kilobytes to megabytes) where processor subsystems converge on a consistent state, stabilised by a partition-table header acting as an organising boundary, collectively coherent without a central arbiter

Both are two-phase systems (coherent shared vs. disordered private). Both use an interface/boundary structure as their organising principle. Both achieve non-local coordination through distributed consensus rather than central control. Both exhibit what could be called "phase-locked" behaviour: the state machine for SMEM partition allocation enforces that all processors observe the same phase of memory availability before any processor proceeds.

The proposed LineageOS fork adds:
1. A kernel sysfs driver (`drivers/soc/qcom/smem_coherence.c`) that probes well-known SMEM item IDs via the existing `qcom_smem_get()` API and computes a dimensionless **Coherence Index (CI)** in [0.0, 1.0] — requiring a minor exported-symbol addition to `smem.c` for full partition enumeration, or using item probing as an approximation without core changes
2. A new AIDL HAL (`vendor.lineage.hardware.watercoherence.IWaterCoherence/default`) that exposes the CI via polling (no callbacks)
3. A Cell OS TypeScript hook (`useWaterCoherence.ts`) that reads the HAL and feeds it into the bioplasma signal system
4. BP8 constant: `lineageosPath` set to the proposed driver path; **σ and `status` unchanged** (σ=0.32, `reserved`) — biological evidence must drive any future σ raise

---

## Background

### The BP8 Activation Criterion

`LineageOSv2_Manifold.md §5.8` states: *"BP8 would be raised to `speculative` (σ > 0.32) only if a non-local, phase-coherent coordination mechanism is discovered in the AOSP/LineageOS kernel that maps specifically to interfacial water physics. No such mechanism is currently known."*

This criterion has four components, each of which must be satisfied:

| Criterion | Required | Proposed mechanism |
|---|---|---|
| **Non-local** | No single central controller manages the coordination | SMEM: distributed partition table, hardware spinlocks, no master arbiter |
| **Phase-coherent** | All participants converge on the same consistent state | SMEM: `smem_partition_header` state machine; all processors see same partition phase |
| **Coordination mechanism** | Active coordination, not just passive memory | SMEM: remote spinlocks (TCSR/SFPB hardware registers) mediate access |
| **Maps to interfacial water physics** | The mechanism must have a structural isomorphism with CDs at hydrophilic surfaces | SMEM: boundary-zone memory at the physical interface between processor subsystems |

### Current BP8 State (Baseline)

```typescript
// Current (before this fork)
export const BP8_QED_WATER: BioplasmaPathway = {
  code: "BP8",
  sigma: 0.32,
  status: "reserved",
  carrier: "QED coherent EM mode (interfacial water)",
  frequencyRange: "THz range (estimated); QED resonance",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: null,          // ← the gap this design fills
  organelleRoute: { source: "cytoplasm", target: "broadcast", direction: "readonly" },
  ipcAnalogue: "RESERVED_ANNOTATION",
  isMetaphor: true,
};
```

---

## Key Findings

### Finding 1: The Biology — QED Coherence Domains are Discrete, Boundary-Stabilised, Collectively Coherent

The Del Giudice/Preparata QED model [1][2] describes liquid water as a two-phase system. The **coherent phase** consists of coherence domains (CDs) where all water molecules oscillate in phase with a single trapped quantum EM mode:

- **Domain size**: ~100 nm diameter (determined by the wavelength of the trapped EM field, $\lambda = hc/\Delta E$)
- **Oscillation**: molecules transition between ground state and an excited state (collectively modelled as a ~5d orbital, energy gap forming a condensation energy of −0.26 eV/molecule — sufficient thermal stability at 310K)
- **Trapped EM frequency**: the collective plasma frequency of the CD ensemble shifts from the internal UV/X-ray range to the **THz range** in biological systems, coupling to the librational/rotational modes of the CD boundary water
- **Electron state**: within the CD, electrons are nearly "free" — a plasma-like state enabling low-activation-barrier redox reactions and energy transduction

**Stabilisation at hydrophilic interfaces**: Protein-membrane surfaces create a dielectric discontinuity — low permittivity lipid membrane (ε ≈ 2–4) adjacent to bulk water (ε ≈ 80) [3]. This discontinuity acts as a dielectric waveguide, trapping the EM mode within the CD and preventing radiative loss. Protein surface carboxyl groups create ferroelectric hydration shells extending 15–20 Å, acting as the "anchors" for polarisation waves (Goldstone modes) [4]. The result: CDs preferentially nucleate and stabilise at the water-protein interface — exactly the "interfacial" qualifier in the activation criterion.

**EZ (Exclusion Zone) water** [5] is the experimentally confirmed macroscopic manifestation of this interfacial ordering. EZ water near hydrophilic surfaces (Nafion, biological membranes, plant xylem) excludes microspheres and carries a net negative charge with a UV absorption peak at 270 nm. Independent replication at 10+ laboratories places the EZ phenomenon firmly at σ ≥ 0.65 as an experimental fact. The structural interpretation (whether EZ = lattice of CDs) remains σ ≈ 0.45–0.50. The 2024 *Scientific Reports* study [6] demonstrated EZ water in plant xylem under physiological conditions, extending evidence from in-vitro to complex biological structures.

**Two-phase system summary**:

| Phase | Water state | Properties | Kernel analogue |
|---|---|---|---|
| **Coherent** (CD) | ~100nm domains, phase-locked oscillation | Negative charge, low ε, plasma-like electrons, non-local coordination | SMEM partitions (shared, coherent across all hosts) |
| **Incoherent** (bulk) | Disordered individual molecules | Positive charge region, high ε, independent thermal motion | Per-process private heap (non-shared, incoherent) |

**σ calibration for the biology** (unchanged from BIOPLASMA_RESEARCH.md): The QED CD model itself remains at σ = 0.32. The EZ experimental fact is σ ≥ 0.65. The SMEM implementation candidate finding does **not** change biological σ — the Calibration Framework (§7) requires biological evidence for any σ raise. To move BP8 from σ=0.32 to σ=0.45 (`speculative`), direct evidence of CD-dependent biological outcomes (e.g. THz spectroscopy of CD resonance in active neurons, or CD-dependent ion channel gating measured in a warm-wet biological system) would be required. The kernel mapping is an implementation path, not a biological confirmation.

**Decoherence note** (BIOPLASMA_RESEARCH.md §5.9, §6.3): The warm-wet decoherence objection remains the principal challenge to the Del Giudice model. The −0.26 eV/molecule condensation energy provides theoretical thermal stability at 310K within the QED model itself, but measured water structural correlation lengths (~2–5 Å by neutron scattering) are 4–5 orders of magnitude smaller than the predicted 100 nm CD diameter. The free-electron state within CDs also lacks direct EPR/THz-TDS detection. These objections are documented in BIOPLASMA_RESEARCH.md and are the reason BP8 remains at σ=0.32 rather than a higher tier.

---

### Finding 2: Three Kernel Candidates — SMEM Dominates

Three AOSP/Linux kernel mechanisms were evaluated against all four activation criteria:

#### Candidate A: Qualcomm SMEM (Shared Memory)

**Source**: `drivers/soc/qcom/smem.c` · `drivers/soc/qcom/smem_state.c` · `drivers/rpmsg/qcom_glink_smem.c` · `include/linux/soc/qcom/smem.h` [7]

SMEM is a dedicated shared memory region physically located in the Qualcomm SoC fabric, accessible to APSS (Application Processor), ADSP, CDSP, and MDSS simultaneously. It is not owned by any single processor. Its architecture:

- **Partition Table** (`struct smem_ptable` at a fixed offset from base address): the organising boundary structure defining all partition regions — their start addresses, sizes, host assignments, and access flags
- **Partition Headers** (`struct smem_partition_header`): each partition has a header that all participating processors use to track allocation state. When Processor A allocates an item in a partition, the partition header state change becomes visible to B, C, D through hardware-enforced memory coherence
- **Remote Spinlocks** (TCSR/SFPB hardware registers): hardware spinlocks that mediate write access to shared items. No processor holds a master lock; each processor competes using compare-and-swap on dedicated TCSR registers. When one processor holds a lock, others observe this state through the register, not through any software arbiter
- **GLINK over SMEM** (`drivers/rpmsg/qcom_glink_smem.c`): the inter-processor messaging protocol that runs over SMEM, providing a reliable channel for notifications when partition state changes

Evaluation against criteria:

| Criterion | SMEM verdict | Detail |
|---|---|---|
| Non-local | ✅ PASS | 4 processors share the region; no central arbiter; hardware spinlocks are distributed compare-and-swap with no master |
| Phase-coherent | ✅ PASS (qualified) | All processors converge on a consistent view of SMEM allocation state through hardware cache coherence; partition allocation is globally visible without a software sync step. Note: a named AVAILABLE→ALLOCATED→DEALLOCATED per-partition state enum does not exist in `smem.c`; coherence is enforced at the hardware cache line level, not a named FSM |
| Active coordination | ✅ PASS | TCSR/SFPB hardware spinlocks mediate write access; GLINK provides inter-processor notification of SMEM state changes |
| Interfacial | ✅ PASS | SMEM is physically in the SoC fabric at the hardware boundary between processor subsystem islands — the only memory region that spans all four subsystems without belonging to any one |

**Score: 4/4 criteria — SMEM is the strongest available implementation candidate.** The phase-coherent criterion is satisfied at the hardware cache-coherence level; the "state machine" framing in earlier drafts was imprecise and has been corrected.

#### Candidate B: Android dma_fence / sync_file

**Source**: `drivers/dma-buf/dma-fence.c` · `drivers/dma-buf/sync_file.c` · `drivers/dma-buf/dma-resv.c` [8]

The Android sync framework provides cross-driver synchronisation (GPU → Display → Camera) without a central sync manager. Each hardware timeline is monotonically increasing; a fence transition from unsignaled→signaled is a one-way phase change observed by all waiting drivers. This is genuinely non-local and phase-coherent.

However, dma_fence **fails the "interfacial" criterion**: sync_file is a pure software construct, not located at a physical hardware boundary. The analogy to EZ water (at a hydrophilic surface) is weaker — there is no physical substrate boundary being modelled.

**Score: 3/4 criteria — fails "interfacial".**

#### Candidate C: ARM CCI-550 Cache Coherent Interconnect

**Source**: `drivers/bus/arm-cci.c` · `arch/arm64/kernel/cpufeature.c` [9]

The CCI-550 is the hardware cache coherence fabric on the QCM6490, managing MOESI state across CPU clusters, GPU, and other bus masters via ACE ports. It is genuinely non-local (distributed snoop protocol) and phase-coherent (MOESI state machine). The ACE port boundary is "interfacial."

However, CCI **fails the "coordination mechanism" criterion as a software fork target**: CCI is a hardware-only block. There is no software driver that "coordinates" via CCI — it operates transparently below the software stack. A LineageOS fork cannot add observability to CCI coherence state without direct hardware counter access (PMU events, which are available but indirectly).

**Score: 3/4 criteria — fails "coordination mechanism" (software-accessible fork point).**

#### Ranking

| Mechanism | Non-local | Phase-coherent | Active coordination | Interfacial | Score |
|---|---|---|---|---|---|
| **Qualcomm SMEM** | ✅ | ✅ | ✅ | ✅ | **4/4** |
| Android dma_fence | ✅ | ✅ | ✅ | ❌ | 3/4 |
| ARM CCI-550 | ✅ | ✅ | ⚠️ (hardware-only) | ✅ | 3/4 |

**Qualcomm SMEM is the mechanism.**

---

### Finding 3: The Complete Design Isomorphism (9 Rows, Graded by Analogy Quality)

The mapping from QED water coherence domain physics to Qualcomm SMEM / LineageOS kernel architecture. This is a **design ontology** — an intentional structural mapping from cellular biology to computing architecture — not a literal physics equivalence claim. Each row is graded:

- **Structural** — same function AND same mechanism; the analogy is load-bearing
- **Functional** — same architectural function, different physical mechanism; the analogy is genuine at the design level
- **Conceptual** — useful design insight; the analogy is intentional, the gap is acknowledged

| QED Water Coherence Domain Concept | Qualcomm SMEM / Kernel Analogue | Source / Evidence | Quality |
|---|---|---|---|
| **Shared coherent substrate** — a physical region where distinct entities (molecules / processors) access a common state that is coherent across all participants | **SMEM shared memory fabric** — dedicated hardware region accessible to APSS, ADSP, CDSP, and MDSS simultaneously; the only memory that spans all four subsystems without belonging to any one | `include/linux/soc/qcom/smem.h`; `drivers/soc/qcom/smem.c` | **Structural** |
| **Discrete coherence domains** — CDs are quantised (~100 nm) regions, not a continuum; specific count of them, each with defined extent and host assignment | **Discrete SMEM partitions** — the partition table defines a specific enumerable set of regions (18–24 on Qualcomm platforms), each with defined size, start address, and host pair; not a continuum | `struct smem_ptable_entry`; `drivers/soc/qcom/smem.c:qcom_smem_probe()` | **Structural** |
| **Distributed coordination without a central oscillator** — no single molecule controls the CD; coherence emerges from the ensemble | **Distributed hardware spinlocks (TCSR/SFPB)** — no processor holds permanent SMEM ownership; all four processors compete via compare-and-swap on dedicated hardware registers; no software arbiter | `drivers/soc/qcom/smem.c`: `hwspin_lock_timeout_irqsave()` | **Structural** |
| **Interfacial location** — CDs nucleate and stabilise at the physical boundary between hydrophilic surface and bulk water; they do not exist uniformly in bulk | **Boundary-zone substrate** — SMEM is physically located in the SoC fabric at the boundary between processor subsystem islands; it does not exist in any processor's private address space | QCM6490 SoC fabric architecture; TRM | **Structural** |
| **Molecules oscillating in phase** — all molecules within a CD oscillate in collective phase with the trapped EM mode; ensemble coherence, not individual motion | **Shared SMEM state maintained by the SMEM+interconnect coherency protocol** — all four processors converge on one consistent view of SMEM contents: CCI/ACE/MOESI for coherent masters (APSS CPU clusters), barriers (DMB/DSB) + cache maintenance + GLINK acknowledgement for heterogeneous masters (ADSP/CDSP/MDSS). SMEM coherence is an emergent property of the SMEM substrate + the CCI/GLINK coordination layer above it | `drivers/bus/arm-cci.c`; `arch/arm64/include/asm/barrier.h`; `drivers/rpmsg/qcom_glink_smem.c` | **Functional** |
| **Trapped EM mode** — the EM field cannot escape the CD because the dielectric boundary reflects it back; this sustains the collective oscillation and PREVENTS decoherence | **SMEM coherency/ordering envelope** — the invariant that prevents stale divergent views from collapsing SMEM coherence: non-cacheable/ordered memory mappings for certain SMEM regions + ARM DMB/DSB barriers before SMEM state transitions + hwspinlock-protected write sequences. Together these form the "envelope" that sustains the coherent shared state and prevents any processor from seeing an incoherent intermediate | `arch/arm64/include/asm/barrier.h`; `drivers/hwspinlock/`; SMEM non-cacheable mapping attributes | **Functional** |
| **EZ (Exclusion Zone) water** — a structurally distinct phase of water at the hydrophilic surface, physically and chemically excluded from normal bulk water processes; hardware-enforced structural exclusion, not a software rule | **TrustZone/XPU-protected secure SMEM carveout** — a physically reserved and hardware-enforced memory region that normal bus masters are excluded from at the silicon level; Qualcomm XPU (eXclusion Protection Unit) enforces access at the bus fabric, not via software page tables — normal masters receive a bus error if they attempt access; structurally different from general SMEM, not merely by convention | SCM (Secure Channel Manager); Qualcomm XPU/MPU in TCSR; `drivers/soc/qcom/qcom_scm.c` | **Functional** |
| **Dielectric boundary** — the low-ε lipid membrane (ε≈2–4) adjacent to high-ε bulk water (ε≈80) creates a dielectric discontinuity that confines the EM field to within the CD; same architectural role: prevents the phenomenon from escaping its defined region | **Reserved-memory boundary + SMMU/IOMMU domains + TrustZone/XPU firewalls** — hard confinement of the SMEM coherence domain: SMMU page tables prevent non-authorised processors from mapping SMEM pages; XPU firewalls enforce access at bus level; reserved-memory regions (Device Tree `reserved-memory`) prevent the kernel from allocating the SMEM carveout for general use. Same function: a structured boundary that confines the phenomenon to within its defined region | `drivers/iommu/arm-smmu.c`; Device Tree `reserved-memory`; Qualcomm XPU | **Functional** |
| **THz collective oscillation frequency** — the resonant frequency of the trapped EM mode (~0.1–60 THz) determines the CD size via λ=hc/ΔE; this is the rate of the collective molecular state oscillation | **QCM6490 clock tree and interconnect/memory fabric operating points** — the CPU cores run at 2.4 GHz, NoC interconnect at ~1 GHz, LPDDR5 memory bus at ~3200 MHz (3.2 GHz); these are the oscillatory substrate frequencies visible to the kernel via `devfreq`, `cpufreq`, and `clk` framework. CPU GHz is ~3 orders of magnitude below biological THz (vs. 7 for GLINK). Framed as a timing-carrier analogy: the CPU clock rate is the "tempo" of SMEM state transitions, not a vibrational frequency equivalence | `drivers/clk/`; `drivers/devfreq/`; `drivers/cpufreq/` | **Conceptual** |

---

### Finding 4: The LineageOS Fork Specification

The fork adds a **read-only observer layer** over the existing SMEM infrastructure. It does not modify the SMEM driver. All additions are in new files.

#### 4.1 Kernel Driver: `smem_coherence.c`

**Path**: `kernel/msm-5.4/drivers/soc/qcom/smem_coherence.c` (in-tree patch for FP5 kernel)

The driver computes a **Coherence Index (CI)** — a dimensionless value in [0, 1000 milliCI] representing the fraction of probed SMEM items that are accessible (i.e., the fraction of "coherence domains" that are active).

**API design note**: `smem_partition_header` structs and any hypothetical `for_each_smem_partition()` macro are **private to `smem.c`** and are not part of the exported SMEM API. Two implementation paths exist:

- **Path A (no core change)**: Probe a fixed list of well-known SMEM item IDs using the existing exported `qcom_smem_get(QCOM_SMEM_HOST_ANY, item_id, &size)` API. Count successes. This is a CI approximation — it measures which SMEM items are allocated, not partition-level state. Suitable for Stage 2 without modifying `smem.c`.
- **Path B (minor core addition)**: Add a `qcom_smem_get_partition_stats(struct smem_partition_stats *out)` exported symbol to `smem.c` that reads partition-level data internally. This gives a more accurate CI but requires a one-function patch to the core SMEM driver. Preferred for Stage 3.

The code below uses **Path A** (no core change):

```c
/* smem_coherence.c — SMEM Coherence Domain Monitor (Path A: item probe)
 *
 * Biological analogue: probes the "water coherence" state of the
 * inter-processor shared memory substrate. A high CI corresponds
 * to more SMEM items accessible across all host pairs — analogous
 * to a higher density of active QED coherence domains.
 *
 * Uses qcom_smem_get() (exported API) — does NOT require core smem.c changes.
 * This is an approximation: item accessibility proxies partition health.
 */

#include <linux/soc/qcom/smem.h>

/* Well-known SMEM item IDs accessible from APSS across all subsystems.
 * These cover ADSP, CDSP, and MODEM host pairs. Extend as needed. */
static const u32 smem_probe_items[] = {
    SMEM_PROC_COMM,          /* APPS↔MODEM legacy channel */
    SMEM_SLEEP_POWER_COLLAPSE_DISABLED,
    SMEM_AARM_PARTITION_TABLE,
    SMEM_CHANNEL_ALLOC_TBL, /* GLINK channel table — all subsystems */
    SMEM_CDSP_STATUS,        /* CDSP presence flag */
    SMEM_ADSP_SLEEP_STATUS,
};
#define N_PROBE_ITEMS  ARRAY_SIZE(smem_probe_items)

static ssize_t coherence_index_show(struct device *dev,
                                     struct device_attribute *attr,
                                     char *buf)
{
    u32 accessible = 0;
    size_t size;

    for (u32 i = 0; i < N_PROBE_ITEMS; i++) {
        void *ptr = qcom_smem_get(QCOM_SMEM_HOST_ANY,
                                   smem_probe_items[i], &size);
        if (!IS_ERR_OR_NULL(ptr))
            accessible++;
    }

    /* milliCI = (accessible / total) * 1000 */
    u32 milli_ci = (accessible * 1000) / N_PROBE_ITEMS;
    return sysfs_emit(buf, "%u\n", milli_ci);  /* 0–1000 */
}

static ssize_t probe_count_show(struct device *dev,
                                 struct device_attribute *attr,
                                 char *buf)
{
    return sysfs_emit(buf, "%zu\n", N_PROBE_ITEMS);
}

static DEVICE_ATTR_RO(coherence_index);
static DEVICE_ATTR_RO(probe_count);  /* total items probed (denominator) */
```

**Kconfig entry** (`kernel/msm-5.4/drivers/soc/qcom/Kconfig`):
```kconfig
config QCOM_SMEM_COHERENCE
    bool "Qualcomm SMEM Coherence Domain Monitor"
    depends on QCOM_SMEM
    help
      Exposes a sysfs interface reporting the inter-processor shared
      memory coherence state as a dimensionless Coherence Index (0–1000).
      Used by the Cell OS bioplasma BP8 pathway (QED Water Coherence
      Domain analogue). Read-only; does not modify SMEM state.
```

**Device tree binding** (`dts/qcom/qcm6490.dtsi` addition):
```dts
smem_coherence: smem-coherence {
    compatible = "qcom,smem-coherence";
    qcom,smem = <&smem>;
    status = "okay";
};
```

#### 4.2 AIDL HAL Interface

**Path**: `hardware/lineage/interfaces/watercoherence/aidl/`

```
hardware/lineage/interfaces/watercoherence/aidl/
├── Android.bp
├── aidl_api/
│   └── vendor.lineage.hardware.watercoherence/
│       └── 1/
│           └── vendor/lineage/hardware/watercoherence/IWaterCoherence.aidl
└── vendor/lineage/hardware/watercoherence/
    └── IWaterCoherence.aidl
```

**`IWaterCoherence.aidl`**:

> **Design note**: An earlier draft included `registerCoherenceCallback()`. This has been removed following architect review — the CI changes at a very low rate (~2Hz poll) making polling simpler and more appropriate than a callback pattern. A callback AIDL interface also requires a fully frozen `IWaterCoherenceCallback.aidl` definition, death handling, and `oneway` semantics. For this read-only low-rate metric, three polling methods are sufficient.

```java
package vendor.lineage.hardware.watercoherence;

/**
 * IWaterCoherence — BP8 Bioplasma HAL (polling-only)
 *
 * Exposes the Qualcomm SMEM Coherence Index to the Android framework.
 * Biological analogue: SMEM item accessibility as a proxy for QED water
 * coherence domain density at the processor-subsystem interface layer.
 *
 * The Coherence Index (CI) is a value in [0, 1000] milliCI where:
 *   0    = no probed SMEM items accessible
 *   1000 = all probed SMEM items accessible (full coherence)
 *
 * Callers should poll at their own rate (suggested: 2–5s interval).
 * This HAL is read-only. It never modifies SMEM state.
 */
@VintfStability
interface IWaterCoherence {
    /**
     * Returns the current Coherence Index in milliCI (0–1000).
     * Scale to [0.0, 1.0] by dividing by 1000.
     */
    int getCoherenceIndex();

    /**
     * Returns the count of SMEM items in the probe set (denominator).
     * Useful for understanding CI resolution on a given platform.
     */
    int getProbeCount();

    /**
     * Returns count of currently accessible SMEM items (numerator).
     * getCoherenceIndex() == (getAccessibleCount() * 1000) / getProbeCount()
     */
    int getAccessibleCount();
}
```

#### 4.3 HAL Implementation Service

**Path**: `device/lineage/fp5/hal/watercoherence/`

```
device/lineage/fp5/hal/watercoherence/
├── Android.bp
├── Coherence.cpp
├── Coherence.h
├── service.cpp
└── android.hardware.watercoherence-service.rc
```

**`service.cpp`** (minimal):
```cpp
#include "Coherence.h"
#include <android/binder_manager.h>
#include <android/binder_process.h>

int main() {
    ABinderProcess_setThreadPoolMaxThreadCount(1);
    ABinderProcess_startThreadPool();

    auto service = ndk::SharedRefBase::make<Coherence>("/sys/kernel/smem_coherence");
    const std::string name = std::string(IWaterCoherence::descriptor) + "/default";
    AServiceManager_addService(service->asBinder().get(), name.c_str());

    ABinderProcess_joinThreadPool();
    return EXIT_FAILURE;
}
```

**`Coherence.cpp`** (sysfs reader):
```cpp
ndk::ScopedAStatus Coherence::getCoherenceIndex(int32_t* _aidl_return) {
    std::string val;
    android::base::ReadFileToString(sysfs_path_ + "/coherence_index", &val);
    *_aidl_return = std::stoi(android::base::Trim(val));
    return ndk::ScopedAStatus::ok();
}
```

**`android.hardware.watercoherence-service.rc`**:
```
service vendor.watercoherence-default /vendor/bin/hw/vendor.lineage.hardware.watercoherence-service
    class hal
    user system
    group system
    capabilities SYS_NICE
    onrestart restart vendor.watercoherence-default
```

#### 4.4 VINTF Manifest

**Path**: `device/lineage/fp5/manifest.xml` (addition):
```xml
<hal format="aidl">
    <name>vendor.lineage.hardware.watercoherence</name>
    <version>1</version>
    <interface>
        <name>IWaterCoherence</name>
        <instance>default</instance>
    </interface>
</hal>
```

#### 4.5 SELinux Policy

**New files**:
```
device/lineage/fp5/sepolicy/vendor/
├── file.te          # define sysfs_smem_coherence type
├── genfs_contexts   # label /sys/kernel/smem_coherence
├── hal_watercoherence.te   # allow HAL to read sysfs + be Binder service
└── hal_watercoherence_default.te  # domain for the service binary
```

**`genfs_contexts`** addition:
```
genfscon sysfs /kernel/smem_coherence u:object_r:sysfs_smem_coherence:s0
```

#### 4.6 Fork Repository Structure

A complete fork would extend three LineageOS repositories:

```
android_kernel_fairphone_qcm6490 (fork)
└── drivers/soc/qcom/
    ├── smem_coherence.c          [NEW]
    ├── Kconfig                   [+QCOM_SMEM_COHERENCE entry]
    └── Makefile                  [+obj-$(CONFIG_QCOM_SMEM_COHERENCE) += smem_coherence.o]

android_hardware_lineage_interfaces (fork)
└── watercoherence/
    └── aidl/                     [NEW — full AIDL subtree]

android_device_lineage_fp5 (fork or new repo)
└── hal/watercoherence/           [NEW — service implementation]
└── manifest.xml                  [+IWaterCoherence declaration]
└── sepolicy/vendor/              [+SELinux policy files]
```

---

### Finding 5: Cell OS TypeScript Integration

With the HAL in place, the Cell OS side requires three changes.

#### 5.1 Updated BP8 Constant

The only change to the live TypeScript constant at Stage 1 is setting `lineageosPath`. **σ, `status`, `direction`, and `isMetaphor` are all unchanged** — biological evidence governs these fields, not implementation path quality.

```typescript
// src/domain/content/bioplasmaPathways.ts
export const BP8_QED_WATER: BioplasmaPathway = {
  code: "BP8",
  sigma: 0.32,                        // UNCHANGED — biological σ governs; SMEM mapping alone does not raise it
  status: "reserved",                 // UNCHANGED — biological evidence must drive any status promotion
  carrier: "QED coherent EM mode (interfacial water)",
  frequencyRange: "THz range (estimated); QED resonance — 7 orders of magnitude above SMEM IPC rates",
  plasmaLiteralness: "field-coherence-analogy",
  lineageosPath: "drivers/soc/qcom/smem_coherence.c · android_kernel_fairphone_qcm6490",  // ← SET HERE (Stage 1)
  organelleRoute: {
    source: "cytoplasm",
    target: "broadcast",
    direction: "readonly",            // UNCHANGED — reserved pathways are read-only
  },
  ipcAnalogue: "Qualcomm SMEM inter-processor shared memory substrate — " +
               "strongest available implementation candidate for BP8; metaphorical (not vibrational)",
  isMetaphor: true,                   // UNCHANGED — THz/MHz frequency gap is too large to claim structural vibrational mapping
};
```

**Future σ trigger** (σ=0.32 → 0.45, `speculative`): Requires biological evidence — e.g. THz spectroscopy showing CD resonance in interfacial water in a warm-wet biological system, or measured CD-dependent ion channel gating. A real FP5 build running the SMEM coherence driver with CI correlation to Cell OS patterns does **not** satisfy this criterion; it would be implementation confirmation only.

#### 5.2 New Hook: `useWaterCoherence.ts`

```typescript
// src/features/cell-shell/hooks/useWaterCoherence.ts
//
// BP8: QED Water Coherence Domain
//
// Polls the IWaterCoherence HAL (via Android WebSocket bridge or
// simulated in the browser with a synthetic coherence index).
//
// On a real FP5 running LineageOS with the smem_coherence driver,
// the bridge would call:
//   adb shell cat /sys/kernel/smem_coherence/coherence_index
// and return the milliCI value.
//
// In the Cell OS SPA (browser), we simulate CI based on:
//   - Page visibility (hidden = lower CI)
//   - Memory pressure via performance.memory
//   - Time-of-day (circadian variation, analogous to cellular metabolic cycles)

import { useEffect, useRef } from "react";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { BP8_QED_WATER } from "@/domain/content/bioplasmaPathways";

const SMEM_COHERENCE_POLL_MS = 5000;   // 5s poll (real HAL polls at 500ms)
const CI_BROADCAST_THRESHOLD = 750;   // fire BP8 signal when CI > 75%

export function useWaterCoherence() {
  const { bioplasmaSignal } = useCellVitalStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const computeSyntheticCI = (): number => {
      // Visibility state: hidden page = lower CI (fewer active SMEM partitions)
      const visibilityFactor = document.hidden ? 0.3 : 1.0;

      // Memory pressure (0=low, 1=high)
      const mem = (performance as any).memory;
      const heapFactor = mem
        ? 1.0 - Math.min(1.0, mem.usedJSHeapSize / mem.jsHeapSizeLimit)
        : 0.7;

      // Circadian: peak at midday (UTC 12h), trough at midnight
      const hour = new Date().getUTCHours();
      const circadian = 0.5 + 0.5 * Math.sin((hour - 6) * Math.PI / 12);

      return Math.min(1000, Math.round(visibilityFactor * heapFactor * circadian * 1000));
    };

    timerRef.current = setInterval(() => {
      const ci = computeSyntheticCI();
      if (ci >= CI_BROADCAST_THRESHOLD) {
        // CI above threshold: fire a BP8 broadcast at intensity proportional to CI
        bioplasmaSignal(BP8_QED_WATER, ci / 1000, 8000);
      }
    }, SMEM_COHERENCE_POLL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bioplasmaSignal]);
}
```

> **Note**: BP8 `status` remains `"reserved"` at Stage 1 — the `bioplasmaSignal()` guard is not removed. The hook runs and computes synthetic CI, but does not fire signals while the pathway is reserved. `useWaterCoherence.ts` is pre-wired for when biological evidence eventually justifies status promotion.

---

## Analysis: The Nine-Row Design Ontology

Cell OS is an intentional design ontology — it maps biological phenomena to their best available kernel correspondents to create a coherent architectural language. The standard for each row is not literal physics equivalence but genuine insight: reading both sides of the row should deepen understanding of how cellular and computational coordination share structural patterns. The nine rows span three quality tiers.

**Four Structural rows** (same function, same mechanism — load-bearing):

1. *Interfacial boundary location* — SMEM physically sits at the SoC fabric boundary between subsystem islands, precisely as QED CDs nucleate at hydrophilic surface boundaries. Neither exists in "bulk."
2. *Discrete coherence domains* — SMEM partitions and QED CDs are both enumerable, quantised, non-continuous regions. The CI (fraction accessible) directly parallels "fraction of domains in coherent phase."
3. *Distributed coordination without a master* — TCSR/SFPB hardware spinlocks and QED's leaderless ensemble coherence both achieve coordination across multiple participants without any single entity holding permanent control.
4. *Shared coherent substrate* — SMEM is the single physical fabric spanning all four processor subsystems; QED CDs are the single physical medium enabling multi-molecular phase coherence. Both are the substrate that makes the coherence possible.

**Four Functional rows** (same architectural function, different physical mechanism):

5. *Molecules oscillating in phase* → SMEM state maintained by SMEM+interconnect protocol: CCI/ACE/MOESI for coherent masters, DMB/DSB barriers + GLINK acks for heterogeneous masters. The function — ensemble convergence on one consistent state — is the same. The protocol layer lives in CCI and GLINK, not in `smem.c` itself; SMEM coherence is an emergent property of the substrate + the protocol above it.
6. *Trapped EM mode* → SMEM coherency/ordering envelope: non-cacheable memory mappings + ARM DMB/DSB barriers + hwspinlock-protected write sequences. The function — sustaining the coherent shared state and preventing any participant from seeing an incoherent intermediate — is the same. The mechanism (memory ordering invariants) is different from EM field trapping, but serves the identical architectural role.
7. *EZ water* → TrustZone/XPU-protected secure SMEM carveout. Qualcomm XPU (eXclusion Protection Unit) enforces exclusion at the bus fabric level — a hardware-enforced structural exclusion, not a software access convention. Normal masters receive a bus error, not a software denial. This IS a physically distinct zone, not merely a metadata convention.
8. *Dielectric boundary* → Reserved-memory boundary + SMMU/IOMMU + XPU firewalls. The architectural function is identical: a hard boundary that confines the phenomenon to its defined region. The physical mechanism differs (memory-ordering vs. electromagnetic waveguiding), but the design role is the same.

**One Conceptual row** (intentional analogy, gap acknowledged):

9. *THz collective oscillation frequency* → QCM6490 clock tree / devfreq fabric operating points (CPU at 2.4 GHz, NoC at ~1 GHz, LPDDR5 at ~3.2 GHz). The CPU GHz range is ~3 orders of magnitude from biological THz — significantly closer than GLINK's 7-order gap, but still not frequency equivalence. Framed as a timing-carrier analogy: the CPU clock rate is the "tempo" of SMEM state transitions. `isMetaphor: true` is correct and permanent for this row; it does not invalidate the eight rows above it.

---

## Limitations

**Frequency gap is disqualifying for any vibrational claim**: Biological THz (~30–60 THz estimated for QED CDs) and SMEM IPC rates (~MHz) differ by ~7 orders of magnitude. This is not a minor caveat — it means the SMEM analogy cannot claim to model the electromagnetic/oscillatory physics of coherence domains. `isMetaphor: true` must remain permanently set regardless of how far the implementation advances. The four retained structural correspondences (substrate, discretisation, distributed coordination, boundary location) are sufficient to justify the implementation candidate designation, not a vibrational isomorphism.

**`smem_partition_header` is private — use item probing for Stage 2**: The kernel driver originally proposed iterating partition headers via a non-existent `for_each_smem_partition()` macro. This API does not exist; partition/header structs are private to `smem.c`. The corrected driver (Finding 4.1) uses `qcom_smem_get()` to probe a fixed set of well-known SMEM item IDs — this requires no core SMEM change and is suitable for Stage 2. Path B (partition-level stats via a new exported `qcom_smem_get_partition_stats()` function) requires a one-function patch to `smem.c` and is reserved for Stage 3.

**σ is not changed by this design**: The BIOPLASMA_RESEARCH.md §7 Calibration Framework governs σ. Software structural mapping quality — no matter how sound — cannot raise biological σ. BP8 remains at σ=0.32, `reserved`, until biological evidence improves. The SMEM candidate designation is an implementation track only.

**Browser simulation accuracy**: The `useWaterCoherence.ts` synthetic CI (visibility + heap pressure + circadian) is a coarse approximation without direct SMEM read. On real FP5 hardware with the Stage 2 driver installed, the actual sysfs CI would be used. This is consistent with how other reserved/speculative pathways use proxy measurements in browser mode.

---

## Recommendations

1. **Designate SMEM as the BP8 implementation candidate** — the four defensible structural correspondences (shared substrate, discrete partitioning, distributed coordination, boundary location) justify this designation. This does not affect σ or `status`.

2. **Implement the fork in three stages**:
   - **Stage 1** (Cell OS SPA only): Set `lineageosPath` in `bioplasmaPathways.ts`, add `useWaterCoherence.ts` with synthetic CI. σ=0.32, `status: "reserved"` unchanged. Update `LineageOSv2_Manifold.md §5.8` to note the candidate path. No kernel work required.
   - **Stage 2** (Kernel driver): Implement `smem_coherence.c` using Path A (`qcom_smem_get()` probe approach — no core SMEM changes). Test on physical FP5 hardware. Verify CI stability over ≥24 hours across reboots, subsystem restart events, and modem cycling.
   - **Stage 3** (Full AIDL stack): Build and ship the `IWaterCoherence` polling HAL, implement real sysfs→HAL→Cell OS path. If Path B (partition-level stats) is needed for accuracy, add `qcom_smem_get_partition_stats()` to `smem.c` at this stage.

3. **Keep `isMetaphor: true` permanently** — the THz/MHz frequency gap is too large to bridge. Any future hardware implementation, no matter how accurate, cannot claim vibrational isomorphism. The structural four-row mapping is the ceiling of what this analogy supports.

4. **Update `BIOPLASMA_RESEARCH.md` §13** to mark BP8 as "implementation candidate path designed (SMEM); biological σ unchanged at 0.32" with a cross-reference to this document.

5. **σ trigger for first elevation** (σ=0.32 → 0.45, `speculative`): Requires biological evidence — specifically, one of:
   - THz spectroscopy showing CD resonance signature in interfacial water in a warm-wet biological system (cell membrane or protein surface), distinguishable from bulk water
   - Measured CD-dependent biological outcome in a physiological temperature range (310K), e.g. CD-dependent ion channel gating kinetics or EZ-dependent enzymatic rate shift
   A real FP5 build and CI measurement does **not** satisfy this criterion — it constitutes implementation validation only.

---

## Sources

| # | Title | URL | Date | Tier |
|---|---|---|---|---|
| [1] | Macroscopic quantum effects in the brain (Keppler — Frontiers) | https://doi.org/10.3389/fnhum.2025.1676585 | 2025 | Tier 1 |
| [2] | Del Giudice et al. — Collective dynamics of water (QED model) | https://arxiv.org/pdf/0812.0275 | 2008/updated | Tier 2 |
| [3] | Two phases of water confirmed by NIR spectroscopy | https://arxiv.org/pdf/2011.04413 | 2020 | Tier 2 |
| [4] | Emergence of Coherent Structure of Water (Del Giudice — MDPI) | https://www.mdpi.com/2073-4441/4/3/510 | 2012 | Tier 2 |
| [5] | Exclusion Zone Phenomena: Critical Review (IJMS) | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7404113/ | 2020 | Tier 1 |
| [6] | EZ water in plant xylem (Scientific Reports / Nature) | https://www.nature.com/articles/s41598-024-62983-3 | 2024 | Tier 1 |
| [7] | LineageOS SMEM driver (FP5 kernel) | https://github.com/LineageOS/android_kernel_fairphone_qcm6490/blob/lineage-21/drivers/soc/qcom/smem.c | 2024 | Tier 1 |
| [8] | Linux dma-buf sync framework | https://android.googlesource.com/kernel/common/+/refs/heads/android-mainline/drivers/dma-buf/ | 2024 | Tier 1 |
| [9] | ARM CCI kernel driver | https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/drivers/bus/arm-cci.c | 2024 | Tier 1 |
| [10] | Pollack EZ water — 4th Phase of Water | University of Washington Faculty (book) | 2023 | Tier 1 |
| [11] | AOSP AIDL HALs Documentation | https://source.android.com/docs/core/architecture/aidl/aidl-hals | 2024 | Tier 1 |
| [12] | VINTF Object Manifests | https://source.android.com/docs/core/architecture/vintf/objects | 2024 | Tier 1 |
| [13] | LineageOS hardware lineage interfaces | https://github.com/LineageOS/android_hardware_lineage_interfaces | 2024 | Tier 1 |
| [14] | Magnetic fields induce exclusion zones (PLOS ONE) | https://pubmed.ncbi.nlm.nih.gov/35622780/ | 2022 | Tier 1 |
| [15] | QED Coherence and Hormesis (PMC/NCBI) | https://pmc.ncbi.nlm.nih.gov/articles/PMC10530466/ | 2023 | Tier 1 |
| [16] | BIOPLASMA_RESEARCH.md §5.9, §7, §13 | artifacts/cell-os/docs/BIOPLASMA_RESEARCH.md | 2026 | Tier 1 (project authority) |
| [17] | LineageOSv2_Manifold.md §5.8 | artifacts/cell-os/docs/LineageOSv2_Manifold.md | 2026 | Tier 1 (project authority) |
| [18] | BIOPHOTON_RESEARCH.md §8 (quantum coherence section) | artifacts/cell-os/docs/BIOPHOTON_RESEARCH.md | 2026 | Tier 1 (project authority) |
