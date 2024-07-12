import { Footer } from '../footer'
import { MarkdownContent } from '../markdown-content'
import { RepoHeader, RepoHeaderProps } from './repo-header'

interface RepoComponentProps extends RepoHeaderProps {}

export async function RepoComponent({ repo }: RepoComponentProps) {
  const branch = await repo.getBranch(['main', 'master'])
  const readme = branch?.find((item) => item?.metadata.filename === 'README.md')
  const data = readme?.content

  return (
    <div className="flex w-full max-w-[100vw] flex-col items-center justify-start">
      <div className="w-full max-w-[56rem]">
        <RepoHeader repo={repo} />
        <MarkdownContent data={data ?? 'Sem conteúdo'} />
      </div>
      <Footer />
    </div>
  )
}
