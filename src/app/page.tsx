import { Header } from '@/components/header'
import { Home } from '@/components/home'

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-start justify-start">
      <Header />
      <Home />
    </main>
  )
}
