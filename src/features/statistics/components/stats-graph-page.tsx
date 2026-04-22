import { ChevronDown, ScrollText } from "lucide-react";

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

function DailyFocusedTime() {
  const focusedTime = 27;
  return (
    <>
      <section className="flex w-64 items-center justify-between gap-9">
        <h3 className="text-7xl">{focusedTime}</h3>
        <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
          <p className="font-semibold">minutes</p>
          <p>focused</p>
        </div>
      </section>
    </>
  );
}

function SessionsCompleted() {
  const sessionsCompleted = 2;
  return (
    <>
      <section className="flex w-64 items-center justify-between gap-9">
        <h3 className="text-7xl">{sessionsCompleted}</h3>
        <div className="flex flex-col items-end justify-start text-xl leading-5 font-light">
          <p className="font-semibold">sessions</p>
          <p>completed</p>
        </div>
      </section>
    </>
  );
}

export default function DailyFocusPage() {
  return (
    <>
      <div className="font-poppins h-full w-full">
        <section>
          {/* Date and switch view mode (future update) */}
          <CurrentDate />
        </section>
        {/* Main Statistics */}
        <div className="mt-6 mb-12 flex flex-col">
          {/* View mode toggle & see logs button */}
          <section className="flex items-center justify-between">
            <div className="bg-brown-200/45 dark:bg-dark-900 shadow-brown-600 flex h-fit w-fit gap-3 overflow-clip rounded-full p-2 shadow-inner dark:shadow-black">
              <span className="bg-brown-600 shadow-brown-900 text-brown-50 dark:text-dark-900 dark:bg-dark-100 rounded-full p-1 px-9 font-semibold shadow-xs">
                Daily
              </span>
              <span className="rounded-full p-1 px-9">Weekly</span>
              <span className="rounded-full p-1 px-9">Monthly</span>
              <span className="rounded-full p-1 px-9">Yearly</span>
            </div>
            {/* View logs button */}
            <div className="bg-brown-600 dark:bg-dark-900 shadow-brown-600 flex gap-3 rounded-full p-3 shadow-sm dark:shadow-black">
              <ScrollText className="stroke-brown-50 stroke-[1px]" />
              <ChevronDown className="rotate-270 stroke-[1px]" />
            </div>
          </section>

          {/* Daily Stats & Graph */}
          <section className="relative flex h-fit w-full px-9">
            <div className="flex w-1/2 flex-col items-start justify-center gap-12">
              {/* Focused minutes */}
              <DailyFocusedTime />
              {/* Sessions completed */}
              <SessionsCompleted />
            </div>
            {/* Dividing line */}
            <div className="bg-brown-700 dark:bg-dark-100 mx-3 my-auto h-32 w-px" />
            {/* Weekly / Monthly / Yearly graph */}
            <div className="flex h-full w-full flex-col items-center justify-center py-3">
              {/* Date and switch arrows */}
              <div className="flex w-full items-center justify-between px-12 py-2 font-light">
                <ChevronDown className="rotate-90 stroke-[1px]" />
                <p>
                  <span className="font-semibold">20-26</span> Apr. 2026
                </p>
                <ChevronDown className="rotate-270 stroke-[1px]" />
              </div>
              {/* Graph Chart */}
              <div className="bg-brown-300/45 h-72 w-lg" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
