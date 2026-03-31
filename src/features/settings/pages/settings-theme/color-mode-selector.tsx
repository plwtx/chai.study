import { Check, Cog } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import SubHeaderDescription from "@/components/ui/sub-header-description";
import { showSettingsToast } from "../../components/settings-toast";

export default function ColorModeSelector() {
  const theme = useAppStore((s) => s.settings.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  return (
    <section className="my-3 mt-6">
      <SubHeaderDescription
        header={"Color mode"}
        description={"Dark / Light / Auto (system)"}
      />

      <div className="flex w-full items-center justify-start gap-3 pt-6">
        {/* Light mode */}
        <section
          className="flex cursor-pointer flex-col items-center justify-center dark:brightness-80 dark:contrast-75"
          onClick={() => {
            setTheme("light");
            showSettingsToast("Theme changed to light.");
          }}
        >
          <div
            className={cn(
              "bg-brown-100 shadow-brown-300 text-brown-800 dark:shadow-dark-900 relative flex h-32 w-32 flex-col items-center justify-between rounded-xl border p-3 shadow-md transition-transform active:scale-95",
              theme === "light"
                ? "border-brown-800 border-2"
                : "border-brown-600"
            )}
          >
            <h6 className="touch-none text-[9px] font-light select-none">
              today
            </h6>
            <h6 className="touch-none text-[10px] font-medium select-none">
              00 hr. 31 min.
            </h6>
            <h6 className="touch-none text-3xl font-semibold select-none">
              25:00
            </h6>
            <h6 className="bg-brown-600 text-brown-50 shadow-brown-600 border-brown-700 w-full touch-none rounded-lg border border-b-8 p-1 px-3 text-center text-xs font-medium shadow-md select-none">
              start
            </h6>
          </div>
          <p className="mt-3 flex items-center gap-2 font-medium">
            {theme === "light" && <Check size={16} />} Light
          </p>
        </section>

        {/* Dark mode */}
        <section
          className="flex cursor-pointer flex-col items-center justify-center"
          onClick={() => {
            setTheme("dark");
            showSettingsToast("Theme changed to dark.");
          }}
        >
          <div
            className={cn(
              "bg-dark-600 text-dark-100 shadow-brown-300 dark:shadow-dark-900 dark:border-dark-100 relative flex h-32 w-32 flex-col items-center justify-between rounded-xl border p-3 shadow-md transition-transform active:scale-95",
              theme === "dark"
                ? "border-brown-800 border-2"
                : "border-brown-600"
            )}
          >
            <h6 className="touch-none text-[9px] font-light select-none">
              today
            </h6>
            <h6 className="touch-none text-[10px] font-medium select-none">
              00 hr. 31 min.
            </h6>
            <h6 className="touch-none text-3xl font-semibold select-none">
              25:00
            </h6>
            <h6 className="bg-dark-900 text-dark-100 shadow-dark-900 w-full touch-none rounded-lg border border-b-8 border-black p-1 px-3 text-center text-xs font-medium shadow-md select-none">
              start
            </h6>
          </div>
          <p className="mt-3 flex items-center gap-2 font-medium">
            {theme === "dark" && <Check size={16} />} Dark
          </p>
        </section>

        {/* Auto (system) mode */}
        <section
          className="group flex w-md cursor-pointer flex-col items-center justify-center dark:brightness-90 dark:contrast-90"
          onClick={() => {
            setTheme("system");
            showSettingsToast("Theme set to system default.");
          }}
        >
          <div
            className={cn(
              "bg-brown-100 dark:bg-dark-600 shadow-brown-300 dark:shadow-dark-600 dark:border-dark-900 relative flex h-32 w-full flex-col items-center justify-center overflow-clip rounded-xl border p-3 shadow-md transition-transform active:scale-95",
              theme === "system"
                ? "border-brown-800 border-2"
                : "border-brown-600"
            )}
          >
            <h6 className="font-fragment-mono z-10 text-sm font-light">
              system{" "}
              <span className="bg-dark-600 text-dark-100 shadow-dark-600/45 dark:bg-brown-600 rounded-lg p-1 px-3 font-semibold shadow-md">
                AUTO
              </span>
            </h6>
            <div className="from-brown-300 via-brown-500 to-dark-600 border-brown-900 shadow-brown-700 absolute right-0 h-200 w-1/6 rotate-12 border bg-linear-90 opacity-0 shadow-inner transition-all duration-1000 ease-in-out group-hover:w-4/5 group-hover:opacity-100" />
            {/* Light cog */}
            <Cog className="shadow-brown-700 bg-brown-200 absolute -top-12 -left-12 size-45 rounded-full stroke-[0.3px] shadow-md group-hover:animate-spin" />
            {/* Dark cog */}
            <Cog className="shadow-dark-600 bg-dark-600 text-dark-100 absolute -right-12 -bottom-9 size-32 rotate-45 rounded-full stroke-[0.3px] shadow-md group-hover:animate-spin" />
          </div>
          <p className="mt-3 flex items-center gap-2 font-medium">
            {theme === "system" && <Check size={16} />} Auto (system default)
          </p>
        </section>
      </div>
    </section>
  );
}
