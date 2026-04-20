import { useAppStore } from "@/store";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@/types";

export interface HeatmapDay {
  date: string;
  totalMinutes: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function useHeatmapData(): HeatmapDay[] | undefined {
  const getSessionsInRange = useAppStore((s) => s.getSessionsInRange);
  const [sessions, setSessions] = useState<Session[] | undefined>(undefined);

  const { startTs, endTs } = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(start.getDate() - 363);
    start.setHours(0, 0, 0, 0);
    return { startTs: start.getTime(), endTs: end.getTime() };
  }, []);

  useEffect(() => {
    getSessionsInRange(startTs, endTs).then(setSessions);
  }, [getSessionsInRange, startTs, endTs]);

  return useMemo(() => {
    if (sessions === undefined) return undefined;

    const minutesByDay = new Map<string, number>();
    for (const session of sessions) {
      const key = toDateKey(new Date(session.completedAt));
      const prev = minutesByDay.get(key) ?? 0;
      minutesByDay.set(key, prev + session.actualDuration / 60);
    }

    const nonZero = Array.from(minutesByDay.values())
      .filter((m) => m > 0)
      .sort((a, b) => a - b);

    function percentile(arr: number[], p: number): number {
      if (arr.length === 0) return 0;
      const idx = Math.ceil((p / 100) * arr.length) - 1;
      return arr[Math.max(0, idx)];
    }

    const p25 = percentile(nonZero, 25);
    const p50 = percentile(nonZero, 50);
    const p75 = percentile(nonZero, 75);

    function toLevel(minutes: number): 0 | 1 | 2 | 3 | 4 {
      if (minutes === 0) return 0;
      if (minutes <= p25) return 1;
      if (minutes <= p50) return 2;
      if (minutes <= p75) return 3;
      return 4;
    }

    const start = new Date(startTs);
    start.setHours(0, 0, 0, 0);
    const days: HeatmapDay[] = [];
    const cursor = new Date(start);
    for (let i = 0; i < 364; i++) {
      const key = toDateKey(cursor);
      const totalMinutes = minutesByDay.get(key) ?? 0;
      days.push({ date: key, totalMinutes, level: toLevel(totalMinutes) });
      cursor.setDate(cursor.getDate() + 1);
    }

    return days;
  }, [sessions, startTs]);
}
