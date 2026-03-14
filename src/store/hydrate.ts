import { useAppStore } from "@/store";

export async function hydrateStore(): Promise<void> {
  const { loadSettings, loadTasks, recoverDraft, setHasDraftToRecover } =
    useAppStore.getState();

  await loadSettings();
  await loadTasks();

  const hasDraft = await recoverDraft();
  if (hasDraft) {
    setHasDraftToRecover(true);
  }
}
