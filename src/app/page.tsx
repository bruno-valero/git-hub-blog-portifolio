import { Header } from '@/components/header'
import { Home } from '@/components/home'

export type ServerProps = {
  params: Record<string, string | undefined>
  searchParams: Record<string, string | undefined>
}

export default function HomePage(props: ServerProps) {
  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-start justify-start">
      <Header />
      <Home {...{ serverProps: props }} />
    </main>
  )
}
