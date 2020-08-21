import React from 'react'

import { useComponentSize } from '@gpn-design/uikit/useComponentSize'
import classnames from 'classnames'

import { FormatValue } from '@/_private/types'

import { Column, ColumnSize, OnMouseEnterColumn, SectionItem } from '../Column'

import { getSections } from './helpers'
import css from './index.css'

export type ColumnItem = {
  total: number
  sections?: readonly SectionItem[]
}

type Props = {
  name: string
  group: string
  columns: ReadonlyArray<ColumnItem | undefined>
  reversedColumns: ReadonlyArray<ColumnItem | undefined>
  maxValue: number
  isHorizontal: boolean
  isNegative: boolean
  size: ColumnSize
  isDense?: boolean
  activeGroup?: string
  activeSectionIndex?: number
  showValues: boolean
  scaler: (size: number, value: number) => number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onChangeLabelSize?: (size: number) => void
  className?: string
  style?: React.CSSProperties
}

export const Group = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    columns,
    group,
    reversedColumns,
    maxValue,
    isHorizontal,
    isNegative,
    size,
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
  const { width, height } = useComponentSize(columnsRef)
  const scalerSize = isHorizontal ? width : height

  const renderColumn = (column: ColumnItem | undefined, index: number, isReversed?: boolean) => {
    if (!column) {
      return null
    }

    const sections = getSections({
      size: scalerSize,
      sections: column.sections,
      scaler,
      maxValue,
    })

    return (
      <Column
        key={index}
        group={group}
        total={column.total}
        sections={sections}
        size={size}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isDense={isDense}
        showValues={showValues}
        activeGroup={activeGroup}
        activeSectionIndex={activeSectionIndex}
        formatValueForLabel={formatValueForLabel}
        onMouseEnterColumn={onMouseEnterColumn}
        onMouseLeaveColumn={onMouseLeaveColumn}
        onChangeLabelSize={index === 0 ? onChangeLabelSize : undefined}
      />
    )
  }

  return (
    <div
      className={classnames(css.group, isHorizontal && css.isHorizontal, className)}
      style={style}
      ref={ref}
    >
      <div ref={columnsRef} className={css.columns}>
        <div className={css.wrapper}>
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        {isNegative && (
          <div className={classnames(css.wrapper, css.isReversed)}>
            {reversedColumns.map((column, index) => renderColumn(column, index, true))}
          </div>
        )}
      </div>
    </div>
  )
})
