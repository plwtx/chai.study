import { useState, useEffect } from "react";
import { useAppStore } from "@/store/index";
import { db } from "@/db";

export interface DailyTotal {
  hours: string;
  minutes: string;
  totalSeconds: number;
}

export function useDailyTotal(): DailyTotal {
  const [total, setTotal] = useState<DailyTotal>({
    hours: "00",
    minutes: "00",
    totalSeconds: 0,
  });

  // Re-query when a session finishes (status transitions to "finished")
  const status = useAppStore((s) => s.status);

  useEffect(() => {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();
    const endOfDay = startOfDay + 86_400_000 - 1;

    db.sessions
      .where("[mode+completedAt]")
      .between(["focus", startOfDay], ["focus", endOfDay], true, true)
      .toArray()
      .then((sessions) => {
        const totalSeconds = sessions.reduce(
          (sum, s) => sum + s.actualDuration,
          0,
        );
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        setTotal({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          totalSeconds,
        });
      });
  }, [status]);

  return total;
}
