---
name: Cell OS corpus alignment
description: Decisions made aligning Cell OS to the yahweh-yehoshua philosophical corpus; gaps closed and invariants to maintain going forward.
---

# Cell OS — Corpus Alignment Decisions

**Why:** Architect review compared Cell OS to all 10 documents from ProsExplorer/yahweh-yehoshua and found the app embodied the structural vocabulary but not the full ontology. Three gaps were closed; future work should not re-open them.

## Source corpus

- Repo: `https://github.com/ProsExplorer/yahweh-yehoshua`
- 10 markdown documents: Code as Feng Shui, Hunyuan Qi, Peng Qi Guan Ding Fa Communion, Shenmíng Shénguāng, Biophotons/Bioplasma, Bioplasma Embodiment Architecture, Dimensional Portal Framework, CantongQi, Zhineng Qigong Open Source Crystal, README.

## What was closed

### A. Corpus-faithful ontology (philosophy.tsx §5, lineage.ts)
- New §5 "Sacred Coherence — The Living Seal" on the philosophy page contains:
  - Live SHA-256 Sacred Signature (recomputes every 7770 ms)
  - Runtime-as-活氣 lifecycle table (process start = 吸氣, error = 咳嗽, memory leak = 氣滯, infinite loop = 氣旋)
  - Developer-consciousness-as-source note (Facet 9 of the Feng Shui manifesto)
  - Direct link to yahweh-yehoshua repo
- Lineage timeline now includes yahweh-yehoshua corpus as a 2026 entry ("Code as Feng Shui — The Literal Ontology")

### B. Sacred Coherence as behavior (constants.ts, hooks/use-sacred-signature.ts)
- `SACRED_ANCHOR = "YAHWEH YEHOSHUA 尺度不變性"` and `SACRED_SEED = 7770777` exported from constants.ts with full docblock
- `useSacredSignature()` hook: SHA-256(SEED:breathCount:ANCHOR) via `crypto.subtle`, updates every 7770 ms, returns `{ signature, breathCount, anchor, seed }`

### C. Relational/communion scale (scales.ts, NineScaleFlow.tsx)
- 11th scale added: "Relational" (關係) — teacher/student communion, 拉气 La Qi, 神光 from two aligned instruments
- Scale count: was 10, now 11. Title is "Eleven Scales" in both NineScaleFlow.tsx and philosophy.tsx §2.

## Invariants to maintain

- `SACRED_ANCHOR` and `SACRED_SEED` must never be changed without updating useSacredSignature and the §5 explanation text simultaneously.
- The Relational scale (id: "relational") is the 9th entry in NINE_SCALE_FLOWS (between Generational and Cosmic). Insertions must preserve this ordering.
- `lineage.ts` now has two 2026 entries; the render key is `event.title` (not `event.year`). Never revert the key to `event.year`.
- The architect's core finding: TriadicFlow.tsx still carries a secular disclaimer ("not a metaphysical claim"). This is intentional — it coexists with §5's literal ontology framing. Do not remove either.

## Remaining corpus gaps (not yet addressed)
- Object-observer dissolution framing ("apparatus becomes transparent / invisible") — not surfaced in UI.
- Scale invariance is still static data, not recursive operational mechanics.
- 神光 mentioned but not animated/visualized.

**How to apply:** When adding content to Cell OS that touches philosophy, scale invariance, or the triadic pattern, check the yahweh-yehoshua corpus first. The corpus is the source ontology — not a reference but the origin.
