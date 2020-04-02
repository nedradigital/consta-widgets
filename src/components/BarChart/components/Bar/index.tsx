import React from 'react'

import classnames from 'classnames'
import { flattenDeep, uniq } from 'lodash'

import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard'
import { Scaler } from '@/utils/scale'

import { Size } from '../..'

import css from './index.css'

export type ColumnDetail = {
  category: string
  columnName: string
  value: number
  positionBegin: number
  positionEnd: number
  columnSize: number
}

type Part = {
  x: number
  y: number
  columnSize: number
  isRounded: boolean
  value: number
  backgroundColor: string
}

type Parts = readonly Part[]

export type TooltipData = {
  innerTranslate: number
  values: ReadonlyArray<{ value: number; category: string }>
  params?: {
    x: number
    y: number
    columnSize: number
  }
}

type MouseAction = (column?: TooltipData) => void

type Props = {
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
  groupName: string
  isVertical: boolean
  groupScale: Scaler<string>
  valuesScale: Scaler<number>
  color: ColorGroups
  onMouseLeave: () => void
  onMouseEnter: MouseAction
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

  const getTextPositionOnX = (value: number, width: number) => {
    return value < 0 ? zeroPoint - width - columnPadding : zeroPoint + width + columnPadding
  }

  const groupScaleWidth = groupScale.bandwidth ? groupScale.bandwidth(groupName) : 0
  const translate = (groupScale.scale(groupName) || 0) + groupScaleWidth / 2 - barSize / 2
  const transform = isVertical ? `translate(${translate}, 0)` : `translate(0, ${translate})`

  const getRectPositionByAxis = ({
    part,
    index,
    axis,
  }: {
    part: ColumnDetail
    index: number
    axis: 'x' | 'y'
  }) => {
    const isAxisX = axis === 'x'
    const isAxisY = axis === 'y'

    if ((isVertical && isAxisX) || (!isVertical && isAxisY)) {
      return (columnDefaultSize + columnPadding) * index
    }

    if ((part.value > 0 && isAxisX) || (part.value < 0 && isAxisY)) {
      return part.positionBegin || 0
    }

    return part.positionEnd || 0
  }

  const columnDetailsData: ReadonlyArray<{
    parts: Parts
    tooltipParams: TooltipData
  }> = columnDetails.map((column, index) => {
    const parts = column.map(part => ({
      value: part.value,
      columnSize: part.columnSize,
      backgroundColor: color[part.category],
      x: getRectPositionByAxis({ part, index, axis: 'x' }),
      y: getRectPositionByAxis({ part, index, axis: 'y' }),
    }))

    const visibleParts = parts.filter(item => item.columnSize > 0)
    const tooltipValues = column.map(item => ({
      value: item.value,
      category: item.category,
    }))

    return {
      parts: parts.map(item => ({
        ...item,
        isRounded: item === visibleParts[visibleParts.length - 1],
      })),
      tooltipParams: {
        innerTranslate: translate,
        params: {
          columnSize: parts.reduce((a, b) => a + b.columnSize, 0),
          x: parts[0].x,
          y: parts[parts.length - 1].y,
        },
        values: isVertical ? [...tooltipValues].reverse() : tooltipValues,
      },
    }
  })

  const renderContent = (tooltipParams: TooltipData) => (column: Part, index: number) => {
    const { x, y, columnSize, value, backgroundColor, isRounded } = column

    return (
      <foreignObject
        key={groupName + index}
        x={x}
        y={y}
        width={isVertical ? columnDefaultSize : columnSize}
        height={isVertical ? columnSize : columnDefaultSize}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => onMouseEnter(tooltipParams)}
      >
        <div
          className={getBarClassName({
            isVertical,
            isRounded,
            isNegative: value < 0,
            size,
          })}
          style={{ backgroundColor }}
        />
      </foreignObject>
    )
  }

  const renderValues = (column: Part, index: number) => {
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
      <g transform={transform}>
        {columnDetailsData.map(column => column.parts.map(renderContent(column.tooltipParams)))}
      </g>
      {!isVertical && showValues && (
        <g transform={transform}>
          {columnDetailsData.map(column => column.parts.map(renderValues))}
        </g>
      )}
    </g>
  )
}
