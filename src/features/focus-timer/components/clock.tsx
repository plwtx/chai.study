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
    <h1 className="font-poppins text-9xl font-extrabold antialiased">
      {formatTime(seconds)}
    </h1>
  );
}
