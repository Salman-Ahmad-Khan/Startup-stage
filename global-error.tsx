'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Custom error logging logic
    const logError = async () => {
      await fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          timestamp: new Date().toISOString(),
        }),
      });
    };

    logError();
  }, [error]);

  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Unexpected Error
            </h1>
            <p className="text-gray-600 mb-4">
              We apologize for the inconvenience. Our team has been notified.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 mb-4">
                Error Reference: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}