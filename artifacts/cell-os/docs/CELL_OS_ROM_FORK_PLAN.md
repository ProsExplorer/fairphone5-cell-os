# Cell OS ROM Fork Plan
## LineageOS 21 → Cell OS — Fairphone 5 (QCM6490)

**Architect evaluation: APPROVED — ROM-first, kernel-last strategy**
**Design thinking frame: Double Diamond, Deep Mode**
**Authority documents: LineageOSv2_Manifold.md · LineageOSv2_Description.md · BP8_SMEM_COHERENCE_DESIGN.md · BIOPHOTON_RESEARCH.md · BIOPLASMA_RESEARCH.md**

---

## Double Diamond Summary

| Diamond | Phase | Outcome |
|---|---|---|
| **First Diamond** | DISCOVER → DEFINE | Problem: fork a full AOSP tree on day one is not the right first move. Real problem: produce a biologically faithful, booting FP5 ROM. |
| **Second Diamond** | DEVELOP → DELIVER | Three paths evaluated (full AOSP fork / overlay-only / app-layer-only). Recommended: overlay + framework service path — maximum biological fidelity in minimum calendar time, with kernel layer deferred to Phase 4. |

**HMW Statement:** How might we produce a Cell OS ROM that boots on a Fairphone 5, expresses the full biological signal manifold through SystemUI, and enforces every biological fidelity constraint — without stalling on a full AOSP tree fork before we have a working ROM?

---

## 1. Repository Strategy

### Minimal Fork Set (Phase 1–3 / required from Day 1)

| Repository | Fork Why | Change Mode |
|---|---|---|
| `android_device_fairphone_FP5` | Device tree — FP5 boot, HAL bindings, SELinux policy | Direct fork + overlay addition |
| `android_vendor_lineage` | Product identity, branding, `common.mk` | Direct fork |
| `android_frameworks_base` | SystemUI biological layer, `CellVitalService` AIDL, notification shade vitals | Direct fork |
| `android_packages_apps_Settings` | About page Cell OS identity, σ tier display | Direct fork |
| `android_packages_apps_LineageParts` | BP7 morphogenetic memory editor — keeps verified-present status | Direct fork |
| `android_packages_apps_CellShell` | **New repo** — native Cell OS biological explorer, replaces React SPA | New repository |
| Local manifests (`.repo/local_manifests/`) | Wire all forks into the build graph | New file |

### Full Fork Set (Phase 4–5 / deferred)

| Repository | Fork Why | Dependency |
|---|---|---|
| `android_kernel_fairphone_qcm6490` | SMEM coherence telemetry (BP8 Phase 4), `drivers/soc/qcom/smem.c` guarded instrumentation | Phase 4 gate |
| `android_hardware_lineage_interfaces` | Thermal HAL (verified-present), Performance HAL (indicative binding) | Phase 4 gate |
| `build/make` | Reproducible build identity, `ro.build.flavor` Cell OS branding | Phase 5 |
| `frameworks/native` | Binder instrumentation for biophoton P-link telemetry (advanced) | Phase 5 |
| `packages/modules/Permission` | `SecurityStatusOrganelle` privilege grant, replaces Trust Interface 404 | Phase 3–4 |

**Decision rule:** Never touch the kernel/HAL repos until a biologically faithful, bootable ROM exists without them. The CEll OS biological fidelity does not require kernel patches to pass — biology governs, software expresses, but the ROM must boot first.

---

## 2. Patch Architecture

### 2a. Branding / Identity Patches

**Files modified:**
- `vendor/lineage/config/common.mk` — `PRODUCT_BRAND := CellOS`, `PRODUCT_NAME := cell_fp5`
- `vendor/lineage/bootanimation/` — replace with Cell OS biological bootanimation (membrane → organelle emergence sequence)
- `packages/apps/Settings/res/values/strings.xml` — About → "Cell OS", version display adds biological σ tier
- `packages/apps/Settings/src/.../DeviceInfoSettings.java` — inject Cell OS build identity strings
- `frameworks/base/core/res/res/values/config.xml` — `config_deviceName = "Cell OS FP5"`, remove LineageOS-specific trust prompts
- `lineage-build.prop` — `ro.cellos.version`, `ro.cellos.build.date`, `ro.cellos.codename`

