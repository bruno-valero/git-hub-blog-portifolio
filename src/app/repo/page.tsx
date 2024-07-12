import { Metadata } from 'next'

import { GitHubReposResponse } from '@/api/github/@types/repos-request'
import { Repo } from '@/api/github/classes/repos'
import { Header } from '@/components/header'
import { RepoComponent } from '@/components/repo'
import { envBackend } from '@/env-backend'

import { ServerProps } from '../page'

export async function generateMetadata(props: ServerProps) {
  const name = props.searchParams.name
  const user = props.searchParams.user

  const repoResp = await fetch(`https://api.github.com/repos/${user}/${name}`, {
    next: {
      revalidate: 60 * 10, // 10 minutes
    },
    headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
  })

  const repoData = (await repoResp.json()) as GitHubReposResponse[number]

  const repo = new Repo(repoData)

  function titleFromSlug(slug: string) {
    return slug
      .replaceAll(/[-_]/gi, ' ')
      .split(' ')
      .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
      .join(' ')
  }

  const metadata: Metadata = {
    title: repo.name,
    description:
      repo.data.description?.slice(0, 50).concat(' ...') ??
      'Repositório de github',
    authors: [
      {
        name: titleFromSlug(repo.data.owner.login),
        url: repo.data.owner.html_url,
      },
    ],
  }
  return metadata
}

export default async function RepoPage(props: ServerProps) {
  const name = props.searchParams.name
  const user = props.searchParams.user

  const repoResp = await fetch(`https://api.github.com/repos/${user}/${name}`, {
    next: {
      revalidate: 60 * 10, // 10 minutes
    },
    headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
  })

  const repoData = (await repoResp.json()) as GitHubReposResponse[number]

  const repo = new Repo(repoData)

  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-start justify-start">
      <Header />
      <RepoComponent repo={repo} />
    </main>
  )
}
