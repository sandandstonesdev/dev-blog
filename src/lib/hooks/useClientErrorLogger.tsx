import { useEffect } from 'react';
import clientLogger from '@/lib/api/logging/clientLogger';

export function useClientErrorLogger(error: Error) {
  useEffect(() => {
    if (error) {
      clientLogger.error({ message: error.message, stack: error.stack }, 'Client ErrorBoundary');
    }
  }, [error]);
}