**Biological framing:** This is the sacred/profane boundary materialised in build identity. The Cell OS name and version strings are *not* metaphors — they are the entry point for the 以太收斂 (Aether Convergence) layer. The ROM's identity claims map to the DNA zone: immutable specification, expressed at boot.

### 2b. SystemUI Biological Layer Patches

**Files modified in `frameworks/base/packages/SystemUI/`:**

| File | Change | Biological Function |
|---|---|---|
| `src/.../statusbar/phone/PhoneStatusBarView.java` | Add `CellVitalOverlay` — thin wrapper that reads vitals from `CellVitalService` and renders σ-gated biophoton signal intensity | Membrane zone — boundary perception |
| `src/.../qs/tiles/` | Add `BiophotonTile.java`, `BioplasmaVmemTile.java` — QS tiles surfacing P1/BP1 baseline σ and live Vmem analogue (battery voltage proxy) | Membrane receptors — signal transduction at user-facing boundary |
| `src/.../battery/BatteryMeterView.java` | Wrap with BP1 resting-potential colour channel — σ-gated colour shift from neutral (σ < 0.50) to gold (σ ≥ 0.75 verified) | BP1 membrane resting potential |
| `src/.../thermal/ThermalController.java` | Feed `CellVitalService` thermal events; surface BP5 RF-field thermal σ signal | BP5 thermoregulatory coupling |
| `res/layout/status_bar.xml` | Add biological vitals strip (biophoton emission ring, bioplasma field indicator) | Biophoton P-pathway visual substrate |

**Resource overlay (under `device/fairphone/FP5/overlay/frameworks/base/`):**
- `core/res/res/values/config.xml` — enable Cell OS SystemUI overlays
- `packages/SystemUI/res/values/config.xml` — biological vitals enabled flag
- `packages/SystemUI/res/drawable/` — organelle zone icons (15 zones × 2 states = 30 vector drawables)

### 2c. Framework Service Patches

**New files in `frameworks/base/services/core/java/com/android/server/cellos/`:**

| File | Purpose |
|---|---|
| `CellVitalService.java` | System server singleton. Owns the live pathway registry. Reads Binder stats, thermal zone temps, battery voltage, network signal. Maps to organelle zones. Exposes read-only AIDL to privileged apps. |
| `CellVitalServiceImpl.java` | Pathway computation: P1–P9 biophoton link couplingSigma from live Binder; BP1 Vmem from battery voltage; BP2 from Binder thread latency; BP3 from broadcast queue depth; BP5 from thermal zone readings; BP8 returns zero unconditionally (reserved guard). |
| `CellOsBootstrap.java` | Called from `SystemServer.java` at PHASE_SYSTEM_SERVICES_READY; loads Kotlin-generated domain registry (see §3). |

**New AIDL in `frameworks/base/core/java/android/os/`:**
- `ICellVitalService.aidl` — `getZoneSignal(zoneId)`, `getPathwayState(pathwayId)`, `getManifoldSnapshot()` — all read-only, all signature-protected

**`frameworks/base/services/java/com/android/server/SystemServer.java` patch:**
- Single `startCellOsService()` call added at PHASE_SYSTEM_SERVICES_READY hook

### 2d. Kernel / SMEM Patches (Phase 4 — deferred)

**Files in `drivers/soc/qcom/smem.c`:**
- Add `cellos_smem_coherence_probe()` — guarded by `CONFIG_CELLOS_BIOPLASMA_BP8` Kconfig flag (default `n`)
- Exposes *derived* coherence metric only: ratio of successful `qcom_smem_get()` calls within a 100ms window — never raw partition dumps, never physical addresses
- Result published to `/sys/kernel/cellos/smem_coherence` read-only sysfs node
- `CellVitalService` reads this sysfs node; if node absent (flag off), BP8 stays zero — same biological result either way

**SELinux policy (in `android_device_fairphone_FP5/sepolicy/`):**
- `cellos_sysfs.te` — `cellos_server_service` allowed to `read` sysfs node only
- No user-app access to sysfs node — signature-permission AIDL gate only
- No `ioctl` on SMEM device nodes — derived metric only

