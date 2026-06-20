---
name: Cell OS LineageOSv2_Manifold document structure
description: How LineageOSv2_Manifold.md was built, its 14-batch decomposition, and the durable decisions governing future edits.
---

# Cell OS — LineageOSv2_Manifold document

## What it is
`artifacts/cell-os/docs/LineageOSv2_Manifold.md` (1,007 lines) is the second-generation LineageOS coordinate document. It integrates bioplasma BP1–BP9 alongside biophoton P1–P7 into a unified 16-pathway electromagnetic manifold, mapped to Fairphone 5 (QCM6490, LineageOS 21+) source code.

## Document structure (sections)
- §§0–2: Executive thesis, unified 16-pathway table, source authority tiers
- §3: Evidence model — σ inheritance rules, confidence tags, FP5-specific floor
- §4: Zone integration matrix — 8 zones × combined bioplasma+biophoton pathways
- §§5.1–5.9: Per-pathway BP1–BP9 translations with source tables, P→A→E, TypeScript hooks
- §6: Cross-pathway routing matrix (BP × P coupling interactions)
- §7: LineageOS-native bioplasma additions (Thermal HAL, Power profiles, LineageParts, Perf HAL, LiveDisplay dormant, Trust deprecated)
- §8: TypeScript implementation contract (BioplasmaPathway type, BIOPLASMA_REGISTRY, vital store extension, Hebbian adapter, priority order)
- §§9–10: Source verification audit + 3-phase implementation roadmap

## Key durable decisions

### Authority hierarchy (must never be reversed)
1. BIOPLASMA_RESEARCH.md governs all BP σ values (never override from LOS source verification)
2. BIOPHOTON_RESEARCH.md governs all P1–P7 σ values
3. LineageOSv2_Manifold.md governs only LOS source paths and implementation tiers

### σ ceiling rule
LOS source-verification raises implementation confidence but NEVER exceeds biological σ ceiling. A Verified LOS path for a Speculative pathway (σ=0.45) cannot be promoted to Verified tier.

### Confirmed-absent features (enforce in all future edits)
- Trust Interface: HTTP 404, deleted in LOS 20/21+. Tag: `deprecated-feature`. Never cite as current.
- LiveDisplay: inactive on FP5 LOS 21 — no device tree overlay. Tag: `verified-absent`.
- microG: separate build variant only. Tag: `verified-absent` for standard LOS.
- Root/su: opt-in Magisk post-install only. Tag: `verified-absent` for official builds.
- Privacy Guard fake-data injection: absent in LOS 17+ (Android 10+). Tag: `unconfirmed`.

### BP8 is permanently reserved
BP8 (QED water coherence, σ=0.32) has NO LineageOS implementation. It must remain `status: "reserved"` with `lineageosPath: null`. Never assign a runtime action to it.

### BP9 is permanently read-only
BP9 (THz telemetry, σ=0.50) maps to StatsD/perfetto/dumpsys. It must NEVER drive routing decisions or organelle state changes. Any code touching BP9 must check `direction === "readonly"` and return early.

### TypeScript type location
`BioplasmaPathway`, `PlasmaLiteralness`, `BioplasmaStatus` → add to `src/domain/types.ts`
`BIOPLASMA_REGISTRY` → add to `src/domain/content/organelles.ts`
`bioplasmaSignal()` → extend `src/features/cell-shell/state/useCellVitalStore.ts`
`applyBioplasmaManifoldModulation()` → extend `src/features/learning/hebbianAdapter.ts`

### 14-batch decomposition method
For future large documents: use architect to plan batch structure, then launch all body batches in parallel via startAsyncSubagent, wait_for_background_tasks, then compile. Synthesis/intro batch can be last or parallel if it reads existing source docs.

**Why:** 14 batches in parallel took the same wall-clock time as 5 batches; architect planning prevented section duplication and ensured σ governance was written first (feeding all other batches as shared context).
