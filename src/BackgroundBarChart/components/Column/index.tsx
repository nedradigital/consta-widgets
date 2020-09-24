import React from 'react'

import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import classnames from 'classnames'

import { SectionItem } from '@/_private/components/BarChart/components/Column'
import baseCss from '@/_private/components/BarChart/components/Column/index.css'
import { Section } from '@/_private/components/BarChart/components/Section'
import { FormatValue } from '@/_private/types'
import { Align } from '@/BackgroundBarChart'

import css from './index.css'

type Props = {
  group: string
  total: number
  sections: readonly SectionItem[] | undefined
  showValues: boolean
  isHorizontal: boolean
  align: Align
  formatValueForLabel?: FormatValue
  onChangeLabelSize?: (size: number) => void
}

export const Column: React.FC<Props> = ({
  total,
  sections = [],
  isHorizontal,
  showValues,
  align,
  formatValueForLabel = String,
  onChangeLabelSize,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const totalSectionSize = Array.from(ref.current?.children ?? []).reduce((acc, curr) => {
    const { width, height } = curr.getBoundingClientRect()

    return (isHorizontal ? width : height) + acc
  }, 0)

  const renderSection = (item: SectionItem | undefined, index: number) => {
    if (!item || item.length === undefined) {
      return null
    }

    const isLastItem = index === sections.length - 1
    const label =
      isLastItem && isNotNil(total) && showValues ? formatValueForLabel(total) : undefined

    return (
      <Section
        color={item.color}
        length={item.length}
        key={index}
        isHorizontal={isHorizontal}
        isReversed={false}
        isRounded={isLastItem}
        isActive={true}
        label={label}
        className={classnames(
          css.section,
          isHorizontal && css.isHorizontal,
          align === 'end' && css.alignEnd
        )}
        onChangeLabelSize={onChangeLabelSize}
      />
    )
  }

  return (
    <div
      ref={ref}
      style={{
        ['--total-section-size' as string]: `${totalSectionSize}px`,
      }}
      className={classnames(baseCss.column, isHorizontal && baseCss.isHorizontal)}
    >
      {sections.map(renderSection)}
    </div>
  )
}
