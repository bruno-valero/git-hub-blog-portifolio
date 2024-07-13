export type GitHubTreeResponse = {
  sha: string
  url: string
  tree: {
    path: string
    mode: string
    type: string
    sha: string
    size: number
    url: string
  }[]
  truncated: boolean
}
