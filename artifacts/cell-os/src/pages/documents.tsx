import { useMemo, useState } from "react";
import { Link } from "wouter";
import { computeManifoldMetrics } from "@/domain/content/manifoldMetrics";
import { CELL_MAPPINGS } from "@/domain/content/organelles";
import { QI_INTERSECTIONS } from "@/domain/content/qiMatrix";
import { BIOPHOTON_LINKS, ORGANELLE_SUBSTRATE_LINKS } from "@/domain/content/mappings";
import { SUBSTRATE_NODES } from "@/domain/content/substrate";

const BG = "#020817";
const SURFACE = "#0f172a";
const BORDER = "#1e293b";
const TEXT = "#e2e8f0";
const MUTED = "#64748b";
const DIM = "#475569";
const ACCENT_P = "#7dd3fc";
const ACCENT_A = "#c4b5fd";
const ACCENT_E = "#86efac";
const ACCENT_GOLGI = "#f472b6";

type ReportSection = "manifold" | "organelles" | "qi" | "biophoton";

const SECTIONS: { id: ReportSection; label: string; glyph: string; color: string }[] = [
  { id: "manifold",   label: "Manifold Metrics",      glyph: "氣", color: ACCENT_P },
  { id: "organelles", label: "Organelle Mapping",     glyph: "核", color: ACCENT_A },
  { id: "qi",         label: "QI Intersections",      glyph: "道", color: ACCENT_GOLGI },
  { id: "biophoton",  label: "Biophoton Links",       glyph: "光", color: ACCENT_E },
];

