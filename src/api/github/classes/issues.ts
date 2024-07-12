import { envBackend } from '@/env-backend'

import { GitHubReposIssuesResponse } from '../@types/issues-request'

export class Issue {
  #data: GitHubReposIssuesResponse[number]

  constructor(issue: GitHubReposIssuesResponse[number]) {
    this.#data = issue
  }

  get data() {
    return this.#data
  }

  get content() {
    return this.data.body
  }
}

export class Issues {
  static async get({ user, repository }: { user: string; repository: string }) {
    const resp = await fetch(
      `https://api.github.com/repos/${user}/${repository}/issues`,
      {
        next: {
          revalidate: 60 * 10, // 10 minutes
        },
        headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
      },
    )
    const issues = (await resp.json()) as GitHubReposIssuesResponse
    return issues.map((issue) => new Issue(issue))
  }
}
