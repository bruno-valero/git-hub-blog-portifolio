'use client'

import { FeedCard } from './feed-card'

export type FeedData = {
  title: string
  date: Date
  description: string
  href: string

  newWindow?: boolean
}[]

export interface FeedProps {
  data: FeedData
}

export function Feed({ data }: FeedProps) {
  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="mb-[6rem] grid w-full grid-flow-row grid-cols-2 gap-8">
        {data.map((item, i) => (
          <FeedCard
            key={`${item.date}-${item.title}-${item.description}-${i}`}
            data={item}
          />
        ))}
      </div>
    </div>
  )
}
