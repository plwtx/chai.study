import { useAppStore } from "@/store/index";

export interface DailyTotal {
  hours: string;
  minutes: string;
  totalSeconds: number;
}

export function useDailyTotal(): DailyTotal {
  const sessions = useAppStore((s) => s.sessions);

  const todayPrefix = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  const totalSeconds = sessions.reduce((sum, session) => {
    if (session.mode !== "focus") return sum;
    if (!session.completedAt.startsWith(todayPrefix)) return sum;
    return sum + session.actualDuration;
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    totalSeconds,
  };
}
