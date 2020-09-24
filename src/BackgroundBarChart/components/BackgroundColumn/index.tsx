import React from 'react'

import classnames from 'classnames'

import { SectionItem } from '@/_private/components/BarChart/components/Column'
import { Section } from '@/_private/components/BarChart/components/Section'

import css from './index.css'

type Props = {
  sections: readonly SectionItem[] | undefined
  isHorizontal: boolean
  isDisabled?: boolean
  onMouseEnter: React.MouseEventHandler
  onMouseLeave: React.MouseEventHandler
}

export const BackgroundColumn: React.FC<Props> = ({
  sections = [],
  isHorizontal,
  isDisabled,
  onMouseEnter,
  onMouseLeave,
}) => {
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

  return (
    <div
      className={classnames(
        css.main,
        isHorizontal && css.isHorizontal,
        isDisabled && css.isDisabled
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {sections.map(renderSection)}
    </div>
  )
}
