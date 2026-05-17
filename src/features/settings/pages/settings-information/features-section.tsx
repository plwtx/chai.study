import SectionHeading from "./section-heading";

interface FeatureGroup {
  title: string;
  items: string[];
}

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Basic Features (Current version)",
    items: [
      "Log your progress into charts and calendar heatmap.",
      "Analyze your weekly / monthly / yearly productivity.",
      "Change the focus timer to fit your daily use.",
      "Customize the app with your choice of wallpapers.",
      "Back-up your data to keep it safe.",
    ],
  },
  {
    title: "Expected Future Updates (Expected on stage II)",
    items: [
      "Custom theme and accent colors.",
      "Tagging system for cycles (advanced graphs).",
    ],
  },
  {
    title: "Future Updates (Expected after stage III)",
    items: [
      "Built in task manager.",
      "Markdown notes.",
      "Option to hook into Nextcloud and multi device synchronization.",
      "Webhook / API integration (Telegram / Discord use).",
      "Export in CSV format.",
    ],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-9">
      <SectionHeading>Features</SectionHeading>
      <div className="mt-3 flex flex-col gap-5">
        {FEATURE_GROUPS.map((group) => (
          <FeatureGroupBlock key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}

function FeatureGroupBlock({ group }: { group: FeatureGroup }) {
  return (
    <div>
      <h3 className="font-poppins text-brown-800 dark:text-dark-100/90 text-sm font-medium">
        {group.title}
      </h3>
      <ul className="mt-2 flex flex-col gap-1.5 leading-6">
        {group.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="text-brown-500 dark:text-dark-100/50 select-none"
            >
              -
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
