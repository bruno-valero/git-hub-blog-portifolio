import { ImageResponse } from 'next/og'

import { Repo } from '@/api/github/classes/repos'
import { GitHubReposResponse } from '@/api/github/repos-request'
import { GitHubUserResponse } from '@/api/github/user-request'
import { OpenGraphRepoHeader } from '@/components/open-graph/open-graph-repo-header'
import { envBackend } from '@/env-backend'

import { ServerProps } from '../../page'

export const revalidate = 60 * 10 // 10 minutes

type GenerateImageMetadataResp = {
  id: string
  alt: string
  size: { width: number; height: number }
  contentType: string
}[]

export async function generateImageMetadata(
  props: ServerProps,
): Promise<GenerateImageMetadataResp> {
  const user = 'bruno-valero'
  const { name } = props.params

  const repoResp = await fetch(`https://api.github.com/repos/${user}/${name}`, {
    next: {
      revalidate: 60 * 10, // 10 minutes
    },
    headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
  })

  const repoData = (await repoResp.json()) as GitHubReposResponse[number]

  const repo = new Repo(repoData)

  const imageMetadata: GenerateImageMetadataResp[number] = {
    id: JSON.stringify(repo),
    size: { width: 896, height: 220 },
    alt: repo.name,
    contentType: 'image/png',
  }

  return [imageMetadata]
}

export default async function Image({ params }: { params: { id: string } }) {
  const repoData = JSON.parse(params.id) as GitHubReposResponse[number]
  const repo = new Repo(repoData)

  if (!repo) return new Response('failed to generate og', { status: 500 })

  const developerResponse = await fetch(
    'https://api.github.com/users/bruno-valero',
  )

  const developer = (await developerResponse.json()) as
    | GitHubUserResponse
    | undefined

  if (!developer) return new Response('failed to generate og', { status: 500 })

  return new ImageResponse(
    (
      <OpenGraphRepoHeader
        {...{
          author: developer.name,
          branch: repo.data.default_branch,
          createdAt: new Date(repo.data.created_at),
          title: repo.name,
        }}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
