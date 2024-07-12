import { cn } from '@/lib/utils'

import { Rectangle } from '../rectangle'

interface RectangleSectionProps {
  position: 'start' | 'end'
}

export function RectangleSection({ position }: RectangleSectionProps) {
  const amount = Math.round(Math.random() * 5) || 1
  return (
    <div
      className={cn(
        'flex gap-1',
        position === 'start'
          ? 'items-start justify-start'
          : 'items-end justify-end',
      )}
    >
      {Array.from({ length: amount }).map((_, i) => (
        <Rectangle key={i} />
      ))}
    </div>
  )
}
