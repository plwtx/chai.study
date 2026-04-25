import { formatTimeSplit } from "../utils/formatTime";

interface StatsMetricsProps {
  totalMinutes: number;
  sessionCount: number;
  periodLabel: string;
}

function FocusedTime({
  minutes,
  periodLabel,
}: {
  minutes: number;
  periodLabel: string;
}) {
  const { value, topLabel } = formatTimeSplit(minutes);
  return (
    <section className="flex w-64 items-center justify-between gap-9">
      <h3 className="text-7xl">{value}</h3>
      <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
        <p className="font-semibold">{topLabel}</p>
        <p>focused</p>
        <p className="text-brown-500 dark:text-dark-400 mt-1 text-sm">
          {periodLabel}
        </p>
      </div>
    </section>
  );
}

function SessionsCompleted({
  count,
  periodLabel,
}: {
  count: number;
  periodLabel: string;
}) {
  return (
    <section className="flex w-64 items-center justify-between gap-9">
      <h3 className="text-7xl">{count}</h3>
      <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
        <p className="font-semibold">sessions</p>
        <p>completed</p>
        <p className="text-brown-500 dark:text-dark-400 mt-1 text-sm">
          {periodLabel}
        </p>
      </div>
    </section>
  );
}

export default function StatsMetrics({
  totalMinutes,
  sessionCount,
  periodLabel,
}: StatsMetricsProps) {
  return (
    <div className="flex w-1/2 flex-col items-start justify-center gap-12">
      <FocusedTime minutes={totalMinutes} periodLabel={periodLabel} />
      <SessionsCompleted count={sessionCount} periodLabel={periodLabel} />
    </div>
  );
}
