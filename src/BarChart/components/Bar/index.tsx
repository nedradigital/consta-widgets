import React from 'react'

import classnames from 'classnames'
import { flattenDeep, uniq } from 'lodash'

import { ColorGroups, FormatValue } from '@/common/types'
import { Scaler } from '@/common/utils/scale'
import { useBaseSize } from '@/BaseSizeContext'

import { Size } from '../..'
import { isLeftTornadoBar } from '../../helpers'

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
  isTornado?: boolean
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
  isTornado,
  size,
  index,
}: {
  isRounded: boolean
  isVertical: boolean
  isNegative: boolean
  isTornado: boolean
  size: Size
  index: number
}) => {
  return classnames(
    css.bar,
    isRounded &&
      !isVertical &&
      (isNegative || (isTornado && isLeftTornadoBar(index))) &&
      css.borderLeft,
    isRounded &&
      !isVertical &&
      (!isNegative || (isTornado && !isLeftTornadoBar(index))) &&
      css.borderRight,
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
    isTornado = false,
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

  const getTextPositionOnX = (value: number, width: number, index: number) => {
    return value < 0 || (isTornado && isLeftTornadoBar(index))
      ? zeroPoint - width - columnPadding
      : zeroPoint + width + columnPadding
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

    if (isTornado && isAxisX) {
      return isLeftTornadoBar(index) ? part.positionBegin - part.columnSize : part.positionBegin
    }

    if (isTornado && isAxisY) {
      return columnDefaultSize / 2 + columnPadding
    }

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

  const renderContent = ({
    tooltipParams,
    part,
    partIndex,
    columnIndex,
  }: {
    tooltipParams: TooltipData
    part: Part
    partIndex: number
    columnIndex: number
  }) => {
    const { x, y, columnSize, value, backgroundColor, isRounded } = part

    return (
      <foreignObject
        key={groupName + partIndex}
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
            isTornado,
            size,
            index: columnIndex,
          })}
          style={{ backgroundColor }}
        />
      </foreignObject>
    )
  }

  const renderValues = ({
    part,
    partIndex,
    columnIndex,
  }: {
    part: Part
    partIndex: number
    columnIndex: number
  }) => {
    const { y, columnSize, value } = part

    const isNegative = value < 0
    const textPositionX = getTextPositionOnX(value, columnSize, columnIndex)
    const textPositionY = y + columnPadding + columnDefaultSize / 2
    const textAnchor = isNegative || (isTornado && isLeftTornadoBar(columnIndex)) ? 'end' : 'start'

    return (
      <text
        key={groupName + partIndex}
        className={classnames(css.label, size === 's' && css.sizeS, size === 'm' && css.sizeM)}
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
        {columnDetailsData.map((column, columnIndex) =>
          column.parts.map((part, partIndex) =>
            renderContent({
              tooltipParams: column.tooltipParams,
              part,
              partIndex,
              columnIndex,
            })
          )
        )}
      </g>
      {!isVertical && showValues && (
        <g transform={transform}>
          {columnDetailsData.map((column, columnIndex) =>
            column.parts.map((part, partIndex) => renderValues({ part, partIndex, columnIndex }))
          )}
        </g>
      )}
    </g>
  )
}
