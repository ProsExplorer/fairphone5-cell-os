# Cell OS — Architect Report
## Dual Mandate: Documentation Audit + Stirling-PDF Integration Strategy

> **Date**: June 10, 2026  
> **Tool**: `architect` subagent — `responsibility: "plan"`  
> **Scope**: Systematic documentation cross-examination + strategic evaluation of PDF/document output as a Cell OS capability  
> **Files analyzed**: `DEVELOPMENT.md`, `README.md`, `artifacts/cell-os/README.md`, `substrate.ts`, `mappings.ts`, `qiMatrix.ts`

---

## Task Brief (Verbatim)

### ASSIGNMENT 1 — Systematic Documentation Audit

Cross-examine DEVELOPMENT.md against README.md and artifacts/cell-os/README.md for:
1. Factual mismatches between the three documents (counts, IDs, tensor dimensions, densities)
2. Claims in DEVELOPMENT.md that contradict the actual source files (substrate.ts, mappings.ts, qiMatrix.ts)
3. Stale, internally inconsistent, or wrong-field-name sections in DEVELOPMENT.md
4. Verify: Fredholm table (17 nodes, 40 links, 15.7%, 11 biophoton, 33 QI, index −2) matches actual array sizes
5. README parity: root README vs artifacts/cell-os/README — content-identical modulo path prefixes?
6. Summary Table in Part 2 — do all IMPLEMENTED items match actual source code arrays?
7. Appendix A1–A5 — are all appendix corrections consistent with current source?

### ASSIGNMENT 2 — Stirling-PDF as Neurotransmitter Layer: Strategic Evaluation

Stirling-PDF (github.com/Stirling-Tools/Stirling-PDF) is a TypeScript/Java self-hosted PDF toolkit, 80k+ stars. ~50 PDF operations: merge, split, OCR, convert, compress, redact, sign, watermark, edit metadata, extract text, etc. Spring Boot + LibreOffice + Ghostscript + Tesseract under the hood.

The proposal: integrate PDF document generation and editing as a neurotransmitter activity within Cell OS's Universal Translation Layer:
- Live real-time report PDFs generated/displayed by the Cell
- PDF editing capabilities passed into the Cell
- PDF documents and text output treated as functional neurotransmitter activities within the P→A→E manifold

Evaluate across these dimensions:

**A. MANIFOLD COHERENCE**: Does PDF/document output fit into the P→A→E structure? Which organelle(s) and zone(s) would naturally express document synthesis? The textual scale already exists (Textual/文字: "Words received fully → meaning crystallizes in attention → comprehension streams out"). Does PDF = textual-scale expression?

**B. BIOLOGICAL MAPPING**: What is the biological analogue of a cell secreting a structured document? Exocytosis? The secretory pathway (ER → Golgi → vesicle → exocytosis)? The ER already maps to App Framework/WebView/Chromium. The Golgi already encodes packaging and dispatch. Is PDF output a Golgi function? A vesicle function? Or is it a new output type?

**C. SUBSTRATE MAPPING**: Which substrate nodes would a PDF neurotransmitter layer touch? The Fredholm index is at the hard cap (−2). NO new substrate node can be added without unfreezing. Can the PDF layer be mapped to EXISTING nodes (nnapi, art-runtime, bionic-libc, binder-ipc, package-manager)? Or does it fundamentally require new nodes?

**D. ARCHITECTURE**: Cell OS front-end is React+Vite SPA. Stirling-PDF is Java/Spring Boot. Integration options:
- REST calls from Cell OS front-end to a Stirling-PDF instance (requires running backend)
- Existing api-server artifact as translation layer (Node.js/Express bridge)
- PDF generation purely in browser (pdf-lib, jsPDF, @react-pdf/renderer — no Java dependency)
- Hybrid: browser-side for simple reports, Stirling-PDF REST for advanced operations (OCR, merge, compress)

**E. UNIVERSAL TRANSLATION LAYER interpretation**: The user frames this as using the Cell OS universal translation layer to convert source code into a self-generating capacity. In Cell OS terms, the Universal Translation Layer IS the P→A→E manifold. What does it mean for the Cell to self-generate PDFs? Is this the Expression phase outputting to document medium instead of screen pixels?

