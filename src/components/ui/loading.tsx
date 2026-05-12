import { useState, useEffect } from "react";

const DOTS = ["", ".", "..", "..."];

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Loading" }: LoadingProps) {
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setDotIndex((i) => (i + 1) % DOTS.length),
      500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-brown-500 dark:text-dark-400 flex flex-col items-center justify-center gap-4">
      <div className="border-brown-300 dark:border-dark-500 dark:border-t-dark-200 h-8 w-8 animate-spin rounded-full border-2 border-t-2" />
      <span className="w-24 text-center text-sm font-light">
        {text}
        {DOTS[dotIndex]}
      </span>
    </div>
  );
}
