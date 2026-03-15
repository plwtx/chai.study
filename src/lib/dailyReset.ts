import { db } from "@/db";
import { useAppStore } from "@/store";
import { DEFAULT_SETTINGS } from "@/store/slices/settingsSlice";

export async function checkDailyReset(): Promise<boolean> {
  const stored = await db.settings.get("app");
  const settings = { ...DEFAULT_SETTINGS, ...stored };

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: settings.timezone,
  });

  if (today !== settings.lastActiveDate) {
    const patch = { dailyFocusCount: 0, lastActiveDate: today };
    await useAppStore.getState().updateSettings(patch);
    return true;
  }

  return false;
}
