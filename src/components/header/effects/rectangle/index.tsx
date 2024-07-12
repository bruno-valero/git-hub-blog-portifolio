import { cn } from '@/lib/utils'

export function Rectangle() {
  // const colorsFull = [
  //   'bg-blue',
  //   'bg-base-border',
  //   'bg-base-background',
  //   'bg-base-input',
  // ]
  // const colors60 = [
  //   'bg-blue/60',
  //   'bg-base-border/60',
  //   'bg-base-background/60',
  //   'bg-base-input/60',
  // ]
  const colors40 = ['bg-blue/20', 'bg-base-background/30']
  const colors20 = ['bg-blue/10', 'bg-base-background/20']

  const colors = [...colors40, ...colors20]

  const width = Math.random() * 150 || 25
  return (
    <div
      className={cn(
        'h-[3px] max-h-[3px] min-h-[3px]',
        colors[Math.round(Math.random() * (colors.length - 1))],
      )}
      style={{ width: width < 25 ? 25 : width }}
    ></div>
  )
}
