'use client';
import { useClientErrorLogger } from '@/lib/hooks/useClientErrorLogger';

export default function AppError({ appError, reset }: { appError: Error; reset: () => void }) {
  useClientErrorLogger(appError);
  return (
    <div className="section-container">
      <h2 className="text-red-600 mb-4">Something went wrong!</h2>
      <p>{appError.message}</p>
      <button type="button" onClick={reset} className="mt-4 btn-primary">
        Try again
      </button>
    </div>
  );
}