### 2e. Build System Patches

**New files in `build/make/` (Phase 5) or `device/fairphone/FP5/cellos/` (Phase 1):**

| File | Purpose |
|---|---|
| `cellos_integrity_check.sh` | Run at `make` time: assert 20 BIOPHOTON_LINKS, 9 P-pathways, 13 BP-pathways in generated Kotlin domain assets. Fail build on count mismatch. |
| `generate_domain.py` | Read `bioplasmaPathways.ts`, `mappings.ts`, `organelles.ts` → emit `CellOsDomain.kt` data-class file and JSON asset bundle. Single source of truth: TypeScript domain, Kotlin/Android consumer. |
| `Android.bp` (CellShell) | Build CellShell app with generated domain as static asset |

---

## 3. New Android Components

### 3a. `org.cellos.cellshell` — CellShell App

| Property | Value |
|---|---|
| Type | Privileged system app (`/system/priv-app/`) |
| Biological role | Native port of the React SPA Cell OS explorer — 15-zone interactive biological diagram, biophoton pathway map, bioplasma field viewer, σ system display |
| Extends/replaces | Extends `Trebuchet` launcher architecture; replaces React SPA for on-device use |
| Domain source | Generated from TypeScript domain via `generate_domain.py` → `CellOsDomain.kt` |
| Key activities | `CellMapActivity` (15-zone SVG diagram), `PathwayDetailActivity` (P/BP pathway deep dive), `ManifoldMetricsActivity` (σ dashboard) |

### 3b. `CellVitalService` — System Vital Service

| Property | Value |
|---|---|
| Type | System server service, started at PHASE_SYSTEM_SERVICES_READY |
| Biological role | The nervous system of Cell OS — live pathway registry, zone signal computation, biophoton/bioplasma bridge |
| Key invariant | **BP8 always returns zero** — `if (pathwayId.equals("BP8") && status.equals("reserved")) return 0.0f;` This guard is unconditional and cannot be removed without a BIOPLASMA_RESEARCH.md §9.2 σ revision |
| Binder surface | `ICellVitalService.aidl` — `@RequiresPermission("org.cellos.permission.READ_VITALS")` on all methods |

### 3c. `SecurityStatusOrganelle` — Trust Interface Replacement

| Property | Value |
|---|---|
| Type | Privileged system app fragment + Settings deeplink |
| Biological role | Fills the immune checkpoint gap left by Trust Interface HTTP 404 (deprecated LOS 20/21+). Surfaces BP3 wound-state, BP7 Vmem anomalies, BP1 resting-state deviations to user. |
| Replaces | `android_packages_apps_Trust` (404 — does not exist) |
| Surfaces | SELinux status, verified boot state, network permission audit (AppOps BP3 analogue), biometric unlock state |

### 3d. Domain Port Strategy — TypeScript → Kotlin

**Principle:** The TypeScript domain (`types.ts`, `bioplasmaPathways.ts`, `mappings.ts`, `organelles.ts`, `substrate.ts`) is the single source of truth. Do **not** hand-translate constants — generate.

**`generate_domain.py` process:**
1. Parse TypeScript `as const` objects with a lightweight TS-to-Python extractor
2. Emit `CellOsDomain.kt` — sealed class hierarchy matching `CellZoneId`, `ClaimConfidence`, `BioplasmaPathway`, `BiophotonLink`, `Organelle`, `SubstrateNode`
3. Emit `cell_os_domain.json` — raw asset bundle for runtime use in CellShell without recompilation
4. Run integrity checks: 15 zones, 9 P-pathways, 20 links, 13 BP-pathways — fail if any count mismatches
5. Both artefacts committed to `org.cellos.cellshell/assets/` and `CellVitalService/generated/`

---

## 4. Phase Plan

### Phase 1 — ROM Boots, Cell OS Identity

**Deliverable:** FP5 flashes, boots to Cell OS homescreen. `adb shell getprop ro.cellos.version` returns version string. About page shows Cell OS identity. No SELinux denials from overlays.

