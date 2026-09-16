import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          404 Error
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto max-w-md text-base text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It might have been removed, renamed, or did not exist in the first place.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}