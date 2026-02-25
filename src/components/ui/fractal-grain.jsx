import { useId, useMemo, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_BLOB_COLORS = {
  first: "bg-white",
  second: "bg-royal-red",
  third: "bg-white",
};

const GrainyBackground = ({
  children,
  className,
  baseColor = "bg-white",
  blobColors = DEFAULT_BLOB_COLORS,
  speed = 1,
}) => {
  const id = useId();

  const blobVariants = useMemo(() => {
    const d1 = 7 / speed;
    const d2 = 9 / speed;
    const d3 = 6 / speed;

    return {
      animate1: {
        x: [0, 200, -100, 0],
        y: [0, -150, 100, 0],
        scale: [1, 1.3, 0.9, 1],
        transition: {
          duration: d1,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      animate2: {
        x: [0, -150, 100, 0],
        y: [0, 200, -100, 0],
        scale: [1, 1.2, 0.8, 1],
        transition: {
          duration: d2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      animate3: {
        x: [0, 100, -200, 0],
        y: [0, -100, 150, 0],
        scale: [1, 1.4, 1.1, 1],
        transition: {
          duration: d3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
    };
  }, [speed]);

  const noiseLayer = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-soft-light">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id={id}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.63"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 15 -7"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter={`url(#${id})`}
            fill="black"
          />
        </svg>
      </div>
    ),
    [id]
  );

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        baseColor,
        className
      )}
    >
      {/* Blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className={cn(
            "absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full mix-blend-screen blur-[100px] will-change-transform",
            blobColors.first
          )}
          variants={blobVariants}
          animate="animate1"
        />
        <motion.div
          className={cn(
            "absolute top-[30%] right-[0%] h-[70%] w-[70%] rounded-full mix-blend-screen blur-[120px] will-change-transform",
            blobColors.second
          )}
          variants={blobVariants}
          animate="animate2"
        />
        <motion.div
          className={cn(
            "absolute -bottom-[20%] left-[20%] h-[50%] w-[80%] rounded-full mix-blend-screen blur-[80px] will-change-transform",
            blobColors.third
          )}
          variants={blobVariants}
          animate="animate3"
        />
      </div>

      {noiseLayer}

      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
};

export default memo(GrainyBackground);
