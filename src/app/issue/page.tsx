import { Metadata } from 'next'

import { GitHubReposIssuesResponse } from '@/api/github/@types/issues-request'
import { Issue } from '@/api/github/classes/issues'
import { Header } from '@/components/header'
import { IssueComponent } from '@/components/issue'
import { envBackend } from '@/env-backend'

import { ServerProps } from '../page'

export async function generateMetadata(props: ServerProps) {
  const user = props.searchParams.user
  const repo = props.searchParams.repo
  const issueId = props.searchParams.issueId

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

  function titleFromSlug(slug: string) {
    return slug
      .replaceAll(/[-_]/gi, ' ')
      .split(' ')
      .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
      .join(' ')
  }

  const metadata: Metadata = {
    title: issue.data.title,
    description: issue.content.slice(0, 50).concat(' ...'),
    authors: [
      {
        name: titleFromSlug(issue.data.user.login),
        url: issue.data.user.html_url,
      },
    ],
  }
  return metadata
}

export default async function RepoPage(props: ServerProps) {
  const user = props.searchParams.user
  const repo = props.searchParams.repo
  const issueId = props.searchParams.issueId

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

  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-start justify-start">
      <Header />
      <IssueComponent issue={issue} />
    </main>
  )
}
