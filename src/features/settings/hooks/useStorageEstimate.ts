import { useState, useEffect } from "react";

interface StorageEstimate {
  usedMB: number;
  availableMB: number;
  usedPercent: number;
  quotaAvailable: boolean;
}

// Fallback ( to 1GB )
const FALLBACK_TOTAL_MB = 1024;

export function useStorageEstimate(): StorageEstimate {
  const [estimate, setEstimate] = useState<StorageEstimate>({
    usedMB: 0,
    availableMB: FALLBACK_TOTAL_MB,
    usedPercent: 0,
    quotaAvailable: false,
  });

  useEffect(() => {
    if (!navigator.storage?.estimate) return;

    navigator.storage.estimate().then(({ usage, quota }) => {
      const usedMB = (usage ?? 0) / (1024 * 1024);

      if (quota && quota > 0) {
        const totalMB = quota / (1024 * 1024);
        setEstimate({
          usedMB,
          availableMB: Math.max(0, totalMB - usedMB),
          usedPercent: (usedMB / totalMB) * 100,
          quotaAvailable: true,
        });
      } else {
        // Fal;back
        setEstimate({
          usedMB,
          availableMB: Math.max(0, FALLBACK_TOTAL_MB - usedMB),
          usedPercent: (usedMB / FALLBACK_TOTAL_MB) * 100,
          quotaAvailable: false,
        });
      }
    });
  }, []);

  return estimate;
}
