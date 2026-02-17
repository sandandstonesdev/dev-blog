import { Analytics } from '@vercel/analytics/react';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function AnalyticsCookieWrapper() {
  const cookieStore = await cookies();
  const analyticsConsent = cookieStore.get('analyticsConsent');
  if (analyticsConsent?.value !== 'true') return null;

  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  );
}
