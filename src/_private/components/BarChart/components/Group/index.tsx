import React, { useEffect, useRef } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import classnames from 'classnames'

import { FormatValue } from '@/_private/types'
import { NumberRange } from '@/_private/utils/scale'

import { LabelSize } from '../..'
import { Column, SectionItem } from '../Column'
import { TooltipData } from '../Tooltip'

import { getSections, scalerCommonColumnsGroups, styleGroups, styleOrientation } from './helpers'
import css from './index.css'

export type ColumnItem = {
  total: number
  sections?: readonly SectionItem[]
}

export type GroupItem = {
  name: string
  columns: ReadonlyArray<ColumnItem | undefined>
  reversedColumns: ReadonlyArray<ColumnItem | undefined>
}

export type SizeGraphic = {
  width: number
  height: number
}

type Props = {
  item: GroupItem
  isHorizontal: boolean
  activeGroup?: string
  activeSectionIndex?: number
  showValues: boolean
  scalerMaxValue: (value: number) => number
  scalerMinValue: (value: number) => number
  maxNumberGroups: number
  columnLength: number
  reversedColumnLength: number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  onChangeLabelSize?: (size: LabelSize) => void
  className?: string
  style?: React.CSSProperties
  getNumberGridTicks: (length: number) => void
  gridDomain: NumberRange
  limitMinimumCategorySize?: boolean
}

export const Group: React.FC<Props> = props => {
  const {
    item: { name: group, columns, reversedColumns },
    isHorizontal,
    activeGroup,
    activeSectionIndex,
    showValues,
    scalerMaxValue,
    scalerMinValue,
    maxNumberGroups,
    columnLength,
    reversedColumnLength,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onChangeLabelSize,
    className,
    getNumberGridTicks,
    gridDomain,
    limitMinimumCategorySize = false,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)

  const scalerColumnsGroups = scalerCommonColumnsGroups(
    columnLength,
    reversedColumnLength,
    gridDomain
  )

  useEffect(() => {
    if (isHorizontal) {
      getNumberGridTicks(width)
    } else {
      getNumberGridTicks(height)
    }
  }, [width, height, ref, getNumberGridTicks, isHorizontal])

  const renderColumn = (column: ColumnItem | undefined, index: number, isReversed?: boolean) => {
    if (!column) {
      return null
    }

    const sections = getSections({
      sections: column.sections,
      scaler: column.total >= 0 ? scalerMaxValue : scalerMinValue,
    })

    const lengthColumns = !sections[0] || sections[0] === undefined ? 0 : sections[0].length

    return (
      <Column
        key={index}
        group={group}
        total={column.total}
        sections={sections}
        lengthColumns={lengthColumns}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        showValues={showValues}
        activeGroup={activeGroup}
        activeSectionIndex={activeSectionIndex}
        formatValueForLabel={formatValueForLabel}
        onMouseEnterColumn={params => onMouseEnterColumn(group, params)}
        onMouseLeaveColumn={() => onMouseLeaveColumn(group)}
        onChangeLabelSize={onChangeLabelSize}
        maxNumberGroups={maxNumberGroups}
      />
    )
  }
  return (
    <div
      className={classnames(css.group, isHorizontal && css.isHorizontal, className)}
      style={styleGroups(isHorizontal, limitMinimumCategorySize)}
      ref={ref}
    >
      <div className={css.columns}>
        <div
          className={css.wrapper}
          style={styleOrientation(columnLength, isHorizontal, scalerColumnsGroups, gridDomain)}
        >
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        <div
          className={classnames(css.wrapper, css.isReversed)}
          style={styleOrientation(
            reversedColumnLength,
            isHorizontal,
            scalerColumnsGroups,
            gridDomain
          )}
        >
          {reversedColumns.map((column, index) => renderColumn(column, index, true))}
        </div>
      </div>
    </div>
  )
}
