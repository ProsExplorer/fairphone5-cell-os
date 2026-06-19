---
name: Cell OS LineageOS manifold accuracy rules
description: Architect-confirmed factual constraints for any LineageOS doc in Cell OS — includes GitHub API-verified repo paths and Trust source gap.
---

## Verified Real Repos (GitHub API HTTP 200 confirmed)

- `github.com/LineageOS/android_kernel_fairphone_qcm6490` — real FP5 kernel (NOT android_kernel_qcom_sm7325 which is 404)
- `github.com/LineageOS/android_device_fairphone_FP5` — real FP5 device tree
- `github.com/fairphone-mirror/kernel_msm-5.4` — real Fairphone kernel mirror (NOT fairphone/kernel_fairphone_5 which is 404)

## 404 Repos (do not cite — verified non-existent)

- `LineageOS/android_kernel_qcom_sm7325` — HTTP 404
- `LineageOS/android_packages_apps_Trust` — HTTP 404
- `LineageOS/android_packages_apps_Twelve` — this is the music player
- `fairphone/kernel_fairphone_5` — HTTP 404
- `fairphone/kernel_msm-5.4` — HTTP 404

## Trust Interface — Completely Unresolved (Blocking)

The Trust Interface is a real, documented LineageOS feature. However its GitHub source location is unknown — both `android_packages_apps_Trust` AND `android_packages_apps_Twelve` (the music player) are 404. Until source is found, all Trust claims are `unconfirmed`.

**Search plan:** Look in `android_lineage-sdk`, `android_vendor_lineage`, `android_packages_apps_Settings` (LOS fork), `android_hardware_lineage_interfaces`.

**Why:** Two successive citations in the document were wrong. The source location must be confirmed from GitHub before Trust is used in any authoritative document.

## Six Accuracy Rules (must check before any LineageOS doc is cited)

1. **Trust package**: Neither Twelve (music) nor Trust (404). Source unresolved. Confidence ceiling: `unconfirmed`.
2. **Privacy Guard**: CyanogenMod-era fake-data injection is `unconfirmed` in LineageOS 17+. Permission gating architecture is `indicative`.
3. **microG**: "LineageOS for microG" is a separate build variant — standard LineageOS does not ship microG.
4. **Updater scope**: Replaces OTA client UX + server endpoint. Not a full replacement of update_engine.
5. **Root/su**: Opt-in post-install (Magisk) in LOS 17+. Su binary removed from official builds. Not default.
6. **Kernel tree**: Use `android_kernel_fairphone_qcm6490` for FP5, not `android_kernel_qcom_sm7325` (404).

**How to apply:** Before writing or reviewing any LineageOS doc, grep for `Twelve`, `android_packages_apps_Trust`, `android_kernel_qcom_sm7325`, `fairphone/kernel` — all are wrong.
