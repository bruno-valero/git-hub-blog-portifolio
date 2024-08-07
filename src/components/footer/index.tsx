import { GitHubUserResponse } from '@/api/github/@types/user-request'
import { envBackend } from '@/env-backend'

import { ContributorCard } from './contributor-card'

export async function Footer() {
  const designerResponse = await fetch(
    'https://api.github.com/users/millenakmartins',

    {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
    },
  )
  const designer = (await designerResponse.json()) as
    | GitHubUserResponse
    | undefined

  const developerResponse = await fetch(
    'https://api.github.com/users/bruno-valero',
    {
      next: {
        revalidate: 60 * 10, // 10 minutes
      },
      headers: [['Authorization', `Bearer ${envBackend.GITHUB_AUTH_TOKEN}`]],
    },
  )

  const developer = (await developerResponse.json()) as
    | GitHubUserResponse
    | undefined

  return (
    <div className="w-full bg-base-input shadow-[0px_-5px_10px_5px_rgba(0,0,0,0.1)]">
      <div className="flex w-full flex-col gap-6 p-10">
        <div className="flex w-full items-center justify-center">
          <h2 className="text-24 font-semibold tracking-wide text-base-span">
            Contribuidores
          </h2>
        </div>
        <div className="flex items-center justify-center gap-6 max-[550px]:max-w-[90%] max-[550px]:flex-col max-[550px]:gap-4">
          {designer && (
            <ContributorCard
              {...{
                imageUrl: designer.avatar_url,
                socialUrl: designer.html_url,
                role: 'Designer',
                name: designer.name,
              }}
            />
          )}
          {developer && (
            <ContributorCard
              {...{
                imageUrl: developer.avatar_url,
                socialUrl: developer.html_url,
                role: 'Desenvolvedor',
                name: developer.name,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
