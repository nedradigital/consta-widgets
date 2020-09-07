import React from 'react'

import { SectionItem } from '@/_private/components/BarChart/components/Column'
import { Section } from '@/_private/components/BarChart/components/Section'

type Props = {
  sections: readonly SectionItem[] | undefined
  isHorizontal: boolean
}

export const BackgroundColumn: React.FC<Props> = ({ sections = [], isHorizontal }) => {
  const renderSection = (item: SectionItem | undefined, index: number) => {
    if (!item || item.length === undefined) {
      return null
    }

    return (
      <Section
        key={index}
        isHorizontal={isHorizontal}
        length={item.length}
        color={item.color}
        isReversed={false}
        isRounded={false}
        isActive
      />
    )
  }

  return <>{sections.map(renderSection)}</>
}
