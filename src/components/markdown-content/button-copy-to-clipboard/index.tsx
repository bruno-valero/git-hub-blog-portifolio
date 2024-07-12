'use client'

import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface ButtonCopyToClipboardProps {
  data: string
}

export function ButtonCopyToClipboard({ data }: ButtonCopyToClipboardProps) {
  const [copy, setCopy] = useState(false)

  const handleCopyToClipboard = useCallback((data: string) => {
    navigator.clipboard.writeText(data)
    setCopy(true)
  }, [])

  useEffect(() => {
    let time: NodeJS.Timeout | null = null
    if (copy) {
      time = setTimeout(() => {
        setCopy(false)
      }, 1000)
    }

    return () => (time ? clearTimeout(time) : undefined)
  }, [copy])

  return (
    <button
      className={cn(
        'absolute right-0 top-0 flex gap-2 bg-transparent p-5',
        copy ? 'text-blue' : '',
      )}
      onClick={() => handleCopyToClipboard(data)}
    >
      <span
        className={cn(
          copy ? 'opacity-100' : 'opacity-0',
          'transition-all ease-in-out',
        )}
      >
        Copiado
      </span>
      <FontAwesomeIcon
        icon={faCopy}
        className={cn(
          'h-5 w-5 bg-transparent transition-all ease-in-out',
          copy ? 'scale-110 text-blue' : 'text-base-span/80',
        )}
      />
    </button>
  )
}
