import { useHeatmapData, type HeatmapDay } from "../hooks/useHeatmapData";
import { useAppStore } from "@/store";
import { motion } from "motion/react";

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "var(--heatmap-0)",
  1: "var(--heatmap-1)",
  2: "var(--heatmap-2)",
  3: "var(--heatmap-3)",
  4: "var(--heatmap-4)",
};

// Short month names for labels
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

const DOW_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
  return `${dow}, ${MONTH_ABBR[d.getMonth()]} ${d.getDate()}`;
}

function buildWeeks(days: HeatmapDay[]): (HeatmapDay | null)[][] {
  const firstDate = new Date(days[0].date + "T00:00:00");
  const firstDow = firstDate.getDay();
  const startOffset = (firstDow + 6) % 7;

  const padded: (HeatmapDay | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...days,
  ];

  const weeks: (HeatmapDay | null)[][] = [];
  for (let col = 0; col < 52; col++) {
    weeks.push(padded.slice(col * 7, col * 7 + 7));
  }
  return weeks;
}

function SkeletonGrid() {
  return (
    <div className="flex gap-3">
      <div
        className="grid"
        style={{ gridTemplateRows: "repeat(7, 13px)", gap: "3px" }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-3.25 w-7 text-right text-xs leading-none">
            {DOW_LABELS[i] ?? ""}
          </div>
        ))}
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(52, 13px)",
          gridTemplateRows: "repeat(7, 13px)",
          gap: "3px",
          gridAutoFlow: "column",
        }}
      >
        {Array.from({ length: 52 * 7 }, (_, i) => (
          <div
            key={i}
            className="rounded-xs"
            style={{ background: LEVEL_COLORS[0], width: 13, height: 13 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function FocusHeatmap() {
  const days = useHeatmapData();
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion);

  const weeks = days !== undefined ? buildWeeks(days) : null;

  const monthLabels: (string | null)[] = [];
  if (weeks) {
    let prevMonth: number | null = null;
    for (const week of weeks) {
      const firstDay = week.find((d) => d !== null);
      if (firstDay) {
        const month = new Date(firstDay.date + "T00:00:00").getMonth();
        monthLabels.push(month !== prevMonth ? MONTH_ABBR[month] : null);
        prevMonth = month;
      } else {
        monthLabels.push(null);
      }
    }
  }

  const gridContent = (
    <div className="flex gap-3">
      <div className="flex flex-col" style={{ gap: "3px", marginTop: 20 }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className="text-brown-400 dark:text-brown-500 flex items-center justify-end text-xs leading-none"
            style={{ height: 13, width: 28 }}
          >
            {DOW_LABELS[i] ?? ""}
          </div>
        ))}
      </div>

      <div>
        <div
          className="mb-0.75 grid"
          style={{ gridTemplateColumns: "repeat(52, 13px)", gap: "3px" }}
        >
          {monthLabels.map((label, i) => (
            <div
              key={i}
              className="text-brown-400 dark:text-brown-500 truncate text-xs leading-none"
              style={{ height: 16 }}
            >
              {label ?? ""}
            </div>
          ))}
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(52, 13px)",
            gridTemplateRows: "repeat(7, 13px)",
            gap: "3px",
            gridAutoFlow: "column",
          }}
        >
          {weeks !== null &&
            weeks.map((week, wi) =>
              week.map((day, di) => {
                if (day === null) {
                  return (
                    <div
                      key={`${wi}-${di}`}
                      style={{ width: 13, height: 13 }}
                    />
                  );
                }
                const label =
                  day.totalMinutes > 0
                    ? `${Math.round(day.totalMinutes)} min. | ${formatDayLabel(day.date)}`
                    : `No focus | ${formatDayLabel(day.date)}`;
                return (
                  <div
                    key={`${wi}-${di}`}
                    className="rounded-xs"
                    title={label}
                    style={{
                      background: LEVEL_COLORS[day.level],
                      width: 13,
                      height: 13,
                    }}
                  />
                );
              })
            )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-brown-100 corner-scoop dark:bg-dark-900 border-brown-300 shadow-brown-400 relative z-20 w-fit rounded-xl px-7 pt-8 pb-6 shadow-xs dark:border-black dark:shadow-black">
      {/* Absolut title */}
      <div className="bg-brown-100 dark:bg-dark-900 border-brown-300 shadow-brown-400 corner-b-scoop absolute -top-3 left-6 flex h-6 w-fit items-center justify-center rounded-full border px-9 text-xs font-medium shadow-xs dark:border-black dark:shadow-black">
        <h3>Calendar focus heatmap</h3>
      </div>

      {days === undefined ? (
        <SkeletonGrid />
      ) : !reducedMotion ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {gridContent}
        </motion.div>
      ) : (
        gridContent
      )}

      <div className="text-brown-400 dark:text-brown-500 mt-4 flex items-center gap-2 text-xs">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className="rounded-xs"
            style={{ background: LEVEL_COLORS[level], width: 13, height: 13 }}
          />
        ))}
        <span>More</span>
      </div>
    </main>
  );
}
