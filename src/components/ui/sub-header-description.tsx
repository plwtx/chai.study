import { cn } from "@/lib/utils";

export default function SubHeaderDescription({
  header,
  description,
  className,
}: {
  header: string;
  description: string;
  className?: string;
}) {
  return (
    <>
      <div className={cn("text-brown-900 dark:text-dark-100", className)}>
        {/* Title */}
        <h3 className="text-base font-medium">{header}</h3>
        {/* Description */}
        <p className="font-fragment-mono text-brown-900/75 dark:text-dark-100/65 text-xs">
          {description}
        </p>
      </div>
    </>
  );
}
