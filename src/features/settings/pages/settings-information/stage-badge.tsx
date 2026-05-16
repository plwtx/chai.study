import { cn } from "@/lib/utils";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function toRoman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

interface StageBadgeProps {
  number: number;
  active?: boolean;
}

export default function StageBadge({ number, active = true }: StageBadgeProps) {
  return (
    <div
      className={cn(
        "font-fragment-mono flex h-10 w-10 items-center justify-center rounded-full border text-sm",
        active
          ? "bg-brown-500/75 text-brown-100 dark:border-dark-100 dark:bg-dark-100 dark:text-brown-900 border-transparent"
          : "border-brown-300 text-brown-400 dark:border-brown-600 dark:text-brown-500"
      )}
    >
      {toRoman(number)}
    </div>
  );
}
