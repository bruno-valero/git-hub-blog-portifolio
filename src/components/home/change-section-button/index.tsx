import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChangeSectionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition
  text: string
  href: string
  active?: boolean
}

export function ChangeSectionButton({
  icon,
  text,
  href,
  active,
}: ChangeSectionButtonProps) {
  return (
    <Link href={href}>
      <Button
        className={cn(
          'group/csb flex gap-2 rounded-[20px] bg-base-profile',
          active
            ? 'bg-blue/30 hover:bg-blue/30'
            : 'hover:bg-gradient-to-r hover:from-base-profile hover:via-blue/20 hover:to-base-profile hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)] hover:shadow-blue/20',
        )}
      >
        <FontAwesomeIcon
          icon={icon}
          className={cn(
            'h-4 w-4 text-base-label group-hover/csb:text-base-text',
            active ? 'text-base-text' : '',
          )}
        />
        <span
          className={cn(
            'text-base-label group-hover/csb:text-base-text',
            active ? 'text-base-text' : '',
          )}
        >
          {text}
        </span>
      </Button>
    </Link>
  )
}
