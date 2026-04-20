import { ChevronDown } from "lucide-react";

const CurrentDate: React.FC = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate.toLocaleString("default", { weekday: "long" });

  return (
    <p className="font-poppins w-fit text-left text-xl leading-6">
      {day} {month} {year}, <br />
      <span className="font-semibold">{dayOfWeek}</span>
    </p>
  );
};

export default function DailyFocusPage() {
  return (
    <>
      <div className="font-poppins h-full w-full">
        {/* Daily focus */}
        <div className="relative h-dvh w-full">
          {/* Main */}
          <div>
            {/* Date and switch */}
            <section className="flex w-full items-center justify-between">
              <CurrentDate />
              {/* button */}
              <div className="bg-brown-300 size-9 rounded-full" />
            </section>
            {/* Chart & stats view mode toggle */}
            <section className="bg-brown-200/45 shadow-brown-600 mt-3 flex w-fit gap-3 overflow-clip rounded-full p-2 shadow-inner">
              <span className="bg-brown-600 shadow-brown-900 text-brown-50 rounded-full p-1 px-9 font-semibold shadow-xs">
                Daily
              </span>
              <span className="rounded-full p-1 px-9">Weekly</span>
              <span className="rounded-full p-1 px-9">Monthly</span>
              <span className="rounded-full p-1 px-9">Yearly</span>
            </section>
          </div>
          {/* Absolutes */}
          <ChevronDown className="stroke-brown-600 absolute bottom-0 left-1/2 size-9 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </>
  );
}
