import { redirect } from 'next/navigation'

export default async function RepoPage() {
  redirect('/?homeSection=repos')
}
