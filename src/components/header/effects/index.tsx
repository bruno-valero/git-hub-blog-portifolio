import { RectangleSection } from './rectangle-section'

interface EffectsProps {
  position: 'start' | 'end'
}

export function Effects({ position }: EffectsProps) {
  interface RectangleSectionGroupProps {
    position: 'start' | 'end'
  }
  function RectangleSectionGroup({ position }: RectangleSectionGroupProps) {
    const lines = Math.round(Math.random() * 7) || 3

    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: lines < 3 ? 3 : lines }).map((_, i) => (
          <RectangleSection key={i} position={position} />
        ))}
      </div>
    )
  }

  function SpaceSectionGroup() {
    const lines = Math.round(Math.random() * 7) || 3

    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: lines < 3 ? 3 : lines }).map((_, i) => (
          <div key={i} className="max-h-[9px] min-h-[9px]" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0">
      <SpaceSectionGroup />
      <RectangleSectionGroup position={position} />
      <SpaceSectionGroup />
      <RectangleSectionGroup position={position} />
      <SpaceSectionGroup />
      <RectangleSectionGroup position={position} />
      <SpaceSectionGroup />
      <RectangleSectionGroup position={position} />
    </div>
  )
}
