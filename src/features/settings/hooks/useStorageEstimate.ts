import { useState, useEffect } from "react";
import { db } from "@/db";

interface StorageEstimate {
  usedMB: number;
  availableMB: number;
  usedPercent: number;
  quotaAvailable: boolean;
}

// Fallback ( to 1GB )
const FALLBACK_TOTAL_MB = 1024;

async function getActualDataSizeBytes(): Promise<number> {
  const [sessions, sessionDraft, tasks, settings, backgroundImages] =
    await Promise.all([
      db.sessions.toArray(),
      db.sessionDraft.toArray(),
      db.tasks.toArray(),
      db.settings.toArray(),
      db.backgroundImages.toArray(),
    ]);

  const textBytes = new TextEncoder().encode(
    JSON.stringify({ sessions, sessionDraft, tasks, settings })
  ).byteLength;

  const imageBytes = backgroundImages.reduce(
    (sum, img) => sum + img.blob.size,
    0
  );

  return textBytes + imageBytes;
}

export function useStorageEstimate(): StorageEstimate {
  const [estimate, setEstimate] = useState<StorageEstimate>({
    usedMB: 0,
    availableMB: FALLBACK_TOTAL_MB,
    usedPercent: 0,
    quotaAvailable: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function compute() {
      const actualBytes = await getActualDataSizeBytes();
      const usedMB = actualBytes / (1024 * 1024);

      if (navigator.storage?.estimate) {
        const { quota } = await navigator.storage.estimate();
        if (quota && quota > 0) {
          const totalMB = quota / (1024 * 1024);
          if (!cancelled) {
            setEstimate({
              usedMB,
              availableMB: Math.max(0, totalMB - usedMB),
              usedPercent: (usedMB / totalMB) * 100,
              quotaAvailable: true,
            });
          }
          return;
        }
      }

      if (!cancelled) {
        setEstimate({
          usedMB,
          availableMB: Math.max(0, FALLBACK_TOTAL_MB - usedMB),
          usedPercent: (usedMB / FALLBACK_TOTAL_MB) * 100,
          quotaAvailable: false,
        });
      }
    }

    compute();
    return () => {
      cancelled = true;
    };
  }, []);

  return estimate;
}
