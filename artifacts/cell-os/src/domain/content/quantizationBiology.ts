import type { QuantizationLayer } from "@/domain/types";

/**
 * The Precision Cascade — four quantization formats mapped to their biological
 * analogues in the cellular hierarchy.
 *
 * Every halving of bits per weight mirrors a biological compression step:
 * from the full genome (FP32) through the targeted transcript (FP16) and
 * the quantized translation table (INT8) to the minimum viable energy packet (INT4).
 *
 * The K-quant super-block structure (weights → blocks → super-blocks) is itself
 * a fractal compression — self-similar across 3 nested scales, mirroring the
 * hierarchy: molecular reaction → organelle → whole cell.
 *
 * Source: FairPhone5_AI_Substrate.md (attached asset) — three-round architect review.
 */
export const QUANTIZATION_LAYERS: QuantizationLayer[] = [
  {
    id: "fp32",
    format: "FP32",
    bitsPerWeight: 32,
    bytesPerWeight: 4,
    model1BSize: "~4 GB",
    biologicalAnalogue: "Nucleus · DNA — the complete genome at full resolution",
    biologicalZone: "nucleus",
    aiStage: "Pretrained weights at rest. Full float precision. No information loss.",
    hardwareUnit: "CPU or Adreno GPU — Hexagon HTA does not accelerate FP32",
    compressionRatio: 1.0,
    metabolicCost: "maximum",
    confidence: "verified",
    glyph: "核",
    color: "#22d3ee",
    note: "3 billion base pairs in human DNA ≈ 750 MB at 2 bits/base. FP32 weights are the model's genome — lossless, expensive, seldom run on device."
  },
  {
    id: "fp16",
    format: "FP16",
    bitsPerWeight: 16,
    bytesPerWeight: 2,
    model1BSize: "~2 GB",
    biologicalAnalogue: "Endoplasmic Reticulum · mRNA — a copied, targeted excerpt of the genome",
    biologicalZone: "endoplasmic-reticulum",
    aiStage: "Fine-tuned or cast weights. Halved footprint; GPU-path standard.",
    hardwareUnit: "Adreno 643 GPU — FP16 doubles effective compute throughput",
    compressionRatio: 0.5,
    metabolicCost: "high",
    confidence: "verified",
    glyph: "網",
    color: "#f472b6",
    note: "mRNA is a single-stranded copy of one gene — not the whole genome. FP16 is the working copy: smaller, task-specific, still high fidelity."
  },
  {
    id: "int8",
    format: "INT8",
    bitsPerWeight: 8,
    bytesPerWeight: 1,
    model1BSize: "~1 GB",
    biologicalAnalogue: "Ribosomes · tRNA — the quantized codon-to-amino-acid lookup table",
    biologicalZone: "ribosomes",
    aiStage: "Q8_0 GGUF — block quantization, uniform scale per block. Highest GGUF quality.",
    hardwareUnit: "Hexagon HTA (primary INT8 inference format). INT32 accumulation preserves chain precision.",
    compressionRatio: 0.25,
    metabolicCost: "efficient",
    confidence: "verified",
    glyph: "糖",
    color: "#a3e635",
    note: "The 61-codon-to-20-amino-acid table is itself a quantized lookup: 64 possible codons map to 20 discrete outputs. INT8 does the same with 256 values mapping to model activations."
  },
  {
    id: "int4",
    format: "INT4",
    bitsPerWeight: 4,
    bytesPerWeight: 0.5,
    model1BSize: "~500 MB",
    biologicalAnalogue: "Mitochondria · ATP — the minimum viable energy quantum",
    biologicalZone: "mitochondria",
    aiStage: "Q4_K_M — super-block quantization, mixed precision. Standard memory-constrained inference.",
    hardwareUnit: "Hexagon HTA (hardware-supported INT4). INT32 accumulators preserve precision through the compute chain.",
    compressionRatio: 0.125,
    metabolicCost: "minimal",
    confidence: "indicative",
    glyph: "粒",
    color: "#fb923c",
    note: "ATP is a 3-phosphate molecule — the cell's irreducible energy token. INT4 is the model's irreducible precision unit. Below this, information loss becomes unacceptable for most tasks."
  }
];

/**
 * K-quant super-block structure — a three-level fractal compression hierarchy.
 *
 * The 'K' suffix does NOT mean k-means. It means hierarchical super-block
 * quantisation: individual weights → blocks (each with own scale factor) →
 * super-blocks (scale factors themselves quantised). This nesting is fractal:
 * the same compression principle applied recursively at three scales.
 *
 * Biological parallel:
 *   individual weight → molecular reaction (point value)
 *   block → organelle (local scale factor / local metabolic context)
 *   super-block → whole cell (global scale factor / systemic regulation)
 */
export const KQUANT_LEVELS = [
  {
    level: 0,
    name: "Super-block",
    biologicalAnalogue: "Whole cell",
    role: "Global scale factor — quantised and stored once per super-block",
    color: "#22d3ee"
  },
  {
    level: 1,
    name: "Block",
    biologicalAnalogue: "Organelle",
    role: "Local scale factor — each block has its own quantised scale",
    color: "#a3e635"
  },
  {
    level: 2,
    name: "Weight",
    biologicalAnalogue: "Molecular reaction",
    role: "Individual INT4 value — the atomic unit of the compressed representation",
    color: "#fb923c"
  }
] as const;

/**
 * Runtime overhead note (from the substrate document).
 * A 500 MB weight file (Q4_K_M 1B model) typically occupies 900 MB–1.2 GB
 * at runtime due to KV cache + activation buffers + allocator overhead.
 *
 * Biological parallel: the cell weighs more than its DNA — the cytoplasm,
 * membranes, and metabolic intermediates all contribute to the living mass.
 */
export const RUNTIME_OVERHEAD_NOTE =
  "Model size figures are weight-only. At 2k context, a 500 MB weight file " +
  "typically occupies 900 MB–1.2 GB total (KV cache + activation buffers + overhead). " +
  "The living cell weighs more than its genome.";
