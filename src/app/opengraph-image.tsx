import { ImageResponse } from 'next/og'

import { GitHubUserResponse } from '@/api/github/user-request'
import { OpenGraphMainHeader } from '@/components/open-graph/open-graph-main-header'
import { envBackend } from '@/env-backend'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const developerResponse = await fetch(
    'https://api.github.com/users/bruno-valero',
    {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    },
  )

  const developer = (await developerResponse.json()) as
    | GitHubUserResponse
    | undefined

  if (!developer) return new Response('failed to generate og', { status: 500 })

  return new ImageResponse(
    (
      <OpenGraphMainHeader
        {...{
          description: developer.bio,
          followers: developer.followers,
          imageUrl: developer.avatar_url,
          name: developer.name,
        }}
      />
    ),
    {
      ...size,
    },
  )
}
