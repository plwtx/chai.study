export default function StatsDateHeader() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate.toLocaleString("default", { weekday: "long" });

  return (
    <p className="font-poppins w-fit text-left text-xl leading-6">
      {day} {month} {year}, <br />
      <span className="font-semibold">{dayOfWeek}</span>
    </p>
  );
}
