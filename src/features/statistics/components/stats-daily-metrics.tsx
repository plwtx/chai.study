interface StatsDailyMetricsProps {
  totalMinutes: number;
  sessionCount: number;
}

function FocusedTime({ minutes }: { minutes: number }) {
  return (
    <section className="flex w-64 items-center justify-between gap-9">
      <h3 className="text-7xl">{Math.round(minutes)}</h3>
      <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
        <p className="font-semibold">minutes</p>
        <p>focused</p>
      </div>
    </section>
  );
}

function SessionsCompleted({ count }: { count: number }) {
  return (
    <section className="flex w-64 items-center justify-between gap-9">
      <h3 className="text-7xl">{count}</h3>
      <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
        <p className="font-semibold">sessions</p>
        <p>completed</p>
      </div>
    </section>
  );
}

export default function StatsDailyMetrics({
  totalMinutes,
  sessionCount,
}: StatsDailyMetricsProps) {
  return (
    <div className="flex w-1/2 flex-col items-start justify-center gap-12">
      <FocusedTime minutes={totalMinutes} />
      <SessionsCompleted count={sessionCount} />
    </div>
  );
}
