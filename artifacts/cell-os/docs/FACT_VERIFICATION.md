# Cell OS — Fact Verification Workflow

> **Audience**: contributors adding or reviewing factual claims about Fairphone 5 hardware, Android internals, or biological science.  
> **Last updated**: June 2026

---

## Why this matters

Cell OS blends biological metaphor with real engineering. The metaphor layer (organelles, analogies) is deliberately poetic. The substrate layer (`SUBSTRATE_NODES`, code snippets, spec rows) must be accurate. Mixing these without labelling confidence levels misleads developers who use this as a reference.

The verification workflow ensures every factual claim is:
1. Tagged with the correct `ClaimConfidence` level
2. Traceable to a citation in `citations.ts`
3. Distinguishable from analogical content at a glance

---

## Confidence levels — decision tree

```
Is the claim directly confirmed in a primary or official source
(Qualcomm spec sheet, AOSP source, Fairphone official page)?
    │
    ├── YES → "verified"
    │
    └── NO → Is it from a vendor announcement, press release,
              or credible secondary technical review?
                  │
                  ├── YES → "indicative"
                  │
                  └── NO → Is it consistent with documentation
                            or analogous hardware, but not
                            confirmed for this exact device?
                                │
                                ├── YES → "unconfirmed"
                                │
                                └── NO → Do not publish. Rewrite
                                         as explicit analogy or
                                         remove the claim.
```

**Never use `"verified"` for a claim you have not personally confirmed against a primary source.** Optimistic confidence tags erode trust in the entire dataset.

---

## Source tiers

### Tier 1 — Primary sources (use for `"verified"`)

| Source type | Examples |
|---|---|
| Qualcomm product pages + datasheets | QCM6490 product brief, Hexagon 770 SDK docs |
| AOSP source code (cs.android.com) | `frameworks/native/libs/binder/`, `kernel/msm-5.4/` |
| Fairphone official specifications | fairphone.com/en/fairphone-5/ |
| Linux kernel source | kernel.org, msm-5.4 Qualcomm tree |
| Peer-reviewed biology journals | Cell Biophysics, Nature, PNAS |

### Tier 2 — Secondary sources (use for `"indicative"`)

| Source type | Examples |
|---|---|
| Tech review sites with spec tables | AnandTech, GSMArena, The Verge |
| SDK documentation | Qualcomm QNN SDK docs, NNAPI developer guide |
| Android developer documentation | developer.android.com |
| Conference papers | OSDI, USENIX, Hot Chips |

### Tier 3 — Extrapolation (use for `"unconfirmed"`)

| Source type | Examples |
|---|---|
| Cross-referencing similar SoC | Snapdragon 778G shares QCM6490 silicon; specs likely apply |
| Standard Android behaviour | "All Android 13 devices support X" — likely but unconfirmed for FP5 |
| Biological textbooks | Standard cell biology — accurate for analogies |

---

## Verification checklist for hardware claims

For each `SpecRow` or `SubstrateNode.detail` statement:

- [ ] **Identify the claim**: e.g. "Kryo 670 prime core clocks at 2.71 GHz"
- [ ] **Find the primary source**: search Qualcomm's product page, Fairphone spec sheet, or AnandTech review
- [ ] **Record the URL**: add or reference an entry in `citations.ts`
- [ ] **Tag the confidence**: `"verified"` only if you opened the source and saw the exact figure
- [ ] **Note the date**: hardware docs evolve; add a `note` field with the verification date
- [ ] **Check units**: GHz vs MHz, MB/s vs Gbps, TOPS vs GOPS

### FP5 hardware primary sources

