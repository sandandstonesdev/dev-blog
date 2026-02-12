// Server-only configuration - DO NOT import in client components

if (typeof window !== 'undefined') {
  throw new Error('server-config.ts cannot be used in client components');
}

export const CACHE_REVALIDATE = parseInt(
  process.env.CACHE_REVALIDATE || '3600', 
  10
);