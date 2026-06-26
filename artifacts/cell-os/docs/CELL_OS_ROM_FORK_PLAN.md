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
| `android_hardware_lineage_interfaces` | Custom Cell OS AIDL/HAL interfaces only — **not** the FP5 Thermal or Performance HAL source (see §HAL Reality Boundary) | Phase 4 gate — if custom interfaces needed |
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
- `packages/apps/Settings/src/com/android/settings/deviceinfo/aboutphone/MyDeviceInfoFragment.java` — inject Cell OS build identity strings (verified class name in LOS 21; `DeviceInfoSettings.java` does not exist)
- `frameworks/base/core/res/res/values/config.xml` — `config_deviceName = "Cell OS FP5"`, remove LineageOS-specific trust prompts
- `vendor/lineage/config/common.mk` (or a dedicated `cellos.mk` sourced from it) — declare `ro.cellos.*` system properties via `PRODUCT_SYSTEM_DEFAULT_PROPERTIES` or `PRODUCT_VENDOR_PROPERTIES`. **`vendor/lineage/config/lineage-build.prop` does not exist on `lineage-21.0`** (HTTP 404 verified); standalone `.prop` files are not loaded automatically by the Android build system without makefile wiring.

**Biological framing:** This is the sacred/profane boundary materialised in build identity. The Cell OS name and version strings are *not* metaphors — they are the entry point for the 以太收斂 (Aether Convergence) layer. The ROM's identity claims map to the DNA zone: immutable specification, expressed at boot.

### 2b. SystemUI Biological Layer Patches

**Files modified in `frameworks/base/packages/SystemUI/`:**

| File | Change | Biological Function |
|---|---|---|
| `src/.../statusbar/phone/PhoneStatusBarView.java` | Add `CellVitalOverlay` — thin wrapper that reads vitals from `CellVitalService` and renders σ-gated biophoton signal intensity | Membrane zone — boundary perception |
| `src/.../qs/tiles/` | Add `BiophotonTile.java`, `BioplasmaVmemTile.java` — QS tiles surfacing P1/BP1 baseline σ and live Vmem analogue (battery voltage proxy) | Membrane receptors — signal transduction at user-facing boundary |
| `src/.../battery/BatteryMeterView.java` | Wrap with BP1 resting-potential colour channel — σ-gated colour shift from neutral (σ < 0.50) to gold (σ ≥ 0.75 verified) | BP1 membrane resting potential |
| `packages/SystemUI/src/com/android/systemui/cellos/CellVitalOverlayController.kt` (**new file**) | Feed `CellVitalService` thermal events via `PowerManager.addThermalStatusListener(executor, listener)` — `ThermalManager.java` does not exist in `frameworks/base` on LOS 21 (HTTP 404 verified); `ThermalController.java` also absent; thermal throttling status is consumed via `PowerManager.OnThermalStatusChangedListener`. **Valid constants (all 7 must be handled):** `THERMAL_STATUS_NONE`, `THERMAL_STATUS_LIGHT`, `THERMAL_STATUS_MODERATE`, `THERMAL_STATUS_SEVERE`, `THERMAL_STATUS_CRITICAL`, `THERMAL_STATUS_EMERGENCY`, `THERMAL_STATUS_SHUTDOWN` (verified in `PowerManager.java` L2687–L2718) | BP5 thermoregulatory coupling |
| `res/layout/status_bar.xml` | Add biological vitals strip (biophoton emission ring, bioplasma field indicator) | Biophoton P-pathway visual substrate |

**Resource overlay** — FP5 uses component-named overlay directories (verified on `lineage-21` branch). Do **not** use `overlay/frameworks/base/` — that path does not exist in the FP5 device tree:
- `device/fairphone/FP5/overlay/FrameworksResTarget/res/values/config.xml` — enable Cell OS framework overlays
- `device/fairphone/FP5/overlay/SystemUIResTarget/res/values/config.xml` — biological vitals enabled flag
- `device/fairphone/FP5/overlay/SystemUIResTarget/res/drawable/` — organelle zone icons (15 zones × 2 states = 30 vector drawables)
- Use `device/fairphone/FP5/overlay-lineage/` for any LineageOS-specific overlay entries

**Note:** Other component-named overlay dirs present in the FP5 tree: `CarrierConfigResCommon`, `FrameworksResCommon`, `SettingsProviderResCommon`, `SettingsResCommon`, `SystemUIResCommon`, `TelephonyResCommon`, `WifiResCommon`, `WifiResTarget`.

