import { Nunito } from 'next/font/google'

// const colors = {
//   blue: '#3294F8',
//   'base-title': '#E7EDF4',
//   'base-subtitle': '#C4D4E3',
//   'base-text': '#AFC2D4',
//   'base-span': '#7B96B2',
//   'base-label': '#3A536B',
//   'base-border': '#1C2F41',
//   'base-post': '#112131',
//   'base-profile': '#0B1B2B',
//   'base-background': '#071422',
//   'base-input': '#040F1A',
// }

const nunito = Nunito({ subsets: ['latin'] })

interface OpenGraphMainHeaderProps {
  imageUrl: string
  name: string
  description: string | null
  followers: number
}

export function OpenGraphMainHeader({
  imageUrl,
  name,
  description,
  followers,
}: OpenGraphMainHeaderProps) {
  return (
    <div
      tw={`flex w-full h-full flex-col items-center justify-center relative`}
      style={nunito.style}
    >
      <div tw="relative -z-[1] flex h-[252px] max-h-[252px] min-h-[252px] w-full min-w-[100vw] flex-col items-center justify-end overflow-hidden bg-[#3294F8] shadow"></div>
      <div tw="relative -z-[1] flex h-[378px] max-h-[378px] min-h-[378px] w-full min-w-[100vw] flex-col items-center justify-end overflow-hidden bg-[#071422] shadow">
        {/* <div tw="-mb-[3.5rem] h-[122px] max-h-[122px] min-h-[122px] w-full min-w-[56rem] max-w-[56rem] rounded-[20px] bg-[#3294F8]/5 shadow-[0_-20px_40px_35px_rgba(0,0,0,0.1)] shadow-[#3294F8]/5"></div> */}
      </div>

      {/* <div tw="h-[252px] max-h-[252px] min-h-[252px] bg-[#071422]" /> */}

      {/* <div className="h-[252px] max-h-[252px] min-h-[252px]" /> */}
      <div tw="flex flex-col absolute top-[164px] h-[13.25rem] w-[54rem] items-center justify-center gap-8 border-none rounded bg-[#0B1B2B] p-8 shadow-xl outline-none">
        <div tw="flex flex-row w-full" style={{ gap: 24 }}>
          <div tw="w-[148px] h-[148px] flex">
            <img
              src={imageUrl}
              alt={name}
              tw="max-h-[148px] max-w-[148px] rounded-[.5rem] object-cover"
            />
          </div>

          <div tw="flex w-full flex-col gap-6">
            <span tw="text-[35px] font-bold tracking-wide text-[#E7EDF4]">
              {name}
            </span>
            <div tw="m-0 flex flex-col items-start justify-center gap-3 p-0">
              <span tw="text-[16px] font-bold tracking-wide text-[#7B96B2]">
                {description}
              </span>

              <div tw="mt-6 flex items-start justify-center gap-6 flex-col">
                <div tw="flex items-center justify-center gap-2 text-[16px] text-[#C4D4E3]">
                  <span tw="text-nowrap">{followers} seguidores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
