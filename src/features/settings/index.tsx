import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SettingsNav, { type SettingsCategory } from "./components/settings-nav";
import GeneralSettings from "./components/settings-general";
import ClockSettings from "./components/settings-clock";
import ThemeSettings from "./components/settings-theme";
import StorageSettings from "./components/settings-storage";
import InformationSettings from "./components/settings-information";

const CATEGORIES: SettingsCategory[] = [
  { id: "general", name: "General" },
  { id: "clock", name: "Clock" },
  { id: "theme", name: "Theme" },
  { id: "storage", name: "Storage" },
  { id: "information", name: "Information" },
];

const CATEGORY_COMPONENTS: Record<string, React.ComponentType> = {
  general: GeneralSettings,
  clock: ClockSettings,
  theme: ThemeSettings,
  storage: StorageSettings,
  information: InformationSettings,
};

export default function Settings() {
  const [activeId, setActiveId] = useState("general");
  const ActivePanel = CATEGORY_COMPONENTS[activeId];

  return (
    <div className="bg-brown-50 dark:bg-dark-600 font-poppins h-dvh w-full p-9">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mt-19 flex h-dvh w-full max-w-7xl items-center justify-center">
          <div className="flex h-full w-full">
            <SettingsNav
              categories={CATEGORIES}
              activeId={activeId}
              onSelect={setActiveId}
            />
            <main className="h-full w-full overflow-hidden rounded-2xl p-6 pt-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="h-full w-full"
                >
                  <ActivePanel />
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
