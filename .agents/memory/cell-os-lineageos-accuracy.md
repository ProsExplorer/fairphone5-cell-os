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

## Six Core Accuracy Rules (must check before any LineageOS doc is cited)

1. **Trust Interface**: DEPRECATED in LOS 20/21+. Mark as `deprecated-feature`. Do not cite as current.
2. **Privacy Guard**: Fake-data injection `unconfirmed` in LOS 21+. AppOps toggle `indicative`.
3. **microG**: Not in standard LOS FP5. Requires "LineageOS for microG" variant.
4. **Updater scope**: OTA client UX + server endpoint only. Not a full update_engine replacement.
5. **Root/su**: Opt-in (Magisk), not default. Confirmed absent from FP5 device config.
6. **Kernel tree**: Use `android_kernel_fairphone_qcm6490` (v5.4, branches lineage-21 → lineage-23.2). WireGuard enabled (`CONFIG_WIREGUARD=y` in gki_defconfig, lineage-23.2).

**How to apply**: Before writing or reviewing any LineageOS doc, grep for `Trust`, `android_packages_apps_Trust`, `android_kernel_qcom_sm7325`, `fairphone/kernel` — all are wrong. If Trust appears as a current feature, mark `deprecated-feature`.
