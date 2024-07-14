import { ImageResponse } from 'next/og'

import { GitHubUserResponse } from '@/api/github/user-request'
import { Profile } from '@/components/home/profile'
import { envBackend } from '@/env-backend'

export const revalidate = 60 * 10 // 10 minutes

type GenerateImageMetadataResp = {
  id: string
  alt: string
  size: { width: number; height: number }
  contentType: string
}[]

export async function generateImageMetadata(): Promise<GenerateImageMetadataResp> {
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

  const imageMetadata: GenerateImageMetadataResp[number] = {
    id: JSON.stringify(developer),
    size: { width: 896, height: 220 },
    alt: 'Bruno Valero',
    contentType: 'image/png',
  }

  return [imageMetadata]
}

export default async function Image({ params }: { params: { id: string } }) {
  const developer = JSON.parse(params.id) as GitHubUserResponse | undefined

  return new ImageResponse(<Profile developer={developer} />, {
    height: 220,
    width: 864,
  })
}
