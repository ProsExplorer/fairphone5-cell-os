# Cell OS — Architect Audit Report
## Adversarial Accuracy + Security Review of `ARCHITECT_REPORT_2026-06-10.md`

> **Date**: June 10, 2026  
> **Tool**: `architect` subagent — `responsibility: "evaluate_task"`  
> **Scope**: Critical second-pass adversarial review of prior architect report for factual errors, overstatements, understatements, and security gaps  
> **Files analyzed**: `ARCHITECT_REPORT_2026-06-10.md`, `substrate.ts`, `mappings.ts`, `qiMatrix.ts`

---

## Overall Verdict

**PARTIALLY FIT** — the prior architect report is mostly accurate on tensor math and mappings but contains one concrete mapping error and materially understates Phase 1 security risk.

**Must correct before implementation begins:**
1. Fix duplicate-link error (`vesicles→binder-ipc` already exists — do not add again)
2. Replace "Phase 1 has no security concerns" with an explicit Phase 1 threat model and controls
3. Add mandatory auth/authz + SSRF/DoS hardening requirements to Phase 2 acceptance criteria

---

## Accuracy Findings

| # | Claim | Verdict | Detail |
|---|---|---|---|
| 1 | Tensor metrics table (17 nodes, 40 links, 11 biophoton, 33 QI, 8×3×11, Fredholm −2) | **CORRECT** | Source counts confirmed: `SUBSTRATE_NODES`=17, `ORGANELLE_SUBSTRATE_LINKS`=40, `BIOPHOTON_LINKS`=11, `QI_INTERSECTIONS`=33, axes 8×3×11=264, organelles=15, Fredholm=15−17=−2 |
| 2 | Drift item 1: `kryo670` incoming-link count is 4 (not 2) | **CORRECT** | `substrateId:"kryo670"` appears exactly 4 times in `ORGANELLE_SUBSTRATE_LINKS` in `mappings.ts` |
| 3 | Drift item 2: Appendix A5 collision IDs — `qi-ups-affect-cellular` (cytoplasm×affect×cellular) and `qi-gapjunction-perception-cellular` (membrane×perception×cellular) | **CORRECT** | Both IDs verified present in `qiMatrix.ts`. Exactly two multi-occupancy triples exist: `cytoplasm\|affect\|cellular` and `membrane\|perception\|cellular`. No other collisions were missed. |
| 4 | Drift item 3: `types.ts` comment reads "Current count: 30" (should be 33) | **CORRECT AND GROUNDED** | `qiMatrix.ts` exports 33 intersections; the stale comment in `types.ts` is a genuine drift |
| 5 | Proposed new QI intersections do not currently exist; axis values are valid | **PARTIALLY CORRECT** | All three proposed IDs (`qi-secretion-expression-textual`, `qi-exocytosis-expression-organic`, `qi-document-perception-textual`) are genuinely new. Axis values are valid against `QI_AXES` (`golgi`, `membrane`, `perception`/`expression`, `textual`/`organic`). **Caveat**: `QI_AXES.zones` uses `"golgi"` not `"golgi-apparatus"` — the report correctly used `"golgi"` in the QI proposals but must not cross-contaminate with the organelle ID `"golgi-apparatus"` used in substrate links. |
| 6 | Proposed new biophoton links (`endoplasmic-reticulum→vesicles` and `vesicles→cell-membrane`) do not currently exist | **CORRECT** | Neither link exists today; both organelle IDs are in the frozen 15-ID set |
| 7 | Proposed new substrate links: `golgi-apparatus→bionic-libc` (new) and `vesicles→binder-ipc` (new) | **⚠ INCORRECT — ONE ALREADY EXISTS** | `vesicles→binder-ipc` is already present in `mappings.ts` (the "cargo packet IS the vesicle" link, relevance=0.97). Only `golgi-apparatus→bionic-libc` is genuinely new. **Correction**: Phase 1 adds exactly 1 new substrate link (not 2). Post-add total = 41 links, not 42. |
| 8 | Density after Phase 1 substrate additions (42/255 = 16.5%) | **PARTIALLY CORRECT** | With the correct net +1 new link: 41/255 = 16.1%. Both 16.1% and 16.5% remain within the 10–25% healthy coupling range. The direction is correct; the arithmetic was based on a false premise. |
| 9 | Fredholm index remains −2 after all Phase 1 additions | **CORRECT** | The Fredholm index is `organelle_count − substrate_node_count = 15 − 17 = −2`. It is independent of link counts, biophoton counts, and QI counts. No new substrate nodes are proposed, so the index does not change. |
| 10 | Browser-native PDF generation has "no security concerns" | **INCORRECT — OVERSTATED** | See Security Findings below. Phase 1 carries data-leakage, DoS, and XSS risks that require explicit mitigations even without a backend. |
| 11 | Secretory pathway biology (ER→Golgi→Vesicles→Membrane = PDF synthesis pathway) | **PARTIALLY CORRECT** | Biologically reasonable. However, the Cell OS ER is already semantically mapped to WebView/Chromium/App Framework (a rendering/sandboxing analogue). Mapping PDF *synthesis* to the ER risks a semantic collision. **Correction**: Frame PDF synthesis as Golgi-heavy (packaging, formatting, addressing) and Vesicle-heavy (blob construction), with the ER contribution limited to its existing role (rendering environment). The secretory pathway framing survives with this refinement — just de-emphasize ER as the synthesis origin and emphasize it as the execution environment. |

