---
name: Cell OS HAL Reality Boundary
description: android_hardware_lineage_interfaces does not contain thermal/ or performance/ dirs; FP5 HAL integration facts verified against lineage-21.0.
---

## Rule

`android_hardware_lineage_interfaces` (lineage-21.0) contains **no `thermal/` directory and no `performance/` directory**. Any fork plan or document claiming these paths is wrong.

**Why:** Verified by direct GitHub API listing of the repo root on 2026-06-21. The actual top-level directories are: `biometrics/`, `camera/`, `fastboot/`, `fastcharge/`, `health/`, `light/`, `livedisplay/`, `nfc/`, `power-libperfmgr/`, `powershare/`, `radio/`, `touch/`, `usb/`, `vibrator/`.

## FP5 Thermal and Performance HAL actual sources

| HAL | Actual source | Cell OS integration method |
|---|---|---|
| Thermal | `hardware/qcom-caf/common` tree; surfaced via Android `ThermalManager` / `ThermalService` system API | `CellVitalOverlayController.kt` calls `ThermalManager.addThermalStatusListener()` |
| Performance/Power | `android.hardware.power-service-qti` (Qualcomm vendor binary) + `device/fairphone/FP5/powerhint.xml` | Tune `powerhint.xml` in device tree; do not fork the QTI power service binary |

## When to fork android_hardware_lineage_interfaces

Only if Cell OS needs a **new custom AIDL interface** not in the existing HAL set. Not needed for Phases 1–4.

## Other verified path facts (lineage-21.0 branch)

- `ThermalController.java` does **not** exist anywhere in `android_frameworks_base` on lineage-21.0 (0 search results). Use `ThermalManager` API instead.
- About page class is `MyDeviceInfoFragment.java` in `src/com/android/settings/deviceinfo/aboutphone/`. `DeviceInfoSettings.java` does not exist.
- `vendor/lineage/config/lineage-build.prop` is the full in-tree path (not `lineage-build.prop` at root).
- SELinux policy lives at `device/fairphone/FP5/sepolicy/vendor/` (not just `sepolicy/`).
- FP5 active development has moved to `lineage-23.2`; `lineage-21.0` branch exists but is no longer primary. All verified paths in CELL_OS_ROM_FORK_PLAN.md are for lineage-21.0 — re-verify before rebasing to 23.2.

**How to apply:** Before writing or reviewing any Cell OS ROM fork document that names HAL paths, file paths, or class names, check this file first. Do not assume paths from AOSP documentation apply to LOS 21 without verification.
