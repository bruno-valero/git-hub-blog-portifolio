import { ReactNode } from 'react'

import { Card } from '../ui/card'

interface MainCardProps {
  children: ReactNode
}

export function MainCard({ children }: MainCardProps) {
  return (
    <div className="-mt-[5.5rem] flex w-full items-center justify-center">
      <Card className="flex h-[13.25rem] w-[54rem] items-center justify-center gap-8 border-none bg-base-profile p-8 shadow-xl outline-none max-[940px]:w-[90%] max-[550px]:h-auto max-[550px]:flex-col">
        {children}
      </Card>
    </div>
  )
}
