import React from 'react'

import classnames from 'classnames'

import { getScaler } from '@/_private/components/BarChart/helpers'
import { FormatValue } from '@/_private/types'

import { LabelSize } from '../..'
import { Column, ColumnSize, SectionItem } from '../Column'
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
  columnSize: ColumnSize
  isDense?: boolean
  activeGroup?: string
  activeSectionIndex?: number
  showValues: boolean
  scalerMaxValue: (value: number) => number
  scalerMinValue: (value: number) => number
  columnLength: number
  reversedColumnLength: number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  onChangeLabelSize?: (size: LabelSize) => void
  className?: string
  style?: React.CSSProperties
}

export const Group: React.FC<Props> = props => {
  const {
    item: { name: group, columns, reversedColumns },
    isHorizontal,
    showReversed,
    columnSize,
    isDense,
    activeGroup,
    activeSectionIndex,
    showValues,
    scalerMaxValue,
    scalerMinValue,
    columnLength,
    reversedColumnLength,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onChangeLabelSize,
    className,
    style,
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
        size={columnSize}
        lengthColumns={lengthColumns}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isDense={isDense}
        showValues={showValues}
        activeGroup={activeGroup}
        activeSectionIndex={activeSectionIndex}
        formatValueForLabel={formatValueForLabel}
        onMouseEnterColumn={params => onMouseEnterColumn(group, params)}
        onMouseLeaveColumn={() => onMouseLeaveColumn(group)}
        onChangeLabelSize={onChangeLabelSize}
      />
    )
  }

  const scalerCommonColumnsLength = getScaler(columnLength + Math.abs(reversedColumnLength))

  const styleOrientation = (column: number) => {
    if (!isHorizontal) {
      return { minHeight: `${scalerCommonColumnsLength(column)}%` }
    } else {
      return { minWidth: `${scalerCommonColumnsLength(column)}%` }
    }
  }

  return (
    <div
      className={classnames(css.group, isHorizontal && css.isHorizontal, className)}
      style={style}
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
