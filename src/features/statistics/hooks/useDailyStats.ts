import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { db } from "@/db";
import type { ViewMode } from "../components/stats-view-controls";

export interface DailyStats {
  totalMinutes: number;
  sessionCount: number;
}

function getDateRange(viewMode: ViewMode): { startTs: number; endTs: number } {
  const now = new Date();

  if (viewMode === "daily") {
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    return { startTs: startOfDay, endTs: startOfDay + 86_400_000 - 1 };
  }

  if (viewMode === "weekly") {
    const dow = now.getDay();
    const daysToMonday = dow === 0 ? -6 : 1 - dow;
    const mon = new Date(now);
    mon.setDate(now.getDate() + daysToMonday);
    mon.setHours(0, 0, 0, 0);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    sun.setHours(23, 59, 59, 999);
    return { startTs: mon.getTime(), endTs: sun.getTime() };
  }

  if (viewMode === "monthly") {
    const first = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const last = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    return { startTs: first.getTime(), endTs: last.getTime() };
  }

  // yearly
  const start = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  return { startTs: start.getTime(), endTs: end.getTime() };
}

export function useDailyStats(viewMode: ViewMode = "daily"): DailyStats {
  const [stats, setStats] = useState<DailyStats>({
    totalMinutes: 0,
    sessionCount: 0,
  });

  const status = useAppStore((s) => s.status);

  useEffect(() => {
    const { startTs, endTs } = getDateRange(viewMode);

    db.sessions
      .where("[mode+completedAt]")
      .between(["focus", startTs], ["focus", endTs], true, true)
      .toArray()
      .then((sessions) => {
        const totalMinutes =
          sessions.reduce((sum, s) => sum + s.actualDuration, 0) / 60;
        setStats({ totalMinutes, sessionCount: sessions.length });
      });
  }, [status, viewMode]);

  return stats;
}
