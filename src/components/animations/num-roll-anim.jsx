import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NumberRoller({
  number,
  className,
  delay = 0,
  triggerOnScroll = true,
  threshold = 0.5,
  repeat = false,
  duration = 1.5,
  startColor = "text-inherit",
  endColor = "text-inherit",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: !repeat,
    margin: `0px 0px -${(1 - threshold) * 100}% 0px`,
  });
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false);

  // Numbler splitting
  const digits = number.toString().split("").map(Number);

  useEffect(() => {
    if (triggerOnScroll) {
      if (isInView) {
        const timer = setTimeout(() => setActive(true), delay * 1000);
        return () => clearTimeout(timer);
      } else if (repeat) {
        setActive(false);
        setFinished(false);
      }
    } else {
      setActive(true);
    }
  }, [triggerOnScroll, isInView, delay, repeat]);

  // State handle
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setFinished(true);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex overflow-hidden leading-none tracking-tight",
        "transition-colors duration-500 ease-out",
        finished ? endColor : startColor,
        className,
      )}
    >
      <div className="flex">
        {digits.map((digit, index) => (
          <DigitColumn
            key={`${index}-${digit}`}
            digit={digit}
            active={active}
            duration={duration}
            delay={index * 0.1}
          />
        ))}
      </div>
      <span className="sr-only">{number}</span>
    </div>
  );
}

function DigitColumn({ digit, active, duration, delay }) {
  const [height, setHeight] = useState(0);
  const columnRef = useRef(null);

  useEffect(() => {
    if (columnRef.current) {
      // Height of one digit
      const singleDigitHeight = columnRef.current.scrollHeight / 10;
      setHeight(singleDigitHeight);
    }
  }, []);

  return (
    <div
      className="relative"
      style={{ height: height || "auto", width: "0.6em" }}
    >
      <motion.div
        ref={columnRef}
        initial={{ y: 0 }}
        animate={{ y: active ? -1 * digit * height : 0 }}
        transition={{
          duration: duration,
          ease: [0.12, 1, 0.39, 1],
          delay: delay,
        }}
        className="absolute top-0 left-0 flex flex-col items-center justify-center"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="block touch-none text-center select-none">
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
