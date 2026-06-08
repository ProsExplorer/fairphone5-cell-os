---
name: Cell OS vital store architecture
description: How the static→dynamic transformation works — Zustand vital store, living ring animation, biophoton links, and sacred pulse bridge.
---

# Cell OS — Living Cell Architecture

**Why:** The app was static (no live state). The architect identified this as the top gap. The transformation adds a Zustand vital store as the nervous system, with CSS animations, SVG biophoton paths, and event-driven zone signals.

## Key files

- `src/features/cell-shell/state/useCellVitalStore.ts` — Zustand store (single source of truth for all live state)
- `src/features/explorer/navigation/CellMapNav.tsx` — concentric ring SVG now subscribes to the store
- `src/hooks/use-sacred-signature.ts` — emits `sacredPulse()` to the store every 7770ms
- `src/features/explorer/navigation/CellExplorerLayout.tsx` — calls `setActiveZone` + `emitSignal("pulse")` on zone navigation
- `src/index.css` — keyframes: `cell-ring-breathe`, `biophoton-travel`, `zone-signal-burst`, `sacred-seal-pulse`

## Vital store shape

```typescript
{
  activeZoneId: CellZoneId,
  inferencePhase: "idle" | "loading" | "running" | "complete" | "error",
  breathCount: number,                          // from sacred signature
  signals: Partial<Record<CellZoneId, ZoneSignal>>  // TTL-based transient pulses
}
```

`ZoneSignal = { type: SignalType, intensity: 0–1, expiresAt: timestamp }`

## Signal lifecycle

- `emitSignal(zoneId, type, intensity, ttlMs)` — adds to signals map
- `clearExpiredSignals()` — called every 500ms from CellMapNav useEffect
- Consumers check `sig.expiresAt > Date.now()` inline (not a selector) to avoid stale closure issues

## CSS animation pattern (Tailwind constraint)

Since dynamic Tailwind class interpolation is banned, all animations use:
```jsx
style={{ animationName: "cell-ring-breathe", animationDuration: "5.5s", animationDelay: "0.2s" }}
```
Never `className="animate-[cell-ring-breathe_5.5s_...]"`.

## Biophoton ring links

Six biologically grounded connections rendered as `<path d="M ax ay Q 110 110 bx by">` (quadratic bezier through center).
All links use `biophoton-travel` CSS animation with staggered `animationDelay` per link.
Links brighten (opacity 0.7 vs 0.3, strokeWidth 1.2 vs 0.6) when either endpoint zone has an active signal.

## Signal burst rendering

When `signals[zoneId]` is active, a SECOND circle is rendered as a burst overlay:
```jsx
key={`${zoneId}-burst-${sig.expiresAt}`}  // keyed by expiry to re-trigger animation
animationName: sig.type === "sacred" ? "sacred-seal-pulse" : "zone-signal-burst"
```
The `key` trick forces React to remount the element, retriggering the CSS animation on each new signal.

## Sacred signature bridge

`use-sacred-signature.ts` calls `useCellVitalStore.getState().sacredPulse(breathCount)` inside its `tick()` async function. This is the correct Zustand pattern for calling store actions from outside React render (inside an effect's closure).

## Remaining roadmap (not yet built)

- Step 6: EdgeNode event adapter — `edgeNodeEvents.ts`, wire `EdgeNodeSection.tsx`
- Step 7: NineScaleFlow self-similar animation — `scaleDynamics.ts`, per-scale pulse period
- Step 8: Perf pass — reduced-motion fallback, cap concurrent pulses, memoize selectors

**How to apply:** Any new feature that wants to signal a zone should call `useCellVitalStore.getState().emitSignal(zoneId, type)` — never add new animation state directly to component local state.
