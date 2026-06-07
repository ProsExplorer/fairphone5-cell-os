---
name: Cell OS dynamic Tailwind classes
description: Dynamic Tailwind class interpolation is invisible to JIT scanner — use static inline styles or const maps instead.
---

Tailwind v4's JIT scanner cannot detect dynamically interpolated class names like:
`border-${color}-400/10` or `text-${color}-400`

The class is never generated, so the style silently disappears.

**How to apply:**
- Always use a static const map (e.g. `TRIAD_CARD_STYLES`, `KIND_META`, `PHASE_COLORS`) and apply colors via inline `style={{ borderColor, color }}`.
- Never build Tailwind utility strings by concatenation or template literals in Cell OS components.

**Why:**
Discovered when philosophy.tsx triadic cards and kind badges rendered without border/text color on the live page despite looking correct in source code. The fix was to replace all dynamic class strings with static inline style objects.
