---
name: Cell OS LineageOS manifold accuracy rules
description: Architect-confirmed factual constraints for any LineageOS doc in Cell OS — includes GitHub API-verified repo paths, Trust deprecation, WireGuard confirmation, and FP5 support status.
---

## Verified Real Repos (GitHub API HTTP 200 confirmed)

- `github.com/LineageOS/android_kernel_fairphone_qcm6490` — FP5 kernel v5.4; branches lineage-21 → lineage-23.2; FP5-specific configs at `arch/arm64/configs/vendor/fp5_GKI.config` etc.
- `github.com/LineageOS/android_device_fairphone_FP5` — FP5 device tree; also confirmed in FP5.yml
- `github.com/fairphone-mirror/kernel_msm-5.4` — Fairphone kernel mirror base

## 404 Repos (do not cite — verified non-existent)

- `LineageOS/android_kernel_qcom_sm7325` — HTTP 404
- `LineageOS/android_packages_apps_Trust` — HTTP 404 (deleted — evidence of Trust deprecation)
- `LineageOS/android_packages_apps_Twelve` — this is the music player
- `fairphone/kernel_fairphone_5` — HTTP 404
- `fairphone/kernel_msm-5.4` — HTTP 404

## FP5 Official Support — CONFIRMED

- `wiki.lineageos.org/devices/FP5/` → HTTP 200
- FP5.yml: maintainer `mikeioannina` (active), versions `[21, 22.1, 22.2, 23.0, 23.2]`, current_branch `lineage-23.2`
- FP5 IS officially supported. LineageOS-specific claims use `indicative` floor, not `speculative`.

## WireGuard — CONFIRMED (Primary Source)

- `CONFIG_WIREGUARD=y` in `arch/arm64/configs/gki_defconfig` (lineage-23.2 branch)
- Context: `CONFIG_DUMMY=y` / `CONFIG_WIREGUARD=y` / `CONFIG_TUN=y`
- FP5 kernel is 5.4; WireGuard mainline is 5.6; backport confirmed in LOS 23.2 GKI defconfig
- P6 biophoton pathway claims elevated to `verified` for LOS 23.2; `indicative` for 21–22.x

## Trust Interface — DEPRECATED/REMOVED IN LOS 20/21+

All 5 candidate repos searched with negative result:
1. `android_lineage-sdk` (lineage-21 tree) — 0 Trust paths, 0 trust strings in res
2. `android_vendor_lineage` — 0 Trust hits
3. `android_packages_apps_Settings` (lineage-23.2) — only AOSP TrustAgent/SmartLock (different feature)
4. `android_hardware_lineage_interfaces` — no trust directory (biometrics, camera, health, ir, light, livedisplay, power, radio, sensors, touch, usb, vibrator)
5. GitHub org repo search — no Trust Interface app

**IMPORTANT**: Do NOT confuse Android's `TrustAgent` / Smart Lock (AOSP keyguard trust agent, alive) with the LineageOS Trust Interface security dashboard (deprecated). They are completely different features. The deleted repo `android_packages_apps_Trust` is evidence of removal.

**Rule**: Trust Interface is `deprecated-feature` in LOS 20/21+, not `unconfirmed`. Do not cite as a current LOS feature in any document.

## microG on Standard LOS FP5 — CONFIRMED NOT INCLUDED

- `device.mk` (lineage-21): no microG packages
- `android_vendor_lineage` common makefiles: 0 microG hits
- Requires separate "LineageOS for microG" build variant

## SeedVault — CONFIRMED NOT INCLUDED BY DEFAULT

- `android_vendor_lineage` common_full_phone.mk and common_mobile_full.mk: 0 SeedVault references
- FP5 device.mk: no SeedVault packages
- Must be installed separately; not in standard LOS FP5 build

## Root / su — CONFIRMED NOT DEFAULT

- FP5 device.mk (lineage-21): no su or root-granting packages
- `android_vendor_lineage` common makefiles: no root packages
- Opt-in via Magisk post-install only

## LiveDisplay on FP5 LOS 21 — CONFIRMED NOT ACTIVE

