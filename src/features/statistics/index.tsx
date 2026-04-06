import FocusHeatmap from "./components/heatmap-calendar";
import OtherStats from "./components/other-stats";
import DailyFocusBanner from "./components/daily-focus-banner";
import DayStreak from "./components/day-streak";
export default function Statistics() {
  return (
    <>
      <div className="bg-brown-50 dark:bg-dark-600 text-brown-800 dark:text-dark-100 font-poppins flex h-full w-full items-center justify-center p-9">
        <div className="flex h-full w-full max-w-6xl flex-col gap-9 pt-19">
          {/* Statistics and streak */}
          <section className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Statistics</h1>
            <DayStreak />
          </section>
          {/* General stats */}
          <section className="flex items-center justify-start gap-3">
            <DailyFocusBanner />
          </section>
          {/* Focus heatmap */}
          <FocusHeatmap />
          {/* Other stats */}
          <OtherStats />
        </div>
      </div>
    </>
  );
}
