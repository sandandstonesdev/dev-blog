import { isProd } from '@/lib/env';

if (isProd && !process.env.NEXT_PUBLIC_APP_URL) {
	throw new Error('NEXT_PUBLIC_APP_URL must be set in production');
}

export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';