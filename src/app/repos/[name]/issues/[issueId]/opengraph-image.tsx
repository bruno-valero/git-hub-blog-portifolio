import { ImageResponse } from 'next/og'

import { GitHubReposIssuesResponse } from '@/api/github/@types/issues-request'
import { Issue } from '@/api/github/classes/issues'
import { IssueHeader } from '@/components/issue/issue-header'
import { envBackend } from '@/env-backend'

import { ServerProps } from '../../../../page'

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
  const { repo, issueId } = props.params

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

  const imageMetadata: GenerateImageMetadataResp[number] = {
    id: JSON.stringify(issueData),
    size: { width: 896, height: 220 },
    alt: issue.data.title,
    contentType: 'image/png',
  }

  return [imageMetadata]
}

export default async function Image({ params }: { params: { id: string } }) {
  const issueData = JSON.parse(params.id) as GitHubReposIssuesResponse[number]
  const issue = new Issue(issueData)

  const nunitoSemiBold = fetch(
    new URL('./Nunito-SemiBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(<IssueHeader issue={issue} />, {
    height: 220,
    width: 864,
    fonts: [
      {
        name: 'Nunito',
        data: await nunitoSemiBold,
        style: 'normal',
        weight: 400,
      },
    ],
  })
}
