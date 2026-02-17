import type { MetadataRoute } from 'next'
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/about/'],
      },
      {
        userAgent: '*',
        disallow: ['/'],
      }
    ],
    sitemap: `${NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  }
}