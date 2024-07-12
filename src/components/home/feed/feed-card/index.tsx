import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'

import { FeedProps } from '..'

interface FeedCardProps {
  data: FeedProps['data'][number]
}

export function FeedCard({ data }: FeedCardProps) {
  return (
    <Link href={data.href}>
      <Card className="m-0 rounded-[.625rem] border-2 border-transparent bg-base-post p-8 outline-none hover:border-base-label">
        <CardContent className="m-0 flex flex-col gap-5 p-0">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="max-w-[17.5rem] text-wrap text-20 font-bold tracking-wide text-base-title">
              {data.title}
            </CardTitle>
            <span className="text-14 text-base-span">
              {formatDistanceToNow(data.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
          </div>
          <CardDescription className="text-16 text-base-text">
            {data.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
