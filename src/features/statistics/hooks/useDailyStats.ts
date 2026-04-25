import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { db } from "@/db";
import type { ViewMode } from "../components/stats-view-controls";

export interface PeriodStats {
  totalMinutes: number;
  sessionCount: number;
  periodLabel: string;
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
  return { startTs: mon.getTime(), endTs: sun.getTime(), periodLabel: label };
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
    0
  );
  const last = new Date(
    now.getFullYear(),
    now.getMonth() + offset + 1,
    0,
    23,
    59,
    59,
    999
  );
  return {
    startTs: first.getTime(),
    endTs: last.getTime(),
    periodLabel: `${MONTH_ABBR[first.getMonth()]} ${first.getFullYear()}`,
  };
}

function yearRange(offset: number) {
  const year = new Date().getFullYear() + offset;
  return {
    startTs: new Date(year, 0, 1, 0, 0, 0, 0).getTime(),
    endTs: new Date(year, 11, 31, 23, 59, 59, 999).getTime(),
    periodLabel: String(year),
  };
}

function dayRange() {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  return {
    startTs: startOfDay.getTime(),
    endTs: startOfDay.getTime() + 86_400_000 - 1,
    periodLabel: "Today",
  };
}

function getRange(viewMode: ViewMode, offset: number) {
  if (viewMode === "daily") return dayRange();
  if (viewMode === "monthly") return monthRange(offset);
  if (viewMode === "yearly") return yearRange(offset);
  return weekRange(offset);
}

export function usePeriodStats(
  viewMode: ViewMode,
  offset: number
): PeriodStats {
  const [stats, setStats] = useState<PeriodStats>({
    totalMinutes: 0,
    sessionCount: 0,
    periodLabel: "",
  });

  const status = useAppStore((s) => s.status);

  useEffect(() => {
    const { startTs, endTs, periodLabel } = getRange(viewMode, offset);

    db.sessions
      .where("[mode+completedAt]")
      .between(["focus", startTs], ["focus", endTs], true, true)
      .toArray()
      .then((sessions) => {
        const totalMinutes =
          sessions.reduce((sum, s) => sum + s.actualDuration, 0) / 60;
        setStats({ totalMinutes, sessionCount: sessions.length, periodLabel });
      });
  }, [status, viewMode, offset]);

  return stats;
}
