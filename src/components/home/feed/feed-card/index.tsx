import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import { Card, CardContent, CardTitle } from '@/components/ui/card'

import { FeedProps } from '..'

interface FeedCardProps {
  data: FeedProps['data'][number]
}

export function FeedCard({ data }: FeedCardProps) {
  return (
    <Card className="m-0 flex flex-1 rounded-[.625rem] border-2 border-transparent bg-base-post p-8 outline-none hover:border-base-label">
      <Link
        href={data.href}
        target={data.newWindow ? '_blank' : '_self'}
        className="flex w-full"
      >
        <CardContent className="m-0 flex w-full flex-col gap-5 p-0">
          <div className="flex w-full items-start justify-between gap-4">
            <CardTitle className="max-w-[16rem] text-wrap text-20 font-bold leading-8 tracking-wide text-base-title">
              {data.title}
            </CardTitle>
            <span className="text-14 text-base-span">
              {formatDistanceToNow(data.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
          </div>

          <span className="text-16 text-base-text">
            <ReactMarkdown>{data.description}</ReactMarkdown>
          </span>
        </CardContent>
      </Link>
    </Card>
  )
}
