'use client';

import React from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="section-container">
      <h2 className="text-red-600 mb-4">Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset} className="mt-4 btn-primary">
        Try again
      </button>
    </div>
  );
}
