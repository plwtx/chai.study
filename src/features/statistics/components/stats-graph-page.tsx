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
            <section className="bg-brown-200/45 shadow-brown-600 my-3 flex w-fit gap-3 overflow-clip rounded-full p-2 shadow-inner">
              <span className="bg-brown-600 shadow-brown-900 text-brown-50 rounded-full p-1 px-9 font-semibold shadow-xs">
                Daily
              </span>
              <span className="rounded-full p-1 px-9">Weekly</span>
              <span className="rounded-full p-1 px-9">Monthly</span>
              <span className="rounded-full p-1 px-9">Yearly</span>
            </section>
          </div>
          {/* Main Statistics */}
          <section className="relative flex h-96 w-full p-12">
            <div className="flex w-1/2 flex-col items-start justify-center gap-9">
              {/* Focused minutes */}
              <DailyFocusedTime />
              {/* Sessions completed */}
              <SessionsCompleted />
            </div>
            {/* Dividing line */}
            <div className="bg-brown-700 mx-3 my-auto h-32 w-px" />
            {/* Weekly / Monthly / Yearly graph */}
            <div className="h-full w-full py-3">
              {/* Date and switch arrows */}
              <div className="flex w-full items-center justify-center">
                <p>
                  <span className="font-semibold">20-26</span> Apr. 2026
                </p>
              </div>
              <div className="bg-brown-300/45 h-full w-full" />
            </div>
          </section>
          {/* Absolutes */}
          <ChevronDown className="stroke-brown-600 absolute bottom-0 left-1/2 size-9 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </>
  );
}
