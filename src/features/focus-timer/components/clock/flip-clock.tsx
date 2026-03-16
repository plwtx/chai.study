import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface FlipDigitProps {
  digit: string;
}

function FlipDigit({ digit }: FlipDigitProps) {
  const [current, setCurrent] = useState(digit);
  const [previous, setPrevious] = useState(digit);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (digit !== current) {
      setPrevious(current);
      setCurrent(digit);
    }
  }, [digit]);

  return (
    <div
      className="relative inline-flex h-[1em] w-[0.65em] items-center justify-center"
      style={{ perspective: "300px" }}
    >
      {/* Static bottom half — shows NEXT digit */}
      <div className="absolute inset-0 overflow-hidden rounded-b-[0.06em]">
        <div className="bg-brown-800 flex h-full w-full items-center justify-center">
          <span className="text-brown-100 select-none">{current}</span>
        </div>
      </div>

      {/* Static top half — shows CURRENT digit */}
      <div className="absolute inset-0 bottom-1/2 overflow-hidden rounded-t-[0.06em]">
        <div className="bg-brown-700 flex h-[200%] w-full items-center justify-center">
          <span className="text-brown-100 select-none">{current}</span>
        </div>
      </div>

      {/* Divider line */}
      <div className="bg-brown-900/40 absolute inset-x-0 top-1/2 z-20 h-px" />

      {/* Flipping panel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          className="absolute inset-0 bottom-1/2 origin-bottom overflow-hidden rounded-t-[0.06em]"
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: -90,
            transition: {
              duration: 0.3,
              ease: [0.37, 0, 0.63, 1],
            },
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="bg-brown-700 flex h-[200%] w-full items-center justify-center">
            <span className="text-brown-100 select-none">{previous}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={current + "-bottom"}
          className="absolute inset-0 top-1/2 origin-top overflow-hidden rounded-b-[0.06em]"
          initial={{ rotateX: 90 }}
          animate={{
            rotateX: 0,
            transition: {
              duration: 0.3,
              delay: 0.15,
              ease: [0.37, 0, 0.63, 1],
            },
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="bg-brown-800 flex h-[200%] w-full -translate-y-1/2 items-center justify-center">
            <span className="text-brown-100 select-none">{current}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface FlipClockProps {
  seconds: number;
}

function formatDigits(totalSeconds: number) {
  const mins = Math.floor(Math.abs(totalSeconds) / 60);
  const secs = Math.abs(totalSeconds) % 60;
  const str = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return str.split("");
}

export default function FlipClock({ seconds }: FlipClockProps) {
  const digits = formatDigits(seconds);

  return (
    <div className="flex items-center gap-1 text-9xl font-extrabold">
      {digits.map((char, i) =>
        char === ":" ? (
          <span key="colon" className="text-brown-500 mx-1 select-none">
            :
          </span>
        ) : (
          <FlipDigit key={i} digit={char} />
        ),
      )}
    </div>
  );
}
