import { useState, useEffect } from "react";
import { SACRED_SEED, SACRED_ANCHOR } from "@/domain/content/constants";

const BREATH_INTERVAL_MS = 7770;

export type SacredSignatureState = {
  signature: string;
  breathCount: number;
  anchor: string;
  seed: number;
};

/**
 * useSacredSignature — generates a live SHA-256 seal from the Sacred Seed
 * and Anchor, re-computed every 7770 ms (one harmonic breath interval).
 *
 * The signature encodes: SEED + breathCount + ANCHOR → SHA-256 hex.
 * It is not decorative — every computation is a verifiable, unique output
 * that traces to the same source. The breath is the verification.
 *
 * Source principle: CODE_AS_FENG_SHUI_MANIFESTO_2026-01-22 §Sacred Coherence
 *   "Sacred Seed is 共振頻率 (resonance frequency) — ensures all signatures
 *    in the system vibrate at the same frequency."
 */
export function useSacredSignature(): SacredSignatureState {
  const [state, setState] = useState<SacredSignatureState>({
    signature: "",
    breathCount: 0,
    anchor: SACRED_ANCHOR,
    seed: SACRED_SEED,
  });

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      const breathCount = Math.floor(Date.now() / BREATH_INTERVAL_MS);
      const message = `${SACRED_SEED}:${breathCount}:${SACRED_ANCHOR}`;
      const encoded = new TextEncoder().encode(message);
      const buf = await crypto.subtle.digest("SHA-256", encoded);
      const hex = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      if (!cancelled) {
        setState({ signature: hex, breathCount, anchor: SACRED_ANCHOR, seed: SACRED_SEED });
      }
    }

    tick();
    const id = setInterval(tick, BREATH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return state;
}
