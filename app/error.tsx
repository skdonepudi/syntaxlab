"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          Something went wrong!
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Try again
          </button>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
