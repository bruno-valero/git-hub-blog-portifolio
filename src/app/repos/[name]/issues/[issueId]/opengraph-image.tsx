import { ImageResponse } from 'next/og'

import { GitHubReposIssuesResponse } from '@/api/github/@types/issues-request'
import { Issue } from '@/api/github/classes/issues'
import { GitHubUserResponse } from '@/api/github/user-request'
import { ServerProps } from '@/app/page'
import { OpenGraphIssueHeader } from '@/components/open-graph/open-graph-issue-header'
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
  const { name: repo, issueId } = props.params

  const resp = await fetch(
    `https://api.github.com/repos/${user}/${repo}/issues/${issueId}`,
    {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    },
  )
  const issueData = (await resp.json()) as GitHubReposIssuesResponse[number]

  const issue = new Issue(issueData)

  if (!issue) return new Response('failed to generate og', { status: 500 })

  const developerResponse = await fetch(
    'https://api.github.com/users/bruno-valero',
  )

  const developer = (await developerResponse.json()) as
    | GitHubUserResponse
    | undefined

  if (!developer) return new Response('failed to generate og', { status: 500 })

  return new ImageResponse(
    (
      <OpenGraphIssueHeader
        {...{
          author: developer.name,
          title: issue.data.title,
          createdAt: new Date(issue.data.created_at),
          comments: issue.data.comments,
        }}
      />
    ),
    {
      ...size,
    },
  )
}
