import { NextResponse } from 'next/server';
import { isProd, isDev } from './lib/env';

function getSecurityHeaders() {
  let nonce = '';
  if (isProd) {
    nonce = Math.random().toString(36).substring(2, 18);
    let csp = [
      "default-src 'self'",
      `script-src 'self' https://va.vercel-scripts.com 'nonce-${nonce}'`,
      "style-src 'self'",
      "img-src 'self' blob: data: https:",
      "font-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ];
    csp = csp.map(directive => {
      if (directive.startsWith('script-src')) {
        return `${directive} 'nonce-${nonce}'`;
      }
      return directive;
    });
    return {
      headers: {
        'Content-Security-Policy': csp.join('; '),
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'x-nonce': nonce,
      },
      nonce,
    };
  } else {
    // Non-production: bypass CSP
    return {
      headers: {
        // No CSP header
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
      nonce: '',
    };
  }
}


export function proxy(request: Request) {
  const response = NextResponse.next();
  const { headers } = getSecurityHeaders();

  // Set security headers
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Set a dummy security cookie
  response.headers.set(
    'Set-Cookie',
    '__Host-security=1; Path=/; Secure; HttpOnly; SameSite=Strict'
  );


  // Parse cookies from request.headers
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, ...v] = c.trim().split('=');
    return [k, v.join('=')];
  }));
  // Essential consent is always true (required for site to function)
  response.headers.set('x-essential-consent', 'true');
  // Optional consents
  const telemetryConsent = cookies.telemetryConsent === 'true' ? 'true' : 'false';
  const analyticsConsent = cookies.analyticsConsent === 'true' ? 'true' : 'false';
  response.headers.set('x-telemetry-consent', telemetryConsent);
  response.headers.set('x-analytics-consent', analyticsConsent);
  if (isDev) {
    console.log('[proxy] Set x-essential-consent:true, x-telemetry-consent:', telemetryConsent, 'x-analytics-consent:', analyticsConsent);
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
