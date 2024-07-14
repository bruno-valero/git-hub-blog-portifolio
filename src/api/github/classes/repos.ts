import { envBackend } from '@/env-backend'
import { formatNameFromSlug } from '@/lib/format-name-from-slug'

import { GitHubBlobResponse } from '../@types/blob-request'
import { GitHubBranchResponse } from '../@types/branch-request'
import { GitHubBranchesResponse } from '../@types/branches-request'
import { GitHubReposResponse } from '../@types/repos-request'
import { GitHubTreeResponse } from '../@types/tree-request'

export class Repo {
  #data: GitHubReposResponse[number]

  constructor(repo: GitHubReposResponse[number]) {
    this.#data = repo
  }

  get name() {
    if (!this.data.name) return ''

    const name = formatNameFromSlug(this.data.name)

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

    const treeUrl = branch?.commit.commit.tree.url

    if (!treeUrl) return null

    const treeResp = await fetch(treeUrl, {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    })

    const treeData = (await treeResp.json()) as GitHubTreeResponse | undefined

    if (!treeData) return null

    return treeData
  }

  async getFile(
    filename: string,
    branches: [string, string] = ['main', 'master'],
  ) {
    const treeData = await this.getBranch(branches)

    const readme = treeData?.tree.find((item) => filename === item.path)

    if (!readme) return null

    const readmeBlobResp = await fetch(readme.url, {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    })

    const readmeBlob = (await readmeBlobResp.json()) as
      | GitHubBlobResponse
      | undefined

    if (!readmeBlob) return null

    const data = Buffer.from(readmeBlob.content, 'base64').toString('utf-8')

    return { data, metadata: { tree: readme, blob: readmeBlob } }
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
