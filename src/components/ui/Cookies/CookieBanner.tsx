'use client'

import { useState, useEffect } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import BannerContent from './BannerContent';
import { ANALYTICS_KEY, TELEMETRY_KEY } from '@/const/cookiesConst';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [telemetry, setTelemetry] = useState(false);
  const [bannerKey, setBannerKey] = useState(0);

  useEffect(() => {
    const handleShowBanner = () => {
      setBannerKey(prev => prev + 1);
      setShowBanner(true);
      setAnalytics(false);
      setTelemetry(false);
    };
    window.addEventListener('show-cookie-banner', handleShowBanner);
    return () => window.removeEventListener('show-cookie-banner', handleShowBanner);
  }, []);

  const handleAccept = async () => {
    Cookies.set(ANALYTICS_KEY, analytics ? 'true' : 'false', { sameSite: 'strict', secure: true });
    Cookies.set(TELEMETRY_KEY, telemetry ? 'true' : 'false', { sameSite: 'strict', secure: true });
    try {
      await fetch('/api/telemetry-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consent: telemetry }),
      });
    } catch (e) {
      console.error('Failed to update telemetry consent', e);
    }
    setShowBanner(false);
  };

  const handleDecline = () => setShowBanner(false);

  return (
    <>
      {showBanner && (
        <CookieConsent
          key={bannerKey}
          location="bottom"
          buttonText="Save Preferences"
          containerClasses="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg px-2 py-4 sm:px-4 sm:py-6"
          contentClasses="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between max-w-5xl mx-auto"
          buttonClasses="btn-primary text-sm sm:text-base"
          expires={365}
          sameSite="strict"
          cookieSecurity={true}
          enableDeclineButton
          declineButtonText="Decline"
          declineButtonClasses="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-semibold shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors ml-2 text-sm sm:text-base"
          onAccept={handleAccept}
          onDecline={handleDecline}
        >
          <BannerContent
            analytics={analytics}
            setAnalytics={setAnalytics}
            telemetry={telemetry}
            setTelemetry={setTelemetry}
          />
        </CookieConsent>
      )}
    </>
  );
}
