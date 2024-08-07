import { ImageResponse } from 'next/og'

import { Repo } from '@/api/github/classes/repos'
import { GitHubReposResponse } from '@/api/github/repos-request'
import { GitHubUserResponse } from '@/api/github/user-request'
import { ServerProps } from '@/app/page'
import { OpenGraphRepoHeader } from '@/components/open-graph/open-graph-repo-header'
import { envBackend } from '@/env-backend'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image(props: ServerProps) {
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
      ...size,
    },
  )
}
