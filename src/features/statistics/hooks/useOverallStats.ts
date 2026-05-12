import { useEffect, useState } from "react";
import { db } from "@/db";

export interface OverallStats {
  averageDailyHours: string;
  hoursFocused: string;
  sessionsCompleted: string;
  daysFocused: string;
}

const EMPTY: OverallStats = {
  averageDailyHours: "0.0",
  hoursFocused: "0.00",
  sessionsCompleted: "0",
  daysFocused: "0",
};

function localDayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function useOverallStats(): OverallStats {
  const [stats, setStats] = useState<OverallStats>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    db.sessions
      .where("mode")
      .equals("focus")
      .toArray()
      .then((sessions) => {
        if (cancelled) return;

        let totalSeconds = 0;
        const dayKeys = new Set<string>();
        for (const s of sessions) {
          totalSeconds += s.actualDuration;
          dayKeys.add(localDayKey(s.completedAt));
        }

        const hours = totalSeconds / 3600;
        const days = dayKeys.size;
        const avg = days > 0 ? hours / days : 0;

        setStats({
          averageDailyHours: avg.toFixed(1),
          hoursFocused: hours.toFixed(2),
          sessionsCompleted: String(sessions.length),
          daysFocused: String(days),
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
