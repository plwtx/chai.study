import { useState } from "react";
import { usePeriodStats } from "../hooks/useDailyStats";
import StatsDateHeader from "./stats-date-header";
import StatsViewControls, { type ViewMode } from "./stats-view-controls";
import StatsMetrics from "./stats-metrics";
import StatsGraphPanel from "./stats-graph-panel";
import SessionLogsPanel from "./session-logs-panel";

export default function StatsGraphPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [offset, setOffset] = useState(0);
  const [showLogs, setShowLogs] = useState(false);

  const { totalMinutes, sessionCount, periodLabel } = usePeriodStats(
    viewMode,
    offset
  );

  function handleViewModeChange(mode: ViewMode) {
    setViewMode(mode);
    setOffset(0);
  }

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
          onViewModeChange={handleViewModeChange}
          onViewLogs={() => setShowLogs(true)}
        />
        <SessionLogsPanel open={showLogs} onClose={() => setShowLogs(false)} />

        {/* Stats metrics and graph */}
        <section className="relative flex h-fit w-full px-9">
          {/* Focused time + Sessions completed */}
          <StatsMetrics
            totalMinutes={totalMinutes}
            sessionCount={sessionCount}
            periodLabel={periodLabel}
          />
          {/* Dividing line */}
          <div className="bg-brown-700 dark:bg-dark-100 mx-3 my-auto h-32 w-px" />
          {/* Weekly / Monthly / Yearly graph */}
          <StatsGraphPanel
            viewMode={viewMode}
            offset={offset}
            onOffsetChange={setOffset}
          />
        </section>
      </div>
    </div>
  );
}
