import { Pie, PieChart, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { useStorageEstimate } from "@/features/settings/hooks/useStorageEstimate";

function formatMB(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(2)} MB`;
}

const StorageTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className={cn(
        "bg-brown-50 dark:bg-dark-600 border-brown-200 dark:border-dark-900 rounded-md border px-3 py-2 text-xs shadow-sm"
      )}
    >
      <p>
        {payload[0].name}: {formatMB(payload[0].value)}
      </p>
    </div>
  );
};

export default function StoragePieChart() {
  const { usedMB, availableMB, usedPercent, quotaAvailable } =
    useStorageEstimate();

  const pieData = [
    { name: "Used", value: usedMB, fill: "var(--accent)" },
    { name: "Available", value: availableMB, fill: "#bba6a0" },
  ];

  return (
    <div className="mt-4 flex items-center gap-6">
      <PieChart width={160} height={160}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={72}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        />

        <Tooltip content={<StorageTooltip />} />
      </PieChart>

      <div className="font-fragment-mono space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span>Used: {formatMB(usedMB)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-brown-300 inline-block h-2.5 w-2.5 rounded-full" />
          <span>Available: {formatMB(availableMB)}</span>
        </div>
        <p className="text-brown-400 dark:text-dark-100/50 pt-1 text-[10px]">
          {usedPercent.toFixed(1)}% used (approximate)
        </p>
        {!quotaAvailable && (
          <p className="text-brown-400 dark:text-dark-100/50 text-[10px]">
            * Quota unavailable - showing out of 1 GB
          </p>
        )}
      </div>
    </div>
  );
}
