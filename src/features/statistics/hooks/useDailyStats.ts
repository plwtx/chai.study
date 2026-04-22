import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { db } from "@/db";

export interface DailyStats {
  totalMinutes: number;
  sessionCount: number;
}

export function useDailyStats(): DailyStats {
  const [stats, setStats] = useState<DailyStats>({
    totalMinutes: 0,
    sessionCount: 0,
  });

  // Re-query (session finished)
  const status = useAppStore((s) => s.status);

  useEffect(() => {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const endOfDay = startOfDay + 86_400_000 - 1;

    db.sessions
      .where("[mode+completedAt]")
      .between(["focus", startOfDay], ["focus", endOfDay], true, true)
      .toArray()
      .then((sessions) => {
        const totalMinutes =
          sessions.reduce((sum, s) => sum + s.actualDuration, 0) / 60;
        setStats({ totalMinutes, sessionCount: sessions.length });
      });
  }, [status]);

  return stats;
}
