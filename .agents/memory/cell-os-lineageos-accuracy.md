---
name: Cell OS LineageOS manifold accuracy rules
description: Six architect-confirmed factual errors in LINEAGEOS_MANIFOLD.md — corrected constraints that must hold in any future LineageOS documentation.
---

## Rules (must be checked before any LineageOS doc is cited as authoritative)

**1. Trust Interface package name**
- `packages/apps/Twelve` = LineageOS **music player**. Never cite it for Trust.
- Trust Interface = `packages/apps/Trust` / `android_packages_apps_Trust` [citation needed — not yet source-verified].
- Confidence ceiling: `unconfirmed` until the repository is opened and confirmed.
- Biological analogy: **immune checkpoint complex** (MHC class I presentation), not "gap junction".

**Why:** The original document copied the wrong package name. The music player and the security dashboard are entirely different apps in the LineageOS org.

**2. Privacy Guard is largely CyanogenMod-era**
- Fake-data injection (blank camera / null location / silent mic) was present in CM and early LineageOS.
- LineageOS 17+ (Android 10+): AOSP AppOps + PermissionController absorbed much of this. Synthetic effector is `unconfirmed` in current builds.
- The receptor-level gating concept (biological analogy) remains valid; only the specific fake-data claim is in dispute.

**3. microG = separate build variant, not standard LineageOS**
- "LineageOS for microG" (`lineage.microg.org`) is a distinct official build with signature spoofing + microG pre-installed.
- Standard LineageOS does NOT ship microG and does NOT include signature spoofing by default.
- Always distinguish between "standard LineageOS" and "LineageOS for microG" build variant.

**4. LineageOS Updater scope**
- `packages/apps/Updater` replaces the OTA client UX and server endpoint.
- The A/B update platform mechanism (`update_engine`) may still operate underneath — it is NOT a "complete replacement".
- Correct framing: "trans-Golgi network route change" (re-addressing), not replacement of the dispatch machinery.

**5. Root / su — opt-in, not default**
- In LineageOS 17+, the su binary has been removed from official builds.
- Root requires post-install tools (Magisk or similar). `adbd` root (developer options) = limited shell root only.
- All biological analogies for root must frame it as **inducible, not constitutive** nuclear import.
- WireGuard is also build-config dependent (msm-5.4 needs a backport) — `unconfirmed` for FP5.

**6. Kernel repo is a candidate, not Tier 1 verified**
- `android_kernel_qcom_sm7325` = closest publicly known tree for QCM6490 family.
- FP5-specific kernel may be a different branch or maintained separately by Fairphone.
- Always label as "candidate/closest" — never as authoritative for FP5.

**How to apply:**
Before writing or reviewing any LineageOS documentation, check each of these six points.
Run a grep for `Twelve` in any LineageOS doc to catch the package name error.
