import { ChevronDown } from "lucide-react";
import type { ViewMode } from "./stats-view-controls";

interface StatsGraphPanelProps {
  viewMode: ViewMode;
}

export default function StatsGraphPanel({
  viewMode: _viewMode,
}: StatsGraphPanelProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-3">
      {/* Date range navigation */}
      <div className="flex w-full items-center justify-between px-12 py-2 font-light">
        <ChevronDown className="rotate-90 stroke-[1px]" />
        <p>
          <span className="font-semibold">20-26</span> Apr. 2026
        </p>
        <ChevronDown className="rotate-270 stroke-[1px]" />
      </div>
      {/* Graph Chart placeholder (will add this a bit later) */}
      <div className="bg-brown-300/45 h-72 w-lg" />
    </div>
  );
}
