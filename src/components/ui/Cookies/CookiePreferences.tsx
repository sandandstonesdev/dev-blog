'use client';

import { BannerContentProps } from "@/types/common.types";


export default function CookiePreferences({ analytics, setAnalytics, telemetry, setTelemetry }: BannerContentProps) {
  const essential = true;
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
      <label className="flex items-center gap-2 cursor-pointer text-sm bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
        <input
          type="checkbox"
          checked={essential}
          disabled
          className="accent-green-600 dark:accent-green-400 w-4 h-4"
          aria-label="Essential cookies (required)"
        />
        <span className="font-semibold text-gray-800 dark:text-gray-100">Essential cookies (required)</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-sm bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
        <input
          type="checkbox"
          checked={analytics}
          onChange={e => setAnalytics(e.target.checked)}
          className="accent-blue-600 dark:accent-blue-400 w-4 h-4"
          aria-label="Enable analytics cookies"
        />
        <span className="text-gray-800 dark:text-gray-100">Analytics cookies</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-sm bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
        <input
          type="checkbox"
          checked={telemetry}
          onChange={e => setTelemetry(e.target.checked)}
          className="accent-purple-600 dark:accent-purple-400 w-4 h-4"
          aria-label="Enable telemetry cookies"
        />
        <span className="text-gray-800 dark:text-gray-100">Telemetry cookies</span>
      </label>
    </div>
  );
}