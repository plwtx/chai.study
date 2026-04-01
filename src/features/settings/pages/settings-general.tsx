import { useState } from "react";
import { useAppStore } from "@/store";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import HeaderDescription from "@/components/ui/header-description";
import AutomationToggle from "../components/automation-toggle";
import { showSettingsToast } from "../components/settings-toast";

export default function General() {
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion);
  const dynamicTitlebar = useAppStore((s) => s.settings.dynamicTitlebar);
  const titlebarSeparator = useAppStore((s) => s.settings.titlebarSeparator);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const [separatorDraft, setSeparatorDraft] = useState(titlebarSeparator);

  return (
    <>
      <main>
        <HeaderDescription
          header={"General application settings"}
          description={
            "General settings that control the behavior of application itself. You can find accessibility related settings and more."
          }
          kaomoji={null}
        />
        <HorizontalDivider />
        <section className="mt-6 flex flex-col gap-6">
          <AutomationToggle
            label="Reduced motion"
            description="Disables animations, smoothed transitions and keeps the app minimal."
            checked={reducedMotion}
            onChange={() => {
              updateSettings({ reducedMotion: !reducedMotion });
              showSettingsToast(
                `Reduced motion ${reducedMotion ? "disabled" : "enabled"}.`
              );
            }}
          />
          <AutomationToggle
            label="Dynamic titlebar"
            description="Dynamic titlebar that shows time + mode."
            checked={dynamicTitlebar}
            onChange={() => {
              updateSettings({ dynamicTitlebar: !dynamicTitlebar });
              showSettingsToast(
                `Dynamic titlebar ${dynamicTitlebar ? "disabled" : "enabled"}.`
              );
            }}
          />
          {dynamicTitlebar && (
            <div className="text-brown-900 dark:text-dark-100 flex w-full items-center justify-between">
              <div className="text-base">
                <h3 className="font-semibold">Custom titlebar separator</h3>
                <p className="text-sm opacity-75">
                  Separates time and mode in the titlebar. Default is{" "}
                  <span className="font-mono">-</span>.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={separatorDraft}
                  maxLength={5}
                  onChange={(e) => setSeparatorDraft(e.target.value)}
                  className="bg-brown-200 dark:bg-dark-900/75 text-brown-900 dark:text-dark-100 w-16 rounded px-2 py-1 text-center font-mono text-sm outline-none"
                  aria-label="Titlebar separator"
                />
                <button
                  onClick={() => {
                    const value = separatorDraft || "-";
                    setSeparatorDraft(value);
                    updateSettings({ titlebarSeparator: value });
                    showSettingsToast("Titlebar seperator saved as: " + value);
                  }}
                  className="bg-brown-300 dark:bg-dark-900/75 text-brown-900 dark:text-dark-100 rounded px-3 py-1 text-sm hover:opacity-80"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
