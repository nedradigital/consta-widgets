import React from 'react'

import classnames from 'classnames'
import { flattenDeep, uniq } from 'lodash'

import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard/types'
import { scaleBand, Scaler } from '@/utils/scale'

import { Size } from '../..'

import css from './index.css'

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

export type MouseActionParams = {
  innerTranslate: number
  values: readonly ColumnWithGeometry[]
  params?: GeometryParams
}

type MouseAction = (column?: MouseActionParams) => void

type Props = {
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
  groupName: string
  isVertical: boolean
  groupScale: Scaler<string>
  valuesScale: Scaler<number>
  color: ColorGroups
  onMouseLeave: () => void
  onMouseEnter: MouseAction
  onChangeSize: (size: number) => void
  parentRef: React.RefObject<SVGGElement>
  formatValue?: FormatValue
  size: Size
  showValues?: boolean
}

export const COLUMN_WIDTHS: Record<Size, number> = {
  s: 4,
  m: 12,
}
export const COLUMN_PADDING: Record<Size, number> = {
  s: 2,
  m: 4,
}

const getBarClassName = ({
  isVertical,
  isRounded,
  isNegative,
  size,
}: {
  isRounded: boolean
  isVertical: boolean
  isNegative: boolean
  size: Size
}) => {
  return classnames(
    css.bar,
    isRounded && !isVertical && isNegative && css.borderLeft,
    isRounded && !isVertical && !isNegative && css.borderRight,
    isRounded && isVertical && isNegative && css.borderBottom,
    isRounded && isVertical && !isNegative && css.borderTop,
    size === 'm' && css.sizeM
  )
}

export const Bar: React.FC<Props> = props => {
  const {
    isVertical,
    groupScale,
    valuesScale,
    color,
    onMouseLeave,
    onMouseEnter,
    onChangeSize,
    columnDetails,
    groupName,
    size,
    showValues,
  } = props
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  const uniqueColumnNames = uniq(
    flattenDeep(columnDetails.map(group => group.map(column => column.columnName)))
  )
  const columnDefaultSize = getCalculatedSizeWithBaseSize(COLUMN_WIDTHS[size])
  const columnPadding = getCalculatedSizeWithBaseSize(COLUMN_PADDING[size])
  const barSize =
    columnDefaultSize * uniqueColumnNames.length + columnPadding * (uniqueColumnNames.length - 1)
  const zeroPoint = Math.ceil(valuesScale.scale(0))

  const groupSecondaryScale = scaleBand({
    domain: uniqueColumnNames,
    range: [0, barSize],
  })

  React.useLayoutEffect(() => {
    onChangeSize(barSize)
  }, [groupName, barSize, onChangeSize])

  const getRectPositionByAxis = (item: ColumnDetail, axis: 'x' | 'y') => {
    const isAxisX = axis === 'x'
    const isAxisY = axis === 'y'

    if ((isVertical && isAxisX) || (!isVertical && isAxisY)) {
      return groupSecondaryScale.scale(item.columnName) || 0
    }

    if ((item.value > 0 && isAxisX) || (item.value < 0 && isAxisY)) {
      return Math.ceil(valuesScale.scale(item.positionBegin)) || 0
    }

    return Math.ceil(valuesScale.scale(item.positionEnd)) || 0
  }

  const columnDetailsData: ReadonlyArray<readonly ColumnWithGeometry[]> = columnDetails.map(
    columns =>
      columns.map(column => {
        const { positionBegin, positionEnd } = column

        return {
          ...column,
          columnSize: Math.abs(
            Math.ceil(valuesScale.scale(positionBegin)) - Math.ceil(valuesScale.scale(positionEnd))
          ),
          x: getRectPositionByAxis(column, 'x'),
          y: getRectPositionByAxis(column, 'y'),
        }
      })
  )

  const getTextPositionOnX = (value: number, width: number) => {
    return value < 0 ? zeroPoint - width - columnPadding : zeroPoint + width + columnPadding
  }

  const groupScaleWidth = groupScale.bandwidth ? groupScale.bandwidth() : 0
  const translate = (groupScale.scale(groupName) || 0) + groupScaleWidth / 2 - barSize / 2
  const transform = isVertical ? `translate(${translate}, 0)` : `translate(0, ${translate})`

  const renderContent = (
    column: ColumnWithGeometry,
    index: number,
    items: readonly ColumnWithGeometry[]
  ) => {
    const { x, y, columnSize, value } = column

    const details = {
      innerTranslate: translate,
      params: {
        columnSize: items.reduce((a, b) => a + b.columnSize, 0),
        x: items[0].x,
        y: items[items.length - 1].y,
      },
      values: isVertical ? [...items].reverse() : items,
    }

    return (
      <foreignObject
        key={groupName + index}
        x={x}
        y={y}
        width={isVertical ? columnDefaultSize : columnSize}
        height={isVertical ? columnSize : columnDefaultSize}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => onMouseEnter(details)}
      >
        <div
          className={getBarClassName({
            isVertical,
            isRounded: index === items.length - 1,
            isNegative: value < 0,
            size,
          })}
          style={{ backgroundColor: color[column.category] }}
        />
      </foreignObject>
    )
  }

  const renderValues = (column: ColumnWithGeometry, index: number) => {
    const { y, columnSize, value } = column

    const isNegative = value < 0
    const textPositionX = getTextPositionOnX(value, columnSize)
    const textPositionY = y + columnPadding + columnDefaultSize / 2
    const textAnchor = isNegative ? 'end' : 'start'

    return (
      <text
        key={groupName + index}
        className={css.label}
        x={textPositionX}
        y={textPositionY}
        textAnchor={textAnchor}
      >
        {value}
      </text>
    )
  }

  return (
    <g>
      <g transform={transform}>{columnDetailsData.map(columns => columns.map(renderContent))}</g>
      {!isVertical && showValues && (
        <g transform={transform}>{columnDetailsData.map(columns => columns.map(renderValues))}</g>
      )}
    </g>
  )
}
