import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="bg-brown-50 font-poppins flex h-screen w-full flex-col items-center justify-center gap-4">
      <p className="text-brown-400 text-6xl font-semibold">
        {is404 ? "404 ;-;" : "Oops"}
      </p>
      <p className="text-brown-600 text-base">
        {is404
          ? "Ooooops this page doesn't exist."
          : " ;-; Something went wrong."}
      </p>
      <Link
        to="/"
        className="text-brown-500 hover:text-brown-700 text-sm underline underline-offset-4 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
