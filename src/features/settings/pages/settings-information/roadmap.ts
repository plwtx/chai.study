export interface RoadmapStage {
  number: number;
  label: string;
  roadLabel?: string | null;
  date?: string | null;
  description?: string | null;
  current: boolean;
}

export const ROADMAP: RoadmapStage[] = [
  {
    number: 1,
    label: "Initial release",
    roadLabel: "Test period / Bug fixing.",
    date: "16th May 2026",
    description:
      "Collecting feedbacks, catching bugs. Fix and test untill most of the discoverable bugs are caught.",
    current: true,
  },
  {
    number: 2,
    label: "Stable release",
    roadLabel: "Fixes and Optimization",
    date: "28th May 2026",
    description:
      "Optimization, fixes, more accessibility and customization related settings.",
    current: false,
  },
  {
    number: 3,
    label: "Mobile version release",
    roadLabel: "Additional features",
    date: "June 2026",
    description:
      "Task manager and integrated notes. Fixes and features related to mobile version.",
    current: false,
  },
  {
    number: 4,
    label: "More TBA",
    roadLabel: null,
    date: null,
    description: "More features and fixes are to be announced.",
    current: false,
  },
];