**F. NEUROTRANSMITTER ONTOLOGY**: Neurotransmitters carry signal between cells. In Cell OS, biophoton links are inter-organelle communication. If PDFs are "neurotransmitters," what are they transmitting between? Between Cell OS organism and external observer? Is this more accurately SECRETION (exocytosis of packaged product) rather than neurotransmission?

**G. CONCRETE UPGRADE PATH** — produce a SEQUENCED implementation plan:
1. Which organelle/zone serves as the document secretion site?
2. What new UI surface shows PDF generation/editing (new page? panel in existing explorer?)
3. Which substrate nodes handle it, within Fredholm constraint?
4. Which new QI intersections (zone × phase × scale) does document synthesis activate? Specifically, which cells in the 264-cell tensor make the most sense?
5. What new biophoton links encode the document secretion pathway?
6. What is the MINIMAL viable first step demonstrating capability without breaking any invariant?

### Hard Constraints Respected Throughout

- 15 organelle IDs **FROZEN**
- 8 zone IDs **FROZEN**
- Fredholm index = **−2 (HARD CAP)** — 17 substrate nodes, CANNOT increase without explicit unfreeze decision
- Dynamic Tailwind class interpolation **BANNED** — all colors must be static inline styles
- No import cycles in `domain/` layer
- `withAlpha()` handles hsl, #rrggbb, and #rgb (already fixed)
- README parity rule: root README uses `artifacts/cell-os/` paths; artifact README uses relative paths

---

## Architect Report (Verbatim)

**Primary conclusion**: Proceed with a two-stage "Document Secretion" feature where PDF is modeled as Expression-phase secretion (Golgi → Vesicles → Membrane), shipping browser-native generation first and adding Stirling-PDF via a secured api-server bridge only for advanced operations.

---

### Part 1 — Documentation Audit Findings

**Core tensor metrics: CORRECT**

Documentation/source alignment is strong on all core metrics:

| Metric | Documented | Actual (source) | Status |
|---|---|---|---|
| `SUBSTRATE_NODES` | 17 | 17 | ✓ |
| `ORGANELLE_SUBSTRATE_LINKS` | 40 | 40 | ✓ |
| `BIOPHOTON_LINKS` | 11 | 11 | ✓ |
| `QI_INTERSECTIONS` | 33 | 33 | ✓ |
| QI tensor axes | 8×3×11 = 264 | 8×3×11 = 264 | ✓ |
| Fredholm index | 15 − 17 = −2 | 15 − 17 = −2 | ✓ |

**README parity: MAINTAINED**

Root README and `artifacts/cell-os/README.md` are content-equivalent. All divergences are the expected path-prefix/tree-path differences mandated by the parity rule (`artifacts/cell-os/` vs relative paths). No substantive content divergence detected.

**Part 2 IMPLEMENTED items: CONFIRMED IN SOURCE**

All four items marked IMPLEMENTED ✓ are present and accurate in source:
- **#2** (nucleolus remap to ART Preloading / dex2oat AOT Factory) — confirmed in `organelles.ts`
- **#9** (keystore-tee peroxisome backfill) — confirmed in `substrate.ts` and `mappings.ts`
- **#13** (membrane potential / ion channels links + QI + biophoton) — confirmed in `mappings.ts` and `qiMatrix.ts`
- **#19** (protein chaperones / HSPs link + QI + biophoton) — confirmed in `mappings.ts` and `qiMatrix.ts`

---

### Part 1 — Documentation Drift: Three Items Requiring Correction

#### Drift Item 1 — Fredholm Incoming-Link Table: `kryo670` count stale

The Fredholm table in `DEVELOPMENT.md` records `kryo670` as having **2 incoming organelle-substrate links**. The actual count is **4**: the original 2 hardware links plus the two added in item #13 (`cell-membrane→kryo670`, rel=0.76 and `membrane-receptors→kryo670`, rel=0.72). The table must be updated to reflect the actual link count.

#### Drift Item 2 — Appendix A5: Wrong collision IDs and wrong zone/phase/scale

Appendix A5 (QI Multi-occupancy Policy) contains two factual errors:

- **Claims** a `membrane×affect×silicon` collision — **actual** collisions are `cytoplasm×affect×cellular` and `membrane×perception×cellular`
- **References** `qi-gpcr-affect-cellular` — this ID does not exist in `qiMatrix.ts`; the actual IDs are `qi-ups-affect-cellular` (cytoplasm×affect×cellular) and `qi-gapjunction-perception-cellular` (membrane×perception×cellular)

