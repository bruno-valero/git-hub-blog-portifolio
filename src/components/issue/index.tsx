import { Footer } from '../footer'
import { MarkdownContent } from '../markdown-content'
import { IssueHeader, IssueHeaderProps } from './issue-header'

interface IssueComponentProps extends IssueHeaderProps {}

export function IssueComponent({ issue }: IssueComponentProps) {
  return (
    <div className="flex w-full max-w-[100vw] flex-col items-center justify-start">
      <div className="w-full max-w-[56rem]">
        <IssueHeader issue={issue} />
        <MarkdownContent data={issue.content} />
      </div>
      <Footer />
    </div>
  )
}
