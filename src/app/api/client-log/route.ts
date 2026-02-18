import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import serverLogger from '@/lib/api/logging/serverLogger';
import { isDev } from '@/lib/env';
import { ALLOWED_ORIGINS, LOG_SECRET } from '@/config/logging';

const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
type LogLevel = typeof LOG_LEVELS[number];

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  if (isDev) serverLogger.debug({ origin }, 'Incoming client log request');
  if (ALLOWED_ORIGINS.length && !ALLOWED_ORIGINS.includes(origin)) {
    if (isDev) serverLogger.debug({ origin }, 'CORS not allowed');
    return new NextResponse('CORS not allowed', { status: 403 });
  }

  const auth = req.headers.get('x-log-secret');
  if (!isDev && LOG_SECRET && auth !== LOG_SECRET) {
    if (isDev) serverLogger.debug({ auth }, 'Unauthorized log attempt');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    if (isDev) serverLogger.debug({ body }, 'Received log payload');
    const { level, message, meta, timestamp } = body;
    const logLevel: LogLevel = LOG_LEVELS.includes(level) ? level : 'info';
    serverLogger[logLevel]({ ...meta, timestamp }, `[CLIENT LOG] ${message}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (isDev) serverLogger.debug({ error: String(err) }, 'Invalid log payload');
    return new NextResponse('Invalid log payload', { status: 400 });
  }
}

export function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  if (ALLOWED_ORIGINS.length && !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse('CORS not allowed', { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-log-secret',
    },
  });
}