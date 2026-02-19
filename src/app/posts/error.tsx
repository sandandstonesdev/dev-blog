'use client';

export default function PostError({ postError, reset }: { postError: Error; reset: () => void }) {
  return (
    <div className="section-container">
      <h2 className="text-red-600 mb-4">Post Error</h2>
      <p>{postError.message}</p>
      <button type="button" onClick={reset} className="mt-4 btn-primary">
        Try again
      </button>
    </div>
  );
}