function fmt(n: number, decimals = 1) {
  return (n * 100).toFixed(decimals) + "%";
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateReport(
  metrics: ReturnType<typeof computeManifoldMetrics>,
  sections: Set<ReportSection>
) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const PAGE_W = 210;
  const MARGIN = 18;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  const COL_BG   = [9, 11, 19] as [number, number, number];
  const COL_HDR  = [15, 23, 42] as [number, number, number];
  const COL_TEXT = [226, 232, 240] as [number, number, number];
  const COL_MUTED= [100, 116, 139] as [number, number, number];
  const COL_P    = [125, 211, 252] as [number, number, number];
  const COL_A    = [196, 181, 253] as [number, number, number];
  const COL_E    = [134, 239, 172] as [number, number, number];
  const COL_G    = [244, 114, 182] as [number, number, number];

  let y = MARGIN;

  const fillPage = () => {
    doc.setFillColor(...COL_BG);
    doc.rect(0, 0, PAGE_W, 297, "F");
  };

  const addSectionHeader = (title: string, color: [number, number, number]) => {
    if (y > 250) { doc.addPage(); fillPage(); y = MARGIN; }
    doc.setFontSize(8);
    doc.setTextColor(...COL_MUTED);
    doc.text("─".repeat(60), MARGIN, y);
    y += 5;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(title, MARGIN, y);
    y += 7;
    doc.setFont("helvetica", "normal");
  };

  fillPage();

  doc.setFontSize(7);
  doc.setTextColor(...COL_MUTED);
  doc.text("CELL OS · MANIFOLD STATE REPORT", MARGIN, y);
  y += 5;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COL_TEXT);
  doc.text("Cell OS", MARGIN, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COL_MUTED);
  doc.text(`Generated ${dateStr}  ·  P→A→E Manifold  ·  Fairphone 5 AI Substrate`, MARGIN, y);
  y += 5;

  doc.setFontSize(8);
  doc.setTextColor(...COL_P);
  doc.text(
    `${metrics.couplingTensorLinks} organelle-substrate links  ·  ` +
    `${metrics.qiTensorLinks} QI intersections  ·  ` +
    `${metrics.biophotonLinks} biophoton links  ·  ` +
    `Fredholm index −2`,
    MARGIN, y
  );
  y += 10;

  if (sections.has("manifold")) {
    addSectionHeader("§1  Manifold Health Metrics", COL_P);
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      theme: "plain",
      headStyles: { fillColor: COL_HDR, textColor: COL_TEXT, fontSize: 7, fontStyle: "bold" },
      bodyStyles: { fillColor: COL_BG, textColor: COL_TEXT, fontSize: 7 },
      alternateRowStyles: { fillColor: [12, 17, 30] as [number, number, number] },
      head: [["Metric", "Value", "Space", "Health"]],
      body: [
        ["Coupling Tensor Density", fmt(metrics.couplingTensorDensity), `${metrics.couplingTensorLinks} / ${metrics.couplingTensorSpace}`, "healthy"],
        ["QI Tensor Density",       fmt(metrics.qiTensorDensity),       `${metrics.qiTensorLinks} / ${metrics.qiTensorSpace}`,       "warn-high"],
        ["Biophoton Coverage",      fmt(metrics.biophotonCoverage, 2),  `${metrics.biophotonLinks} / ${metrics.biophotonSpace}`,      "warn-high"],
        ["Mean Zone Confidence",    metrics.meanZoneConfidence.toFixed(3), "σ̄", "healthy"],
        ["Fredholm Index",          "−2",  "15 − 17", "cap"],
        ["Organelles (frozen)",     "15",  "—", "—"],
        ["Substrate Nodes",         String(SUBSTRATE_NODES.length), "—", "—"],
      ],
      columnStyles: { 0: { cellWidth: 55 }, 1: { cellWidth: 25 }, 2: { cellWidth: 35 }, 3: { cellWidth: 25 } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  if (sections.has("organelles")) {
    addSectionHeader("§2  Organelle → OS Feature Mapping", COL_A);
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      theme: "plain",
      headStyles: { fillColor: COL_HDR, textColor: COL_TEXT, fontSize: 7, fontStyle: "bold" },
      bodyStyles: { fillColor: COL_BG, textColor: COL_TEXT, fontSize: 7 },
      alternateRowStyles: { fillColor: [12, 17, 30] as [number, number, number] },
      head: [["#", "Organelle", "Android OS Feature"]],
      body: CELL_MAPPINGS.map((o, i) => [String(i + 1), o.name, o.osFeature]),
      columnStyles: { 0: { cellWidth: 8 }, 1: { cellWidth: 42 }, 2: { cellWidth: CONTENT_W - 50 } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    addSectionHeader("§2b  Organelle-Substrate Links (41 total)", COL_A);
    const linkRows = ORGANELLE_SUBSTRATE_LINKS.map(l => [l.organelleId, l.substrateId, l.relevance != null ? l.relevance.toFixed(2) : "—"]);
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      theme: "plain",
      headStyles: { fillColor: COL_HDR, textColor: COL_TEXT, fontSize: 6.5, fontStyle: "bold" },
      bodyStyles: { fillColor: COL_BG, textColor: COL_TEXT, fontSize: 6.5 },
      alternateRowStyles: { fillColor: [12, 17, 30] as [number, number, number] },
      head: [["Organelle", "Substrate", "Relevance"]],
      body: linkRows,
      columnStyles: { 0: { cellWidth: 55 }, 1: { cellWidth: 45 }, 2: { cellWidth: 20 } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  if (sections.has("qi")) {
    addSectionHeader("§3  QI Tensor Intersections (36 of 264)", COL_G);
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      theme: "plain",
      headStyles: { fillColor: COL_HDR, textColor: COL_TEXT, fontSize: 6.5, fontStyle: "bold" },
      bodyStyles: { fillColor: COL_BG, textColor: COL_TEXT, fontSize: 6.5 },
      alternateRowStyles: { fillColor: [12, 17, 30] as [number, number, number] },
      head: [["Zone", "Phase", "Scale", "Title"]],
      body: QI_INTERSECTIONS.map(q => [q.zoneId, q.phaseId, q.scaleId, q.title]),
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 20 }, 2: { cellWidth: 22 }, 3: { cellWidth: CONTENT_W - 72 } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  if (sections.has("biophoton")) {
    addSectionHeader("§4  Biophoton Attention Map (13 links)", COL_E);
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      theme: "plain",
      headStyles: { fillColor: COL_HDR, textColor: COL_TEXT, fontSize: 6.5, fontStyle: "bold" },
      bodyStyles: { fillColor: COL_BG, textColor: COL_TEXT, fontSize: 6.5 },
      alternateRowStyles: { fillColor: [12, 17, 30] as [number, number, number] },
      head: [["Source", "→ Target", "σ", "IPC", "Attention"]],
      body: BIOPHOTON_LINKS.map(b => [
        b.sourceOrganelleId,
        b.targetOrganelleId,
        b.couplingSigma?.toFixed(1) ?? "—",
        b.ipcMechanism ?? "—",
        b.attentionWeight?.toFixed(2) ?? "—",
      ]),
      columnStyles: { 0: { cellWidth: 38 }, 1: { cellWidth: 38 }, 2: { cellWidth: 12 }, 3: { cellWidth: 28 }, 4: { cellWidth: 20 } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(6.5);
    doc.setTextColor(...COL_MUTED);
    doc.text(`Cell OS · Manifold State Report · ${dateStr} · p. ${i} of ${pageCount}`, MARGIN, 291);
  }

  const filename = `cell-os-manifold-${dateStr}.pdf`;
  doc.save(filename);
}

export default function Documents() {
  const metrics = useMemo(() => computeManifoldMetrics(), []);
  const [selected, setSelected] = useState<Set<ReportSection>>(
    new Set(["manifold", "organelles", "qi", "biophoton"] as ReportSection[])
  );
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggle = (id: ReportSection) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleGenerate = async () => {
    if (selected.size === 0) return;
    setGenerating(true);
    setGenerated(false);
    try {
      await generateReport(metrics, selected);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${BORDER}`, padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" style={{ color: MUTED, textDecoration: "none", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
          ← Cell Explorer
        </Link>
        <span style={{ color: BORDER }}>|</span>
        <Link href="/metrics" style={{ color: MUTED, textDecoration: "none", fontSize: "0.8rem" }}>Metrics</Link>
        <Link href="/fractal" style={{ color: MUTED, textDecoration: "none", fontSize: "0.8rem" }}>Fractal</Link>
        <div style={{ marginLeft: "auto", fontSize: "0.7rem", color: DIM }}>
          {metrics.couplingTensorLinks} links · {metrics.qiTensorLinks} QI · {metrics.biophotonLinks} biophoton
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: DIM, marginBottom: "0.4rem" }}>
            document secretion · exocytosis pathway
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: TEXT, margin: "0 0 0.6rem" }}>
            Documents
          </h1>
          <p style={{ fontSize: "0.875rem", color: MUTED, maxWidth: "560px", lineHeight: 1.6, margin: 0 }}>
            The Cell reads its own genome and secretes a structured artifact. P→A→E at the textual scale:{" "}
            <span style={{ color: ACCENT_P }}>Golgi packages</span> →{" "}
            <span style={{ color: ACCENT_A }}>Vesicles carry</span> →{" "}
            <span style={{ color: ACCENT_E }}>Membrane releases</span>.
          </p>
        </div>

        {/* Secretory pathway diagram */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: "0.5rem", alignItems: "center", marginBottom: "2.5rem", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "1.25rem 1.5rem" }}>
          {[
            { phase: "P", label: "Perception", organ: "membrane-receptors", desc: "User action crosses the membrane", color: ACCENT_P },
            { phase: "A", label: "Affect",     organ: "Golgi apparatus",     desc: "Data assembled, addressed, packaged", color: ACCENT_A },
            { phase: "E", label: "Expression", organ: "vesicles → membrane", desc: "PDF released by exocytosis", color: ACCENT_E },
          ].flatMap((step, i, arr) => {
            const cell = (
              <div key={step.phase} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: step.color, lineHeight: 1 }}>{step.phase}</div>
                <div style={{ fontSize: "0.7rem", color: step.color, fontWeight: 600, marginTop: "0.2rem" }}>{step.label}</div>
                <div style={{ fontSize: "0.65rem", color: MUTED, marginTop: "0.25rem" }}>{step.organ}</div>
                <div style={{ fontSize: "0.65rem", color: DIM, marginTop: "0.15rem" }}>{step.desc}</div>
              </div>
            );
            return i < arr.length - 1
              ? [cell, <div key={`arrow-${i}`} style={{ textAlign: "center", color: DIM, fontSize: "1.1rem" }}>→</div>]
              : [cell];
          })}
        </div>

        {/* Section selector */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, marginBottom: "0.75rem" }}>
            Select report sections
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}>
            {SECTIONS.map(sec => {
              const on = selected.has(sec.id);
              return (
                <button
                  key={sec.id}
                  onClick={() => toggle(sec.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: on ? `${sec.color}11` : SURFACE,
                    border: `1px solid ${on ? sec.color + "55" : BORDER}`,
                    borderRadius: "8px",
                    cursor: "pointer", textAlign: "left",
                    transition: "all 0.15s",
                    color: TEXT,
                  }}
                >
                  <div style={{
                    width: "16px", height: "16px",
                    borderRadius: "3px",
                    border: `2px solid ${on ? sec.color : DIM}`,
                    background: on ? sec.color : "transparent",
                    flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {on && <span style={{ color: "#000", fontSize: "0.6rem", fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: "1rem", color: sec.color }}>{sec.glyph}</span>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: on ? TEXT : MUTED }}>{sec.label}</div>
                    <div style={{ fontSize: "0.65rem", color: DIM, marginTop: "0.1rem" }}>
                      {sec.id === "manifold"   && `${metrics.couplingTensorLinks} links · density ${fmt(metrics.couplingTensorDensity)}`}
                      {sec.id === "organelles" && `${CELL_MAPPINGS.length} organelles · ${ORGANELLE_SUBSTRATE_LINKS.length} links`}
                      {sec.id === "qi"         && `${QI_INTERSECTIONS.length} intersections · ${fmt(metrics.qiTensorDensity)} of tensor`}
                      {sec.id === "biophoton"  && `${BIOPHOTON_LINKS.length} directed links · ${fmt(metrics.biophotonCoverage, 2)}`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate button */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <button
            onClick={handleGenerate}
            disabled={generating || selected.size === 0}
            style={{
              padding: "0.75rem 1.75rem",
              background: generating ? DIM : selected.size === 0 ? BORDER : ACCENT_E,
              color: generating || selected.size === 0 ? MUTED : "#000",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: generating || selected.size === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {generating ? "Assembling…" : generated ? "✓ Secreted" : "Generate & Download PDF"}
          </button>
          {selected.size === 0 && (
            <span style={{ fontSize: "0.75rem", color: DIM }}>Select at least one section</span>
          )}
          {generated && (
            <span style={{ fontSize: "0.75rem", color: ACCENT_E }}>PDF exocytosis complete ✓</span>
          )}
        </div>

        {/* Live tensor preview */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, marginBottom: "0.75rem" }}>
            Current manifold state — live from source arrays
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {[
              { label: "Coupling Tensor",  value: fmt(metrics.couplingTensorDensity), sub: `${metrics.couplingTensorLinks} / ${metrics.couplingTensorSpace}`,  color: ACCENT_P },
              { label: "QI Tensor",        value: fmt(metrics.qiTensorDensity),       sub: `${metrics.qiTensorLinks} / ${metrics.qiTensorSpace}`,              color: ACCENT_GOLGI },
              { label: "Biophoton Map",    value: fmt(metrics.biophotonCoverage, 2),  sub: `${metrics.biophotonLinks} directed links`,                         color: ACCENT_E },
              { label: "Zone Confidence",  value: metrics.meanZoneConfidence.toFixed(3), sub: "mean σ̄ across 8 zones",                                        color: ACCENT_A },
              { label: "Substrate Nodes",  value: String(SUBSTRATE_NODES.length),    sub: "Fredholm index = −2 (cap)",                                        color: "#94a3b8" },
              { label: "Organelles",       value: String(CELL_MAPPINGS.length),      sub: "frozen invariant",                                                 color: "#94a3b8" },
            ].map(m => (
              <div key={m.label} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "0.85rem 1rem" }}>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: m.color, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: "0.7rem", color: TEXT, marginTop: "0.25rem", fontWeight: 500 }}>{m.label}</div>
                <div style={{ fontSize: "0.62rem", color: DIM, marginTop: "0.1rem" }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div style={{ background: `${ACCENT_A}08`, border: `1px solid ${ACCENT_A}22`, borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: ACCENT_A, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Export schema — allowlist
          </div>
          <p style={{ fontSize: "0.75rem", color: MUTED, margin: 0, lineHeight: 1.6 }}>
            Reports contain only static domain data: organelle mappings, QI intersection titles (not full narratives),
            biophoton link pairs, and computed manifold metrics. Session state, epigenome weights, and learned attention values
            are not exported. Filenames are normalized to safe ASCII slugs.
          </p>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "0.65rem", color: DIM }}>
            Document Secretion · Cell OS · Secretory Pathway (ER → Golgi → Vesicles → Membrane)
          </div>
          <Link href="/fractal" style={{ fontSize: "0.75rem", color: MUTED, textDecoration: "none" }}>
            Fractal Map →
          </Link>
        </div>
      </div>
    </div>
  );
}
