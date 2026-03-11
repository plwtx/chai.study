type InMessage =
  | {
      type: "start";
      payload: { mode: "countup" | "countdown"; initialSeconds: number };
    }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "reset" };

type OutMessage =
  | { type: "tick"; payload: { seconds: number } }
  | { type: "complete" };

let intervalId: ReturnType<typeof setInterval> | null = null;
let seconds = 0;
let tickMode: "countup" | "countdown" = "countup";

function tick() {
  if (tickMode === "countup") {
    seconds++;
    self.postMessage({
      type: "tick",
      payload: { seconds },
    } satisfies OutMessage);
  } else {
    seconds--;
    self.postMessage({
      type: "tick",
      payload: { seconds },
    } satisfies OutMessage);
    if (seconds <= 0) {
      clearInterval(intervalId!);
      intervalId = null;
      self.postMessage({ type: "complete" } satisfies OutMessage);
    }
  }
}

self.onmessage = (e: MessageEvent<InMessage>) => {
  const msg = e.data;

  switch (msg.type) {
    case "start": {
      if (intervalId) clearInterval(intervalId);
      tickMode = msg.payload.mode;
      seconds = msg.payload.initialSeconds;
      intervalId = setInterval(tick, 1000);
      break;
    }
    case "pause": {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      break;
    }
    case "resume": {
      if (!intervalId) {
        intervalId = setInterval(tick, 1000);
      }
      break;
    }
    case "reset": {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      seconds = 0;
      break;
    }
  }
};
