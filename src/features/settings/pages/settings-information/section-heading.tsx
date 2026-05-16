import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-poppins text-brown-900 dark:text-dark-100 text-base font-medium",
        className
      )}
    >
      {children}
    </h2>
  );
}
