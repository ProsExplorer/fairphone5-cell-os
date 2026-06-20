import { useEffect } from "react";
import { useCellVitalStore } from "@/features/cell-shell/state/useCellVitalStore";
import { BP3_WOUND_FIELD } from "@/domain/content/bioplasmaPathways";

/**
 * useWoundFieldBroadcast — BP3 Wound Field (σ=0.85, verified)
 *
 * Biological analogue: epithelial wound currents — DC electric fields
 * that arise at sites of tissue injury and broadcast a repair signal
 * to all surrounding cells via ordered ionic diffusion.
 *
 * LineageOS source: BroadcastQueue.java (ACTION_BATTERY_LOW, ACTION_POWER_DISCONNECTED)
 *
 * SPA analogues used (ordered by functional accuracy):
 *   1. window.onerror / unhandledrejection — JavaScript error cascade
 *      (closest to a wound: unexpected state rupture propagated globally)
 *   2. navigator.onLine → offline — network isolation
 *      (analogous to cell being cut off from nutrient supply)
 *   3. Battery API level < 0.15 && !charging — systemic energy crisis
 *      (closest analogue to physiological low-energy wound state)
 *
 * Does NOT fire on tab blur — attention loss is not a health stress event.
 */
export function useWoundFieldBroadcast(): void {
  const bioplasmaSignal = useCellVitalStore((s) => s.bioplasmaSignal);

  useEffect(() => {
    function fireWoundField(reason: string) {
      void reason;
      bioplasmaSignal(BP3_WOUND_FIELD, 1.0, 4000);
    }

    function handleError() {
      fireWoundField("js-error");
    }

    function handleRejection() {
      fireWoundField("unhandled-rejection");
    }

    function handleOffline() {
      fireWoundField("network-offline");
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("offline", handleOffline);

    let batteryCleanup: (() => void) | null = null;

    if ("getBattery" in navigator) {
      (navigator as Navigator & { getBattery: () => Promise<{
        level: number;
        charging: boolean;
        addEventListener: (event: string, handler: () => void) => void;
        removeEventListener: (event: string, handler: () => void) => void;
      }> })
        .getBattery()
        .then((battery) => {
          function checkBattery() {
            if (battery.level < 0.15 && !battery.charging) {
              fireWoundField("battery-critical");
            }
          }
          battery.addEventListener("levelchange", checkBattery);
          battery.addEventListener("chargingchange", checkBattery);
          batteryCleanup = () => {
            battery.removeEventListener("levelchange", checkBattery);
            battery.removeEventListener("chargingchange", checkBattery);
          };
        })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("offline", handleOffline);
      batteryCleanup?.();
    };
  }, [bioplasmaSignal]);
}
