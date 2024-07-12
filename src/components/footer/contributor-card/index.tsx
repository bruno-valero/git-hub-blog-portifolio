import Link from 'next/link'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ContributorCardProps {
  name: string
  imageUrl: string
  role: string
  socialUrl: string
}

export function ContributorCard({
  name,
  role,
  imageUrl,
  socialUrl,
}: ContributorCardProps) {
  return (
    <Link href={socialUrl} target="_blank">
      <Card
        className={cn(
          'm-0 w-auto rounded-full border-transparent bg-base-profile px-3 py-2',
          'hover:bg-gradient-to-r hover:from-base-profile hover:via-blue/20 hover:to-base-profile hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)] hover:shadow-blue/20',
        )}
      >
        <CardContent className="m-0 flex w-full items-center justify-center gap-3 p-0">
          <img
            src={imageUrl}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="mr-3">
            <CardTitle>
              <span className="text-16 font-semibold tracking-wide text-white">
                {role}
              </span>
            </CardTitle>
            <span className="text-12 font-normal tracking-wide text-base-span">
              {name}
            </span>
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
