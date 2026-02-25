import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

export const TypewriterText = ({
  text,
  className = "",
  delay = 0,
  triggerOnScroll = true,
  threshold = 0.5,
  repeat = false,
  speed = 0.03,
}) => {
  const ref = useRef(null);

  const wordsData = useMemo(() => {
    let globalIndex = 0;
    return text.split(" ").map((word) => {
      const startIndex = globalIndex;
      globalIndex += word.length;
      return { word, startIndex };
    });
  }, [text]);

  const isInView = useInView(ref, {
    once: !repeat,
    amount: threshold,
  });

  const shouldAnimate = triggerOnScroll ? isInView : true;

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {wordsData.map(({ word, startIndex }, i) => (
          <span key={i} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${i}-${charIndex}`}
                initial={{ opacity: 0, y: 5 }}
                animate={
                  shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }
                }
                transition={{
                  duration: 0.1,
                  delay: delay + (startIndex + charIndex) * speed,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </span>
    </h2>
  );
};
