import { MetadataRoute } from 'next'

import { envBackend } from '@/env-backend'

export default function robots(): MetadataRoute.Robots {
  const url = envBackend.BASE_URL

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/repo', '/issue'],
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
