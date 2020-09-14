import React from 'react'

import classnames from 'classnames'

import { FormatValue } from '@/_private/types'

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
  scaler: (value: number) => number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  onChangeLabelSize?: (size: number) => void
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
    scaler,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onChangeLabelSize,
    className,
    style,
  } = props
  const columnsRef = React.useRef<HTMLDivElement>(null)

  const renderColumn = (column: ColumnItem | undefined, index: number, isReversed?: boolean) => {
    if (!column) {
      return null
    }

    const sections = getSections({
      sections: column.sections,
      scaler,
    })

    return (
      <Column
        key={index}
        group={group}
        total={column.total}
        sections={sections}
        size={columnSize}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isDense={isDense}
        showValues={showValues}
        activeGroup={activeGroup}
        activeSectionIndex={activeSectionIndex}
        formatValueForLabel={formatValueForLabel}
        onMouseEnterColumn={params => onMouseEnterColumn(group, params)}
        onMouseLeaveColumn={() => onMouseLeaveColumn(group)}
        onChangeLabelSize={index === 0 ? onChangeLabelSize : undefined}
      />
    )
  }

  return (
    <div
      className={classnames(css.group, isHorizontal && css.isHorizontal, className)}
      style={style}
    >
      <div ref={columnsRef} className={css.columns}>
        <div className={css.wrapper}>
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        {showReversed && (
          <div className={classnames(css.wrapper, css.isReversed)}>
            {reversedColumns.map((column, index) => renderColumn(column, index, true))}
          </div>
        )}
      </div>
    </div>
  )
}