### 2c. Framework Service Patches

**New files in `frameworks/base/services/core/java/com/android/server/cellos/`:**

| File | Purpose |
|---|---|
| `CellVitalService.java` | System server singleton. Owns the live pathway registry. Reads Binder stats, thermal throttling status (via `PowerManager`), battery voltage, network signal. Maps to organelle zones. Exposes read-only AIDL to privileged apps. |
| `CellVitalServiceImpl.java` | Pathway computation: P1–P9 biophoton link couplingSigma from live Binder; BP1 Vmem from battery voltage; BP2 from Binder thread latency; BP3 from broadcast queue depth; BP5 from `PowerManager.OnThermalStatusChangedListener` throttling status — **all 7 constants must be handled:** NONE=σ 0.00, LIGHT=0.30, MODERATE=0.55, SEVERE=0.80, CRITICAL=0.95, EMERGENCY=0.98, SHUTDOWN=1.00; BP8 returns speculative weight `CI × 0.045` (promoted June 2026; see §5a). |
| `CellOsBootstrap.java` | Called from `SystemServer.java` at PHASE_SYSTEM_SERVICES_READY; loads Kotlin-generated domain registry (see §3). |

**New AIDL in `frameworks/base/core/java/android/os/`:**
- `ICellVitalService.aidl` — `getZoneSignal(zoneId)`, `getPathwayState(pathwayId)`, `getManifoldSnapshot()` — all read-only
- Permission enforcement: the `.aidl` file declares the interface only. The `CellVitalService.java` Binder stub must call `context.enforceCallingPermission("org.cellos.permission.READ_VITALS", "CellVitalService")` at the top of every method implementation. **Permission ownership:** `org.cellos.permission.READ_VITALS` must be declared in the **platform/framework** (e.g., `frameworks/base/core/res/AndroidManifest.xml` or a dedicated `platform-permissions-cellos.xml` in the `android_vendor_lineage` overlay) with `android:protectionLevel="signature"`. It is then *requested* by privileged clients (CellShell); it must **not** be defined in the client app manifest. Privapp clients must still be allowlisted in `etc/permissions/privapp-permissions-cellos.xml`. `@RequiresPermission` is a Java lint annotation — metadata only, not a security mechanism.

**`frameworks/base/services/java/com/android/server/SystemServer.java` patch:**
- Single `startCellOsService()` call added at PHASE_SYSTEM_SERVICES_READY hook

### 2d. Kernel / SMEM Patches (Phase 4 — deferred)

**Files in `drivers/soc/qcom/smem.c`:**
- Add `cellos_smem_coherence_probe()` — guarded by `CONFIG_CELLOS_BIOPLASMA_BP8` Kconfig flag (default `n`)
- Exposes *derived* coherence metric only: ratio of successful `qcom_smem_get()` calls within a 100ms window — never raw partition dumps, never physical addresses
- Result published to `/sys/kernel/cellos/smem_coherence` read-only sysfs node
- `CellVitalService` reads this sysfs node; if node absent (flag off), BP8 stays zero — same biological result either way

**SELinux policy (in `device/fairphone/FP5/sepolicy/vendor/` — verified path):**
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
| Key invariant | **BP8 returns speculative weight (June 2026)** — zero-guard replaced: `if ("BP8".equals(pathwayId)) return readSmemCoherenceCI() * 0.045f;` Condition for removal was met when σ was raised from `reserved` (0.32) to `speculative` (0.45) in BIOPLASMA_RESEARCH.md §9.2 via six-stream secondary evidence (see §5a). |
| Binder surface | `ICellVitalService.aidl` declares interface; enforcement is `context.enforceCallingPermission("org.cellos.permission.READ_VITALS", tag)` in every Binder stub method. Permission **declared in platform** (`frameworks/base/core/res/AndroidManifest.xml` or `android_vendor_lineage` overlay), `protectionLevel="signature"`. Privileged clients request it; privapp clients added to `privapp-permissions-cellos.xml`. `@RequiresPermission` annotation is lint metadata only — Binder enforcement is the actual security gate. |

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
| Cell OS build identity | `android_vendor_lineage` | `config/common.mk` — add `ro.cellos.*` via `PRODUCT_SYSTEM_DEFAULT_PROPERTIES` (no `lineage-build.prop` exists) | Low |
| Local manifest wiring | `.repo/local_manifests/` | `roomservice.xml` | Low |
| About page identity | `android_packages_apps_Settings` | `MyDeviceInfoFragment.java`, `strings.xml` | Low |

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

