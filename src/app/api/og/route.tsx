import { ImageResponse } from 'next/og'

import { GitHubUserResponse } from '@/api/github/user-request'
import { OpenGraphMainHeader } from '@/components/open-graph/open-graph-main-header'
import { envBackend } from '@/env-backend'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export async function GET() {
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

  // const imageMetadata: GenerateImageMetadataResp[number] = {
  //   id: JSON.stringify(developer),
  //   size: { width: 896, height: 220 },
  //   alt: 'Bruno Valero',
  //   contentType: 'image/png',
  // }

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
      width: 1200,
      height: 630,
    },
  )
}
