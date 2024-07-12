export type GitHubBranchesResponse = {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}[]
