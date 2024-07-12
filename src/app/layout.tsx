import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Bruno Valero',
    template: '%s | Bruno Valero',
  },
  description: 'Sites e sistemas para web',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} max-w-[100vw] overflow-y-auto overflow-x-hidden bg-base-background leading-default`}
      >
        {children}
      </body>
    </html>
  )
}
