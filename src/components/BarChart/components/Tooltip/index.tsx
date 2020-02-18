import * as React from 'react'

import { getCalculatedSize } from '@csssr/gpn-utils/lib/css'

import { HorizontalDirection, Tooltip, VerticalDirection } from '@/components/Tooltip'
import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { Size } from '../..'
import { ColumnWithGeometry, COLUMN_WIDTHS, GeometryParams, MouseActionParams } from '../Bar'

import css from './index.css'

type UniqueColumnsName = readonly string[]

type Props = {
  barColumn: MouseActionParams
  isVertical: boolean
  uniqueColumnNames: UniqueColumnsName
  isVisible: boolean
  svgParentRef: React.RefObject<SVGGElement>
  color: ColorGroups
  formatValue?: FormatValue
  size: Size
}

const defaultPosition = {
  x: 0,
  y: 0,
}

const getOffsetPosition = (parameters: {
  innerTranslate: number
  svgRef: React.RefObject<SVGGElement>
  isVertical: boolean
  baseSize: number
  params?: GeometryParams
  size: Size
}) => {
  const { innerTranslate, svgRef, isVertical, baseSize, params, size } = parameters

  if (!svgRef.current || !params) {
    return defaultPosition
  }

  const { x, y, columnSize } = params
  const { left, top } = svgRef.current.getBoundingClientRect()
  const columnDefaultSizeHalf = getCalculatedSize(COLUMN_WIDTHS[size], baseSize) / 2
  const columnSizeHalf = columnSize / 2

  const xPosition = isVertical ? x + innerTranslate + columnDefaultSizeHalf : x + columnSizeHalf

  const yPosition = isVertical ? y + columnSizeHalf : y + innerTranslate + columnDefaultSizeHalf

  return {
    x: xPosition + left,
    y: yPosition + top,
  }
}

const getDirection = (
  uniqueInnerColumns: UniqueColumnsName,
  columnName: string,
  isVertical: boolean
): { horizontal: HorizontalDirection; vertical: VerticalDirection } => {
  const columnCategoryIndex = uniqueInnerColumns.indexOf(columnName)

  return isVertical
    ? {
        horizontal: uniqueInnerColumns.length - 1 ? 'left' : 'right',
        vertical: 'center',
      }
    : {
        horizontal: 'center',
        vertical: columnCategoryIndex === 0 ? 'top' : 'bottom',
      }
}

const getLayout = ({
  values,
  color,
  formatValue,
}: {
  values: readonly ColumnWithGeometry[]
  color: ColorGroups
  formatValue: FormatValue
}) => {
  return values.map((obj, idx) => (
    <div key={idx} style={{ color: color[obj.category] }}>
      {formatValue(obj.value)}
    </div>
  ))
}

export const TooltipComponent: React.FC<Props> = ({
  barColumn,
  isVertical,
  uniqueColumnNames,
  isVisible,
  svgParentRef,
  color,
  formatValue = String,
  size,
}) => {
  const { baseSize } = useBaseSize()
  const { columnName, params, values, innerTranslate } = barColumn

  const direction = getDirection(uniqueColumnNames, columnName, isVertical)
  const position = getOffsetPosition({
    innerTranslate,
    svgRef: svgParentRef,
    isVertical,
    baseSize,
    params,
    size,
  })
  const layout = getLayout({ values, color, formatValue })

  return (
    <Tooltip
      isVisible={isVisible}
      {...position}
      horizontalDirection={direction.horizontal}
      verticalDirection={direction.vertical}
      children={layout}
      className={css.tooltip}
    />
  )
}