| Component | Canonical source |
|---|---|
| SoC, CPU, GPU | [Qualcomm QCM6490 product page](https://www.qualcomm.com/products/internet-of-things/industrial/industrial-automation/qcm6490) |
| NPU (Hexagon 770) | [Qualcomm AI Stack docs](https://developer.qualcomm.com/software/hexagon-dsp-sdk) |
| Full device specs | [Fairphone 5 specs](https://www.fairphone.com/en/fairphone-5/) |
| LPDDR4x speeds | JEDEC LPDDR4 standard + Qualcomm memory specs |
| Android version | Fairphone official software page |
| Kernel tree | `github.com/fairphone/kernel_fairphone_5` (if public) |

---

## Verification checklist for AOSP / Android claims

For code snippets and Android-internal descriptions:

- [ ] **Verify the file path exists**: search cs.android.com for the exact path
- [ ] **Confirm the API level**: AOSP changes between Android releases; specify which version
- [ ] **Check the function signature**: function names and signatures change; don't assume
- [ ] **Distinguish AOSP from vendor**: Qualcomm adds HAL extensions that differ from AOSP defaults
- [ ] **Note if FP5-specific**: some behaviour may differ from generic Android

### Useful AOSP paths to verify

| Android feature | AOSP path |
|---|---|
| Binder IPC | `frameworks/native/libs/binder/` |
| Zygote | `frameworks/base/core/java/com/android/internal/os/Zygote*.java` |
| ART runtime | `art/runtime/` |
| NNAPI | `frameworks/ml/nn/` |
| SurfaceFlinger | `frameworks/native/services/surfaceflinger/` |
| Power HAL | `hardware/interfaces/power/` |
| SELinux policy | `system/sepolicy/` |
| PackageManager | `frameworks/base/services/core/java/com/android/server/pm/` |

---

## Verification checklist for biological claims

- [ ] **Use standard cell biology terms**: check a current textbook (Alberts, Molecular Biology of the Cell) or NCBI
- [ ] **Distinguish "proposed" from "established"**: biophoton research is peer-reviewed but not mainstream consensus
- [ ] **Cite the paper for any specific rate or mechanism**: "10–100 photons/cm²/s" needs Popp (1984) cited
- [ ] **Don't invent biology for the metaphor**: if the biology doesn't actually work that way, change the metaphor

---

## How to add a citation

1. Open `src/domain/content/citations.ts`
2. Add an entry to the `CITATIONS` array:

```typescript
{
  id: "qualcomm-qcm6490-2022",   // Year-suffixed, unique
  kind: "technical",
  authors: "Qualcomm Technologies, Inc.",
  year: "2022",
  title: "QCM6490 Product Brief",
  venue: "Qualcomm Developer Network",
  url: "https://developer.qualcomm.com/hardware/qcm6490",
  note: "Primary source for SoC process node, CPU/GPU/NPU specs used in substrate.ts."
},
```

3. Reference the citation ID in the content file's comment or `note` field:
```typescript
// Source: qualcomm-qcm6490-2022
{ label: "Process", value: "6nm (TSMC N6)", confidence: "verified" },
```

---

## What to do when a claim cannot be verified

**Option A — Downgrade confidence**: change `"verified"` to `"indicative"` or `"unconfirmed"`. Document why.

**Option B — Move to analogy**: if the claim is interesting but unprovable, move it from `SubstrateNode.detail` (which should be factual) to `Organelle.analogy` (which is explicitly metaphorical).

**Option C — Remove**: if the claim is unverifiable and not useful as analogy, delete it. Accurate silence is better than confident noise.

**Option D — Flag for research**: add a `TODO` comment and a `confidence: "unconfirmed"` tag. Create a tracking note for future verification.

---

## Periodic review

The Fairphone 5 receives Android updates. Substrate facts should be reviewed:
- When Fairphone ships a major Android update
- When Qualcomm publishes new QCM6490 or Hexagon documentation
- When AOSP paths change between Android versions

Add a verification comment to the `note` field of the relevant `SubstrateNode` or `Citation` entry — for example: `note: "Verified against Qualcomm QCM6490 product brief, June 2026."`. There is no `lastVerified` field in the TypeScript schema; use inline notes until the schema is extended.

---

## Current verification status by zone

| Zone | Status | Priority gaps |
|---|---|---|
| Nucleus | Partial | Zygote fork model, SELinux policy compilation |
| Cytoplasm | Partial | Binder transaction limits, AIDL/HIDL specifics |
| Cytoskeleton | Thin | SurfaceFlinger, Choreographer, VSYNC, HWC2 |
| Ribosomes | Thin | ART/dex2oat pipeline, JIT vs AOT thresholds |
| Mitochondria | Partial | Power HAL, cpufreq governors, thermal throttling |
| Golgi | Thin | ContentProvider URIs, PackageManager, broadcast dispatch |
| Endoplasmic Reticulum | Partial | NNAPI op graph, QNN delegate routing |
| Membrane | Thin | netfilter/eBPF, SELinux Binder contexts |

See `METAPHOR_MAP.md` for the full target list of Android internals per zone.
