import { Pencil } from "lucide-react";

import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import { cn } from "@/lib/utils";

export default function ClockSettings() {
  return (
    <>
      <div className="font-poppins h-full w-full text-sm">
        {/* Title */}
        <HeaderDescription
          header={"Clock"}
          description={
            "Clock related settings such as setting up your focus cycle period, rest period clock style and other settings."
          }
          kaomoji={null}
        />

        {/* Divider line */}
        <div className="bg-brown-300 dark:bg-dark-100/20 mx-auto my-6 h-px w-full rounded-full" />

        <SubHeaderDescription
          header={"Timer (minutes)"}
          description={"Focus / Break / Long break"}
        />
        {/* screen with clock */}
        <div className="text-brown-800 my-3 flex w-full justify-between gap-1">
          {/* Focus: */}
          <section className="border-brown-500 shadow-brown-600 dark:shadow-dark-900 group dark:border-dark-900 dark:bg-dark-900/75 dark:text-dark-100 bg-brown-200 relative flex h-64 w-2/7 flex-col items-center justify-center overflow-clip rounded-xl border shadow-sm">
            <h3 className="font-fragment-mono text-brown-600 dark:text-dark-100/45 font-light">
              Focus
            </h3>
            <button
              aria-label="Edit button"
              className="bg-brown-700 text-brown-50 absolute top-2 left-2 flex h-9 w-9 -translate-y-16 items-center justify-center rounded-full transition-all group-hover:translate-y-0"
            >
              <Pencil className="size-5 stroke-1" />
            </button>
            <p className="font-poppins text-6xl font-bold">25:00</p>
          </section>

          {/* Break: */}
          <section className="border-brown-500 shadow-brown-600 dark:shadow-dark-900 dark:border-dark-900 dark:bg-dark-900/45 dark:text-dark-100 bg-brown-200/50 flex h-64 w-2/7 flex-col items-center justify-center rounded-xl border shadow-sm">
            <h3 className="font-fragment-mono text-brown-600 dark:text-dark-100/45 font-light">
              Break
            </h3>
            <p className="font-poppins text-6xl font-bold">05:00</p>
          </section>

          {/* Long break: */}
          <section className="border-brown-500 shadow-brown-600 dark:shadow-dark-900 dark:border-dark-900 dark:bg-dark-900/35 dark:text-dark-100 bg-brown-200/25 flex h-64 w-2/7 flex-col items-center justify-center rounded-xl border shadow-sm">
            <h3 className="font-fragment-mono text-brown-600 dark:text-dark-100/45 font-light">
              Long break
            </h3>
            <p className="font-poppins text-6xl font-bold">15:00</p>
          </section>
        </div>
        <SubHeaderDescription
          header={"Automation"}
          description={"Auto start settings and overtime actions."}
        />
        <section className="my-9 space-y-3">
          <div className="flex w-full items-center justify-between">
            <h3>Auto Start Breaks</h3>
            {/* Toggle button */}
            <button className="bg-brown-200 group active:bg-brown-700 shadow-brown-600 active:shadow-brown-900 h-6 w-12 cursor-pointer overflow-clip rounded-full p-1 shadow-inner">
              <div className="bg-brown-700 shadow-brown-800 group-active:bg-brown-300 h-4 w-4 rounded-full shadow-sm group-active:translate-x-6 active:shadow-black" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
