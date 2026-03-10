interface ClockProps {
  seconds: number;
}

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(Math.abs(totalSeconds) / 60);
  const secs = Math.abs(totalSeconds) % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Clock({ seconds }: ClockProps) {
  return (
    <h1 className="font-sans text-9xl font-semibold antialiased">
      {formatTime(seconds)}
    </h1>
  );
}
