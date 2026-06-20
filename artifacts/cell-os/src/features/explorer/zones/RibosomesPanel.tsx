import { NineScaleFlow } from "../components/NineScaleFlow";
import { BioplasmaFieldSection } from "../components/BioplasmaFieldSection";
import { CodeSnippet } from "../components/CodeSnippet";

const NNAPI_NATIVE_SNIPPET = `int ANeuralNetworksModel_addOperation(
    ANeuralNetworksModel* model,
    ANeuralNetworksOperationType type,
    uint32_t inputCount,  const uint32_t* inputs,
    uint32_t outputCount, const uint32_t* outputs)
{
    if (!model || !model->isCompletable()) {
        return ANEURALNETWORKS_UNEXPECTED_NULL;
    }
    return model->addOperation(
        static_cast<OperationType>(type),
        inputCount, inputs,
        outputCount, outputs);
}`;

/**
 * RibosomesPanel — the scale-invariant pattern translator.
 *
 * Ribosomes translate genetic blueprints into functional proteins — they are
 * the cell's universal construction workers, applying the same assembly logic
 * across every scale. Here this maps to the Ten-Scale Flow: one pattern
 * (PERCEPTION → AFFECT → EXPRESSION) expressed across every order of magnitude,
 * from the quantum to the silicon to the societal.
 */
export function RibosomesPanel() {
  return (
    <div>
      <NineScaleFlow />

      {/* ── Native reality ──────────────────────────────────────────── */}
      <div className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgba(163,230,53,0.4)" }}>
            The ribosome call in native code
          </p>
          <h3 className="text-lg font-bold text-white">
            NNAPI: pattern translation in C++
          </h3>
          <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-2xl">
            The same pattern you see across eleven scales above —{" "}
            <em>translate blueprint into action</em> — is what Android's Neural Networks API
            does at the silicon scale.{" "}
            <code className="font-mono text-xs" style={{ color: "rgba(163,230,53,0.65)" }}>ANeuralNetworksModel_addOperation()</code>{" "}
            is the ribosome call: it takes a model operation (the codon) and dispatches
            it to the correct hardware (the amino acid factory). One call. One translation.
            Scale-invariant.
          </p>
          <CodeSnippet
            filename="platform/frameworks/ml/nn/runtime/NeuralNetworks.cpp"
            language="c++"
            sourceUrl="https://android.googlesource.com/platform/frameworks/ml/+/refs/heads/master/nn/runtime/NeuralNetworks.cpp"
          >{NNAPI_NATIVE_SNIPPET}</CodeSnippet>
        </div>
      </div>
      <BioplasmaFieldSection zoneId="ribosomes" />
    </div>
  );
}
