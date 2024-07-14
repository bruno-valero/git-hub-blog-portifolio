import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Repo } from '@/api/github/classes/repos'
import { GitHubReposResponse } from '@/api/github/repos-request'
import { ServerProps } from '@/app/page'
import { Header } from '@/components/header'
import { RepoComponent } from '@/components/repo'
import { envBackend } from '@/env-backend'
import { formatMarkdownToText } from '@/lib/format-markdown-to-text'
import { formatNameFromSlug } from '@/lib/format-name-from-slug'

export const revalidate = 60 * 10 // 10 minutes

export async function generateMetadata(props: ServerProps) {
  const user = 'bruno-valero'
  const { name } = props.params

  const repoResp = await fetch(`https://api.github.com/repos/${user}/${name}`, {
    next: {
      revalidate: 60 * 10, // 10 minutes
    },
    headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
  })

  const repoData = (await repoResp.json()) as GitHubReposResponse[number]

  if (!repoData) {
    notFound()
  }

  const repo = new Repo(repoData)

  if (!repo.data?.owner?.login) {
    notFound()
  }
  console.log('repo.data.description', repo.data.description)
  console.log(
    'formatMarkdownToText(repo.data.description)',
    formatMarkdownToText(repo.data.description ?? ''),
  )

  const metadata: Metadata = {
    metadataBase: new URL(`${envBackend.BASE_URL}`),
    title: repo.name,
    description: repo.data.description
      ? formatMarkdownToText(repo.data.description).slice(0, 150).concat(' ...')
      : 'Este repositório não possui descrição',
    authors: [
      {
        name: formatNameFromSlug(repo.data.owner.login),
        url: repo.data.owner.html_url,
      },
    ],
    creator: formatNameFromSlug(repo.data.owner.login),
    keywords: [repo.name],
    openGraph: {
      description: repo.data.description
        ? formatMarkdownToText(repo.data.description)
            .slice(0, 150)
            .concat(' ...')
        : 'Este repositório não possui descrição',
      title: `${repo.name} - Repositório de Bruno Fernandes Valero`,
    },
  }
  return metadata
}

export default async function RepoData(props: ServerProps) {
  const user = 'bruno-valero'
  const { name } = props.params

  const repoResp = await fetch(`https://api.github.com/repos/${user}/${name}`, {
    next: {
      revalidate: 60 * 10, // 10 minutes
    },
    headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
  })

  const repoData = (await repoResp.json()) as GitHubReposResponse[number]

  if (!repoData) {
    notFound()
  }

  const repo = new Repo(repoData)

  if (!repo.data?.owner?.login) {
    notFound()
  }

  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-start justify-start">
      <Header />
      <RepoComponent repo={repo} />
    </main>
  )
}
