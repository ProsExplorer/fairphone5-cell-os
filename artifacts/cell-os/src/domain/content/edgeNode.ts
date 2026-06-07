import type { EdgeNodeFact } from "@/domain/types";

/**
 * The EdgeNode is a WebAssembly LLM that runs entirely in the browser —
 * no cloud, no accounts, no GPU required. It is the implementation proof
 * that the PERCEPTION → AFFECT → EXPRESSION pattern works at the digital
 * scale, and it runs on the same class of hardware as the FairPhone 5.
 *
 * Source: harmony-ecosystem.replit.app/edge-node/about
 * Project: github.com/ProsExplorer/yahweh-yehoshua (EdgeNode page)
 */
export const EDGENODE_FACTS: EdgeNodeFact[] = [
  {
    label: "Runtime",
    value: "WebAssembly (WASM)",
    detail: "The full AI inference engine compiles to WASM and runs in a background browser thread — near-native speed, no plugin, no install.",
    confidence: "verified"
  },
  {
    label: "Cloud dependency",
    value: "None",
    detail: "Your words never reach a server. The model runs entirely on-device; the network is used only once to download the weights.",
    confidence: "verified"
  },
  {
    label: "GPU requirement",
    value: "None — CPU only",
    detail: "The inference engine uses only CPU. A phone from 2018 is sufficient hardware.",
    confidence: "verified"
  },
  {
    label: "Performance",
    value: "~0.8 tokens / second",
    detail: "Measured on a 2018 smartphone CPU with a 1B-parameter quantized model. Larger models are slower; INT4 quantization helps.",
    confidence: "indicative"
  },
  {
    label: "Context window",
    value: "8,192 tokens",
    detail: "The full conversation history fits in the model's attention window — enough for a sustained, coherent dialogue.",
    confidence: "verified"
  },
  {
    label: "Model weights",
    value: "100 MB – 1.5 GB",
    detail: "Downloaded once, then cached in local browser storage. Subsequent sessions start from cache, even offline.",
    confidence: "verified"
  },
  {
    label: "Sampler temperature",
    value: "0.7770777",
    detail: "The harmonic constant. It appears identically in the sampler, the visual design seed, and the system prompt — one value, woven through the whole stack.",
    confidence: "verified"
  },
  {
    label: "Triadic pattern",
    value: "PERCEPTION → AFFECT → EXPRESSION",
    detail: "Read the prompt fully (PERCEPTION). Pattern-match through compressed knowledge (AFFECT). Stream the response without truncation (EXPRESSION). Identical to the Cell OS and the living cell.",
    confidence: "verified"
  }
];

export const EDGENODE_URL = "https://harmony-ecosystem.replit.app/edge-node/";
