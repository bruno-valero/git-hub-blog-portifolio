import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GitHubUserResponse } from '@/api/github/@types/user-request'
import { MainCard } from '@/components/main-card'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { envBackend } from '@/env-backend'

import { Link } from '../../link'

export async function Profile() {
  const developerResponse = await fetch(
    'https://api.github.com/users/bruno-valero',
    {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    },
  )

  const developer = (await developerResponse.json()) as
    | GitHubUserResponse
    | undefined

  return (
    <MainCard>
      <CardHeader className="m-0 p-0">
        <img
          src={developer?.avatar_url}
          alt={developer?.name}
          className="max-h-[9.25rem] max-w-[9.25rem] rounded-[.5rem] object-cover"
        />
      </CardHeader>
      <CardContent className="m-0 flex flex-1 flex-col items-start justify-center gap-3 p-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="">
            <span className="text-24 font-bold tracking-wide text-white">
              {developer?.name}
            </span>
          </CardTitle>

          <Link href={developer?.url ?? ''} target="_blank" className="">
            <span className="leading-[.50rem]">GITHUB</span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 w-3"
            />
          </Link>
        </div>
        <CardDescription className="m-0 p-0">
          <span className="text-16 text-base-text">{developer?.bio}</span>
        </CardDescription>

        <CardFooter className="m-0 mt-6 flex items-center justify-start gap-6 p-0">
          <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
            <FontAwesomeIcon
              icon={faGithub}
              className="h-4 w-4 text-base-label"
            />
            <span>{developer?.login}</span>
          </span>

          {developer?.company && (
            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faBuilding}
                className="h-4 w-4 text-base-label"
              />
              <span>{developer?.company}</span>
            </span>
          )}
          {developer?.followers !== undefined && (
            <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
              <FontAwesomeIcon
                icon={faUserGroup}
                className="h-4 w-4 text-base-label"
              />
              <span className="text-nowrap">
                {developer.followers} seguidores
              </span>
            </span>
          )}
        </CardFooter>
      </CardContent>
    </MainCard>
  )
}
