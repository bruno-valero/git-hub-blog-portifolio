import { envBackend } from '@/env-backend'

import { GitHubBranchResponse } from '../@types/branch-request'
import { GitHubBranchesResponse } from '../@types/branches-request'
import { GitHubCommitResponse } from '../@types/commit-request'
import { GitHubReposResponse } from '../@types/repos-request'
import { Commit } from './commit'

export class Repo {
  #data: GitHubReposResponse[number]

  constructor(repo: GitHubReposResponse[number]) {
    this.#data = repo
  }

  get name() {
    const name = this.data.name
      .replaceAll(/[-_]/gi, ' ')
      .split(' ')
      .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
      .join(' ')

    return name
  }

  get data() {
    return this.#data
  }

  async getBranch([main, master]: [string, string]) {
    const resp = await fetch(
      `https://api.github.com/repos/${this.data.owner.login}/${this.data.name}/branches`,
      {
        next: {
          revalidate: 60 * 10, // 10 minutes
        },
        headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
      },
    )
    const branches = (await resp.json()) as GitHubBranchesResponse

    const hasMain = branches.find((branch) => branch.name === main)
    const hasMaster = branches.find((branch) => branch.name === master)

    const branchToFetch = hasMain ?? hasMaster

    if (!branchToFetch) return null

    const branchResp = await fetch(
      `https://api.github.com/repos/${this.data.owner.login}/${this.data.name}/branches/${branchToFetch.name}`,
      {
        next: {
          revalidate: 60 * 10, // 10 minutes
        },
        headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
      },
    )

    const branch = (await branchResp.json()) as GitHubBranchResponse | undefined

    if (!branch) return null

    const commitUrl = branch.commit.parents[0]?.url || branch.commit.url

    const commitDataResp = await fetch(commitUrl, {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    })
    const commitData = (await commitDataResp.json()) as
      | GitHubCommitResponse
      | undefined

    if (!commitData) return null

    const commit = new Commit(commitData)

    const content = await Promise.all(
      commit.files.map(async (file) => await file.getContent()),
    )

    return content
  }
}

export class Repos {
  static async get({ user }: { user: string }) {
    const resp = await fetch(`https://api.github.com/users/${user}/repos`, {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    })
    const repos = (await resp.json()) as GitHubReposResponse

    return repos.map((repo) => new Repo(repo))
  }
}
