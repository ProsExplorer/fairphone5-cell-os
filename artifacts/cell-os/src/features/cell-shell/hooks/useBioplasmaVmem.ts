import { useState, useCallback } from "react";

/**
 * useBioplasmaVmem — BP7 Vmem morphogenetic pattern store.
 *
 * Planarian analogue: just as a planarian's bioelectric Vmem pattern
 * encodes its body plan and persists across tissue regeneration,
 * this hook persists the Cell OS "metabolic profile" across sessions.
 *
 * LineageOS source: android_packages_apps_LineageParts (verified σ=0.90)
 * IPC analogue: SettingsProvider + LineageParts write on "boot"
 *
 * Kept separate from useCellVitalStore to isolate persistent state
 * from transient signal state. Transient signals should never persist.
 *
 * Profile meanings:
 *   "balanced"    — default homeostatic state (planarian resting Vmem)
 *   "performance" — elevated metabolic pumping (depolarised state)
 *   "cool"        — minimal dissipation mode (hyperpolarised state)
 */

export type VmemProfile = "balanced" | "performance" | "cool";

const STORAGE_KEY = "cell-os-vmem-v1";

function readVmemFromStorage(): VmemProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "performance" || raw === "cool") return raw;
  } catch {
  }
  return "balanced";
}

function writeVmemToStorage(profile: VmemProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, profile);
  } catch {
  }
}

export type BioplasmaVmemState = {
  vmemProfile: VmemProfile;
  setVmemProfile: (profile: VmemProfile) => void;
};

export function useBioplasmaVmem(): BioplasmaVmemState {
  const [vmemProfile, setRaw] = useState<VmemProfile>(readVmemFromStorage);

  const setVmemProfile = useCallback((profile: VmemProfile) => {
    writeVmemToStorage(profile);
    setRaw(profile);
  }, []);

  return { vmemProfile, setVmemProfile };
}
