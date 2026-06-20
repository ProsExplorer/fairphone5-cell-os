---
name: Cell OS bioplasma layer implementation
description: How BP1–BP9 were wired into the live Cell OS codebase — types, store, hooks, panels, learning adapter.
---

# Cell OS Bioplasma Layer — Implementation Record

## What was built
Full bioplasma layer (BP1–BP9) from LineageOSv2_Manifold.md §8–§10 roadmap.

## File map (all new or significantly modified)

### New files
- `src/domain/content/bioplasmaPathways.ts` — BP1–BP9 constants + BIOPLASMA_PATHWAYS, BIOPLASMA_BY_CODE, IMPLEMENTED_BIOPLASMA_PATHWAYS
- `src/features/cell-shell/hooks/useBioplasmaVmem.ts` — BP7 persistent VmemProfile (localStorage, separate from vital store)
- `src/features/cell-shell/hooks/useWoundFieldBroadcast.ts` — BP3: fires on window.error, unhandledrejection, offline, Battery API < 15%
- `src/features/cell-shell/hooks/useELFResonance.ts` — BP4: fires on visibilitychange/focus, 8s debounce, σ=0.65 intensity
- `src/features/cell-shell/hooks/useThermalHAL.ts` — BP5: 12s interval, fires when JS heap ratio > 0.75
- `src/features/explorer/components/BioplasmaFieldSection.tsx` — reusable zone panel section, reads from BIOPLASMA_ZONE_REGISTRY

### Modified files
- `src/domain/types.ts` — added PlasmaLiteralness, BioplasmaStatus, BioplasmaPathway interface
- `src/domain/content/organelles.ts` — added BIOPLASMA_REGISTRY (organelle→pathways) and BIOPLASMA_ZONE_REGISTRY (zone→pathways)
- `src/features/cell-shell/state/useCellVitalStore.ts` — added "bioplasma" SignalType, bioplasmaSignal(), initBP1Baseline()
- `src/features/learning/hebbianAdapter.ts` — added applyBioplasmaManifoldModulation()
- `src/features/learning/useLearnedManifold.ts` — added bioplasmaZoneWeights to LearnedManifold type and return
- `src/features/learning/useMembraneObserver.ts` — BP2 fires on organelle click-lock (affect event)
- `src/features/explorer/navigation/CellExplorerLayout.tsx` — BP1 init on mount, wires useWoundFieldBroadcast/useELFResonance/useThermalHAL
- All 8 zone panels — added BioplasmaFieldSection at end of each

## Architect-flagged fixes (all resolved)

| # | Issue | Fix |
|---|-------|-----|
| 1 | Broadcast pathways emitted nothing (BP1/BP3 source="broadcast" → getZoneForOrganelle null) | `bioplasmaSignal()` checks `direction === "broadcast"` → fans out to ALL 8 zones at 0.55× intensity; real-organelle source gets full intensity |
| 2 | BP1 Infinity TTL baseline overwritten by any finite membrane signal | Added `bioplasmaBaseline: Partial<Record<CellZoneId, number>>` to store; `clearExpiredSignals()` restores baseline signals after transients expire |
| 3 | BP9 readonly skipped by signal guard but NOT by Hebbian modulation | `applyBioplasmaManifoldModulation()` now skips `direction === "readonly"` |
| 4 | Cold-start membrane zone boost ≈0.65 (5 verified pathways) dominated Hebbian | `MAX_ZONE_BIOPLASMA_BOOST = 0.20` cap per zone in modulation |
| 5 | `bioplasmaZoneWeights` computed but not consumed | `CellMapNav` calls `useLearnedManifold()`, passes weights to `CellRingSvg`; drives `fillOpacity` and `strokeOpacity` on inactive rings |
| 6 | `useBioplasmaVmem` (BP7) dead loop — persisted but nothing read it | VmemProfile switcher in `BioplasmaFieldSection` when BP7 present; profile change fires BP7 signal + `initBP1Baseline(profileIntensity)` |
| 7 | Battery cleanup race — getBattery() async, no unmount guard | `mounted` ref; `if (!mounted) return` before attaching battery listeners |
| 8 | Route endpoints as plain `string` — silent no-ops | `BioplasmaRouteEndpoint` union type in `types.ts`; `BioplasmaPathway.organelleRoute.source/target` typed |

## Key implementation decisions

### BP1 always-on glow
Uses `expiresAt: Infinity`. clearExpiredSignals() keeps signals where `expiresAt > Date.now()`, and Infinity always satisfies this. Intensity 0.22 (subtle baseline, not overwhelming). SignalType: "bioplasma".

### BP8 reserved / BP9 read-only guards
Both enforced in bioplasmaSignal() with early returns:
```typescript
if (pathway.status === "reserved") return;  // BP8
if (pathway.organelleRoute.direction === "readonly") return;  // BP9
```
These guards are in the store function — not in the calling code. They cannot be bypassed.

### BP7 persistence isolation
BP7 Vmem uses a separate `useBioplasmaVmem.ts` hook with localStorage. Did NOT add Zustand persist to useCellVitalStore — transient signals must stay transient.

### bioplasmaSignal() σ-weighting
`weightedIntensity = intensity * pathway.sigma` — verified pathways glow brightest (BP1: 0.92, BP2: 0.90), speculative pathways are dimmer (BP6: 0.45).

### BP2 trigger point
Fires in useMembraneObserver on organelle click-lock ("affect" event). This is the only deliberate interaction boundary — consistent with the "Binder BC_TRANSACTION" analogue (intentional IPC call).

### BioplasmaFieldSection renders null for zones with no pathways
BIOPLASMA_ZONE_REGISTRY has ribosomes: [] and golgi: []. The component returns null early — so those panels are unaffected.

### Inline styles throughout BioplasmaFieldSection
No dynamic Tailwind classes — all colors and layout via inline styles. Follows Cell OS convention.

### BIOPLASMA_ZONE_REGISTRY vs BIOPLASMA_REGISTRY
- BIOPLASMA_REGISTRY: maps organelle IDs (15 granular) → pathways
- BIOPLASMA_ZONE_REGISTRY: maps CellZoneId (8 zones) → pathways
- BioplasmaFieldSection uses BIOPLASMA_ZONE_REGISTRY (zone-level, simpler for panels)
- bioplasmaSignal() uses getZoneForOrganelle() from hebbianAdapter to map source/target to zones

### applyBioplasmaManifoldModulation() boost factors
- σ ≥ 0.75 (verified): up to +18%
- σ ≥ 0.50 (indicative): up to +14%
- σ < 0.50 (speculative): up to +9%
- status === "reserved": skipped (BP8)
- Result bounded to [0, 1]

**Why:** These factors close at most ~16% of the gap to maximum intensity, preserving dynamic range and preventing bioplasma from saturating zone weights independently of user interaction.
