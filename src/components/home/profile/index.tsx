import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MainCard } from '@/components/main-card'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from '../../link'

export function Profile() {
  return (
    <MainCard>
      <CardHeader className="m-0 p-0">
        <img
          src="https://github.com/bruno-valero.png"
          alt="Bruno Fernandes Valero"
          className="max-h-[9.25rem] max-w-[9.25rem] rounded-[.5rem] object-cover"
        />
      </CardHeader>
      <CardContent className="m-0 flex flex-col items-start justify-center gap-2 p-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-24 font-bold tracking-wide text-white">
            Bruno Fernandes Valero
          </CardTitle>

          <Link
            href="https://github.com/bruno-valero"
            target="_blank"
            className=""
          >
            <span className="leading-[.50rem]">GITHUB</span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 w-3"
            />
          </Link>
        </div>
        <CardDescription className="m-0 p-0 text-16 text-base-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic ducimus
          aspernatur explicabo porro, ad delectus nostrum excepturi ipsam
          blanditiis sed!
        </CardDescription>

        <CardFooter className="m-0 mt-6 flex items-center justify-start gap-6 p-0">
          <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
            <FontAwesomeIcon
              icon={faGithub}
              className="h-4 w-4 text-base-label"
            />
            <span>bruno-valero</span>
          </span>
          <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
            <FontAwesomeIcon
              icon={faBuilding}
              className="h-4 w-4 text-base-label"
            />
            <span>trabalho</span>
          </span>
          <span className="flex items-center justify-center gap-2 text-16 text-base-subtitle">
            <FontAwesomeIcon
              icon={faUserGroup}
              className="h-4 w-4 text-base-label"
            />
            <span className="text-nowrap">5 seguidores</span>
          </span>
        </CardFooter>
      </CardContent>
    </MainCard>
  )
}
