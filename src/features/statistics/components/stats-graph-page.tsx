import { useState } from "react";
import { useDailyStats } from "../hooks/useDailyStats";
import StatsDateHeader from "./stats-date-header";
import StatsViewControls, { type ViewMode } from "./stats-view-controls";
import StatsDailyMetrics from "./stats-daily-metrics";
import StatsGraphPanel from "./stats-graph-panel";
import SessionLogsPanel from "./session-logs-panel";

export default function StatsGraphPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [showLogs, setShowLogs] = useState(false);
  const { totalMinutes, sessionCount } = useDailyStats(viewMode);

  return (
    <div className="font-poppins h-full w-full">
      <section>
        {/* Date and switch view mode (future update) */}
        <StatsDateHeader />
      </section>
      {/* Main Statistics */}
      <div className="mt-6 mb-12 flex flex-col">
        {/* View mode toggle & see logs button */}
        <StatsViewControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onViewLogs={() => setShowLogs(true)}
        />
        <SessionLogsPanel open={showLogs} onClose={() => setShowLogs(false)} />

        {/* Daily Stats & Graph */}
        <section className="relative flex h-fit w-full px-9">
          {/* Focused minutes + Sessions completed */}
          <StatsDailyMetrics
            totalMinutes={totalMinutes}
            sessionCount={sessionCount}
            viewMode={viewMode}
          />
          {/* Dividing line */}
          <div className="bg-brown-700 dark:bg-dark-100 mx-3 my-auto h-32 w-px" />
          {/* Weekly / Monthly / Yearly graph */}
          <StatsGraphPanel viewMode={viewMode} />
        </section>
      </div>
    </div>
  );
}
