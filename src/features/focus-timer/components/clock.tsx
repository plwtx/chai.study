import FlipClock from "./clock/flip-clock";
import SlideClock from "./clock/slide-clock";
import BlurClock from "./clock/blur-clock";
import MorphClock from "./clock/morph-clock";
import MatrixClock from "./clock/matrix-clock";

const CLOCK_VARIANT: ClockVariant = "slide";

type ClockVariant = "flip" | "slide" | "blur" | "morph" | "matrix" | "default";

interface ClockProps {
  seconds: number;
}

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(Math.abs(totalSeconds) / 60);
  const secs = Math.abs(totalSeconds) % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Clock({ seconds }: ClockProps) {
  switch (CLOCK_VARIANT) {
    case "flip":
      return <FlipClock seconds={seconds} />;
    case "slide":
      return <SlideClock seconds={seconds} />;
    case "blur":
      return <BlurClock seconds={seconds} />;
    case "morph":
      return <MorphClock seconds={seconds} />;
    case "matrix":
      return <MatrixClock seconds={seconds} />;
    default:
      return (
        <h1 className="font-poppins text-9xl font-extrabold antialiased">
          {formatTime(seconds)}
        </h1>
      );
  }
}
