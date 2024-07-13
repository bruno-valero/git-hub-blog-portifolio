import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col items-center justify-center py-20">
      <div className="w-full max-w-[56rem] max-[550px]:max-w-[90%]">
        <Card className="border-none bg-base-post p-6 outline-none">
          <CardContent className="mb-0 flex flex-col items-center justify-center gap-3 pb-0">
            <CardHeader className="m-0 p-0">
              <CardTitle className="">
                <span className="text-24 tracking-wide text-base-title">
                  Ops. Não há nada aqui.
                </span>
              </CardTitle>
            </CardHeader>
            <CardDescription className="m-0 p-0">
              <span className="text-18 tracking-wide text-base-span">
                Volte para o início e continue navegando
              </span>
            </CardDescription>
            <CardFooter className="mt-6">
              <Link href={'/'}>
                <Button className="group/back-to-home flex items-center justify-center gap-2 rounded-[20px] bg-base-profile px-16 py-6 hover:bg-gradient-to-r hover:from-base-profile hover:via-blue/20 hover:to-base-profile hover:shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)] hover:shadow-blue/20">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={cn(
                      'mb-1 h-5 w-5 text-base-label group-hover/back-to-home:text-base-text',
                    )}
                  />
                  <span
                    className={
                      'text-18 font-bold text-base-label group-hover/back-to-home:text-base-text'
                    }
                  >
                    Início
                  </span>
                </Button>
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
