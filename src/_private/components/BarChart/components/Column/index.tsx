import React from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import { isDefined, isNotNil } from '@consta/widgets-utils/lib/type-guards'
import classnames from 'classnames'
import { isNumber } from 'lodash'

import { FormatValue } from '@/_private/types'

import { LabelSize } from '../..'
import { Size } from '../../helpers'
import { Section } from '../Section'
import { TooltipData } from '../Tooltip'

import css from './index.css'

export type ColumnSize = Exclude<Size, 'auto'>

export type SectionItem = {
  color: string
  value?: number
  length?: number
  name?: string
}

export type ColumnProperty = {
  width: number
  height: number
}

export type OnMouseEnterColumn = (params: TooltipData) => void

export const getColumnCenter = (collection: HTMLCollection | undefined, isHorizontal: boolean) => {
  const children = collection || []
  const { left, top } = children[isHorizontal ? 0 : children.length - 1].getBoundingClientRect()
  const { height, width } = Array.from(children).reduce(
    (prev, element) =>
      isHorizontal
        ? {
            width: prev.width + element.getBoundingClientRect().width,
            height: element.getBoundingClientRect().height,
          }
        : {
            width: element.getBoundingClientRect().width,
            height: prev.height + element.getBoundingClientRect().height,
          },
    { width: 0, height: 0 }
  )

  const x = left + width / 2
  const y = top + height / 2

  return { x, y }
}

type Props = {
  group: string
  total: number
  sections: readonly SectionItem[] | undefined
  showValues: boolean
  isHorizontal: boolean
  lengthColumns?: number
  isReversed?: boolean
  activeGroup?: string
  activeSectionIndex?: number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onChangeLabelSize?: (size: LabelSize) => void
  maxNumberGroups: number
}

export const Column: React.FC<Props> = ({
  group,
  total,
  sections = [],
  lengthColumns,
  showValues,
  isHorizontal,
  isReversed = false,
  activeGroup,
  activeSectionIndex,
  formatValueForLabel = String,
  onMouseEnterColumn,
  onMouseLeaveColumn,
  onChangeLabelSize,
  maxNumberGroups,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)
  const columnProperty: ColumnProperty = { width, height }
  const handleMouseEnter: React.MouseEventHandler = event => {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return
    }

    const { x, y } = getColumnCenter(event.currentTarget.parentElement?.children, isHorizontal)
    const selectedSections = sections.filter(isDefined)

    onMouseEnterColumn({
      x,
      y,
      items: isHorizontal ? selectedSections : [...selectedSections].reverse(),
    })
  }

  const renderSection = (item: SectionItem | undefined, index: number) => {
    if (!item || item.length === undefined) {
      return null
    }

    const isLastItem = isReversed ? index === 0 : index === sections.length - 1
    const isColumnLabel = showValues && isLastItem
    const isSectionLabel = isNumber(activeSectionIndex) && activeSectionIndex === index
    const isActive =
      isSectionLabel ||
      (activeGroup && activeGroup === group) ||
      (!activeGroup && !isNumber(activeSectionIndex))

    const getLabel = () => {
      if (isColumnLabel && isNotNil(total)) {
        return formatValueForLabel(total)
      }

      if (isSectionLabel && isNotNil(item.value)) {
        return formatValueForLabel(item.value)
      }
    }

    return (
      <Section
        color={item.color}
        length={item.length}
        key={index}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isActive={isActive}
        label={getLabel()}
        onChangeLabelSize={onChangeLabelSize}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeaveColumn}
        columnProperty={columnProperty}
      />
    )
  }

  const padding = (70 / maxNumberGroups) * 0.2

  const styleOrientation = () => {
    if (!isHorizontal) {
      return {
        minHeight: `${lengthColumns}%`,
        minWidth: `${70 / maxNumberGroups - padding}%`,
        padding: `0 ${padding}% 0 0`,
      }
    } else {
      return {
        minWidth: `${lengthColumns}%`,
        minHeight: `${70 / maxNumberGroups - padding}%`,
        padding: `0 0 ${padding}% 0`,
      }
    }
  }

  return (
    <div
      className={classnames(
        css.column,
        isHorizontal && css.isHorizontal,
        isReversed && css.isReversed
      )}
      style={styleOrientation()}
      ref={ref}
    >
      {sections.map(renderSection)}
    </div>
  )
}
