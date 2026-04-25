import type { ViewMode } from "./stats-view-controls";

interface StatsDailyMetricsProps {
  totalMinutes: number;
  sessionCount: number;
  viewMode: ViewMode;
}

const PERIOD_LABELS: Record<ViewMode, string> = {
  daily: "today",
  weekly: "this week",
  monthly: "this month",
  yearly: "this year",
};

function formatTime(minutes: number): { value: number; topLabel: string } {
  if (minutes < 60) {
    return { value: Math.round(minutes), topLabel: "min" };
  }
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return { value: hrs, topLabel: mins > 0 ? `hr ${mins} min` : "hr" };
}

function FocusedTime({
  minutes,
  viewMode,
}: {
  minutes: number;
  viewMode: ViewMode;
}) {
  const { value, topLabel } = formatTime(minutes);
  return (
    <section className="flex w-64 items-center justify-between gap-9">
      <h3 className="text-7xl">{value}</h3>
      <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
        <p className="font-semibold">{topLabel}</p>
        <p>focused</p>
        <p className="text-brown-500 dark:text-dark-400 mt-1 text-sm">
          {PERIOD_LABELS[viewMode]}
        </p>
      </div>
    </section>
  );
}

function SessionsCompleted({
  count,
  viewMode,
}: {
  count: number;
  viewMode: ViewMode;
}) {
  return (
    <section className="flex w-64 items-center justify-between gap-9">
      <h3 className="text-7xl">{count}</h3>
      <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
        <p className="font-semibold">sessions</p>
        <p>completed</p>
        <p className="text-brown-500 dark:text-dark-400 mt-1 text-sm">
          {PERIOD_LABELS[viewMode]}
        </p>
      </div>
    </section>
  );
}

export default function StatsDailyMetrics({
  totalMinutes,
  sessionCount,
  viewMode,
}: StatsDailyMetricsProps) {
  return (
    <div className="flex w-1/2 flex-col items-start justify-center gap-12">
      <FocusedTime minutes={totalMinutes} viewMode={viewMode} />
      <SessionsCompleted count={sessionCount} viewMode={viewMode} />
    </div>
  );
}
