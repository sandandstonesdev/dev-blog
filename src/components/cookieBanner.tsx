'use client';

import { useEffect } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';

export default function CookieBanner() {
  useEffect(() => {
    const consent = Cookies.get('blogCookieConsent');
    if (consent === 'true' && typeof window !== 'undefined') {
      console.log('Analytics enabled');
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      console.log('Analytics enabled');
    }
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      console.log('Analytics disabled');
    }
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="blogCookieConsent"
      sameSite="strict"
      cookieSecurity={true}
      enableDeclineButton
      expires={365}
      onAccept={handleAccept}
      onDecline={handleDecline}
      containerClasses="bg-gray-900 p-4"
      buttonClasses="bg-green-500 text-white px-4 py-2 rounded border-none hover:bg-green-600 transition-colors"
      declineButtonClasses="bg-transparent text-white px-4 py-2 rounded border border-gray-600 hover:bg-gray-800 transition-colors"
    >
      This site uses cookies for analytics. <Link href="/privacy" className="underline text-green-400 hover:text-green-300 transition-colors duration-200">Privacy Policy</Link>
    </CookieConsent>
  );
}