---

## Security Findings

### Phase 1 — Browser-Native PDF Generation

**HIGH — Data leakage in generated PDFs**

The Cell OS manifold state (organelle data, QI intersection narratives, biophoton link weights, epigenome attention values) is currently static reference content with no user-specific data. However:
- If the epigenome (Zustand `useLearningStore`) grows to include session-identifiable data, PDFs generated from it could leak that data on download
- Generated PDFs are not encrypted and can be indexed, forwarded, or stored without the user's awareness

**Mitigation**: Define an explicit export schema — an allowlist of manifold fields that may appear in generated PDFs. Do not pass raw store state to the renderer; pass a sanitized export DTO. Establish this pattern at Phase 1 even while content is benign, so the boundary is structurally enforced before session data is added.

---

**MEDIUM — Client-side PDF import/parsing risks**

The report mentions a "document import" flow (endocytosis / `qi-document-perception-textual`). If a user can upload a PDF for parsing in the browser:
- Malformed PDFs can trigger DoS (memory exhaustion, infinite loops) in JavaScript PDF parsers (pdf.js, pdf-lib)
- Known parser CVEs exist for several PDF handling libraries
- PDF can embed JavaScript (in certain viewers); client-side renderers must disable JS execution

**Mitigation**: Enforce strict limits on import: max file size (recommend 5MB for client-side), max page count, max object count. Use pdf-lib (which does not execute embedded PDF JS) rather than pdf.js for parsing. If rendering imported PDFs visually, use an iframe-sandboxed PDF viewer, never render extracted content directly into the React tree without sanitization.

---

**MEDIUM — DOM XSS if extracted PDF text is rendered unsafely**

If text extracted from a PDF (via OCR or text layer extraction) is inserted into the DOM, it is a direct XSS vector.

**Mitigation**: Never use `dangerouslySetInnerHTML` with extracted PDF text. Treat all extracted text as untrusted user input. Pass through a sanitization function (DOMPurify or equivalent) before any DOM insertion.

---

**LOW–MEDIUM — Download abuse / filename spoofing**

Generated PDFs with user-controlled filenames (e.g., from organelle or QI title fields that appear in the filename) could be used to spoof `.exe`, `.html`, or other dangerous extensions via zero-width characters or Unicode tricks.

**Mitigation**: Normalize all PDF filenames to a safe ASCII slug before setting the `download` attribute. Use a `Content-Disposition: attachment` response header if served via api-server. Require a user gesture (button click) — never initiate downloads automatically.

---

### Phase 2 — api-server Stirling-PDF Proxy

