import { useAppStore } from "@/store";
import { checkDailyReset } from "@/lib/dailyReset";

export async function hydrateStore(): Promise<void> {
  const { loadSettings, loadTasks, recoverDraft, setHasDraftToRecover } =
    useAppStore.getState();

  await loadSettings();

  // Detect timezone on first boot and persist if not already set
  const { settings, updateSettings } = useAppStore.getState();
  if (!settings.timezone) {
    const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await updateSettings({ timezone: detectedTz });
  }

  await checkDailyReset();

  await loadTasks();

  const hasDraft = await recoverDraft();
  if (hasDraft) {
    setHasDraftToRecover(true);
  }
}
