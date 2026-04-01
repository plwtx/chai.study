import { useState, useEffect } from "react";
import { liveQuery } from "dexie";
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
    let totalMB = FALLBACK_TOTAL_MB;
    let quotaAvailable = false;
    let latestUsedMB = 0;
    let subscription: { unsubscribe: () => void } | null = null;

    const idleHandle = (window.requestIdleCallback ?? setTimeout)(() => {
      const initQuota = async () => {
        if (navigator.storage?.estimate) {
          const { quota } = await navigator.storage.estimate();
          if (quota && quota > 0) {
            totalMB = quota / (1024 * 1024);
            quotaAvailable = true;

            setEstimate({
              usedMB: latestUsedMB,
              availableMB: Math.max(0, totalMB - latestUsedMB),
              usedPercent: (latestUsedMB / totalMB) * 100,
              quotaAvailable,
            });
          }
        }
      };
      initQuota();

      subscription = liveQuery(getActualDataSizeBytes).subscribe({
        next: (bytes) => {
          latestUsedMB = bytes / (1024 * 1024);
          setEstimate({
            usedMB: latestUsedMB,
            availableMB: Math.max(0, totalMB - latestUsedMB),
            usedPercent: (latestUsedMB / totalMB) * 100,
            quotaAvailable,
          });
        },
      });
    });

    return () => {
      (window.cancelIdleCallback ?? clearTimeout)(idleHandle as number);
      subscription?.unsubscribe();
    };
  }, []);

  return estimate;
}
