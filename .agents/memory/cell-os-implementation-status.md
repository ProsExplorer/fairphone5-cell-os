---
name: Cell OS implementation status
description: What Cell OS actually is (React SPA) vs. what external docs describe (middleware daemon) — critical distinction for any future documentation work.
---

## The rule
Cell OS is a React + Vite SPA (visualization / specification tool), not a running Android middleware daemon. Any documentation that says it "intercepts Binder IPC", "calls sched_setaffinity()", or "runs as a V8/Node.js system daemon on the Fairphone 5" is describing the architectural blueprint, not the current implementation.

**Why:** This was confirmed by architect audit against App.tsx, package.json, and the domain type files. The TypeScript layer provides the precise mathematical spec (18 links, 39 intersections, σ tiers, 4 invariants) but no native Android execution exists yet.

**How to apply:** When reviewing or writing Cell OS documentation, always clarify "this is the design blueprint" vs. "this is currently implemented." To become on-device middleware requires: privileged Android service, SELinux policies, Binder observation hooks (eBPF or kernel module), and sched_setaffinity/PowerHAL integration.

## Wavelength band type system (types.ts / mappings.ts)
Five bands in the type system: `UV` | `blue-green` | `red` | `NIR` | `deep-NIR`
- NIR = 700–900 nm
- deep-NIR = 900–1400 nm (includes singlet oxygen peak at 1270 nm)
- "NIR 1270 nm" is a common mistake — 1270 nm is deep-NIR.

## QCM6490 CPU naming
Source (substrate.ts) uses Cortex architecture names, not Snapdragon consumer names:
- 1× Cortex-A78 Prime @ 2.71 GHz
- 3× Cortex-A78 Performance @ 2.40 GHz
- 4× Cortex-A55 Efficiency @ 1.96 GHz (NOT 1.9 GHz)
"Gold+" / "Gold" / "Silver" are Snapdragon consumer chip names and are wrong for QCM6490 docs.

## σ confidence tiers — three, not two
- verified:    0.75–1.00
- indicative:  0.50–0.75  ← commonly omitted in external docs
- speculative: 0.30–0.50
All three enforced by biophotonIntegrity.assert.ts invariant 4.

## biophotonIntegrity.assert.ts
Manually invoked script (`pnpm --filter @workspace/cell-os run test:biophoton`), NOT automatic compile-time enforcement. Must be wired into CI to be automatic.

## "97/100 alignment score"
A one-time qualitative review rating from BIOPHOTON_RESEARCH.md. Not a computed runtime metric; not tracked by manifoldMetrics.ts.
