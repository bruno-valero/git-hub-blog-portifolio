import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faCalendarDay,
  faChevronLeft,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Repo } from '@/api/github/classes/repos'
import { MainCard } from '@/components/main-card'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from '../../link'

export interface RepoHeaderProps {
  repo: Repo
}

export async function RepoHeader({ repo }: RepoHeaderProps) {
  return (
    <MainCard>
      <div className="flex w-full flex-col gap-6">
        <CardHeader className="m-0 flex w-full flex-row items-center justify-between p-0">
          <Link href={'/'} className="">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
            <span className="leading-[.50rem]">VOLTAR</span>
          </Link>
          <Link href={repo?.data.html_url ?? ''} target="_blank" className="">
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
              {repo.name}
            </span>
          </CardTitle>

          <CardFooter className="m-0 mt-6 flex items-center justify-start gap-6 p-0">
            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faGithub}
                className="h-4 w-4 text-base-label"
              />
              <span>{repo.data.owner.login}</span>
            </span>

            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="h-4 w-4 text-base-label"
              />
              <span>
                {formatDistanceToNow(repo.data?.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
            </span>

            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faCodeBranch}
                className="h-4 w-4 text-base-label"
              />
              <span className="text-nowrap">{repo.data.default_branch}</span>
            </span>
          </CardFooter>
        </CardContent>
      </div>
    </MainCard>
  )
}
