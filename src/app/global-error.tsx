'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="p-5 max-w-2xl mx-auto">
          <h2 className="text-red-600 mb-4">Something went wrong!</h2>
          <p className="mb-4">{error.message}</p>
          {error.digest && (
            <p className="text-sm text-gray-500 mb-4">
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="btn-primary"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
