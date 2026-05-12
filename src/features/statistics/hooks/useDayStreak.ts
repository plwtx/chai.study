import { useState, useEffect, useTransition } from "react";
import { useAppStore } from "@/store";
import { db } from "@/db";

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function useDayStreak(): number {
  const [streak, setStreak] = useState(0);
  const status = useAppStore((s) => s.status);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    async function compute() {
      const sessions = await db.sessions
        .where("mode")
        .equals("focus")
        .toArray();
      if (cancelled) return;

      const daySet = new Set<string>();
      for (const s of sessions) {
        daySet.add(toDateKey(new Date(s.completedAt)));
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayKey = toDateKey(today);

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayKey = toDateKey(yesterday);

      let startDate: Date;
      if (daySet.has(todayKey)) {
        startDate = today;
      } else if (daySet.has(yesterdayKey)) {
        startDate = yesterday;
      } else {
        startTransition(() => setStreak(0));
        return;
      }

      let count = 0;
      const cursor = new Date(startDate);
      while (daySet.has(toDateKey(cursor))) {
        count++;
        cursor.setDate(cursor.getDate() - 1);
      }

      startTransition(() => setStreak(count));
    }

    compute();
    return () => {
      cancelled = true;
    };
  }, [status]);

  return streak;
}
