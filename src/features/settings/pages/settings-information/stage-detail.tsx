import StageBadge from "./stage-badge";
import type { RoadmapStage } from "./roadmap";

interface StageDetailProps {
  stage: RoadmapStage;
}

export default function StageDetail({ stage }: StageDetailProps) {
  return (
    <section>
      {/* Stage and title */}
      <div className="flex items-center gap-3 py-3">
        <StageBadge number={stage.number} />
        <div>
          {stage.date && (
            <p className="text-xs font-light italic">Stage - {stage.date}</p>
          )}
          <h1 className="font-poppins text-base font-medium">{stage.label}</h1>
        </div>
      </div>
      {/* Road label and description */}
      {stage.roadLabel && (
        <p className="text-sm font-semibold">{stage.roadLabel}</p>
      )}
      {stage.description && <p>{stage.description}</p>}
    </section>
  );
}