**Deliverable:** Optional BP8 kernel telemetry sysfs node (if `CONFIG_CELLOS_BIOPLASMA_BP8=y`). BP5 thermal signal feeding `CellVitalService` via `PowerManager.addThermalStatusListener()` (throttling status, not raw zone temperatures — `ThermalManager` class does not exist in LOS 21 `frameworks/base`). `powerhint.xml` QTI power binding confirmed or documented as indicative. BP8 invariant: still returns zero from `CellVitalService` regardless of sysfs node state.

| Work | Repos | Key Files | Complexity |
|---|---|---|---|
| SMEM coherence sysfs | `android_kernel_fairphone_qcm6490` | `drivers/soc/qcom/smem.c`, `Kconfig` | High |
| SELinux policy for sysfs | `android_device_fairphone_FP5` | `sepolicy/vendor/cellos_sysfs.te` (vendor/ subdirectory — verified path pattern for modern LineageOS device trees) | Medium |
| Thermal status validation (Phase 3 component) | `android_frameworks_base` | `CellVitalOverlayController.kt` **created in Phase 3** via `PowerManager.addThermalStatusListener(executor, listener)`. Phase 4 task: validate all 7 throttling states (NONE/LIGHT/MODERATE/SEVERE/CRITICAL/EMERGENCY/SHUTDOWN) are received correctly on real FP5 hardware under thermal load. No new code; hardware validation only. | Low |
| Performance HAL FP5 binding | `android_device_fairphone_FP5` | `powerhint.xml` tuning via `android.hardware.power-service-qti` — no `performance/` dir in `android_hardware_lineage_interfaces`; QTI power service is the actual binding | High (indicative) |
| BP8 speculative-weight test | `android_packages_apps_CellShell` | `CellVitalServiceTest.kt` | Low |

**Biological fidelity gate (updated June 2026):** BP8 `status` was promoted from `"reserved"` to `"speculative"` (σ=0.45) via six-stream secondary evidence — see `BIOPLASMA_RESEARCH.md §5.9 + §9.2`. The zero-guard in `CellVitalServiceImpl` is replaced with speculative-weight computation: `CI × 0.045`, where CI is read from `/sys/kernel/cellos/smem_coherence` (falls back to 0.0 if node absent). Stage 1/2 SPA uses the `useWaterCoherence` hook (three browser-proxy CI sources, `emitSignal()` direct — not `bioplasmaSignal()`, because BP8 direction=readonly). Next elevation to indicative (σ≥0.50) requires direct THz-TDS CD resonance in mammalian cells.

**Acceptance criteria:** `adb shell cat /sys/kernel/cellos/smem_coherence` returns a ratio in [0.0, 1.0] (if enabled). `adb shell service call cellos_vital 1 i32 8` returns a value in [0.0, 0.045] (BP8 speculative weight CI × 0.045 — non-zero when `/sys/kernel/cellos/smem_coherence` is readable). BP5 QS tile reflects all 7 `PowerManager` thermal states — NONE (σ 0.00), LIGHT (0.30), MODERATE (0.55), SEVERE (0.80), CRITICAL (0.95), EMERGENCY (0.98), SHUTDOWN (1.00) — all cases handled in `CellVitalServiceImpl` switch/when block without fallthrough.

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

### 5a. BP8 Speculative-Weight Implementation (promoted June 2026)

```java
// CellVitalServiceImpl.java — speculative-weight implementation (zero-guard removed June 2026)
public float getPathwaySignal(String pathwayId) {
    if ("BP8".equals(pathwayId)) {
        float ci = readSmemCoherenceCI(); // returns 0.0f if /sys/kernel/cellos/smem_coherence absent
        return ci * 0.045f; // speculative weight: σ × 0.10 = 0.45 × 0.10 = 0.045
    }
    // ... rest of computation
}
```

**Condition met (June 2026):** σ raised from `reserved` (0.32) to `speculative` (0.45) in `BIOPLASMA_RESEARCH.md §9.2` via six-stream secondary evidence research pass (see §5.9 and `BP8_SMEM_COHERENCE_DESIGN.md §5`). The zero-guard is replaced with speculative-weight computation: `CI × σ × 0.10 = CI × 0.045`. SPA/browser Stage 1 uses `useWaterCoherence` hook (three browser-proxy CI sources, emitSignal direct). Stage 3 reads `/sys/kernel/cellos/smem_coherence`; falls back to 0.0 if node absent.

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

