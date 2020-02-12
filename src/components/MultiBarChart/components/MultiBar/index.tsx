import React from 'react'

import * as d3 from 'd3'

import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard/types'

type GroupScale = d3.ScaleBand<string>
type ValuesScale = d3.ScaleLinear<number, number>

export type GeometryParams = {
  x: number
  y: number
  columnSize: number
}

export type ColumnDetail = {
  category: string
  columnName: string
  value: number
  positionBegin: number
  positionEnd: number
}

export type ColumnWithGeometry = GeometryParams & ColumnDetail

export type MultiBarType = {
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
  keyGroup: string
}

export type MouseActionParams = {
  innerTranslate: number
  columnName: string
  values: readonly ColumnWithGeometry[]
  params?: GeometryParams
}

type MouseAction = (column?: MouseActionParams) => void

type Props = {
  data: MultiBarType
  isVertical: boolean
  groupScale: GroupScale
  valuesScale: ValuesScale
  color: ColorGroups
  uniqueInnerColumns: readonly string[]
  onMouseLeave: () => void
  onMouseEnter: MouseAction
  parentRef: React.RefObject<SVGGElement>
  formatValue?: FormatValue
}

export const COLUMN_SIZE = 12
const COLUMN_PADDING = 4

export const MultiBar: React.FC<Props> = ({
  data,
  isVertical,
  groupScale,
  valuesScale,
  color,
  uniqueInnerColumns,
  onMouseLeave,
  onMouseEnter,
}) => {
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const columnDefaultSize = getCalculatedSizeWithBaseSize(COLUMN_SIZE)
  const columnPadding = getCalculatedSizeWithBaseSize(COLUMN_PADDING)
  const barSize = (columnDefaultSize + columnPadding) * uniqueInnerColumns.length

  const groupSecondaryScale = d3
    .scaleBand()
    .padding(0.05)
    .domain([...uniqueInnerColumns])
    .rangeRound([0, barSize])
    .padding(0.05)

  const { columnDetails, keyGroup } = data

  const columnDetailsData: ReadonlyArray<readonly ColumnWithGeometry[]> = columnDetails.map(
    columns =>
      columns.map(column => {
        const { columnName, positionBegin, positionEnd } = column

        const groupSecondaryValue = groupSecondaryScale(columnName)

        return {
          ...column,
          columnSize: Math.abs(valuesScale(positionBegin) - valuesScale(positionEnd)),
          x: (isVertical ? groupSecondaryValue : valuesScale(positionBegin)) || 0,
          y: (isVertical ? valuesScale(positionEnd) : groupSecondaryValue) || 0,
        }
      })
  )

  const translate = (groupScale(String(keyGroup)) || 0) + groupScale.bandwidth() / 2 - barSize / 2
  const transform = isVertical ? `translate(${translate}, 0)` : `translate(0, ${translate})`

  const renderContent = (
    column: ColumnWithGeometry,
    index: number,
    items: readonly ColumnWithGeometry[]
  ) => {
    const { x, y, columnSize, columnName } = column

    const details = {
      columnName,
      innerTranslate: translate,
      params: {
        columnSize: items.reduce((a, b) => a + b.columnSize, 0),
        x: items[0].x,
        y: items[items.length - 1].y,
      },
      values: isVertical ? [...items].reverse() : items,
    }

    return (
      <rect
        key={keyGroup + index}
        x={x}
        y={y}
        width={isVertical ? columnDefaultSize : columnSize}
        height={isVertical ? columnSize : columnDefaultSize}
        fill={color[column.category]}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => onMouseEnter(details)}
      />
    )
  }

  return <g transform={transform}>{columnDetailsData.map(columns => columns.map(renderContent))}</g>
}
