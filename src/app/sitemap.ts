import type { MetadataRoute } from 'next'
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${NEXT_PUBLIC_APP_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${NEXT_PUBLIC_APP_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${NEXT_PUBLIC_APP_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}