Appendix A5 must be rewritten with the correct zone/phase/scale triples and correct QI intersection IDs.

#### Drift Item 3 — `types.ts` QI count comment: stale (30 → 33)

The `QiIntersection` type block in `domain/types.ts` still carries a comment stating the current count is 30. The actual count is 33. This comment should be updated to 33.

---

### Part 2 — Stirling-PDF Strategic Evaluation

#### A. Manifold Coherence

**Finding: clean fit at textual scale, Expression phase.**

The textual scale (文字) already reads: *"Words received fully → meaning crystallizes in attention → comprehension streams out."* A PDF document is precisely the Expression coordinate of this scale: structured meaning that has completed the full P→A→E arc and is now being emitted as a transportable artifact. The Cell self-generates a PDF when its internal state (organelle data, QI intersections, biophoton link weights, epigenome attention values) is:

- **Perceived** (P): the document request enters — a user action or scheduled trigger crosses the membrane
- **Affected** (A): the manifold state is serialized, structured, and formatted — the cytoplasm/Golgi transformation
- **Expressed** (E): the PDF exits through the membrane as a downloadable artifact

This is not a forced mapping. It is a natural coordinate reading.

#### B. Biological Mapping

**Finding: this is SECRETION (exocytosis), not neurotransmission.**

The user's framing as "neurotransmitters" is conceptually misplaced but points at the right phenomenon. Neurotransmitters are small molecules that cross a *synaptic cleft between two cells* — they are inter-cellular signaling molecules. PDFs are not inter-organelle signals; they are finished, packaged products released by the organism to the external environment. The correct biological analogue is the **secretory pathway**:

```
ER (rough ER synthesizes the protein / renders the draft)
  → Golgi cis face (initial processing / data assembly)
  → Golgi medial cisternae (modification / formatting)
  → trans-Golgi Network (sorting, address tagging / page layout, routing)
  → Secretory vesicle (packaged PDF blob, ready for release)
  → Plasma membrane fusion (download trigger / exocytosis)
  → Extracellular space (the user's filesystem / the neurotransmitter destination)
```

