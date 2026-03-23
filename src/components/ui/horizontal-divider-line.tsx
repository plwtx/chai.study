import { cn } from "@/lib/utils";

export default function HorizontalDivider({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "bg-brown-300 dark:bg-dark-100/20 mx-auto my-3 h-px w-full rounded-full",
          className
        )}
      />
    </>
  );
}