**Phase 1 gate must clear before any Phase 2–4 work begins.** These steps are ordered by dependency, not by interest.

1. **Wire local manifests** — create `.repo/local_manifests/roomservice.xml` referencing all Cell OS forks. Without this, no build is possible.

2. **Apply Phase 1 branding overlays** — `android_vendor_lineage` `common.mk` branding (`PRODUCT_BRAND`, `PRODUCT_NAME`, `PRODUCT_SYSTEM_DEFAULT_PROPERTIES` for `ro.cellos.*`), bootanimation placeholder, About page identity strings in `MyDeviceInfoFragment.java` and `strings.xml`. FP5 RRO overlays under `overlay/FrameworksResTarget/` and `overlay/SystemUIResTarget/`.

3. **Flash and validate Phase 1 acceptance criteria** — ROM boots on FP5, no AVC denials, `adb shell getprop ro.cellos.version` ≠ empty, About screen shows "Cell OS". Do not proceed to Phase 2 until all three checks pass.

4. **Create `android_packages_apps_CellShell` repository** — Android app skeleton with `Android.bp`, `AndroidManifest.xml` (`android:sharedUserId="android.uid.system"`, **requests** `org.cellos.permission.READ_VITALS` — does **not** declare it; the permission is platform-owned and declared in `frameworks/base/core/res/AndroidManifest.xml`), `privapp-permissions-cellos.xml` allowlist entry, and `tools/generate_domain.py` stub.

5. **Write `generate_domain.py`** — parse TypeScript domain constants, emit `CellOsDomain.kt` and `cell_os_domain.json`, run integrity count assertions (15/9/20/13).

6. **Register `CellVitalService` skeleton in SystemServer** — AIDL interface, `enforceCallingPermission()` in every Binder stub method, BP8 speculative-weight implementation in place from day one (`CI × 0.045`; CI from sysfs or 0.0 if node absent).

7. **Commit `cellos_integrity_check.sh`** — build-time enforcement of 20/9/13/15 counts. Must pass before any SystemUI or kernel work begins.

**Do not start Phase 4 (kernel/SMEM) until Phase 3 acceptance criteria pass.** The biology is fully expressible through the framework service and SystemUI layer. Kernel patches are an enhancement, not a prerequisite.

---

## 8. Branch Decision — lineage-21.0 vs lineage-23.2

**FP5 active development status (verified 2026-06-21):** The LineageOS community's primary FP5 branch has moved to `lineage-23.2` (Android 15 base). The `lineage-21.0` branch (Android 14 base) still exists and builds, but is no longer receiving the primary developer attention.

**Cell OS branch decision:**

| Option | Pros | Cons |
|---|---|---|
| **`lineage-21.0`** (Android 14) | More documentation, more stable QS/SystemUI API surface, more biophoton/bioplasma research done against this base | Older security patches; not primary FP5 maintainer focus |
| **`lineage-23.2`** (Android 15) | Current FP5 maintainer work; latest security patches | Android 15 SystemUI restructuring may change some verified file paths |

**Recommendation:** Start Cell OS Phase 1–2 on `lineage-21.0` / `lineage-21` (see branch note below). Before Phase 3 (CellVitalService), evaluate rebasing onto `lineage-23.2`. Do not assume verified path names (especially in `packages/SystemUI/`) carry over without re-verification.

**Branch naming per-repository (verified 2026-06-21):**

| Repository | Correct Branch Name |
|---|---|
| `android_vendor_lineage` | `lineage-21.0` |
| `android_frameworks_base` | `lineage-21.0` |
| `android_packages_apps_Settings` | `lineage-21.0` |
| `android_hardware_lineage_interfaces` | `lineage-21.0` |
| `android_device_fairphone_FP5` | `lineage-21` *(without `.0`)* |
| `android_kernel_fairphone_qcm6490` | `lineage-21` *(without `.0`)* |

**Impact on plan:** File paths in §2a–§2c are verified against `lineage-21.0`. File paths in §2d (kernel, SELinux) and §2e (device tree overlays) are verified against `lineage-21`. Any rebase to `lineage-23.2` requires re-running path verification for SystemUI and Settings classes specifically.

---

## 9. HAL Reality Boundary

This section separates FP5-inherited Qualcomm HALs from custom Cell OS interfaces to prevent engineers from looking for code in the wrong repository.

### What `android_hardware_lineage_interfaces` (LOS 21.0) actually contains

