import { useState } from "react";

function parseMinutes(value: string): number | null {
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 1 || n > 120) return null;
  return n * 60;
}

export default function DurationEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: number;
  onSave: (seconds: number) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(String(Math.floor(initial / 60)));

  const handleSubmit = () => {
    const seconds = parseMinutes(value);
    if (seconds !== null) onSave(seconds);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-1 pt-3">
        <input
          type="number"
          min={1}
          max={90}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") onCancel();
          }}
          autoFocus
          className="bg-brown-500 shadow-brown-900 dark:bg-dark-600 border-brown-500 dark:border-dark-900 font-poppins text-brown-50 dark:text-dark-100 z-20 flex-1 [appearance:textfield] self-stretch overflow-clip rounded-lg border p-1 text-center text-3xl font-bold shadow-inner outline-none dark:shadow-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="font-fragment-mono text-brown-600 dark:text-dark-100/45 text-sm">
          minutes
        </span>
      </div>

      <div className="relative mt-auto mb-3 flex w-full flex-col gap-2 px-3">
        {/* Decoration arc */}
        <div className="dark:border-dark-100/45 border-brown-600 absolute top-0 left-1/2 z-0 h-24 w-50 -translate-x-1/2 -translate-y-23 rounded-t-lg border border-b-0" />
        <button
          onClick={handleSubmit}
          className="bg-brown-700 text-brown-50 dark:bg-dark-100 dark:text-dark-900 hover:bg-brown-900 shadow-brown-800 dark:hover:bg-dark-900 dark:hover:text-dark-100 dark:hover:border-dark-100 dark:border-dark-100 border-brown-700 hover:border-brown-900 z-10 w-full cursor-pointer rounded-md border p-3 text-xs font-medium shadow-sm active:scale-95"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border-brown-500 dark:hover:bg-dark-100/5 dark:hover:text-dark-100 dark:border-dark-100/35 hover:bg-brown-300 z-10 w-full cursor-pointer rounded-md border px-3 py-1 text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
