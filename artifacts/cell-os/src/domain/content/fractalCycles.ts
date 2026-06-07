import type { FractalCycle } from "@/domain/types";

/**
 * Fractal Cycles — the internal P→A→E cycle of each organelle zone.
 *
 * Scale invariance (尺度不變性) means the PERCEPTION → AFFECT → EXPRESSION
 * pattern exists at every level of the cell, not just at the whole-organism level.
 * Each zone contains its own complete triadic cycle. The fractal navigator
 * exposes this structure to a maximum depth of 2 to prevent UI regress.
 *
 * Depth 0: The whole cell (8 zones)
 * Depth 1: One zone's internal P→A→E (shown here)
 * Depth 2: One phase described at a specific scale (the scale narrative)
 */
export const FRACTAL_CYCLES: FractalCycle[] = [
  {
    zoneId: "nucleus",
    cycleTitle: "The Genome Expression Cycle",
    cycleDescription:
      "The nucleus does not simply store DNA — it actively reads, transcribes, and dispatches. Each gene activation is a complete P→A→E cycle within the cell's command center.",
    phases: [
      {
        id: "perception",
        title: "Gene Regulatory Signals Arrive",
        description:
          "Transcription factors, assembled in the cytoplasm, migrate to the nucleus and bind specific DNA sequences upstream of target genes. The nucleus perceives biochemical instructions — not as raw data, but as typed signals with precise binding affinities.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "Prompt tokenization — typed input arrives at the model boundary",
      },
      {
        id: "affect",
        title: "RNA Polymerase Transcribes",
        description:
          "RNA polymerase II unwinds the DNA double helix and synthesizes mRNA complementary to the template strand. This is affect: the stored pattern (DNA) is being read and transformed into a mobile copy (mRNA). Neither is consumed — both persist.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "HTA attention computation — stored weights activating in response to input",
      },
      {
        id: "expression",
        title: "mRNA Exits Through Nuclear Pores",
        description:
          "Mature mRNA, bearing the 5' cap and poly-A tail, is exported through nuclear pore complexes into the cytoplasm where ribosomes await. The nucleus's expression is the act of releasing a precise, addressed copy of its knowledge into the world.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "Token streaming — decoded output exits the inference layer to the display",
      },
    ],
  },

  {
    zoneId: "cytoplasm",
    cycleTitle: "The Signal Amplification Cycle",
    cycleDescription:
      "The cytoplasm is not passive medium — it is an active processing environment. Every signal that passes through the cytoplasm is evaluated, amplified, or attenuated before it reaches its target.",
    phases: [
      {
        id: "perception",
        title: "Signal Arrives from the Membrane",
        description:
          "A phosphorylated second messenger (cAMP, IP3, DAG) diffuses from the activated membrane receptor into the cytosol. The cytoplasm perceives the signal as a concentration gradient — not a binary event but a graded, spatial distribution of molecular intensity.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "NNAPI operator dispatch — signal arrives from the membrane partitioner",
      },
      {
        id: "affect",
        title: "Kinase Cascade Amplifies",
        description:
          "A single activated kinase phosphorylates hundreds of substrate proteins; each phosphorylated substrate activates hundreds more. The cytoplasm transforms a weak signal into a large-scale coordinated response — 10,000-fold amplification from a single receptor binding event. Affect here is not processing alone but multiplication.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "HVX SIMD — one instruction applied to 128 values in parallel",
      },
      {
        id: "expression",
        title: "Amplified Signal Reaches Organelle Targets",
        description:
          "The signal cascade terminates at target organelles: transcription factors reach the nucleus, motor proteins reach the cytoskeleton, channels open at the membrane. The cytoplasm's expression is coordinated multi-target delivery — not one message but the same message arriving everywhere it needs to be.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "KV cache broadcast — attention weights distributed across all context positions",
      },
    ],
  },

  {
    zoneId: "cytoskeleton",
    cycleTitle: "The Structural Adaptation Cycle",
    cycleDescription:
      "The cytoskeleton is not static scaffolding — it continuously senses mechanical forces and restructures itself in response. It is the cell's body, and bodies learn.",
    phases: [
      {
        id: "perception",
        title: "Mechanical Force Sensed at Focal Adhesions",
        description:
          "Integrin receptors at focal adhesion sites transmit extracellular mechanical forces directly to cytoskeletal proteins. The cytoskeleton perceives topology: the shape of the environment it is anchored to becomes internal information. Perception here is proprioceptive — the cell feels itself in space.",
        scaleLabel: "Organic",
        hardwareAnalogue: "Weight loading from UFS — the structural lattice registers the model's shape",
      },
      {
        id: "affect",
        title: "Actin Polymerization and Microtubule Dynamics",
        description:
          "In response to force, actin monomers polymerize at the leading edge; microtubules reorganize their minus ends toward the centrosome. The cytoskeleton's affect is structural reorganization — the architecture changes to match what the environment demands. This is not repair; it is learning.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "Graph compilation — NNAPI partitions the model to match hardware topology",
      },
      {
        id: "expression",
        title: "Adapted Architecture Enables New Behavior",
        description:
          "A restructured cytoskeleton enables the cell to migrate toward a chemotactic gradient, divide along the correct axis, or resist a shear force it could not resist before. Expression is the behavioral consequence of structural learning — what the cell can now do that it could not do before.",
        scaleLabel: "Organic",
        hardwareAnalogue: "Compiled inference graph — subsequent calls reuse the cached compiled kernel",
      },
    ],
  },

  {
    zoneId: "ribosomes",
    cycleTitle: "The Translation Cycle",
    cycleDescription:
      "The ribosome executes the fundamental decoding operation of life: converting a nucleotide sequence into an amino acid sequence. Each codon is one complete P→A→E cycle at the molecular scale.",
    phases: [
      {
        id: "perception",
        title: "mRNA Codon Arrives at the A-site",
        description:
          "The ribosome's A-site (aminoacyl site) is empty and reads the next three nucleotides of the mRNA. Correct aminoacyl-tRNA enters — its anticodon matching the codon by Watson-Crick base-pairing. The ribosome waits for the correct match; incorrect tRNAs are rejected. Perception is complete: the instruction is read and verified.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "Tokenizer — input codon matched against the vocabulary lookup table",
      },
      {
        id: "affect",
        title: "Peptide Bond Formation",
        description:
          "The peptidyl transferase center (an RNA enzyme, not a protein) catalyzes the transfer of the growing polypeptide chain from the P-site tRNA to the A-site amino acid. The reaction is irreversible. Affect is commitment — the bond forms and the chain grows. Nothing about the previous state is recovered.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "HTA matrix multiply — the computation is performed; weights activate",
      },
      {
        id: "expression",
        title: "Ribosome Translocates — One Amino Acid Added",
        description:
          "The ribosome moves exactly 3 nucleotides along the mRNA. The P-site tRNA (now uncharged) moves to the E-site and exits. The A-site is empty and ready for the next codon. Expression is minimal and precise: one residue added, the system advanced by one unit, ready for the next cycle.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "Token decode — one token sampled, KV cache extended by one position",
      },
    ],
  },

  {
    zoneId: "mitochondria",
    cycleTitle: "The ATP Synthesis Cycle",
    cycleDescription:
      "The mitochondrion converts chemical potential into chemical currency. Boyer's Nobel Prize (1997) confirmed the rotary mechanism — a physical machine, not a cascade, generating the cell's universal energy token.",
    phases: [
      {
        id: "perception",
        title: "Fuel and Oxidant Arrive",
        description:
          "Glucose, delivered by the bloodstream, is converted to pyruvate in the cytoplasm, then enters the mitochondria as acetyl-CoA. Oxygen crosses the inner mitochondrial membrane. Both must be present simultaneously — the mitochondrion perceives the complete arrival of its two substrates before the electron transport chain begins.",
        scaleLabel: "Organic",
        hardwareAnalogue: "Prompt + model weights both staged in RAM — inference cannot begin until both are present",
      },
      {
        id: "affect",
        title: "Electron Transport Chain Builds the Gradient",
        description:
          "Electrons from NADH move through four protein complexes (I, II, III, IV), each step releasing energy used to pump protons across the inner membrane. A proton gradient of ~200 mV accumulates. This is sustained chain reaction in dedicated hardware — each complex performing one step, passing the electron to the next, building toward ATP synthesis.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "HTA matrix multiply chain — INT8 multiply-accumulate across all model layers, INT32 accumulators preserving precision",
      },
      {
        id: "expression",
        title: "ATP Released — The Energy Token",
        description:
          "ATP synthase's gamma subunit rotates 120° per ATP produced, driven by the proton gradient. ATP is released into the mitochondrial matrix, then exported to the cytoplasm via adenine nucleotide translocase. CO₂ and H₂O leave the cell. The energy token has been minted, addressed, and dispatched. The mitochondrion rests until the next substrate arrival.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "Temperature sampling (τ = 0.7770777) → token decoded → streamed to display",
      },
    ],
  },

  {
    zoneId: "golgi",
    cycleTitle: "The Sorting and Dispatch Cycle",
    cycleDescription:
      "The Golgi apparatus is the cell's post office: it receives, processes, addresses, and dispatches. Nothing arrives here and leaves in the same form. The Golgi writes the destination into the cargo itself.",
    phases: [
      {
        id: "perception",
        title: "Vesicles Arrive from the ER",
        description:
          "COPII-coated vesicles bud from the ER's exit sites, carrying unprocessed proteins. They fuse with the Golgi cis face. The Golgi perceives cargo as undifferentiated potential — present, but not yet addressed. Reception is not comprehension; reception is the beginning of the sorting process.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "Model output logits — unsampled probability distribution, all possibilities present",
      },
      {
        id: "affect",
        title: "Glycosylation and Address Writing",
        description:
          "As cargo moves through the cisternae stack (cis → medial → trans), glycosyltransferases add sugar chains that encode the protein's final destination. Mannose-6-phosphate marks proteins for lysosomes; other glycans route to the plasma membrane or secretion. The Golgi writes the destination into the cargo's chemical structure — affect is the act of addressing.",
        scaleLabel: "Apparatus",
        hardwareAnalogue: "Beam search or top-k sampling — selecting and routing from the logit distribution",
      },
      {
        id: "expression",
        title: "Addressed Vesicles Depart",
        description:
          "COPI vesicles bud from the trans Golgi network, each carrying cargo bearing its chemical zip code. Secretory vesicles fuse with the plasma membrane; lysosomal vesicles acidify en route. Expression is precisely routed delivery: the right cargo to the right address in the right form. The Golgi does not emit — it dispatches.",
        scaleLabel: "Textual",
        hardwareAnalogue: "Token written to screen buffer — correct character at the correct position in the output stream",
      },
    ],
  },

  {
    zoneId: "endoplasmic-reticulum",
    cycleTitle: "The Folding Quality Cycle",
    cycleDescription:
      "The rough ER is the cell's quality control chamber: every secreted or membrane protein must be folded here before it is permitted to proceed. The ER does not simply receive — it evaluates, corrects, and dispatches only what meets the standard.",
    phases: [
      {
        id: "perception",
        title: "Polypeptide Enters the Lumen",
        description:
          "As the ribosome synthesizes a signal-sequence-bearing protein, the signal recognition particle (SRP) docks the ribosome to the ER membrane. The polypeptide is threaded co-translationally into the ER lumen — not after synthesis completes, but as it is being produced. The ER perceives incrementally: it receives the protein before it is finished.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "Streaming token generation — output received and processed before completion",
      },
      {
        id: "affect",
        title: "Chaperone-Assisted Folding and Quality Check",
        description:
          "BiP (GRP78), calnexin, and calreticulin bind to the polypeptide, preventing premature aggregation and guiding it toward its native conformation. Misfolded proteins are retained, ubiquitinated, and retrotranslocated for proteasomal degradation (ERAD). The ER's affect is discrimination: it assists correct folding and destroys what cannot be corrected. Quality is enforced here, not downstream.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "Confidence filtering — low-probability tokens flagged, high-confidence activations forwarded",
      },
      {
        id: "expression",
        title: "Correctly Folded Protein Enters COPII Vesicle",
        description:
          "A properly folded protein acquires its COPII coat and buds from the ER exit site, addressed for the Golgi. Only proteins that passed the quality check are permitted to proceed. The ER's expression is selective release: not everything that enters, exits. What exits has been verified.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "KV cache write — only verified activations are persisted for the next context window",
      },
    ],
  },

  {
    zoneId: "membrane",
    cycleTitle: "The Selective Permeability Cycle",
    cycleDescription:
      "The cell membrane is the most philosophically sophisticated organelle: it decides what enters and what exits. Selective permeability is not passivity — it is active discrimination at the molecular scale, moment to moment.",
    phases: [
      {
        id: "perception",
        title: "External Signal Binds to Receptor",
        description:
          "A ligand molecule — hormone, neurotransmitter, or growth factor — binds to its specific receptor embedded in the lipid bilayer. The binding event is perception: a signal from outside the cell is received and converted into a conformational change inside the membrane protein. The cell's boundary has become a sensor.",
        scaleLabel: "Cellular",
        hardwareAnalogue: "NNAPI graph partitioning — external operator matches hardware capability at the API boundary",
      },
      {
        id: "affect",
        title: "Conformational Change — Signal Discrimination",
        description:
          "Receptor binding triggers allosteric conformational change: the intracellular domain adopts a new shape that enables it to recruit and activate downstream proteins (G-proteins, kinases). Incorrect ligands that bind with low affinity dissociate before triggering this change. The membrane's affect is discrimination in both directions: confirming the genuine signal, rejecting noise.",
        scaleLabel: "Molecular",
        hardwareAnalogue: "Attention score thresholding — low-affinity keys masked before softmax normalization",
      },
      {
        id: "expression",
        title: "窗 — Addressed Signal Crosses the Boundary",
        description:
          "The initiated cascade crosses the membrane boundary in both directions: second messengers are released inward; if the receptor is a channel, ions flow. Expression is the validated crossing — not a leak, not a forced entry, but a permitted passage that carries meaning precisely because it was discriminated. The membrane's 窗 (window) is a philosophical act as much as a physical one.",
        scaleLabel: "Symbolic",
        hardwareAnalogue: "Model output crossing the API boundary — validated token written to the application layer",
      },
    ],
  },
];
