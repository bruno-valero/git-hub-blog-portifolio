import logo from '@/assets/logo.svg'

import { Effects } from './effects'

export function Header() {
  return (
    <div className="relative -z-[1] flex h-[18.5rem] min-h-[18.5rem] w-full min-w-[100vw] flex-col items-center justify-end overflow-hidden bg-gradient-to-r from-blue/20 from-10% via-base-profile via-50% to-blue/20 to-90% shadow">
      <div className="-mb-[3.5rem] min-h-[9rem] w-full min-w-[56rem] max-w-[56rem] rounded-[20px] bg-blue/5 shadow-[0_-20px_40px_35px_rgba(0,0,0,0.1)] shadow-blue/5"></div>
      <div className="absolute bottom-[8.375rem] flex flex-col items-center justify-center gap-4">
        <img
          src={logo.src}
          alt="github blob"
          className="m-0 h-11 w-10 object-contain p-0"
        />
        <h1 className="m-0 p-0 font-mono text-24 font-extralight uppercase text-blue/80">
          GITHUB BLOG
        </h1>
      </div>
      <div className="absolute left-0 top-0 z-[-1]">
        <Effects position="start" />
      </div>
      <div className="absolute right-0 top-0 z-[-1]">
        <Effects position="end" />
      </div>
    </div>
  )
}
