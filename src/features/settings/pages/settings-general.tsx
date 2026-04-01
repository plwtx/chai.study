import { useAppStore } from "@/store";
import HorizontalDivider from "@/components/ui/horizontal-divider-line";
import HeaderDescription from "@/components/ui/header-description";
import AutomationToggle from "../components/automation-toggle";
import { showSettingsToast } from "../components/settings-toast";

export default function General() {
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion);
  const dynamicTitlebar = useAppStore((s) => s.settings.dynamicTitlebar);
  const updateSettings = useAppStore((s) => s.updateSettings);

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
        </section>
      </main>
    </>
  );
}
