import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faCalendarDay,
  faChevronLeft,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Issue } from '@/api/github/classes/issues'
import { MainCard } from '@/components/main-card'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from '../../link'

export interface IssueHeaderProps {
  issue: Issue
}

export async function IssueHeader({ issue }: IssueHeaderProps) {
  return (
    <MainCard>
      <div className="flex w-full flex-col gap-6">
        <CardHeader className="m-0 flex w-full flex-row items-center justify-between p-0">
          <Link href={'/'} className="mt-2 flex items-center justify-center">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
            <span className="leading-[.50rem]">VOLTAR</span>
          </Link>
          <Link
            href={issue?.data.html_url ?? ''}
            target="_blank"
            className="flex items-center justify-center"
          >
            <span className="leading-[.50rem]">VER NO GITHUB</span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 w-3"
            />
          </Link>
        </CardHeader>
        <CardContent className="m-0 flex flex-1 flex-col items-start justify-center gap-3 p-0">
          <CardTitle className="">
            <span className="text-24 font-bold tracking-wide text-white">
              {issue.data?.title}
            </span>
          </CardTitle>

          <CardFooter className="m-0 mt-6 flex items-center justify-start gap-6 p-0 max-[550px]:flex-col max-[550px]:items-start max-[550px]:gap-3">
            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faGithub}
                className="h-4 w-4 text-base-label"
              />
              <span>{issue.data.user.login}</span>
            </span>

            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="h-4 w-4 text-base-label"
              />
              <span>
                {formatDistanceToNow(issue.data?.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
            </span>

            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faComment}
                className="h-4 w-4 text-base-label"
              />
              <span className="text-nowrap">
                {issue.data.comments} comentários
              </span>
            </span>
          </CardFooter>
        </CardContent>
      </div>
    </MainCard>
  )
}
