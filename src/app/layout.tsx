import React from 'react';

import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import "@/styles/globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/Cookies/CookieBanner";
import { NEXT_PUBLIC_APP_URL } from "@/config/config";
import AnalyticsCookieWrapper from '@/components/ui/Analytics/AnalyticsWrapper';

 
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevTestBlog",
  description: "DevTestBlog deployed",
  metadataBase: new URL(NEXT_PUBLIC_APP_URL),
  openGraph: {
    title: "DevTestBlog",
    description: "DevTestBlog deployed",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog preview",
      }
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.variable} antialiased`}>
        <div className="flex flex-col h-screen w-screen">
          <Header />
          <div className="flex grow flex-row max-w-full max-h-full overflow-auto justify-center">
            {children}
          </div>
          <Footer />
        </div>
        <CookieBanner />
        <AnalyticsCookieWrapper />
      </body>
    </html>
  );
}
