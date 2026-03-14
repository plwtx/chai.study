import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useTimer } from "../hooks/useTimer";
import { useAppStore } from "@/store/index";
import { DEFAULT_SETTINGS } from "@/store/slices/settingsSlice";

// ─── Hoist mocks so factory and test share the same closures ─────────────────
const { mockBridge, fireTick, fireComplete } = vi.hoisted(() => {
  let _tickCb: (s: number) => void = () => {};
  let _completeCb: () => void = () => {};

  const bridge = {
    start: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    reset: vi.fn(),
    onTick: vi.fn((cb: (s: number) => void) => {
      _tickCb = cb;
      return () => {};
    }),
    onComplete: vi.fn((cb: () => void) => {
      _completeCb = cb;
      return () => {};
    }),
    destroy: vi.fn(),
  };

  return {
    mockBridge: bridge,
    fireTick: (s: number) => _tickCb(s),
    fireComplete: () => _completeCb(),
  };
});

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

vi.mock("@/features/focus-timer/services/timerBridge", () => ({
  timerBridge: mockBridge,
}));

vi.mock("@/db", () => ({ db: mockDb }));

const FOCUS_SEC = DEFAULT_SETTINGS.focusDuration; // 1500

const INITIAL_STATE = {
  status: "idle" as const,
  mode: "focus" as const,
  elapsed: 0,
  targetDuration: 0,
  pomodoroSetId: null,
  taskId: null,
  focusCount: 0,
  hasDraftToRecover: false,
  tasks: [],
  activeTaskId: null,
  settings: DEFAULT_SETTINGS,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Simulate `count` worker tick events.
 *
 * Each tick fires the hook's onTick callback which calls store.tick()
 * (incrementing `elapsed` by 1).  The argument to fireTick is ignored by
 * the new hook — we pass 0 as a dummy.
 */
function simulateTicks(count: number) {
  vi.advanceTimersByTime(count * 1000);
  for (let i = 0; i < count; i++) {
    fireTick(0);
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("useTimer — start → pause (9:31 left) → resume → finish × 3", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-14T10:00:00.000Z"));
    useAppStore.setState(INITIAL_STATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * One full Pomodoro cycle:
   *
   *   start
   *   → tick 929 s (elapsed 0 → 929, display 1500 → 571)
   *   → pause
   *   → wait 30 s (wall-clock, no ticks)
   *   → resume
   *   → tick 570 s (elapsed 929 → 1499, display 571 → 1)
   *   → final tick + complete (elapsed 1500, display 0)
   *   → finish() writes session to Dexie
   *   → endCycle resets to idle
   *
   * Running time: 929 + 571 = 1500 s (pause excluded) → actualDuration == targetDuration.
   */
  function runOneCycle(
    result: ReturnType<
      typeof renderHook<ReturnType<typeof useTimer>, unknown>
    >["result"],
    expectedFocusCount: number,
  ) {
    vi.clearAllMocks();

    // ── Start ───────────────────────────────────────────────────────────────
    act(() => {
      result.current.start();
    });
    expect(result.current.status).toBe("running");
    expect(mockBridge.start).toHaveBeenCalledWith("countdown", FOCUS_SEC);
    expect(mockDb.sessionDraft.put).toHaveBeenCalledOnce();

    // ── Tick 929 times (elapsed 0 → 929, seconds display 1500 → 571) ────
    act(() => {
      simulateTicks(929);
    });
    expect(result.current.seconds).toBe(571);

    // ── Pause ───────────────────────────────────────────────────────────────
    act(() => {
      result.current.pause();
    });
    expect(result.current.status).toBe("paused");
    expect(mockBridge.pause).toHaveBeenCalledOnce();
    expect(mockDb.sessionDraft.update).toHaveBeenCalled();

    // ── 30 s elapse while paused (wall clock advances, no ticks) ────────
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current.seconds).toBe(571); // unchanged during pause

    // ── Resume ──────────────────────────────────────────────────────────────
    act(() => {
      result.current.start();
    });
    expect(result.current.status).toBe("running");
    expect(mockBridge.resume).toHaveBeenCalledOnce();

    // ── Tick 570 more (elapsed 929 → 1499, seconds 571 → 1) ─────────────
    act(() => {
      simulateTicks(570);
    });

    // ── Final tick + complete ────────────────────────────────────────────
    act(() => {
      vi.advanceTimersByTime(1000);
      fireTick(0);
      fireComplete();
    });

    // Session finished and saved to Dexie
    expect(result.current.status).toBe("finished");
    expect(mockDb.sessions.add).toHaveBeenCalledOnce();
    expect(mockDb.sessions.add).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "focus",
        targetDuration: FOCUS_SEC,
        actualDuration: FOCUS_SEC,
        interrupted: false,
      }),
    );
    expect(mockDb.sessionDraft.delete).toHaveBeenCalledWith("current");
    expect(useAppStore.getState().focusCount).toBe(expectedFocusCount);

    // ── End cycle (already finished — no double save) ───────────────────
    act(() => {
      result.current.endCycle();
    });
    expect(result.current.status).toBe("idle");
    expect(result.current.mode).toBe("focus");
    expect(mockBridge.reset).toHaveBeenCalledOnce();
  }

  it("records one focus session per cycle across 3 repetitions", () => {
    const { result } = renderHook(() => useTimer());

    for (let i = 0; i < 3; i++) {
      runOneCycle(result, i + 1);
    }

    expect(useAppStore.getState().focusCount).toBe(3);
  });
});
