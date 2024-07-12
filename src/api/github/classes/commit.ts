import { envBackend } from '@/env-backend'

import { GitHubCommitContentResponse } from '../@types/commit-content-request'
import { GitHubCommitResponse } from '../@types/commit-request'

export type CommitGetContentResponse = {
  metadata: {
    sha: string
    filename: string
    status: string
    additions: number
    deletions: number
    changes: number
    blob_url: string
    raw_url: string
    contents_url: string
    patch: string
  }
  content: string
} | null

export class Commit {
  #data: GitHubCommitResponse

  constructor(data: GitHubCommitResponse) {
    this.#data = data
  }

  get data() {
    return this.#data
  }

  get files() {
    return this.data.files.map((file) => new CommitFile(file))
  }
}

export class CommitFile {
  #data: GitHubCommitResponse['files'][number]

  constructor(data: GitHubCommitResponse['files'][number]) {
    this.#data = data
  }

  get data() {
    return this.#data
  }

  async getContent(): Promise<CommitGetContentResponse> {
    const contentUrl = this.data.contents_url

    const contentResp = await fetch(contentUrl, {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    })
    const content = (await contentResp.json()) as
      | GitHubCommitContentResponse
      | undefined

    if (!content) return null

    const downloadContentResp = await fetch(content.download_url, {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    })
    const downloadContent = await downloadContentResp.text()

    return { metadata: this.data, content: downloadContent }
  }
}