Verified top-level directories (branch `lineage-21.0`, verified 2026-06-21): `_backend/`, `biometrics/`, `camera/`, `fastboot/`, `fastcharge/`, `health/`, `light/`, `livedisplay/`, `motorola_health/`, `nfc/`, `power-libperfmgr/`, `powershare/`, `radio/`, `touch/`, `usb/`, `vibrator/`

**There is no `thermal/` directory. There is no `performance/` directory.**

### FP5 Thermal and Performance HAL actual sources

| HAL | Actual Source | Cell OS Integration Method |
|---|---|---|
| **Thermal** | `android.hardware.thermal-service.qti` AIDL service (from `android_hardware_qcom_thermal` repo); `hardware/qcom-caf/common` provides shared build/VINTF infrastructure | Cell OS accesses thermal status via `PowerManager.addThermalStatusListener(executor, OnThermalStatusChangedListener)` — this is the public Android 14 API surface. `ThermalManager.java` does not exist in LOS 21 `frameworks/base`. No fork of any HAL repo needed for Phases 1–4. |
| **Performance/Power** | `android.hardware.power-service-qti` (Qualcomm vendor binary) + `device/fairphone/FP5/powerhint.xml` | Tune `powerhint.xml` hints in device tree; Cell OS does not fork the QTI power service binary |

### When to fork `android_hardware_lineage_interfaces`

Only fork this repo if Cell OS needs a **new custom AIDL interface** not present in the existing HAL set (e.g. a biophoton telemetry AIDL definition that other components bind to). This is Phase 5 work and not required for Phases 1–4. Do not fork it for Thermal or Performance HAL — those come from the Qualcomm vendor tree.

---

## 10. Source-Verified Path Matrix

All paths verified against live LineageOS GitHub 2026-06-21. See §8 for per-repo branch names — **not all repos use `lineage-21.0`; device tree and kernel use `lineage-21`**.

| Phase | Repo | Branch | Verified Path | Operation | Status |
|---|---|---|---|---|---|
| 1 | `.repo/local_manifests/` | n/a | `roomservice.xml` | Create: wire all Cell OS forks into build graph | ✓ Structural |
| 1 | `android_vendor_lineage` | `lineage-21.0` | `config/common.mk` | Modify: `PRODUCT_BRAND`, `PRODUCT_NAME`, add `PRODUCT_SYSTEM_DEFAULT_PROPERTIES` for `ro.cellos.*` | ✓ Verified |
| 1 | `android_vendor_lineage` | `lineage-21.0` | `bootanimation/` | Replace with Cell OS boot animation | ✓ Verified |
| 1 | `android_packages_apps_Settings` | `lineage-21.0` | `src/com/android/settings/deviceinfo/aboutphone/MyDeviceInfoFragment.java` | Modify: inject Cell OS identity strings | ✓ Verified |
| 1 | `android_packages_apps_Settings` | `lineage-21.0` | `res/values/strings.xml` | Modify: rename About labels | ✓ Verified |
| 1 | `android_device_fairphone_FP5` | `lineage-21` | `overlay/FrameworksResTarget/res/values/config.xml` | Create: Cell OS framework overlay entries | ✓ Verified (dir exists) |
| 1 | `android_device_fairphone_FP5` | `lineage-21` | `overlay/SystemUIResTarget/res/values/config.xml` | Create: Cell OS SystemUI overlay entries | ✓ Verified (dir exists) |
| 2 | `android_frameworks_base` | `lineage-21.0` | `core/java/android/os/ICellVitalService.aidl` | **Create**: AIDL interface (`getZoneSignal`, `getPathwayState`, `getManifoldSnapshot`) | ✓ Verified (76 AIDL files at path) |
| 2 | `android_frameworks_base` | `lineage-21.0` | `services/core/java/com/android/server/cellos/CellVitalService.java` | **Create**: system server singleton skeleton + BP8 speculative-weight implementation (`CI × 0.045`) + `enforceCallingPermission()` on every Binder method | ✓ Verified (path pattern) |
| 2 | `android_frameworks_base` | `lineage-21.0` | `services/java/com/android/server/SystemServer.java` | Modify: add `startCellOsService()` at `PHASE_SYSTEM_SERVICES_READY` (confirmed L2913) | ✓ Verified |
| 2 | `android_frameworks_base` | `lineage-21.0` | `core/res/AndroidManifest.xml` | Modify: declare `org.cellos.permission.READ_VITALS` with `protectionLevel="signature"` (platform-owned permission) | ✓ Verified (pattern) |
| 3 | `android_frameworks_base` | `lineage-21.0` | `packages/SystemUI/src/com/android/systemui/statusbar/phone/PhoneStatusBarView.java` | Modify: add `CellVitalOverlay` wrapper | ✓ Verified |
| 3 | `android_frameworks_base` | `lineage-21.0` | `packages/SystemUI/src/com/android/systemui/battery/BatteryMeterView.java` | Modify: BP1 resting-potential colour channel | ✓ Verified |
| 3 | `android_frameworks_base` | `lineage-21.0` | `packages/SystemUI/src/com/android/systemui/qs/tiles/` | Create: `BiophotonTile.java`, `BioplasmaVmemTile.java` | ✓ Verified (52 files) |
| 3 | `android_frameworks_base` | `lineage-21.0` | `packages/SystemUI/src/com/android/systemui/cellos/CellVitalOverlayController.kt` | **Create** new file: `PowerManager.addThermalStatusListener()` binding for BP5 | ✓ Verified (dir is new) |
| 4 | `android_kernel_fairphone_qcm6490` | `lineage-21` | `drivers/soc/qcom/smem.c` | Modify: add `cellos_smem_coherence_probe()` guarded | ✓ Verified |
| 4 | `android_kernel_fairphone_qcm6490` | `lineage-21` | `drivers/soc/qcom/Kconfig` | Modify: add `CONFIG_CELLOS_BIOPLASMA_BP8` flag | ✓ Verified |
| 4 | `android_device_fairphone_FP5` | `lineage-21` | `sepolicy/vendor/cellos_sysfs.te` | Create: SELinux policy for sysfs read | ✓ Verified (pattern) |
| 4 | `android_device_fairphone_FP5` | `lineage-21` | `powerhint.xml` (location in `configs/` subdir — verify at build time) | Modify: performance hint tuning | ⚠ Indicative |

