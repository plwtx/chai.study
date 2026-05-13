import { useAppStore } from "@/store";
import { useHydrationStore } from "@/store/hydration";
import { checkDailyReset } from "@/lib/dailyReset";
import { db } from "@/db";

const STAGE_DWELL_MS = 120;

async function withDwell<T>(work: Promise<T>): Promise<T> {
  const [result] = await Promise.all([
    work,
    new Promise((r) => setTimeout(r, STAGE_DWELL_MS)),
  ]);
  return result;
}

export async function hydrateStore(): Promise<void> {
  const hydration = useHydrationStore.getState();

  try {
    hydration.setStage("storage", "Initializing local storage", 10);
    await withDwell(db.open());

    hydration.setStage("settings", "Loading settings", 25);
    const { loadSettings, loadTasks, recoverDraft, setHasDraftToRecover } =
      useAppStore.getState();
    await withDwell(loadSettings());

    hydration.setStage("timezone", "Detecting timezone", 40);
    const { settings, updateSettings } = useAppStore.getState();
    const tzWork = !settings.timezone
      ? updateSettings({
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      : Promise.resolve();
    await withDwell(tzWork);

    hydration.setStage("daily-reset", "Checking daily reset", 55);
    await withDwell(checkDailyReset());

    hydration.setStage("tasks", "Loading tasks", 70);
    await withDwell(loadTasks());

    hydration.setStage("fonts", "Loading fonts", 85);
    const fontWork = document.fonts
      ? document.fonts.load("800 1rem Poppins").then(() => undefined)
      : Promise.resolve();
    await withDwell(fontWork);

    hydration.setStage("draft", "Recovering session", 95);
    const hasDraft = await withDwell(recoverDraft());
    if (hasDraft) {
      setHasDraftToRecover(true);
    }

    hydration.finish();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to initialize app";
    hydration.fail(message);
    throw err;
  }
}
