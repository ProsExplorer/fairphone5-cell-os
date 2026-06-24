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
| Thermal | `android_hardware_qcom_thermal` repo; underlying HAL is `android.hardware.thermal-service.qti` | `CellVitalOverlayController.kt` calls **`PowerManager.addThermalStatusListener(executor, listener)`** — `ThermalManager.java` does NOT exist in LOS 21 `frameworks/base` (HTTP 404 verified) |
| Performance/Power | `android.hardware.power-service-qti` (Qualcomm vendor binary) + `device/fairphone/FP5/powerhint.xml` | Tune `powerhint.xml` in device tree; do not fork the QTI power service binary |

## When to fork android_hardware_lineage_interfaces

Only if Cell OS needs a **new custom AIDL interface** not in the existing HAL set. Not needed for Phases 1–4.

## Branch naming (critical — repos differ)

| Repo | Branch |
|---|---|
| android_vendor_lineage | lineage-21.0 |
| android_frameworks_base | lineage-21.0 |
| android_packages_apps_Settings | lineage-21.0 |
| android_hardware_lineage_interfaces | lineage-21.0 |
| android_device_fairphone_FP5 | lineage-21 (no .0) |
| android_kernel_fairphone_qcm6490 | lineage-21 (no .0) |

## Other verified path facts (lineage-21.0 / lineage-21 branches)

- `ThermalController.java` does **not** exist in LOS 21 SystemUI.
- `ThermalManager.java` does **NOT** exist in `core/java/android/os/` on LOS 21 (HTTP 404). **Use `PowerManager.addThermalStatusListener(executor, OnThermalStatusChangedListener)` instead.** All **7** throttling constants live in `PowerManager.java` (L2687–L2718, verified): `THERMAL_STATUS_NONE`, `THERMAL_STATUS_LIGHT`, `THERMAL_STATUS_MODERATE`, `THERMAL_STATUS_SEVERE`, `THERMAL_STATUS_CRITICAL`, `THERMAL_STATUS_EMERGENCY`, `THERMAL_STATUS_SHUTDOWN`. `HAL_SKIP_SET_THROTTLING` does **not** exist. `IThermalService.aidl` confirmed at `core/java/android/os/`. σ mapping: NONE=0.00, LIGHT=0.30, MODERATE=0.55, SEVERE=0.80, CRITICAL=0.95, EMERGENCY=0.98, SHUTDOWN=1.00.
- About page class is `MyDeviceInfoFragment.java` in `src/com/android/settings/deviceinfo/aboutphone/`. `DeviceInfoSettings.java` does not exist.
- `vendor/lineage/config/lineage-build.prop` does NOT EXIST (HTTP 404 verified twice). Use `PRODUCT_SYSTEM_DEFAULT_PROPERTIES` in `config/common.mk` or a sourced `.mk` file instead.
- SELinux policy lives at `device/fairphone/FP5/sepolicy/vendor/` (not just `sepolicy/`).
- FP5 overlay directories are component-named: `overlay/FrameworksResTarget/`, `overlay/SystemUIResTarget/`, etc. — NOT `overlay/frameworks/base/`. Also has `overlay-lineage/` for LOS-specific overlays.
- `android_hardware_lineage_interfaces` also contains `motorola_health/` — not listed in earlier notes.
- Thermal AIDL service is `android.hardware.thermal-service.qti` (from `android_hardware_qcom_thermal` repo), not just "qcom-caf/common tree".
- FP5 active development has moved to `lineage-23.2`; `lineage-21.0` branch exists but is no longer primary. All verified paths in CELL_OS_ROM_FORK_PLAN.md are for lineage-21.0 — re-verify before rebasing to 23.2.

## AIDL security model (LOS 21)

- `@RequiresPermission` is a Java lint annotation — **metadata only**. It does not enforce access.
- Actual enforcement: `context.enforceCallingPermission("org.cellos.permission.READ_VITALS", tag)` inside every Binder stub method.
- Permission `org.cellos.permission.READ_VITALS` must be **declared in the platform** (`frameworks/base/core/res/AndroidManifest.xml` or `android_vendor_lineage` overlay), `protectionLevel="signature"`. Client apps (CellShell) **request** it only — they never declare it. Privapp clients are allowlisted in `etc/permissions/privapp-permissions-cellos.xml`.
- `PHASE_SYSTEM_SERVICES_READY` confirmed at L2913 in `SystemServer.java` on lineage-21.0.
- `android:sharedUserId="android.uid.system"` confirmed in Settings manifest on lineage-21.0 — still active for system apps.
- AIDL files placed in `core/java/android/os/` — confirmed 76 AIDL files already there (correct pattern).

**How to apply:** Before writing or reviewing any Cell OS ROM fork document that names HAL paths, file paths, API names, or class names, check this file first. Do not assume paths from AOSP documentation apply to LOS 21 without verification.
