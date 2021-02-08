import React, { useLayoutEffect, useRef } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import classnames from 'classnames'

import { getScaler } from '@/_private/components/BarChart/helpers'
import { FormatValue } from '@/_private/types'

import { LabelSize } from '../..'
import { Column, SectionItem } from '../Column'
import { TooltipData } from '../Tooltip'

import { getSections } from './helpers'
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

type Props = {
  item: GroupItem
  isHorizontal: boolean
  showReversed: boolean
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
}

export const Group: React.FC<Props> = props => {
  const {
    item: { name: group, columns, reversedColumns },
    isHorizontal,
    showReversed,
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
    style,
    getNumberGridTicks,
  } = props
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

  const scalerCommonColumnsLength = getScaler(columnLength + Math.abs(reversedColumnLength))

  const styleOrientation = (column: number) => {
    if (!isHorizontal) {
      return { minHeight: `${scalerCommonColumnsLength(column)}%`, maxWidth: '70%' }
    } else {
      return { minWidth: `${scalerCommonColumnsLength(column)}%`, maxHeight: '70%' }
    }
  }
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)

  useLayoutEffect(() => {
    if (isHorizontal) {
      getNumberGridTicks(width)
    } else {
      getNumberGridTicks(height)
    }
  }, [width, height, ref, getNumberGridTicks, isHorizontal])

  return (
    <div
      className={classnames(css.group, isHorizontal && css.isHorizontal, className)}
      style={style}
      ref={ref}
    >
      <div className={css.columns}>
        <div className={css.wrapper} style={styleOrientation(columnLength)}>
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        {showReversed && (
          <div
            className={classnames(css.wrapper, css.isReversed)}
            style={styleOrientation(reversedColumnLength)}
          >
            {reversedColumns.map((column, index) => renderColumn(column, index, true))}
          </div>
        )}
      </div>
    </div>
  )
}
