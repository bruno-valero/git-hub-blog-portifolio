import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Repo } from '@/api/github/classes/repos'
import { GitHubReposResponse } from '@/api/github/repos-request'
import { ServerProps } from '@/app/page'
import { Header } from '@/components/header'
import { RepoComponent } from '@/components/repo'
import { envBackend } from '@/env-backend'
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

  console.log('repo.data?.owner?.login', repo.data?.owner?.login)
  if (!repo.data?.owner?.login) {
    notFound()
  }

  const metadata: Metadata = {
    title: repo.name,
    description:
      repo.data.description
        ?.replaceAll(/\]\(.+\)|\[/g, '')
        .slice(0, 150)
        .concat(' ...') ?? `Repositório do github de ${repo.name}`,
    authors: [
      {
        name: formatNameFromSlug(repo.data.owner.login),
        url: repo.data.owner.html_url,
      },
    ],
    creator: formatNameFromSlug(repo.data.owner.login),
    keywords: [repo.name],
    openGraph: {
      authors: [formatNameFromSlug(repo.data.owner.login)],
      creators: [formatNameFromSlug(repo.data.owner.login)],
      description: repo.data.description
        ?.replaceAll(/\]\(.+\)|\[/g, '')
        .slice(0, 150)
        .concat(' ...'),
      url: `${envBackend.BASE_URL}/repo?name=${repo.data.name}&user=${user}`,
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