**CRITICAL — No authentication or authorization design**

The current `api-server` artifact has no auth middleware. If `/api/pdf/*` endpoints are added and the app is deployed, they are publicly accessible. Any actor can submit arbitrary PDFs for processing against the Stirling-PDF backend.

**Mitigation**: Authentication is a prerequisite for Phase 2 deployment, not an optional enhancement. Options: Replit Auth / Clerk integration (already supported by Cell OS skills), API key header validation, or rate-limit-only if the service is intended as public. The acceptance criteria in the Phase 2 plan must include: "endpoint returns 401/403 without valid credentials."

---

**HIGH — SSRF controls are incomplete**

The report recommends "disable remote URL fetch features." This is necessary but insufficient:
- Stirling has multiple features that can trigger outbound HTTP requests beyond the explicit URL-to-PDF operation (embedded resource loading in HTML-to-PDF, remote font loading, external image references in documents)
- DNS rebinding: an attacker can register a domain that resolves to an internal IP after the proxy's DNS check
- Cloud metadata endpoints (169.254.169.254, 100.100.100.200) are SSRF targets that bypass hostname-level filtering

**Mitigation**:
1. Block all outbound egress from the Stirling-PDF container at the network level (egress firewall rule)
2. Do not rely solely on application-level feature flags — Stirling's config surface is large and version-dependent
3. If Stirling must fetch external resources, route via an explicit allowlist proxy with CIDR block for RFC 1918 + link-local ranges
4. Set `--cap-drop=ALL` and `--network=internal` on the Stirling Docker container

---

**HIGH — MIME type validation is insufficient as specified**

The report says "MIME type validation before forwarding." The client-supplied `Content-Type` header is untrusted input. A malicious actor sends `Content-Type: application/pdf` with a file that is actually a PostScript document, an SVG, or a PE binary.

**Mitigation**: Validate by magic bytes (file signature), not by client-supplied MIME type. For PDFs: verify the file begins with `%PDF-`. For images submitted to OCR: verify PNG/JPEG/TIFF headers. Reject anything that does not match expected magic. Consider running ClamAV or a similar scanner for uploaded files before forwarding to Stirling.

---

**HIGH — DoS vectors not addressed**

The report's Phase 2 acceptance criteria mention "upload limits" but not:
- **Decompression bombs**: a 1KB PDF file can expand to gigabytes via nested flate streams
- **Object bombs**: a PDF with 10M indirect objects can consume all available memory
- **Pathological LibreOffice rendering**: certain document formats (DOCX with complex macros, OLE objects) can loop indefinitely
- **Concurrency**: without a job queue and concurrency cap, 10 simultaneous large-PDF requests can exhaust the Stirling container

**Mitigation**:
1. Set file size limit at the proxy layer before Stirling sees the file (recommend 20MB hard cap)
2. Set Ghostscript memory limit: `-dMaxTotalMemory` / Docker container memory limit
3. Set per-request timeout at the proxy (recommend 60s hard kill for any Stirling operation)
4. Deploy Stirling with a job queue (e.g., queue depth = 5, reject at overflow with 429)
5. Consider PDF pre-screening with qpdf's `--check` before forwarding

---

**MEDIUM — Admin/actuator endpoint exposure**

Stirling-PDF is a Spring Boot application. It exposes:
- `/api-docs` (Swagger UI — full API documentation + test console)
- `/actuator/*` (Spring Boot actuator: health, metrics, env, heap dump, thread dump)
- `/api/v1/misc/*` (miscellaneous admin operations)

If the api-server proxy uses a wildcard forward (`/api/pdf/*` → Stirling `/*`), these endpoints become accessible.

**Mitigation**: The proxy must use an **explicit allowlist** of forwarded paths — only the specific Stirling endpoints needed (e.g., `/api/v1/general/merge-pdfs`, `/api/v1/misc/compress-pdf`) are proxied. All other paths return 404 at the proxy level without forwarding.

---

**MEDIUM — LibreOffice macro execution**

