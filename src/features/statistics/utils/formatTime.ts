export function formatTime(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

export function formatTimeSplit(minutes: number): {
  value: number;
  topLabel: string;
} {
  if (minutes < 60) return { value: Math.round(minutes), topLabel: "min" };
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return { value: hrs, topLabel: mins > 0 ? `hr ${mins} min` : "hr" };
}
