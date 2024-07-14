import { MetadataRoute } from 'next'

import { Issues } from '@/api/github/classes/issues'
import { Repos } from '@/api/github/classes/repos'
import { envBackend } from '@/env-backend'

async function getData() {
  const user = 'bruno-valero'

  const repos = await Repos.get({ user: `${user}` })

  const reposWithIssues = repos.filter((item) => item.data.open_issues > 0)

  const issuesArray = await Promise.all(
    reposWithIssues.map(async (item) => {
      const issues = await Issues.get({
        user: `${user}`,
        repository: item.data.name,
      })

      return issues
    }),
  )

  const issues = issuesArray.reduce((acc, item) => {
    return [...acc, ...item]
  }, [])

  return { repos, issues, user }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = envBackend.BASE_URL

  const { repos, issues, user } = await getData()

  const reposSitemap: MetadataRoute.Sitemap = repos.map((repo) => ({
    url: `${url}/repos/${repo.data.name}`,
    lastModified: new Date(repo.data.updated_at),
  }))

  const issuesSitemap: MetadataRoute.Sitemap = issues.map((issue) => {
    const repo = issue.data.url.split(user)[1].split('/')[1]
    const issueId = issue.data.url.split(user)[1].split('/')[3]

    return {
      url: `${url}/repos/${repo}/issues/${issueId}`,
      lastModified: new Date(issue.data.updated_at),
    }
  })

  return [
    {
      url,
      lastModified: new Date(),
    },
    ...reposSitemap,
    ...issuesSitemap,
  ]
}
