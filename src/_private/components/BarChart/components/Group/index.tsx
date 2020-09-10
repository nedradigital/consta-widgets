import React from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import classnames from 'classnames'
import _ from 'lodash'

import { FormatValue } from '@/_private/types'

import { ColumnSize, OnMouseEnterColumn, SectionItem } from '../Column'

import { getSectionsForColumns } from './helpers'
import css from './index.css'

export type ColumnItem = {
  total: number
  sections?: readonly SectionItem[]
}

type BaseProps = {
  group: string
  isHorizontal: boolean
  isDense?: boolean
}

type RenderBaseProps = {
  isReversed: boolean
  index: number
  sections: readonly SectionItem[]
} & BaseProps

export type RenderColumn = (
  props: {
    total?: number
    /**
     * Подготовленные элементы секций через `renderSection`
     */
    children: React.ReactNode
    onMouseEnterColumn: OnMouseEnterColumn
    onMouseLeaveColumn: React.MouseEventHandler
  } & RenderBaseProps
) => React.ReactNode

export type RenderSection = (
  props: {
    isLast: boolean
    columnSize: ColumnSize
    showValues: boolean
    activeGroup?: string
    activeSectionIndex?: number
    columnTotal?: number
    formatValueForLabel: FormatValue
    onMouseEnterSection: OnMouseEnterColumn
    onMouseLeaveSection: React.MouseEventHandler
    onChangeLabelSize?: (size: number) => void
  } & RenderBaseProps &
    SectionItem
) => React.ReactNode

type Props = BaseProps & {
  name: string
  columns: ReadonlyArray<ColumnItem | undefined>
  reversedColumns: ReadonlyArray<ColumnItem | undefined>
  maxValue: number
  isNegative: boolean
  size: ColumnSize
  activeGroup?: string
  activeSectionIndex?: number
  showValues: boolean
  scaler: (size: number, value: number) => number
  renderColumn: RenderColumn
  renderSection: RenderSection
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onChangeLabelSize?: (size: number) => void
  onMouseLeaveSection: React.MouseEventHandler
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
    formatValueForLabel = String,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onMouseLeaveSection,
    onChangeLabelSize,
    className,
    style,
    renderColumn,
    renderSection,
  } = props
  const columnsRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(columnsRef)
  const scalerSize = isHorizontal ? width : height

  const sectionForColumns = getSectionsForColumns({
    columns,
    scalerSize,
    maxValue,
    scaler,
  })
  const sectionsForReversedColumns = getSectionsForColumns({
    columns: reversedColumns,
    scalerSize,
    maxValue,
    scaler,
  })

  const getRenderColumn = (
    sectionsById: Record<number, readonly SectionItem[]>,
    isReversed: boolean
  ) => {
    return (column: ColumnItem | undefined, columnIdx: number) => {
      const sectionsForColumn = sectionsById[columnIdx]
      const baseProps = {
        group,
        isHorizontal,
        isDense,
        isReversed,
        sections: sectionsForColumn,
      }
      const sectionsProps = {
        ...baseProps,
        activeGroup,
        activeSectionIndex,
        showValues,
        columnSize: size,
        formatValueForLabel,
        onMouseEnterSection: onMouseEnterColumn,
        onMouseLeaveSection,
        onChangeLabelSize,
      }
      const columnProps = {
        ...baseProps,
        index: columnIdx,
        total: column?.total,
        onMouseEnterColumn,
        onMouseLeaveColumn,
        children: sectionsForColumn.map((section, sectionIdx) =>
          renderSection({
            ...sectionsProps,
            ...section,
            index: sectionIdx,
            columnTotal: column?.total,
            isLast: isReversed ? sectionIdx === 0 : sectionIdx === sectionsForColumn.length - 1,
          })
        ),
      }

      return renderColumn(columnProps)
    }
  }

  return (
    <div
      className={classnames(css.group, isHorizontal && css.isHorizontal, className)}
      style={style}
      ref={ref}
    >
      <div ref={columnsRef} className={css.columns}>
        <div className={css.wrapper}>{columns.map(getRenderColumn(sectionForColumns, false))}</div>
        {isNegative && (
          <div className={classnames(css.wrapper, css.isReversed)}>
            {reversedColumns.map(getRenderColumn(sectionsForReversedColumns, true))}
          </div>
        )}
      </div>
    </div>
  )
})
