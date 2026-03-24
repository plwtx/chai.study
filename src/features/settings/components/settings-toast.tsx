import { toast } from "sonner";
import { Check } from "lucide-react";

function SettingsToast({ message }: { message: string }) {
  return (
    <div className="text-brown-900 dark:border-dark-900/45 dark:bg-dark-900 dark:text-dark-100 bg-brown-50 relative flex w-90 items-center justify-start gap-3 overflow-clip rounded-xl border border-green-200 px-9 py-3 text-left text-sm font-normal shadow-xs shadow-green-900 dark:shadow-black">
      <div className="absolute top-1/2 -left-3 z-10 h-16 w-16 origin-center -translate-y-1/2 animate-pulse rounded-full bg-emerald-500/95 blur-3xl dark:bg-emerald-900/95 dark:blur-xl" />
      <div className="absolute top-1/2 -left-9 z-0 h-32 w-32 origin-center -translate-y-1/2 rounded-full bg-emerald-500/35 blur-3xl dark:bg-emerald-900/45 dark:blur-2xl" />
      <Check className="z-20 size-6 stroke-emerald-700 stroke-[1px] dark:stroke-emerald-200" />
      <span className="z-20">{message}</span>
    </div>
  );
}

export function showSettingsToast(message: string) {
  toast.custom(() => <SettingsToast message={message} />, {
    duration: 3000,
    className: "!bg-transparent !shadow-none !border-none !p-0",
  });
}
