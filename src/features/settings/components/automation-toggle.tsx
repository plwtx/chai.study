import { cn } from "@/lib/utils";
import ToggleSwitch from "@/components/ui/toggle-switch";

export default function AutomationToggle({
  label,
  description,
  checked,
  onChange,
  className,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-brown-900 dark:text-dark-100 flex w-full items-center justify-between",
        className
      )}
    >
      <div className="text-base">
        <h3 className="font-semibold">{label}</h3>
        <p className="text-sm opacity-75">{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}