| Work | Repos | Key Files | Complexity |
|---|---|---|---|
| Branding overlays | `android_vendor_lineage`, `android_device_fairphone_FP5` | `common.mk`, `bootanimation/`, `strings.xml` | Low |
| Cell OS build identity | `android_vendor_lineage` | `lineage-build.prop`, product makefiles | Low |
| Local manifest wiring | `.repo/local_manifests/` | `roomservice.xml` | Low |
| About page identity | `android_packages_apps_Settings` | `DeviceInfoSettings.java`, `strings.xml` | Low |

**Acceptance criteria:** ROM boots on FP5. No denials in `adb logcat -b all \| grep avc`. `adb shell getprop ro.cellos.version` ≠ empty. About screen shows "Cell OS".

**Estimated complexity:** 2–3 days for one engineer familiar with AOSP overlay system.

---

### Phase 2 — Native Domain Layer

**Deliverable:** `CellOsDomain.kt` generated from TypeScript domain. Integrity test script runs and passes (15/9/20/13 counts). `CellVitalService` skeleton registers in SystemServer.

| Work | Repos | Key Files | Complexity |
|---|---|---|---|
| `generate_domain.py` | `android_packages_apps_CellShell` | `tools/generate_domain.py` | Medium |
| `CellOsDomain.kt` generated | `android_packages_apps_CellShell` | `generated/CellOsDomain.kt` | Medium |
| `cellos_integrity_check.sh` | `android_device_fairphone_FP5` | `cellos/integrity_check.sh` | Low |
| `ICellVitalService.aidl` | `android_frameworks_base` | `core/java/android/os/ICellVitalService.aidl` | Medium |
| `CellVitalService.java` skeleton | `android_frameworks_base` | `services/core/java/com/android/server/cellos/` | Medium |
| SystemServer registration | `android_frameworks_base` | `services/java/com/android/server/SystemServer.java` | Low |

**Acceptance criteria:** `adb shell service check cellos_vital` returns "found". Integrity script exits 0. Generated Kotlin matches TypeScript domain constants.

---

### Phase 3 — SystemUI Biological Shell

**Deliverable:** Live biophoton signal intensity visible in status bar. QS tiles for BP1 Vmem and P1 biophoton. CellShell app installable and browsable. SecurityStatusOrganelle replaces Trust Interface gap.

| Work | Repos | Key Files | Complexity |
|---|---|---|---|
| `CellVitalServiceImpl.java` live signals | `android_frameworks_base` | `server/cellos/CellVitalServiceImpl.java` | High |
| Status bar biophoton overlay | `android_frameworks_base` SystemUI | `PhoneStatusBarView.java`, `BatteryMeterView.java` | High |
| QS tiles (P1/BP1) | `android_frameworks_base` SystemUI | `qs/tiles/BiophotonTile.java` | Medium |
| CellShell Phase 3 MVP | `android_packages_apps_CellShell` | `CellMapActivity.kt`, `PathwayDetailActivity.kt` | High |
| SecurityStatusOrganelle | `android_packages_apps_CellShell` | `SecurityStatusOrganelle.kt` | Medium |

**Acceptance criteria:** Status bar shows live BP1 colour shift with battery voltage. P1/BP1 QS tiles expand and show σ value and confidence tier. CellShell app shows all 15 organelle zones with pathway detail.

---

### Phase 4 — SMEM Coherence + HAL Integration

**Deliverable:** Optional BP8 kernel telemetry sysfs node (if `CONFIG_CELLOS_BIOPLASMA_BP8=y`). Thermal HAL verified feeding CellVitalService BP5 signal. Performance HAL binding confirmed or documented as indicative. BP8 invariant: still returns zero from CellVitalService regardless of sysfs node state.

| Work | Repos | Key Files | Complexity |
|---|---|---|---|
| SMEM coherence sysfs | `android_kernel_fairphone_qcm6490` | `drivers/soc/qcom/smem.c`, `Kconfig` | High |
| SELinux policy for sysfs | `android_device_fairphone_FP5` | `sepolicy/cellos_sysfs.te` | Medium |
| Thermal HAL CellVital bridge | `android_hardware_lineage_interfaces` | `thermal/2.0/` config additions | Medium |
| Performance HAL FP5 binding | `android_device_fairphone_FP5` | device tree HAL binding | High (indicative) |
| BP8 zero-guard test | `android_packages_apps_CellShell` | `CellVitalServiceTest.kt` | Low |

