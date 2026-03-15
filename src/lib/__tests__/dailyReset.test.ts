import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useAppStore } from "@/store/index";
import { DEFAULT_SETTINGS } from "@/store/slices/settingsSlice";

const { mockDb } = vi.hoisted(() => ({
  mockDb: {
    sessions: { add: vi.fn(() => Promise.resolve()) },
    sessionDraft: {
      put: vi.fn(() => Promise.resolve()),
      update: vi.fn(() => Promise.resolve()),
      delete: vi.fn(() => Promise.resolve()),
      get: vi.fn(() => Promise.resolve(undefined)),
    },
    tasks: {
      orderBy: vi.fn(() => ({
        toArray: vi.fn(() => Promise.resolve([])),
      })),
    },
    settings: {
      get: vi.fn(() => Promise.resolve(undefined)),
      put: vi.fn(() => Promise.resolve()),
    },
  },
}));

vi.mock("@/db", () => ({ db: mockDb }));

describe("checkDailyReset", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resets dailyFocusCount when midnight passes in the user's timezone", async () => {
    const tz = "America/New_York";

    // Simulate: user last active on March 14 (ET) with 5 focus sessions
    const yesterdaySettings = {
      ...DEFAULT_SETTINGS,
      timezone: tz,
      lastActiveDate: "2026-03-14",
      dailyFocusCount: 5,
    };

    // Dexie returns yesterday's settings
    mockDb.settings.get.mockResolvedValue(yesterdaySettings);

    // Hydrate Zustand with the same state
    useAppStore.setState({ settings: yesterdaySettings });

    // Set system time to March 15 00:01 AM ET (= 05:01 UTC, since ET is UTC-4 in March DST)
    vi.setSystemTime(new Date("2026-03-15T04:01:00.000Z"));

    const { checkDailyReset } = await import("@/lib/dailyReset");
    const didReset = await checkDailyReset();

    expect(didReset).toBe(true);

    const { settings } = useAppStore.getState();
    expect(settings.dailyFocusCount).toBe(0);
    expect(settings.lastActiveDate).toBe("2026-03-15");

    expect(mockDb.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "app",
        dailyFocusCount: 0,
        lastActiveDate: "2026-03-15",
      })
    );
  });

  it("does NOT reset when the date has not changed", async () => {
    const tz = "America/New_York";

    const todaySettings = {
      ...DEFAULT_SETTINGS,
      timezone: tz,
      lastActiveDate: "2026-03-14",
      dailyFocusCount: 3,
    };

    mockDb.settings.get.mockResolvedValue(todaySettings);
    useAppStore.setState({ settings: todaySettings });

    // Still March 14 in ET (23:59 ET = 03:59 UTC on March 15, since ET is UTC-4)
    vi.setSystemTime(new Date("2026-03-15T03:59:00.000Z"));

    const { checkDailyReset } = await import("@/lib/dailyReset");
    const didReset = await checkDailyReset();

    expect(didReset).toBe(false);

    const { settings } = useAppStore.getState();
    expect(settings.dailyFocusCount).toBe(3);
    expect(settings.lastActiveDate).toBe("2026-03-14");
  });

  it("resets correctly for a different timezone (Asia/Tokyo, UTC+9)", async () => {
    const tz = "Asia/Tokyo";

    const yesterdaySettings = {
      ...DEFAULT_SETTINGS,
      timezone: tz,
      lastActiveDate: "2026-03-14",
      dailyFocusCount: 7,
    };

    mockDb.settings.get.mockResolvedValue(yesterdaySettings);
    useAppStore.setState({ settings: yesterdaySettings });

    // March 15 00:01 JST = March 14 15:01 UTC
    vi.setSystemTime(new Date("2026-03-14T15:01:00.000Z"));

    const { checkDailyReset } = await import("@/lib/dailyReset");
    const didReset = await checkDailyReset();

    expect(didReset).toBe(true);

    const { settings } = useAppStore.getState();
    expect(settings.dailyFocusCount).toBe(0);
    expect(settings.lastActiveDate).toBe("2026-03-15");
  });
});
