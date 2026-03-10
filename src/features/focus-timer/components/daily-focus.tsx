import useCurrentDate from "../hooks/useCurrentDate";

interface DailyFocusProps {
  hours: string;
  minutes: string;
}

export default function DailyFocus({ hours, minutes }: DailyFocusProps) {
  const currentDate = useCurrentDate();
  return (
    <>
      <div className="flex flex-col items-center justify-center text-sm font-normal">
        <p className="my-1 rounded-lg bg-zinc-800 p-1 px-3 text-zinc-50">
          {currentDate}
        </p>
        <p className="rounded-2xl bg-zinc-900/35 p-3 px-3 text-lg font-light shadow-inner shadow-zinc-950">
          <span className="rounded-lg bg-zinc-800 p-1 px-2 font-semibold text-zinc-50 shadow-md shadow-zinc-950">
            {hours}
          </span>{" "}
          hr.{" "}
          <span className="rounded-lg bg-zinc-800 p-1 px-2 font-semibold text-zinc-50 shadow-md shadow-zinc-950">
            {minutes}
          </span>{" "}
          min.
        </p>
      </div>
    </>
  );
}
