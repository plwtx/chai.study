import { checkDailyReset } from "@/lib/dailyReset";
import { useAppStore } from "@/store";

function scheduleMidnightReset() {
  const { timezone } = useAppStore.getState().settings;

  // Build a Date for the next midnight in the user's timezone
  const now = new Date();
  const todayStr = now.toLocaleDateString("en-CA", { timeZone: timezone });
  const [y, m, d] = todayStr.split("-").map(Number);

  // Create a formatter that reports hour/minute/second in the user's timezone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .formatToParts(now)
    .reduce(
      (acc, p) => {
        if (p.type === "hour") acc.hour = Number(p.value);
        if (p.type === "minute") acc.minute = Number(p.value);
        if (p.type === "second") acc.second = Number(p.value);
        return acc;
      },
      { hour: 0, minute: 0, second: 0 },
    );

  const elapsedTodaySec =
    parts.hour * 3600 + parts.minute * 60 + parts.second;
  const msUntilMidnight = (86400 - elapsedTodaySec) * 1000;

  setTimeout(async () => {
    await checkDailyReset();
    scheduleMidnightReset();
  }, msUntilMidnight);
}

export function initDailyResetScheduler() {
  // 1. Immediate check
  checkDailyReset();

  // 2. Visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkDailyReset();
    }
  });

  // 3. Midnight timeout
  scheduleMidnightReset();
}