- `android_hardware_lineage_livedisplay` has three generic backends: `sdm`, `legacymm`, `sysfs` — no FP5/QCM6490-specific backend
- FP5 `device.mk` (lineage-21): 0 LiveDisplay packages or overlays; `lineage.dependencies` has no LiveDisplay repo
- SDM backend's required blob (`libsdm-disp-vndapis.so`) IS in FP5 proprietary-files.txt — theoretically attemptable but not enabled
- No other QCM6490/SM7325 device (Motorola Dubai, OnePlus u4t, Xiaomi diting) uses LiveDisplay on LOS 21
- Active FP5 display pipeline: SurfaceFlinger → HWC/QTI display HAL → panel. LiveDisplay is a dormant MAP precursor.
- Biological framing: LiveDisplay is LineageOS-wide capability; on FP5 LOS 21 the MAP precursor is present but unexpressed.

**Rule**: Do NOT claim LiveDisplay is active on FP5 LOS 21. Distinguish LineageOS-wide capability from FP5 activation status.

## Privacy Guard — PARTIALLY RESOLVED (Likely Removed/Renamed in LOS 21+)

- `android_frameworks_base` code search for `privacyguard` → 0 hits
- Per-app AppOps toggle: `indicative` (AOSP framework, inherited)
- Fake-data injection (null mic/camera/GPS): `unconfirmed` in LOS 21+
- LiveDisplay FP5 HAL backend: still pending verification

## ROM Fork Plan Integration (CELL_OS_ROM_FORK_PLAN.md — APPROVED 2026-06-24)

Both `LineageOSv2_Manifold.md` and `LineageOSv2_Description.md` comprehensively updated. Key document state changes:

**Manifold**: §3.3 BP5 corrected; §5.5 BP5 rewritten (PowerManager API, absent paths); §7.1 corrected (thermal/ dir absent); §7.4 corrected (performance/ dir absent); §7.6 SecurityStatusOrganelle APPROVED; §9.3 expanded (absence matrix); §9.5 expanded; §9.6 SecurityStatusOrganelle APPROVED; §10 scoped to SPA + ROM pointer; new §11 Native Android ROM Layer added.

**Description**: Header status block added; §10 BP8 corrected (IWaterCoherence HAL superseded by ICellVitalService arch); §13 taxonomy updated (approved-rom-component class added; false thermal/performance claims removed; SecurityStatusOrganelle APPROVED); footer updated to include ROM fork plan authority.

## Nine Core Accuracy Rules (check before any LineageOS doc is cited)

1. **Trust Interface**: DEPRECATED in LOS 20/21+. Mark as `deprecated-feature`. Replacement: `android_packages_apps_CellShell/SecurityStatusOrganelle.kt` (APPROVED ROM Phase 3). File path is repo-relative, NOT package-prefixed (`org.cellos.cellshell/` is the package name, not a path).
2. **Privacy Guard**: Fake-data injection `unconfirmed` in LOS 21+. AppOps toggle `indicative`.
3. **microG**: Not in standard LOS FP5. Requires "LineageOS for microG" variant.
4. **Updater scope**: OTA client UX + server endpoint only. Not a full update_engine replacement.
5. **Root/su**: Opt-in (Magisk), not default. Confirmed absent from FP5 device config.
6. **Kernel tree**: Use `android_kernel_fairphone_qcm6490` (v5.4, branches lineage-21 → lineage-23.2). WireGuard enabled (`CONFIG_WIREGUARD=y` in gki_defconfig, lineage-23.2).
7. **BP5 thermal**: `ThermalManager.java` HTTP 404 in LOS 21. `android_hardware_lineage_interfaces` has NO `thermal/` or `performance/` subdirectory. BP5 integration is `PowerManager.addThermalStatusListener()` (NOT `addThermalStatusChangedListener`) via `CellVitalOverlayController.kt`. All 7 constants: NONE(0.00), LIGHT(0.30), MODERATE(0.55), SEVERE(0.80), CRITICAL(0.95), EMERGENCY(0.98), SHUTDOWN(1.00).
8. **BP8 kernel**: Patch is to `drivers/soc/qcom/smem.c` (adding `cellos_smem_coherence_probe()`), NOT a new `smem_coherence.c` file. Gated by `CONFIG_CELLOS_BIOPLASMA_BP8`. Sysfs node: `/sys/kernel/cellos/smem_coherence`.
9. **Pathway counts**: 13 bioplasma (BP1–BP9, BP10, BP12–BP14) + 9 biophoton (P1–P9) = 22 total. SPA TypeScript contract covers BP1–BP9 only (scope note required in §8). Authority σ values from research docs — never derive from Manifold: BP13=0.75, BP4=0.70, P3=0.85, P5=0.75, P2=0.60 (all raised from earlier values per 2024-2026 evidence).

