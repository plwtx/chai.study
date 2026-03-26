import { useState } from "react";
import { useAppStore } from "@/store";
import SubHeaderDescription from "@/components/ui/sub-header-description";

export default function AccentColorPicker() {
  const accentColor = useAppStore((s) => s.settings.accentColor);
  const setAccentColor = useAppStore((s) => s.setAccentColor);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  return (
    <section>
      <SubHeaderDescription
        header={"Accent color"}
        description={"Personalize the accent color used across the app"}
      />

      <div className="flex items-center gap-4 py-4">
        <button
          onClick={() => setColorPickerOpen(!colorPickerOpen)}
          className="border-brown-200/75 shadow-brown-300 dark:bg-dark-900/45 bg-brown-100 dark:border-dark-900 flex cursor-pointer items-center gap-3 rounded-lg border p-2 px-4 shadow-sm active:scale-95 dark:shadow-black"
        >
          <div
            className="h-6 w-6 rounded-full border border-black/10"
            style={{ backgroundColor: accentColor }}
          />
          <span className="font-fragment-mono text-xs">{accentColor}</span>
        </button>
        {colorPickerOpen && (
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="h-10 w-10 cursor-pointer border-none bg-transparent"
          />
        )}
      </div>
    </section>
  );
}