**Unverified / deferred paths** (do not assume stable across branch rebase):
- `packages/SystemUI/` class names if rebasing to `lineage-23.2` — re-verify before Phase 3
- `android_hardware_lineage_interfaces` directory structure on future branches

**FA3 gap — Tier-1 resolved (2026-06-21):**
- `ThermalManager.addThermalStatusListener()` → ✗ WRONG CLASS: `ThermalManager.java` HTTP 404 in LOS 21. Use `PowerManager.addThermalStatusListener(executor, listener)` with `OnThermalStatusChangedListener`. Confirmed via `PowerManager.java` source.
- `PHASE_SYSTEM_SERVICES_READY` → ✓ CONFIRMED at L2913 in `SystemServer.java`
- `android:sharedUserId="android.uid.system"` → ✓ CONFIRMED (Settings app manifest, LOS 21 active)
- `@RequiresPermission` in AIDL → ✗ NUANCE: annotation is Java metadata only; Binder-side `enforceCallingPermission()` is the actual enforcement mechanism. AIDL placement in `core/java/android/os/` → ✓ CONFIRMED (76 AIDL files at that path)

---

*Document authority: LineageOSv2_Manifold.md · LineageOSv2_Description.md · BP8_SMEM_COHERENCE_DESIGN.md · BIOPHOTON_RESEARCH.md · BIOPLASMA_RESEARCH.md*
*Deep research review 1: 2026-06-21 — 4 factual errors corrected, 3 structural sections added*
*Deep research review 2: 2026-06-21 — 7 further corrections (lineage-build.prop 404, overlay paths, branch names, motorola_health, thermal service attribution)*
*Deep research review 3: 2026-06-24 — FA3 Tier-1 resolved: ThermalManager→PowerManager (HTTP 404 confirmed), PHASE_SYSTEM_SERVICES_READY confirmed, sharedUserId confirmed, @RequiresPermission→enforceCallingPermission() model corrected, §7 reordered (Phase 1 gate first)*
*Deep research review 4: 2026-06-24 — thermal constants corrected (7 valid: NONE/LIGHT/MODERATE/SEVERE/CRITICAL/EMERGENCY/SHUTDOWN; HAL_SKIP absent); permission ownership moved to platform/framework; §10 phase labels fixed (SystemUI→Phase 3), Phase 1/2 paths added*
*Deep research review 5: 2026-06-24 — §7 CellShell manifest: requests (not declares) platform-owned permission; Phase 4 thermal row clarified as Phase 3 component validation; Phase 4 acceptance criteria lists all 7 thermal states with σ values*
*Architect evaluation: APPROVED — engineer may begin Phase 1*
*Generated: 2026-06-21*
