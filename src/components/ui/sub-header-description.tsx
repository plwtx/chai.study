export default function SubHeaderDescription({
  header,
  description,
}: {
  header: string;
  description: string;
}) {
  return (
    <>
      <div className="text-brown-900 dark:text-dark-100">
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
