import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useTimer } from "../hooks/useTimer";
import { useAppStore } from "@/store/index";

// ─── Hoist bridge mock so factory and test share the same closures ────────────
// NOTE FOR FUTURE
// vi.mock() is hoisted to the top of the file by Vitest, so any variables it
// closes over must also be hoisted via vi.hoisted().  The returned object is
// shared between the mock factory below and the test bodies.
const { mockBridge, fireTick, fireComplete } = vi.hoisted(() => {
  let _tickCb: (s: number) => void = () => {};
  let _completeCb: () => void = () => {};

  const bridge = {
    start: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    reset: vi.fn(),
    // Store the registered callback so tests can trigger ticks/completes manually.
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

vi.mock("@/features/focus-timer/services/timerBridge", () => ({
  timerBridge: mockBridge,
}));

const POMODORO_SEC = 25 * 60; // 1500 s

const INITIAL_STATE = {
  phase: "focus" as const,
  running: false,
  seconds: POMODORO_SEC,
  overtime: false,
  pomodoroCount: 0,
  pomodoroSetId: null,
  sessionStartedAt: null,
  timerSettings: {
    pomodoro: 25,
    breakDuration: 5,
    longBreak: 15,
    minimumFocusTime: 5,
  },
  sessions: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Advance the fake clock `count` seconds and emit a tick message for each
 * second, counting down from `fromSeconds`.
 *
 * This mirrors what the Web Worker does: one tick per second, decrementing.
 */
function simulateTicks(fromSeconds: number, count: number) {
  vi.advanceTimersByTime(count * 1000);
  for (let i = 1; i <= count; i++) {
    fireTick(fromSeconds - i);
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useTimer — start → pause (9:31 left) → resume → finish × 3", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-14T10:00:00.000Z"));
    // Merge state values back to initial — do NOT pass `true` (replace) or
    // Zustand will wipe out the action functions alongside the state.
    useAppStore.setState(INITIAL_STATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * One full Pomodoro cycle:
   *
   *   start
   *   → tick 929 s down (1500 → 571 s, i.e. 9:31 left)
   *   → pause
   *   → wait 30 s (real-time pause; no ticks)
   *   → resume
   *   → tick 570 s down (571 → 1 s)
   *   → final tick to 0 + complete fires
   *   → overtime mode active
   *   → endCycle (user exits immediately — 0 overtime seconds < 5-min minimum)
   *
   * Running time: 929 + 571 = 1500 s (pause not counted) → actualDuration == targetDuration.
   */
  function runOneCycle(
    result: ReturnType<
      typeof renderHook<ReturnType<typeof useTimer>, unknown>
    >["result"],
    expectedSessionCount: number
  ) {
    // Reset mock call counts for clean per-cycle assertions.
    vi.clearAllMocks();

    // ── Start ─────────────────────────────────────────────────────────────────
    act(() => {
      result.current.start();
    });
    expect(result.current.status).toBe("running");
    expect(mockBridge.start).toHaveBeenCalledWith("countdown", POMODORO_SEC);

    // ── Tick down to 9:31 left (1500 → 571 s, 929 ticks) ─────────────────────
    act(() => {
      simulateTicks(POMODORO_SEC, 929);
    });
    expect(result.current.seconds).toBe(571); // 9 min 31 s remaining

    // ── Pause ─────────────────────────────────────────────────────────────────
    act(() => {
      result.current.pause();
    });
    expect(result.current.status).toBe("paused");
    expect(mockBridge.pause).toHaveBeenCalledOnce();

    // ── 30 s elapse while paused (wall clock advances, no ticks) ─────────────
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current.seconds).toBe(571); // seconds unchanged during pause

    // ── Resume ────────────────────────────────────────────────────────────────
    // start() branches to timerBridge.resume() when status === "paused"
    act(() => {
      result.current.start();
    });
    expect(result.current.status).toBe("running");
    expect(mockBridge.resume).toHaveBeenCalledOnce();

    // ── Tick down 570 s (571 → 1 s) ───────────────────────────────────────────
    act(() => {
      simulateTicks(571, 570);
    });

    // ── Final tick to 0 + complete (worker emits both in the same callback) ───
    act(() => {
      vi.advanceTimersByTime(1000);
      fireTick(0);
      fireComplete(); // triggers: addSession, setOvertime(true), bridge.start("countup")
    });

    // Overtime activated; hook re-started bridge in countup mode
    expect(result.current.overtime).toBe(true);
    expect(mockBridge.start).toHaveBeenLastCalledWith("countup", POMODORO_SEC);

    // Focus session recorded with running-time actualDuration:
    // Countdown completed naturally → actualDuration == targetDuration (1500 s).
    // Paused time (30 s) is not counted.
    const sessions = useAppStore.getState().sessions;
    const focusSessions = sessions.filter((s) => s.mode === "focus");
    expect(focusSessions).toHaveLength(expectedSessionCount);
    expect(focusSessions.at(-1)).toMatchObject({
      type: "pomodoro",
      mode: "focus",
      targetDuration: POMODORO_SEC,
      actualDuration: POMODORO_SEC,
    });

    // ── End cycle ─────────────────────────────────────────────────────────────
    // User exits overtime immediately; 0 overtime seconds < 5-min minimum,
    // so no extra session is recorded.  resetTimer() returns to idle focus.
    act(() => {
      result.current.endCycle();
    });
    expect(result.current.status).toBe("idle");
    expect(result.current.overtime).toBe(false);
    expect(result.current.phase).toBe("focus");
    expect(result.current.seconds).toBe(POMODORO_SEC);
    expect(mockBridge.reset).toHaveBeenCalledOnce();
  }

  it("records one focus session per cycle across 3 repetitions", () => {
    const { result } = renderHook(() => useTimer());

    // Sessions accumulate in the store across all three cycles.
    for (let i = 0; i < 3; i++) {
      runOneCycle(result, i + 1);
    }

    const sessions = useAppStore.getState().sessions;
    expect(sessions).toHaveLength(3);
    sessions.forEach((s) => {
      expect(s.mode).toBe("focus");
      expect(s.actualDuration).toBe(POMODORO_SEC);
    });
  });
});
