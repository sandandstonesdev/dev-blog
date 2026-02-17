
import pino from 'pino';
import { isProd, isDev } from '@/lib/env';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';


// Sensitive keys to redact from logs
const SENSITIVE_KEYS = ['password', 'token', 'secret', 'auth', 'cookie', 'email', 'session', 'creditcard'];

const serverLogger = pino({
  level: isProd ? 'info' : 'debug',
  redact: {
    paths: SENSITIVE_KEYS.map(k => `meta.${k}`),
    remove: true,
    censor: '[REDACTED]',
  },
  base: null,
});

// Log initialization in development
if (isDev) {
  serverLogger.info('Server logger initialized in development mode');
}

export default serverLogger;
