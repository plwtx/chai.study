import { cn } from "@/lib/utils";

export default function HeaderDescription({
  header,
  description,
  kaomoji,
  className,
}: {
  header: string;
  description: string;
  kaomoji?: string | null;
  className?: string;
}) {
  return (
    <>
      <div className={cn("text-brown-900 dark:text-dark-100", className)}>
        {/* Title */}
        <h1 className="font-poppins text-lg font-medium">{header}</h1>

        {/* Description */}
        <p className="text-brown-600 dark:text-dark-100/55 font-fragment-mono py-3 text-sm leading-6">
          {description}

          {kaomoji && (
            <span className="bg-brown-200 dark:bg-dark-900 dark:text-dark-100 text-brown-900 border-brown-700 mx-3 inline rounded-lg border p-1 px-3 text-xs text-nowrap dark:border-black">
              {kaomoji}
            </span>
          )}
        </p>
      </div>
    </>
  );
}
