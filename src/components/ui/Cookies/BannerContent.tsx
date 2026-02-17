'use client';

import Link from "next/link";
import CookiePreferences from "@/components/ui/Cookies/CookiePreferences";
import { BannerContentProps } from "@/types/common.types";

export default function BannerContent({ analytics, setAnalytics, telemetry, setTelemetry }: BannerContentProps) {
  return (
    <div className="max-w-2xl text-gray-900 dark:text-gray-100">
      <div className="mb-2 text-base font-semibold">Your Privacy Matters</div>
      <div className="text-sm mb-2 leading-relaxed">
        We use cookies to remember your preferences and to enable optional analytics and telemetry for improving our website. You can change your choices at any time. For more details, see our{' '}
        <Link href="/privacy" className="link-underline">Privacy Policy</Link>.
      </div>
      <CookiePreferences
        analytics={analytics}
        setAnalytics={setAnalytics}
        telemetry={telemetry}
        setTelemetry={setTelemetry}
      />
    </div>
  );
}