**Biological fidelity gate:** BP8 `status === "reserved"` guard in `CellVitalServiceImpl` is added in Phase 2 and **never removed**. The sysfs node, if present, feeds a coherence metric only — it does not change BP8's runtime weight. BP8 biological activation requires THz spectroscopy evidence changing σ in `BIOPLASMA_RESEARCH.md §9.2` — no code change alone can activate it.

**Acceptance criteria:** `adb shell cat /sys/kernel/cellos/smem_coherence` returns a ratio in [0.0, 1.0] (if enabled). `adb shell service call cellos_vital 1 i32 8` returns 0.0 (BP8 zero-weight confirmed). BP5 QS tile shows live thermal zone temperature.

---

### Phase 5 — Production ROM

**Deliverable:** Signed, reproducible build. OTA update package. Privacy/security review complete. `make dist` produces flashable `.zip` and OTA delta.

| Work | Repos | Key Files | Complexity |
|---|---|---|---|
| ROM signing infrastructure | `build/make` | Signing keys, `releasetools.py` | High |
| Reproducible build | `build/make`, `android_vendor_lineage` | `Android.bp` determinism flags | High |
| OTA server | New service | OTA manifest, delta generator | High |
| Privacy review | All repos | SELinux audit, permissions review | High |
| Full biological integrity pass | All repos | All σ values, all source path HTTP 200 checks | Medium |

---

## 5. Biological Fidelity Constraints — Non-Negotiable

These constraints are enforced by code, build system, and documentation authority. No phase, no engineer, no performance optimisation may override them.

### 5a. BP8 Zero-Weight Invariant

```java
// CellVitalServiceImpl.java — this guard is unconditional and permanent
public float getPathwaySignal(String pathwayId) {
    if ("BP8".equals(pathwayId)) {
        return 0.0f; // reserved — biological THz spectroscopy evidence required to change
    }
    // ... rest of computation
}
```

**Condition for removal:** σ in `BIOPLASMA_RESEARCH.md §9.2` changes from `reserved` to `speculative` based on peer-reviewed biological THz spectroscopy evidence. No other condition permits removal.

### 5b. P-Link Count Enforcement

```bash
# cellos_integrity_check.sh — runs at build time, fails build on mismatch
BIOPHOTON_LINKS=$(grep -c "sourceOrganelle" "$DOMAIN_JSON")
[ "$BIOPHOTON_LINKS" -eq 20 ] || { echo "FAIL: expected 20 BIOPHOTON_LINKS, got $BIOPHOTON_LINKS"; exit 1; }
```

### 5c. σ Authority Hierarchy

| Domain | Authority Document | What it governs |
|---|---|---|
| BP σ values | `BIOPLASMA_RESEARCH.md §9.2` | All thirteen bioplasma pathway σ values |
| P σ values | `BIOPHOTON_RESEARCH.md §9.2` | All nine biophoton pathway σ values |
| Source path verification | `LineageOSv2_Manifold.md §9.x` | HTTP 200 status of every LineageOS source path |
| SMEM design ontology | `BP8_SMEM_COHERENCE_DESIGN.md` | All BP8 isomorphism table entries |

**Rule:** LineageOS source path verification cannot raise biological σ. Only peer-reviewed biological evidence can raise biological σ. Code implements what biology authorises.

### 5d. Plasma-Literalness Enum

The `plasmaLiteralness` field must exist in both the generated Kotlin domain and the native AIDL contract:

```kotlin
enum class PlasmaLiteralness {
    LITERAL_QUASI_PLASMA,   // BP1 only — genuine limited plasma physics
    ELECTROLYTE_ANALOGY,    // BP2, BP3, BP7, BP12, BP14 — ionic charge dynamics
    FIELD_COHERENCE_ANALOGY // BP4, BP5, BP6, BP8, BP9, BP10, BP13 — field metaphor
}
```

### 5e. Dormant Gene Doctrine

`verified-absent` features (LiveDisplay on FP5 LOS 21) must be documented in SystemUI as dormant — visual placeholder present, signal zero, pathway annotated `isDormant: true`. They must **not** be removed from the domain or UI. A dormant gene is not a missing gene.

