import NextLink from 'next/link'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface LinkProps extends ComponentProps<typeof NextLink> {}

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      {...props}
      className={cn(
        'flex items-end justify-end gap-2 pb-1 text-12 text-blue hover:border-b-[1px] hover:border-b-blue',
        className || '',
        'text-blue',
      )}
    >
      {children}
    </NextLink>
  )
}
