import FocusHeatmap from "./components/heatmap-calendar";
import OtherStats from "./components/other-stats";
import DailyFocusBanner from "./components/daily-focus-page";
import DayStreak from "./components/day-streak";
export default function Statistics() {
  return (
    <>
      <div className="bg-brown-50 dark:bg-dark-600 text-brown-800 dark:text-dark-100 font-poppins flex h-fit w-full items-center justify-center p-9">
        <div className="flex h-full w-full max-w-6xl flex-col gap-9">
          {/* Statistics and streak */}
          {/* <h1 className="text-3xl font-semibold">Statistics</h1> */}
          {/* General stats */}
          <DailyFocusBanner />
          {/* Focus heatmap */}
          <section className="flex h-fit w-full items-center justify-between gap-2">
            <FocusHeatmap />
            <DayStreak />
          </section>
          {/* Other stats */}
          <OtherStats />
        </div>
      </div>
    </>
  );
}
