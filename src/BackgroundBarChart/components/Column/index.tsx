import React from 'react'

import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import classnames from 'classnames'

import { LabelSize } from '@/_private/components/BarChart'
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
  onChangeLabelSize?: (size: LabelSize) => void
}

export const Column = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      total,
      sections = [],
      isHorizontal,
      showValues,
      align,
      formatValueForLabel = String,
      onChangeLabelSize,
    },
    ref
  ) => {
    const sectionsRef = React.useRef(sections.map(() => React.createRef<HTMLDivElement>()))

    const totalSectionSize = sectionsRef.current.reduce((acc, sectionRef) => {
      if (!sectionRef.current) {
        return acc
      }

      const { width, height } = sectionRef.current.getBoundingClientRect()

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
          ref={sectionsRef.current[index]}
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
)
