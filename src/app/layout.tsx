import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { envBackend } from '@/env-backend'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Bruno Valero',
    template: '%s | Bruno Valero',
  },
  description: 'Sites e sistemas para web',
  authors: [
    { name: 'Bruno Fernandes Valero', url: 'https://github.com/bruno-valero' },
  ],
  creator: 'Bruno Fernandes Valero',
  keywords: [
    'Bruno Valero',
    'Bruno Fernandes Valero',
    'github',
    'git hub',
    'blog',
    'node',
    'nodejs',
    'node js',
    'react',
    'reactjs',
    'react js',
    'next',
    'nextjs',
    'next js',
  ],
  openGraph: {
    authors: ['Bruno Fernandes Valero'],
    creators: ['Bruno Fernandes Valero'],
    description: 'Sites e sistemas para web',
    url: `${envBackend.BASE_URL}`,
  },
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