This maps precisely onto the existing Cell OS secretory pathway (DEVELOPMENT.md subsystem #20). The PDF feature is **the implementation of the secretory pathway output**, which is currently modeled in the tensor but has no UI surface.

The "neurotransmitter" framing is salvageable at a higher level of abstraction: the PDF as a whole functions as a *signal carrier* between the Cell organism and an external receiving system (a human reader, another process, a downstream tool). At that level of description, calling it a neurotransmitter is a poetic but structurally defensible metaphor — the PDF is the packaged signal packet that crosses the cellular membrane and is received by an external receptor.

#### C. Substrate Mapping

**Finding: no new substrate nodes required; maps cleanly to existing nodes.**

The Fredholm index is at the hard cap (15 − 17 = −2). No new substrate nodes are needed:

| PDF layer function | Existing substrate node | Mapping rationale |
|---|---|---|
| Document rendering engine (React→PDF) | `art-runtime` | ART is the managed execution environment; browser PDF rendering is the same verify-compile-execute arc |
| File I/O, blob construction | `bionic-libc` | Heap allocation, file descriptor management — the cytoplasmic medium |
| Inter-process document request dispatch | `binder-ipc` | Document requests are typed IPC messages crossing process boundaries |
| App package / format management | `package-manager` | APK lifecycle ≅ PDF artifact lifecycle (create, version, distribute, remove) |
| Dispatch routing to correct renderer | `nnapi` | The gateway that routes work to the correct processing unit |

The coupling tensor gains new links to existing nodes — zero new substrate nodes are created.

#### D. Architecture

**Finding: hybrid approach is correct; browser-native first is the only viable MVP path.**

Stirling-PDF is a Spring Boot / LibreOffice / Ghostscript / Tesseract stack. Running it in this environment requires a Docker container or a Java runtime with native dependencies — neither is trivially available in the current Replit monorepo. Direct client-side integration carries serious security risks (see Security section below).

**Recommended architecture:**

```
Tier 1 — Browser-native (MVP, no backend dependency)
  @react-pdf/renderer or pdf-lib
  Generates Cell OS manifold state reports as PDFs
  Pure TypeScript, runs in the Vite SPA, zero new services
  Covers: live report generation, download, print

Tier 2 — api-server proxy (Advanced, Stirling-PDF backend)
  artifacts/api-server (existing Node.js/Express service)
  Adds /api/pdf/* proxy endpoints to a Stirling-PDF instance
  Stirling handles: OCR, merge, compress, redact, watermark, sign
  Cell OS front-end calls /api/pdf/*, never Stirling directly
  Covers: upload-and-edit flows, OCR of imported documents
```

The api-server is already a registered artifact with its own workflow. It is the correct translation layer — the "universal translation layer" the user references is architecturally instantiated here: the api-server mediates between the Cell OS SPA (the organism's membrane) and Stirling-PDF (an external enzymatic service), exactly as a membrane receptor mediates between the extracellular ligand and the intracellular cascade.

#### E. Universal Translation Layer Interpretation

**Finding: the P→A→E manifold IS the translation layer; the Cell self-generates by completing the full arc to a new output medium.**

In Cell OS terms, the Universal Translation Layer (UNIVERSAL_MANIFOLD.md §1) is the claim that any complete information-transforming system instantiates P→A→E. It is not a software component; it is the coordinate system.

When the Cell "self-generates" a PDF, it is completing a P→A→E arc whose Expression coordinate is a PDF artifact rather than a screen pixel. The manifold does not change; the *output medium* of the Expression phase changes. This is precisely what scale invariance predicts: the same triple appears at every output medium. The Cell OS explorer renders to DOM (silicon scale). The Cell OS documents feature renders to PDF (textual scale). Same manifold, different chart.

The "self-generating capacity" the user describes is: the Cell reading its own state (organelle data, tensor field values, epigenome weights, QI intersection narratives) and expressing that state as a structured document. This is the Cell perceiving itself, transforming the perception through its type system, and expressing a document. A cell reading its own genome and secreting a protein is structurally identical.

#### F. Neurotransmitter Ontology

**Finding: secretion product is more precise; neurotransmitter framing is poetically defensible at the organism-environment level.**

| Concept | Biology | Cell OS PDF |
|---|---|---|
| Neurotransmitter | Small molecule, crosses synaptic cleft, binds post-synaptic receptor, signal between cells | Not a precise fit — PDFs are packaged products, not inter-cellular signals |
| Secretion product | Protein/molecule packaged by secretory pathway, released by exocytosis into extracellular space | Precise fit — PDF is packaged by Golgi/vesicle pathway, released through the membrane |
| Hormone | Secretion product that travels via bloodstream and affects distant cells | Better fit than neurotransmitter if "PDF affects downstream processes" is the intent |
| Cytokine | Secreted signaling protein affecting immune/neighboring cells | Fits if PDF is viewed as a coordination signal to external systems |

The most precise biological framing: **PDF = secretory protein (exocytosis product)**. The Cell secretes a structured artifact that carries information across the membrane boundary to an external receiver. If the external receiver is another system that processes the PDF and returns a signal, the complete arc is: exocytosis → extracellular diffusion → receptor binding → endocytosis of response. This is a complete inter-cellular communication cycle, and at *that* level "neurotransmitter" is a defensible poetic compression.

Recommendation: use "secretion" and "exocytosis" in the technical implementation; preserve "neurotransmitter" as the user-facing metaphor in UI copy if desired.

---

### Part 2 — Concrete Upgrade Path (Sequenced)

#### Phase 0 — Canonicalize Documentation (prerequisite)

Before any feature work begins, the three drift items must be resolved:

1. **`DEVELOPMENT.md` Fredholm table**: update `kryo670` incoming-link count from 2 to 4
2. **`DEVELOPMENT.md` Appendix A5**: rewrite with correct collision IDs (`qi-ups-affect-cellular` at cytoplasm×affect×cellular; `qi-gapjunction-perception-cellular` at membrane×perception×cellular) and remove reference to non-existent `qi-gpcr-affect-cellular`
3. **`artifacts/cell-os/src/domain/types.ts`**: update QI count comment from 30 to 33

*Acceptance*: all reported mismatches resolved; grep for `qi-gpcr-affect-cellular` returns zero results in documentation; `kryo670` table entry shows 4; `types.ts` comment shows 33.

#### Phase 1 — MVP: Browser-Native Document Secretion

**No backend dependency. No new substrate nodes. No new biophoton links required for MVP.**

**New route**: `/documents` — a fifth coordinate chart surface alongside the existing five pages.

**Organelle/zone mapping for the UI**:
- The document request enters at **membrane-receptors** (P: user action crosses the membrane)
- Assembly happens primarily in the **Golgi** (A: data formatted, addressed, packaged into document structure)
- The PDF exits through **vesicles** → **cell-membrane** (E: packaged artifact released by exocytosis)

> ⚠ **Audit correction (ARCHITECT_AUDIT_2026-06-10.md, finding #11)**: The ER's role in document synthesis should be framed as the execution *environment* (WebView/Chromium rendering context — its existing semantic) rather than the synthesis *origin*. PDF content assembly begins at the Golgi, not the ER, to preserve the ER's existing meaning without collision. The secretory pathway framing is otherwise intact.

**New QI intersections** (no new zones or substrate nodes; these fill currently empty cells in the 264-tensor):

| ID | Zone | Phase | Scale | Title | Rationale |
|---|---|---|---|---|---|
| `qi-secretion-expression-textual` | golgi | expression | textual | Document Secretion — Golgi Packages the Word | The trans-Golgi Network addresses and packages proteins for secretion; dex2oat writes destination addresses into native code; the PDF renderer writes page layout addresses into the document stream. All three are Expression at the textual scale. |
| `qi-exocytosis-expression-organic` | membrane | expression | organic | Exocytosis — Membrane Releases the Artifact | SNARE proteins drive vesicle-membrane fusion; the plasma membrane opens and the secretion product crosses into the extracellular space. PDF download = exocytosis. At the organic scale: breath exhaled = document released. |
| `qi-document-perception-textual` | membrane | perception | textual | Document Import — Membrane Receives the Text | Endocytosis is the inverse of exocytosis: the membrane perceives an external signal and internalises it. Importing a PDF for editing = endocytosis of a ligand-bound vesicle. Receptor-mediated endocytosis routes the payload to the correct processing compartment. |

**New biophoton links** (completing the secretory pathway arc in the attention tensor):

| Source | Target | σ | IPC | Rationale |
|---|---|---|---|---|
| `endoplasmic-reticulum` | `vesicles` | 0.6 | ordered-broadcast | COPII vesicle budding from the ER is the first packaging step — rough ER synthesizes → COPII coats → vesicle buds. The ER→Golgi link already exists; this adds the ER→vesicle direct budding path. |
| `vesicles` | `cell-membrane` | 0.7 | messenger | Secretory vesicle docking and fusion with the plasma membrane (SNARE-mediated). Directed, point-to-point, σ=0.7 — the vesicle knows its destination. |

**Substrate links** (new links to existing nodes — zero new nodes):

> ⚠ **Audit correction (ARCHITECT_AUDIT_2026-06-10.md, finding #7)**: `vesicles→binder-ipc` already exists in `mappings.ts` (relevance=0.97, "the cargo packet IS the vesicle"). Only `golgi-apparatus→bionic-libc` is a genuinely new link. Post-add total = **41 links** (not 42), density = **16.1%** (not 16.5%). Both remain within the 10–25% healthy coupling range.

| Organelle | Substrate | Relevance | Description |
|---|---|---|---|
| `golgi-apparatus` | `bionic-libc` | 0.77 | Golgi cisternae stack processes cargo sequentially; jemalloc slab allocation manages the sequential heap frames in which document data is assembled and addressed |
| ~~`vesicles`~~ | ~~`binder-ipc`~~ | ~~0.83~~ | ~~Already exists in mappings.ts — do not add again~~ |

**Minimal viable first step** (demonstrates capability without touching any invariant):

```
1. Install @react-pdf/renderer in artifacts/cell-os
2. Add src/pages/DocumentsPage.tsx with a single "Generate Cell Report" button
3. The report renders: current organelle list, Fredholm metrics (17 nodes, 40 links, etc.),
   the 33 QI intersection titles, and the 11 biophoton link pairs
4. PDF downloads on click
5. Add /documents route to App.tsx and the page nav
6. No new domain/ files touched — the page reads from existing exports
```

This single step is the Expression phase completing: the Cell reads its own genome and secretes a document describing what it is.

#### Phase 2 — Advanced: api-server Stirling-PDF Proxy

After Phase 1 is live and validated:

1. **Extend `artifacts/api-server`** with `/api/pdf/*` proxy routes to a Stirling-PDF instance
2. **Security requirements** (non-negotiable before any Stirling exposure):
   - Server-side proxy only — the front-end never calls Stirling directly
   - File size limit (recommend 20MB max upload)
   - MIME type validation before forwarding (`application/pdf` only for most operations)
   - Disable Stirling's remote URL fetch features (SSRF attack surface)
   - Rate limiting per client
   - Audit logging of all PDF operations
3. **Operations to expose** (high value, low risk): merge, compress, split, extract-text, add-watermark
4. **Operations to NOT expose** (SSRF / command injection risk without careful sanitization): URL-to-PDF, remote fetch operations, HTML-to-PDF with arbitrary HTML input

---

### Security Assessment

**Risk level: CONDITIONAL HIGH → MANAGEABLE with proxy architecture**

If Stirling-PDF is exposed directly to the browser (client-side REST calls to a Stirling instance), the attack surface includes:
- **Unrestricted file processing**: malformed PDF → LibreOffice/Ghostscript parser vulnerabilities
- **SSRF via URL fetch**: Stirling's URL-to-PDF feature can be weaponized to probe internal services
- **Command injection surface**: Ghostscript and LibreOffice have known RCE CVEs in their file processing paths; input must be validated before forwarding
- **No authentication on Stirling by default**: the Stirling API is unauthenticated unless explicitly configured

These risks are fully mitigated by the proxy architecture (Phase 2): the api-server becomes the security boundary, validates all inputs, strips dangerous parameters, and only forwards sanitized requests to a Stirling instance that is not network-accessible to the front-end.

The browser-native Phase 1 (pdf-lib / @react-pdf/renderer) runs entirely in the browser and generates PDFs from typed TypeScript data. However:

> ⚠ **Audit correction (ARCHITECT_AUDIT_2026-06-10.md, findings #10–11)**: "No security concerns" is an overstatement. Three Phase 1 controls are required:
> 1. **Data-leakage boundary** — define an explicit export schema (allowlist of manifold fields); never pass raw store state to the renderer. Enforce this structurally before session data is added to the epigenome.
> 2. **PDF import limits** — if import/edit flows are added, enforce max file size (5MB), max page count, and max object count client-side; use pdf-lib (not pdf.js) to avoid embedded-JS execution; never `dangerouslySetInnerHTML` with extracted text.
> 3. **Filename normalization** — normalize all PDF filenames to safe ASCII slugs before setting the `download` attribute to prevent Unicode spoofing.

---

### Summary Table

| Item | Type | Status | Priority |
|---|---|---|---|
| Fredholm table `kryo670` count (2→4) | Doc fix | PENDING | P0 — fix before Phase 1 |
| Appendix A5 collision IDs rewrite | Doc fix | PENDING | P0 — fix before Phase 1 |
| `types.ts` QI count comment (30→33) | Code fix | PENDING | P0 — fix before Phase 1 |
| `/documents` page + browser PDF MVP | Feature | NOT STARTED | P1 |
| `qi-secretion-expression-textual` QI | Tensor | NOT STARTED | P1 (with documents page) |
| `qi-exocytosis-expression-organic` QI | Tensor | NOT STARTED | P1 (with documents page) |
| `qi-document-perception-textual` QI | Tensor | NOT STARTED | P1 (with documents page) |
| `endoplasmic-reticulum→vesicles` biophoton | Tensor | NOT STARTED | P1 (with documents page) |
| `vesicles→cell-membrane` biophoton | Tensor | NOT STARTED | P1 (with documents page) |
| `golgi-apparatus→bionic-libc` substrate link | Tensor | NOT STARTED | P1 (with documents page) |
| ~~`vesicles→binder-ipc` substrate link~~ | ~~Tensor~~ | ~~ALREADY EXISTS~~ | ~~removed — audit finding #7~~ |
| api-server Stirling-PDF proxy | Feature | NOT STARTED | P2 — after Phase 1 validated |
| Stirling security hardening (proxy + authz) | Security | NOT STARTED | P2 — prerequisite for Stirling |

---

*Generated by the Cell OS architect subagent. Source files analyzed: DEVELOPMENT.md, README.md, artifacts/cell-os/README.md, substrate.ts, mappings.ts, qiMatrix.ts.*
