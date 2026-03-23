import { Pencil } from "lucide-react";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import HeaderDescription from "@/components/ui/header-description";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import { cn } from "@/lib/utils";

function ToggleButton() {
  return (
    <button className="bg-brown-200 dark:bg-dark-900 group active:bg-brown-700 dark:border-dark-900 border-brown-500 shadow-brown-600 active:shadow-brown-900 dark:active:bg-dark-100 h-6 w-12 cursor-pointer overflow-clip rounded-full border p-1 shadow-inner dark:shadow-black">
      <div className="bg-brown-700 shadow-brown-800 dark:group-active:bg-dark-900 dark:bg-dark-100 group-active:bg-brown-300 h-4 w-4 rounded-full shadow-sm group-active:translate-x-6 active:shadow-black dark:shadow-black" />
    </button>
  );
}

function Toggle({
  label,
  description,
}: {
  label: string;
  description?: string;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-base">
        <h3 className="font-semibold">{label}</h3>
        {description && (
          <>
            <p className="text-sm opacity-75">{description}</p>
          </>
        )}
      </div>
      <ToggleButton />
    </div>
  );
}

function TimerCard({
  label,
  time,
  editable = true,
  bgClass,
}: {
  label: string;
  time: string;
  editable?: boolean;
  bgClass: string;
}) {
  return (
    <section
      className={cn(
        "border-brown-500 shadow-brown-600 dark:shadow-dark-900 dark:border-dark-900 dark:text-dark-100 flex h-64 w-2/7 flex-col items-center justify-center rounded-xl border shadow-sm",
        editable && "group relative overflow-clip",
        bgClass
      )}
    >
      <h3 className="font-fragment-mono text-brown-600 dark:text-dark-100/45 font-light">
        {label}
      </h3>
      {editable && (
        <button
          aria-label="Edit button"
          className="bg-brown-700 text-brown-50 absolute top-2 left-2 flex h-9 w-9 -translate-y-16 items-center justify-center rounded-full transition-all group-hover:translate-y-0"
        >
          <Pencil className="size-5 stroke-1" />
        </button>
      )}
      <p className="font-poppins text-6xl font-bold">{time}</p>
    </section>
  );
}

export default function ClockSettings() {
  return (
    <>
      <div className="font-poppins text-brown-800 dark:text-dark-100 h-full w-full text-sm">
        {/* Title */}
        <HeaderDescription
          header={"Mechanics of clock"}
          description={
            "Core mechanics of app. Clock settings such as setting up your focus cycle period, rest period, automation, clock style and other settings."
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
          <TimerCard
            label="Focus"
            time="25:00"
            editable
            bgClass="bg-brown-200 dark:bg-dark-900/75"
          />
          <TimerCard
            label="Break"
            time="05:00"
            editable
            bgClass="bg-brown-200/50 dark:bg-dark-900/45"
          />
          <TimerCard
            label="Long break"
            time="15:00"
            editable
            bgClass="bg-brown-200/25 dark:bg-dark-900/35"
          />
        </div>

        <HorizontalDivider className="my-9" />

        <SubHeaderDescription
          header={"Automation"}
          description={"Auto start settings and overtime actions."}
          className="mt-6"
        />
        <section className="my-9 space-y-6">
          <Toggle
            label="Break cycle: Auto start"
            description="Automatically start a break cycle when you end a focus session."
          />
          {/* Divider: */}
          <HorizontalDivider className="opacity-25" />
          <Toggle
            label="Focus cycle: Auto start"
            description="Automatically start the next focus cycle when your break ends."
          />
        </section>
      </div>
    </>
  );
}
