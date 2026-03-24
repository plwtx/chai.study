import { useAppStore } from "@/store";
import ToggleSwitch from "@/components/ui/toggle-switch";

export default function AutomationToggle({
  label,
  description,
  field,
}: {
  label: string;
  description: string;
  field: "autoStartBreak" | "autoStartFocus";
}) {
  const checked = useAppStore((s) => s.settings[field]);
  const toggleAutoStart = useAppStore((s) => s.toggleAutoStart);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-base">
        <h3 className="font-semibold">{label}</h3>
        <p className="text-sm opacity-75">{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={() => toggleAutoStart(field)} />
    </div>
  );
}
