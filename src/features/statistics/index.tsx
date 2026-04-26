import FocusHeatmap from "./components/heatmap-calendar";
import OtherStats from "./components/other-stats";
import StatsGraphPage from "./components/stats-graph-page";
import DayStreak from "./components/day-streak";

export default function Statistics() {
  return (
    <>
      <div className="bg-brown-50 dark:bg-dark-600 text-brown-800 dark:text-dark-100 font-poppins flex h-screen w-full items-start justify-center overflow-y-auto">
        {/* Container */}
        <section className="mt-20 flex h-fit w-full max-w-5xl flex-col items-center">
          {/* Statistics and streak */}
          {/* <h1 className="text-3xl font-semibold">Statistics</h1> */}
          {/* General stats */}
          <StatsGraphPage />
          {/* Heatmap and Other stats: */}
          <section className="bg-brown-100/45 dark:bg-dark-900/45 border-brown-200/75 flex h-full w-fit flex-col items-center justify-center gap-9 rounded-t-3xl border border-b-0 p-12 dark:border-black">
            {/* Focus heatmap */}
            <DayStreak />
            <FocusHeatmap />
            <OtherStats />
          </section>
        </section>
      </div>
    </>
  );
}
