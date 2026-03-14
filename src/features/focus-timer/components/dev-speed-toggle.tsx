import { useState } from "react";
import { timerBridge } from "../services/timerBridge";

const SPEEDS = [1, 90] as const;

export default function DevSpeedToggle() {
  const [speed, setSpeed] = useState(1);

  const toggle = () => {
    const next = speed === 1 ? 90 : 1;
    setSpeed(next);
    timerBridge.setSpeed(next);
  };

  return (
    <button
      onClick={toggle}
      className="fixed right-3 bottom-3 z-50 rounded-full border border-zinc-400 bg-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300 opacity-60 hover:opacity-100"
    >
      {speed}x
    </button>
  );
}
