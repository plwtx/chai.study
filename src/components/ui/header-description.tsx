export default function HeaderDescription({
  header,
  description,
  kaomoji,
}: {
  header: string;
  description: string;
  kaomoji: string;
}) {
  return (
    <>
      <div className="text-brown-900 dark:text-dark-100">
        {/* Title */}
        <h1 className="font-poppins text-lg font-medium">{header}</h1>

        {/* Description */}
        <p className="text-brown-600 dark:text-dark-100/55 font-fragment-mono py-3 leading-6">
          {description}
          <span className="bg-brown-200 dark:bg-dark-900 dark:text-dark-100 text-brown-900 border-brown-700 mx-3 inline rounded-lg border p-1 px-3 text-xs text-nowrap dark:border-black">
            {kaomoji}
          </span>
        </p>
      </div>
    </>
  );
}
