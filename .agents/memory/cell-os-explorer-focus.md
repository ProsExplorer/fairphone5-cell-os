---
name: Cell OS explorer focus model
description: How cross-highlighting between cell organelles and the FairPhone 5 AI substrate is modelled in the Cell OS explainer.
---

The Cell OS explainer cross-links cell organelles to real FairPhone 5 hardware
("substrate") nodes, defined once in one direction (organelle -> substrate). The
interactive highlighting must work in BOTH directions.

Rule: model the user's current interest as a single discriminated focus value
(`none | organelle | substrate`), and derive everything else from it in one place.

**Why:** An earlier version stored only `activeOrganelleId`. Selecting a substrate
that mapped to multiple organelles (e.g. Kryo 670 -> nucleus AND cytoskeleton) was
coerced to `organelles[0]`, a hidden first-match rule that silently dropped links
and behaved unstably. Many substrate/organelle links are genuinely many-to-many.

**How to apply:** When a substrate is focused, highlight ALL reverse-linked
organelles (build a `Set<string>` of ids; the cell diagram accepts `activeIds:
Set<string>`, not a single id). The info panel renders an organelle view OR a
substrate view OR empty — never both, so the two foci can't desync. Keep the link
table single-direction and derive forward/reverse lookups with pure selectors.
