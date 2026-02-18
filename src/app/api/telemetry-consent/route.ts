
import { NextRequest, NextResponse } from 'next/server'
import serverLogger from '@/lib/api/logging/serverLogger';
import { isDev } from '@/lib/env';

export async function POST(request: NextRequest) {
  const { consent } = await request.json();
  if (isDev) serverLogger.debug({ consent }, 'Received telemetry consent change');

  if (consent === true) {
    const { startTelemetry } = await import('@/instrumentation.node');
    await startTelemetry();
    serverLogger.info('Telemetry enabled');
    return NextResponse.json({ message: 'Telemetry enabled' });
  } else {
    const { stopTelemetry } = await import('@/instrumentation.node');
    await stopTelemetry();
    serverLogger.info('Telemetry disabled');
    return NextResponse.json({ message: 'Telemetry disabled' });
  }
}
