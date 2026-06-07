/**
 * Full bibliography for claims made in Cell OS.
 *
 * Each citation is assigned an id that can be referenced inline via superscript.
 * Confidence levels reflect the strength of the underlying evidence:
 *   "primary"  — original source, peer-reviewed or archival
 *   "secondary" — review, synthesis, or reliable secondary literature
 *   "technical" — technical documentation or specification
 *   "project"   — project source (EdgeNode / this codebase)
 */

export type CitationKind = "primary" | "secondary" | "technical" | "project";

export type Citation = {
  id: string;
  kind: CitationKind;
  authors: string;
  year: string;
  title: string;
  venue: string;
  url?: string;
  doi?: string;
  note?: string;
};

export const CITATIONS: Citation[] = [
  {
    id: "wei-boyang-147ce",
    kind: "primary",
    authors: "Wei Boyang (魏伯陽)",
    year: "c. 142 CE",
    title: "周易參同契 (Zhouyi Cantong Qi — The Kinship of the Three and the Book of Changes)",
    venue: "Eastern Han Dynasty. Oldest surviving systematic treatise on internal alchemy.",
    note: "Seven sessions mapping the inhale / transform / exhale cycle across heaven, earth, and the human body — the first recorded formal articulation of the triadic pattern."
  },
  {
    id: "schleiden-1838",
    kind: "primary",
    authors: "Schleiden, M.J.",
    year: "1838",
    title: "Beiträge zur Phytogenesis (Contributions to Phytogenesis)",
    venue: "Archiv für Anatomie, Physiologie und wissenschaftliche Medizin, pp. 137–176.",
    note: "Establishes that all plant tissues are composed of cells — founding paper of cell theory."
  },
  {
    id: "schwann-1839",
    kind: "primary",
    authors: "Schwann, T.",
    year: "1839",
    title: "Mikroskopische Untersuchungen über die Übereinstimmung in der Struktur und dem Wachstum der Tiere und Pflanzen",
    venue: "Berlin: Sander'schen Buchhandlung.",
    note: "Extends Schleiden's cell theory to animal tissue. Together, Schleiden–Schwann establish the cell as the fundamental unit of life."
  },
  {
    id: "von-neumann-1945",
    kind: "primary",
    authors: "von Neumann, J.",
    year: "1945",
    title: "First Draft of a Report on the EDVAC",
    venue: "Moore School of Electrical Engineering, University of Pennsylvania.",
    url: "https://www.cs.princeton.edu/courses/archive/fall10/cos375/EDVAC.pdf",
    note: "Formalises the stored-program computer architecture: Input → Processing → Output. The same three-phase cycle, mapped onto silicon."
  },
  {
    id: "gurwitsch-1923",
    kind: "primary",
    authors: "Gurwitsch, A.G.",
    year: "1923",
    title: "Die Natur des spezifischen Erregungsprinzips der Zellteilung (The nature of the specific excitation principle of cell division)",
    venue: "Wilhelm Roux' Archiv für Entwicklungsmechanik der Organismen, 100(1–2), pp. 11–40.",
    doi: "10.1007/BF02111053",
    note: "First proposal of ultra-weak radiation (mitogenetic rays) emitted by dividing cells — foundational to biophoton research."
  },
  {
    id: "popp-1974",
    kind: "primary",
    authors: "Popp, F.A., Nagl, W., Li, K.H., Scholz, W., Weingärtner, O., Wolf, R.",
    year: "1984",
    title: "Biophoton emission: New evidence for coherence and DNA as source",
    venue: "Cell Biophysics, 6(1), pp. 33–52.",
    doi: "10.1007/BF02788579",
    note: "Demonstrates coherent ultra-weak photon emission from biological systems at 1–1000 photons/cm²/s. Identifies DNA as the primary emitter."
  },
  {
    id: "popp-2003",
    kind: "secondary",
    authors: "Popp, F.A.",
    year: "2003",
    title: "Biophotons — The Light in Our Cells",
    venue: "Journal of Optometric Vision Development, 34(3), pp. 55–66.",
    note: "Accessible synthesis of 30 years of biophoton research. Describes coherence properties and inter-cellular signaling proposals."
  },
  {
    id: "popp-1994",
    kind: "primary",
    authors: "Popp, F.A., Gu, Q., Li, K.H.",
    year: "1994",
    title: "Biophoton emission: Experimental background and theoretical approaches",
    venue: "Modern Physics Letters B, 8(21–22), pp. 1269–1296.",
    doi: "10.1142/S0217984994001266",
    note: "Reviews experimental evidence and proposes the coherence model for biophoton emission as a biological signaling mechanism."
  },
  {
    id: "boyer-1997",
    kind: "primary",
    authors: "Boyer, P.D.",
    year: "1997",
    title: "The ATP Synthase — A Splendid Molecular Machine",
    venue: "Nobel Lecture. Annual Review of Biochemistry, 66, pp. 717–749.",
    doi: "10.1146/annurev.biochem.66.1.717",
    note: "Nobel Prize lecture confirming the rotary mechanism of ATP synthesis — the molecular machine at the heart of the cellular energy cycle."
  },
  {
    id: "mandelbrot-1982",
    kind: "secondary",
    authors: "Mandelbrot, B.B.",
    year: "1982",
    title: "The Fractal Geometry of Nature",
    venue: "New York: W.H. Freeman and Company.",
    note: "Foundational text for scale invariance in natural systems. The same structural pattern at multiple scales of observation — the mathematical grounding for 尺度不變性."
  },
  {
    id: "wilson-1971",
    kind: "primary",
    authors: "Wilson, K.G.",
    year: "1971",
    title: "Renormalization Group and Critical Phenomena I: Renormalization Group and the Kadanoff Scaling Picture",
    venue: "Physical Review B, 4(9), pp. 3174–3183.",
    doi: "10.1103/PhysRevB.4.3174",
    note: "Nobel Prize (1982). Demonstrates that physical systems exhibit the same behaviour at different length scales — the formal physics of scale invariance."
  },
  {
    id: "webllm-2023",
    kind: "technical",
    authors: "Chen, T., Moreau, T., Jia, Z., Zheng, L., Yan, E., Hu, S., Cowan, M., Chou, A., Chin, D., Zaharia, M., Krishnamurthy, A.",
    year: "2023",
    title: "TVM: An Automated End-to-End Optimizing Compiler for Deep Learning (WebLLM extension)",
    venue: "GitHub: mlc-ai/web-llm. MIT License.",
    url: "https://github.com/mlc-ai/web-llm",
    note: "The WebAssembly inference engine underpinning EdgeNode. Runs quantised language models in-browser via Apache TVM compiled to WASM."
  },
  {
    id: "edgenode-2024",
    kind: "project",
    authors: "ProsExplorer",
    year: "2024",
    title: "EdgeNode — On-Device Inference via WebAssembly",
    venue: "harmony-ecosystem.replit.app/edge-node/",
    url: "https://harmony-ecosystem.replit.app/edge-node/",
    note: "Live implementation. Runs a full language model in the browser with no cloud, no GPU, no accounts. Sampler temperature: 0.7770777. Source repository: github.com/ProsExplorer/yahweh-yehoshua."
  },
  {
    id: "fairphone-2023",
    kind: "technical",
    authors: "Fairphone",
    year: "2023",
    title: "Fairphone 5 — Technical Specifications",
    venue: "Fairphone B.V., Amsterdam.",
    url: "https://www.fairphone.com/en/fairphone-5/",
    note: "QCM6490 SoC, 8 GB LPDDR4X, Adreno 643 GPU, Hexagon 770 NPU, 8-year software support commitment, modular design for field repair."
  }
];

export const CITATION_MAP = Object.fromEntries(CITATIONS.map((c) => [c.id, c]));