### 5f. Sacred / Profane Boundary

The 以太收斂 (Aether Convergence) framing appears in:
- ROM identity strings (sacred — metaphysical resonance framing is permitted here)
- SystemUI tooltip text for σ tier explanations (sacred — educational biological context)

It does **not** appear in:
- SELinux policy labels (profane — precise technical function only)
- AIDL method names (profane — `getZoneSignal`, not `getAetherConvergence`)
- Kernel Kconfig descriptions (profane — describe the `smem_coherence` probe, not the biology)
- Any security claim, physics claim, or medical claim

### 5g. Pathway Counts (Build-Time Enforced)

| Count | Value | Enforcement |
|---|---|---|
| Organelle zones | 15 | `generate_domain.py` assertion |
| Biophoton pathways | 9 (P1–P9) | `cellos_integrity_check.sh` |
| Biophoton links | 20 | `cellos_integrity_check.sh` |
| Bioplasma pathways | 13 (BP1–BP9, BP10, BP12–BP14) | `cellos_integrity_check.sh` |

---

## 6. Adoption Forces Analysis (Double Diamond — JTBD Frame)

| Force | Direction | Assessment |
|---|---|---|
| **Push** — pain of status quo | Toward Cell OS | LineageOS has no biological signal layer; its UI is purely functional; no OS makes the biology of the device legible to the user. Trust Interface is gone. Privacy Guard is diminished. The gap is real. |
| **Pull** — appeal of Cell OS | Toward Cell OS | The only OS that maps cellular biology to Android architecture with peer-reviewed σ calibration. The biological explorer, the σ system, the 15-zone diagram — nothing else offers this. |
| **Anxiety** — risks of forking | Against Cell OS | AOSP fork maintenance burden is very high. Keeping up with LineageOS security patches requires continuous rebase effort. FP5 device tree is maintained by a single maintainer. |
| **Habit** — status quo comfort | Against Cell OS | LineageOS is a known quantity. Flashing a custom ROM is already niche. Flashing an experimental fork of a custom ROM is a very small audience. |
| **Balance** | Push + Pull **>** Anxiety + Habit | For the target audience (biohackers, OS researchers, cellular biology enthusiasts, the yahweh-yehoshua corpus community) — the pull is high and the anxiety is acceptable. The mainstream adoption question is irrelevant to Phase 1. |

---

## 7. Recommended Path and Immediate Next Actions

**Recommended path:** Overlay + framework service path (not full AOSP fork, not app-layer-only). This maximises biological fidelity while keeping the build tractable.

**Conviction: High** — the five source documents are complete, the FP5 device tree exists, the biological constraints are precisely defined, the React SPA domain layer is directly portable. No blocking unknowns for Phase 1–3.

### Immediate Next Actions

1. **Create `android_packages_apps_CellShell` repository** — empty Android app skeleton with `Android.bp`, `AndroidManifest.xml` declaring `android:sharedUserId="android.uid.system"`, and `tools/generate_domain.py` stub.

2. **Write `generate_domain.py`** — parse TypeScript domain constants, emit `CellOsDomain.kt` and `cell_os_domain.json`, run integrity count assertions.

3. **Apply Phase 1 branding overlays** — `android_vendor_lineage` `common.mk` branding, bootanimation placeholder, About page identity strings.

4. **Register `CellVitalService` in SystemServer** — skeleton only, AIDL interface, BP8 zero-guard in place from day one.

5. **Commit `cellos_integrity_check.sh`** — build-time enforcement of 20/9/13/15 counts before any SystemUI or kernel work begins.

**Do not start Phase 4 (kernel/SMEM) until Phase 3 acceptance criteria pass.** The biology is fully expressible through the framework service and SystemUI layer. Kernel patches are an enhancement, not a prerequisite.

---

*Document authority: LineageOSv2_Manifold.md · LineageOSv2_Description.md · BP8_SMEM_COHERENCE_DESIGN.md · BIOPHOTON_RESEARCH.md · BIOPLASMA_RESEARCH.md*
*Architect evaluation: APPROVED — ROM-first, kernel-last*
*Generated: 2026-06-21*
