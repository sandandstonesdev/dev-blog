
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { isDev } from './lib/env';

let sdk: NodeSDK | null = null
let isInitialized = false

export async function startTelemetry() {
  if (isInitialized) return

  sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'next-app',
    }),
    spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
  })

  await sdk.start()
  isInitialized = true
  if (isDev) {
    console.log('✅ Telemetry started')
  }
}

export async function stopTelemetry() {
  if (sdk && isInitialized) {
    await sdk.shutdown()
    sdk = null
    isInitialized = false
    if (isDev) {
      console.log('🛑 Telemetry stopped')
    }
  }
}
