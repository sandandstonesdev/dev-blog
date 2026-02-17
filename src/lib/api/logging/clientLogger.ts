import pino from 'pino';
import { isProd, isDev } from '@/lib/env';

// Sensitive keys to redact from logs
const SENSITIVE_KEYS = ['password', 'token', 'secret', 'auth', 'cookie', 'email', 'session', 'creditcard'];

const clientLogger = pino({
  browser: {
    asObject: true,
    transmit: {
      level: isProd ? 'warn' : 'info',
      send: (level, logEvent) => {
        const msg = logEvent.messages[0];
        let meta: Record<string, unknown> = {};
        if (logEvent.messages.length > 1 && typeof logEvent.messages[1] === 'object' && logEvent.messages[1] !== null) {
          meta = { ...logEvent.messages[1] } as Record<string, unknown>;
        }
        SENSITIVE_KEYS.forEach(key => {
          if (Object.prototype.hasOwnProperty.call(meta, key)) meta[key] = '[REDACTED]';
        });
        const body = JSON.stringify({ level, message: msg, meta });
        navigator.sendBeacon('/api/client-log', body);
      }
    }
  },
  level: isProd ? 'warn' : 'debug',
  redact: {
    paths: SENSITIVE_KEYS.map(k => `meta.${k}`),
    remove: true,
    censor: '[REDACTED]',
  },
});

// Only log to console in development
if (isDev) {
  clientLogger.info('Client logger initialized in development mode');
}

export default clientLogger;