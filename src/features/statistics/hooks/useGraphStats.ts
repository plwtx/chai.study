import { useState, useEffect, useMemo } from "react";
import { db } from "@/db";
import type { Session } from "@/types";

export type GraphViewMode = "weekly" | "monthly" | "yearly";

export interface GraphBar {
  label: string;
  minutes: number;
  isEmpty: boolean;
}

export interface GraphStats {
  bars: GraphBar[];
  periodLabel: string;
  maxMinutes: number;
  isLoaded: boolean;
}

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function weekRange(offset: number) {
  const now = new Date();
  const dow = now.getDay();
  const daysToMonday = dow === 0 ? -6 : 1 - dow;
  const mon = new Date(now);
  mon.setDate(now.getDate() + daysToMonday + offset * 7);
  mon.setHours(0, 0, 0, 0);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  sun.setHours(23, 59, 59, 999);
  const label =
    mon.getMonth() === sun.getMonth()
      ? `${mon.getDate()}–${sun.getDate()} ${MONTH_ABBR[mon.getMonth()]}`
      : `${mon.getDate()} ${MONTH_ABBR[mon.getMonth()]}–${sun.getDate()} ${MONTH_ABBR[sun.getMonth()]}`;
  return {
    kind: "weekly" as const,
    startTs: mon.getTime(),
    endTs: sun.getTime(),
    periodLabel: label,
  };
}

function monthRange(offset: number) {
  const now = new Date();
  const first = new Date(
    now.getFullYear(),
    now.getMonth() + offset,
    1,
    0,
    0,
    0,
    0,
  );
  const last = new Date(
    now.getFullYear(),
    now.getMonth() + offset + 1,
    0,
    23,
    59,
    59,
    999,
  );
  return {
    kind: "monthly" as const,
    startTs: first.getTime(),
    endTs: last.getTime(),
    periodLabel: `${MONTH_ABBR[first.getMonth()]} ${first.getFullYear()}`,
    month: first.getMonth(),
    year: first.getFullYear(),
  };
}

function yearRange(offset: number) {
  const year = new Date().getFullYear() + offset;
  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const end = new Date(year, 11, 31, 23, 59, 59, 999);
  return {
    kind: "yearly" as const,
    startTs: start.getTime(),
    endTs: end.getTime(),
    periodLabel: String(year),
    year,
  };
}

export function useGraphStats(
  viewMode: GraphViewMode,
  offset: number,
): GraphStats {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const range = useMemo(() => {
    if (viewMode === "weekly") return weekRange(offset);
    if (viewMode === "monthly") return monthRange(offset);
    return yearRange(offset);
  }, [viewMode, offset]);

  useEffect(() => {
    let cancelled = false;
    setIsLoaded(false);
    setSessions([]);

    db.sessions
      .where("[mode+completedAt]")
      .between(["focus", range.startTs], ["focus", range.endTs], true, true)
      .toArray()
      .then((data) => {
        if (!cancelled) {
          setSessions(data);
          setIsLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [range.startTs, range.endTs]);

  return useMemo((): GraphStats => {
    const computeBars = (): GraphBar[] => {
      if (range.kind === "weekly") {
        const mins = new Array<number>(7).fill(0);
        for (const s of sessions) {
          mins[(new Date(s.completedAt).getDay() + 6) % 7] +=
            s.actualDuration / 60;
        }
        return mins.map((minutes, i) => ({
          label: WEEK_LABELS[i],
          minutes,
          isEmpty: minutes === 0,
        }));
      }

      if (range.kind === "monthly") {
        const daysInMonth = new Date(range.year, range.month + 1, 0).getDate();
        const mins = new Array<number>(daysInMonth).fill(0);
        for (const s of sessions) {
          mins[new Date(s.completedAt).getDate() - 1] += s.actualDuration / 60;
        }
        return mins.map((minutes, i) => ({
          label: String(i + 1),
          minutes,
          isEmpty: minutes === 0,
        }));
      }

      // yearly
      const mins = new Array<number>(12).fill(0);
      for (const s of sessions) {
        mins[new Date(s.completedAt).getMonth()] += s.actualDuration / 60;
      }
      return mins.map((minutes, i) => ({
        label: MONTH_ABBR[i],
        minutes,
        isEmpty: minutes === 0,
      }));
    };

    const bars = computeBars();
    const maxMinutes = Math.max(...bars.map((b) => b.minutes), 1);
    return { bars, periodLabel: range.periodLabel, maxMinutes, isLoaded };
  }, [sessions, range, isLoaded]);
}