10. **Zone matrix σ sync**: Zone tables in §4 must match authority σ values just like the §1.2 summary table. Zone 6 ER correct pathways: BP14=0.82 (dominant, IP3R CICR), BP4=0.70 (ELF downstream), P2=0.60 (oxidative folding emission). BP1 does NOT belong in Zone 6 (ER). Combined σ for each zone = highest σ in that zone.
11. **§8 scope note** must distinguish: BP1–BP9 fully implemented (hooks+UI); BP12/BP13/BP14 constants exported only (`isMetaphor: true`, no runtime hooks); BP10 not in SPA. P1–P9 via BIOPHOTON_LINKS in mappings.ts.
12. **P8 LineageOS analogue**: SurfaceFlinger hardware compositor pipeline (GPU → display hardware composer → display panel), NOT AIDL HAL callback architecture. Collagen-fibre waveguide → dedicated hardware optical channel.

13. **§11.1 biological roles**: CellVitalService.java is the "live pathway registry / nervous system" NOT the nucleus. CellVitalOverlayController.kt is the "BP5 thermal listener feeding CellVitalService + σ-gated SystemUI overlay driver" NOT a "biophoton ring render loop." CellVitalServiceImpl.java (Phase 2) is the separate pathway computation class and must always appear alongside CellVitalService.java.
14. **§11.1 scope note required**: §11.1 is a core-component extract only; the full inventory (branding overlays, SystemUI files, CellShell activities, kernel patches, SELinux, Phase 5 items) lives in CELL_OS_ROM_FORK_PLAN.md.
15. **privapp XML pattern**: `etc/permissions/privapp-permissions-cellos.xml` grants `org.cellos.permission.READ_VITALS` to package `org.cellos.cellshell`. Platform permission declared in `frameworks/base/core/res/AndroidManifest.xml` with `protectionLevel="signature"`.
16. **Zone matrix completeness**: Zone 7 Golgi must include P8 σ=0.65. Zone 1 membrane P3=0.85, BP4=0.70. Zone 3 cytoplasm must include P2 σ=0.60. BP4 σ=0.70 must be consistent across Zone 1 table, §8 constants snippet, §9 implementation table, and §10 Phase 3 table.

17. **§4 zone matrix is SPA 8-zone scope only**: The Manifold §4 covers 8 SPA zones. The full biological model has 15 zones; Zones 9–15 are in the ROM plan / CellShell. Any claim of "8 Cell OS zones" without the SPA qualifier is wrong.
18. **Zone 5 nucleus combined σ = 0.88 (BP12)**: Not 0.92. BP12 (circadian CLOCK/BMAL1 TTFL) is the dominant pathway in nucleus; AlarmManagerService/JobScheduler. Combined σ is the max σ in the zone table — always recompute when adding a new pathway.
19. **ICellVitalService AIDL methods**: `getZoneSignal(zoneId)`, `getPathwayState(pathwayId)`, `getManifoldSnapshot()` — all read-only. Must appear in any §11.1 table row or §11.2 description of ICellVitalService.aidl.
20. **Non-pathway σ misuse in §7.x**: σ values in Confidence lines of §7.x subsections represent biological pathway evidence weights, not implementation confidence. Never write "Confidence: indicative (σ=X)" for an implementation confidence note — use plain text description of verification status instead.

**How to apply**: Before writing or reviewing any LineageOS doc, grep for `addThermalStatusChangedListener`, `smem_coherence.c`, `ThermalManager`, `lineage/interfaces/thermal`, `lineage/interfaces/performance`, `lineage-build.prop`, `IWaterCoherence` (outside historical-note blockquote), `§3\.3` near SecurityStatusOrganelle, `§3\.4` near BP8, `BP1.*BP14.*BP10`, `org.cellos.cellshell/Security`, `Trust`, `android_kernel_qcom_sm7325`, `AIDL HAL callback` (in P8 context), `seven biophoton`, `P1-P7` (in gen-2 manifold context), `0\.65` near BP4, `nucleus` near CellVitalService, `0\.92` near Zone 5 nucleus — all are wrong or superseded. Always verify σ values against BIOPLASMA_RESEARCH.md and BIOPHOTON_RESEARCH.md. Zone matrix combined σ = max σ in the zone table; recompute after every pathway addition.
