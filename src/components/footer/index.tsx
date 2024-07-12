import { GitHubUserResponse } from '@/api/github/user-request'

import { ContributorCard } from './contributor-card'

export async function Footer() {
  const designerResponse = await fetch(
    'https://api.github.com/users/millenakmartins',
  )
  const designer = (await designerResponse.json()) as
    | GitHubUserResponse
    | undefined

  const developerResponse = await await fetch(
    'https://api.github.com/users/bruno-valero',
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
        <div className="flex items-center justify-center gap-6">
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
