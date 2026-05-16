import { useHydrationStore } from "@/store/hydration";

export default function InitialLoading() {
  const label = useHydrationStore((s) => s.label);
  const progress = useHydrationStore((s) => s.progress);
  const stage = useHydrationStore((s) => s.stage);
  const error = useHydrationStore((s) => s.error);

  const isError = stage === "error";

  return (
    <div
      className="font-poppins fixed inset-0 z-50 flex flex-col items-center justify-center gap-7"
      style={{
        background: "var(--loading-bg)",
        color: "var(--loading-fg)",
      }}
    >
      {/* Wordmark */}
      <p
        className="text-xs tracking-[0.4em] uppercase"
        style={{ color: "var(--loading-muted)" }}
      >
        chaidoro
      </p>

      {/* Progress track */}
      <div
        className="h-px w-64 overflow-hidden rounded-full"
        style={{ background: "var(--loading-track)" }}
      >
        <div
          className="h-full transition-[width] duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: isError ? "#b85c5c" : "var(--loading-fill)",
          }}
        />
      </div>

      {/* Stage label */}
      <p className="min-h-4 text-xs font-light tabular-nums" aria-live="polite">
        {isError ? `Error: ${error}` : label}
      </p>
    </div>
  );
}
