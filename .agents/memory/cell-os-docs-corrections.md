---
name: Cell OS docs accuracy fixes
description: Seven concrete code-mismatch corrections found by architect review of the six Cell OS documentation files written June 2026.
---

## Corrections applied

1. **`useCellVitalStore` state key is `activeZoneId`, not `activeZone`.**  
   Also: store has `inferencePhase`, `setBreathCount`, `setInferencePhase`, and five composite event methods (`sacredPulse`, `inferenceStart`, `tokenEmit`, `inferenceComplete`, `inferenceError`). Document the full shape.

2. **`CodeSnippet` uses `children: string`, not a `code` prop.**  
   Correct usage: `<CodeSnippet filename="..." language="...">{codeString}</CodeSnippet>`. Also accepts optional `sourceUrl` for a live link.

3. **`BiophotonLink` has `attentionWeight?: number` (optional).**  
   Described in `types.ts` as an interpretive attention-mechanism analogue; not empirically measured.

4. **Organelle `color` and zone `color` are not the same string format.**  
   `CELL_MAPPINGS` uses HSL strings; `CELL_ZONES` uses hex. They need perceptual alignment, not string equality.

5. **`select_task_rq` is in `kernel/sched/core.c`, not `fair.c`.**

6. **TFLite NNAPI delegate AOSP path is `external/tensorflow/tensorflow/lite/delegates/nnapi/`**, not the upstream `tensorflow/` path.

7. **`BASE_PATH` env var is required by `vite.config.ts` and hard-fails at startup if absent.** Document alongside `PORT`.

8. **Modem model number for FP5 is unconfirmed.** The "Qualcomm X62" label is uncertain for QCM6490; should be documented as needing primary source confirmation.

9. **No `lastVerified` field exists in `types.ts`.** Verification timestamps should be written as inline `note:` comments on `SubstrateNode` or `Citation` entries.

**Why:** These were found by running the architect `evaluate_task` tool against the docs + real source files simultaneously. Future doc edits should always be cross-checked against the actual TypeScript types and store shapes, not recalled from memory.
