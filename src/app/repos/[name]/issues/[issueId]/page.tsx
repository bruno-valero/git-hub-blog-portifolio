import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GitHubReposIssuesResponse } from '@/api/github/@types/issues-request'
import { Issue } from '@/api/github/classes/issues'
import { ServerProps } from '@/app/page'
import { Header } from '@/components/header'
import { IssueComponent } from '@/components/issue'
import { envBackend } from '@/env-backend'
import { formatNameFromSlug } from '@/lib/format-name-from-slug'

export const revalidate = 60 * 10 // 10 minutes

export async function generateMetadata(props: ServerProps) {
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

  if (!issueData) {
    notFound()
  }

  const issue = new Issue(issueData)

  if (!issue.content) {
    notFound()
  }
  console.log('issue.content - data', issue.content)

  const metadata: Metadata = {
    title: issue.data.title,
    description: issue.content
      .replaceAll(/\]\(.+\)|\[/g, '')
      .slice(0, 150)
      .concat(' ...'),
    authors: [
      {
        name: formatNameFromSlug(issue.data.user.login),
        url: issue.data.user.html_url,
      },
    ],
    creator: formatNameFromSlug(issue.data.user.login),
    keywords: [formatNameFromSlug(issue.data.title)],
  }
  return metadata
}

export default async function IssuePage(props: ServerProps) {
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

  if (!issueData) {
    notFound()
  }

  const issue = new Issue(issueData)

  if (!issue.content) {
    notFound()
  }

  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-start justify-start">
      <Header />
      <IssueComponent issue={issue} />
    </main>
  )
}