Stirling uses LibreOffice for document format conversion (DOCX→PDF, ODT→PDF, etc.). LibreOffice has a macro execution subsystem (Basic macros, Python macros). A malicious document with an embedded macro can execute arbitrary code in the LibreOffice process.

**Mitigation**:
1. Run LibreOffice with `--headless --noevent --nologo --norestore --invisible` — macros should not execute in headless mode by default
2. Set `MacroSecurityLevel=4` (block all macros) in the LibreOffice user profile
3. Run LibreOffice in a separate unprivileged container with no network access and read-only filesystem (except a dedicated scratch volume)
4. If possible, avoid accepting DOCX/ODT input entirely in the first version — restrict to PDF-in, PDF-out operations

---

**HIGH — Ghostscript PostScript execution**

Ghostscript is Turing-complete via PostScript. A malicious PDF containing an embedded PostScript stream can execute arbitrary code if Ghostscript's `-dSAFER` mode is not enabled. Ghostscript has an extensive CVE history for RCE via crafted PDF/PS files (CVE-2018-16509, CVE-2023-28879, and many others).

**Mitigation**:
1. Confirm Stirling's Ghostscript invocation uses `-dSAFER -dNOPROMPT -dBATCH -dNOPAUSE` flags — `-dSAFER` restricts file system access; `-dNOPROMPT` prevents interactive prompts that could be scripted
2. Keep Ghostscript updated — the RCE CVE rate for Ghostscript is high and patches are frequent
3. Run Ghostscript in a seccomp-confined container (the Stirling Docker image should already provide this, but verify)
4. Set `--cap-drop=ALL --security-opt=no-new-privileges:true` on the Stirling container

---

### Supply Chain

**INFO — Package choice unresolved; SCA required before adoption**

The report proposes `@react-pdf/renderer` or `pdf-lib` without choosing. Key differences:

| | `@react-pdf/renderer` | `pdf-lib` |
|---|---|---|
| Footprint | Large (fonts, yoga layout engine, React renderer) | Small (pure TS, no external layout engine) |
| Use case | Declarative layout (React components → PDF) | Programmatic PDF construction / modification |
| Browser safety | No PDF JS execution; outputs PDF blobs | No PDF JS execution; outputs PDF blobs |
| Dependency depth | Deep (yoga-layout, @react-pdf/font, etc.) | Shallow |
| CVE history | Not independently verifiable from repo alone | Not independently verifiable from repo alone |

**Recommendation**: Prefer `pdf-lib` for the Cell OS report generation use case (structured data export, not complex visual layout). Its smaller footprint and lower dependency depth reduce supply chain surface. Run `pnpm audit` and/or Snyk after installation. Pin to an explicit version in `package.json`.

---

## Corrections Required in ARCHITECT_REPORT_2026-06-10.md

| Section | Issue | Required Correction |
|---|---|---|
| Phase 1 — Proposed substrate links | Claims `vesicles→binder-ipc` is new | Remove this link from Phase 1 proposal. Only `golgi-apparatus→bionic-libc` is new. Post-add total = 41 links, density = 16.1%. |
| Phase 1 — Security claim | "no security concerns" | Replace with explicit Phase 1 threat model: data-leakage schema boundary, import size/type limits, XSS sanitization requirement, filename normalization |
| Phase 2 — Acceptance criteria | Missing auth, incomplete SSRF, missing DoS | Add: authentication prerequisite; magic-byte validation; file size + timeout + queue-depth limits; Ghostscript `-dSAFER` verification; endpoint allowlist; LibreOffice macro lockdown |
| Secretory pathway / ER analogy | ER as PDF synthesis origin conflicts with existing ER → WebView mapping | Reframe: ER is the execution environment (existing meaning preserved); Golgi is the formatting/addressing step; Vesicles carry the blob. De-emphasize ER as the synthesis origin. |

---

*Generated by the Cell OS architect subagent (adversarial second-pass). Source files analyzed: `ARCHITECT_REPORT_2026-06-10.md`, `substrate.ts`, `mappings.ts`, `qiMatrix.ts`.*
