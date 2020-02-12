import * as React from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'

import { HorizontalDirection, Tooltip, VerticalDirection } from '@/components/Tooltip'
import { useBaseSize } from '@/contexts'
import { ColorGroups, FormatValue } from '@/dashboard/types'

import { UniqueInnerColumns } from '../..'
import { ColumnWithGeometry, COLUMN_SIZE, GeometryParams, MouseActionParams } from '../MultiBar'

import css from './index.css'

type Props = {
  barColumn: MouseActionParams
  isVertical: boolean
  uniqueInnerColumns: UniqueInnerColumns
  isVisible: boolean
  svgParentRef: React.RefObject<SVGGElement>
  color: ColorGroups
  formatValue?: FormatValue
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
}) => {
  const { innerTranslate, svgRef, isVertical, baseSize, params } = parameters

  if (!svgRef.current || !params) {
    return defaultPosition
  }

  const { x, y, columnSize } = params
  const { left, top } = svgRef.current.getBoundingClientRect()
  const columnDefaultSizeHalf = getCalculatedSize(COLUMN_SIZE, baseSize) / 2
  const columnSizeHalf = columnSize / 2

  const xPosition = isVertical ? x + innerTranslate + columnDefaultSizeHalf : x + columnSizeHalf

  const yPosition = isVertical ? y + columnSizeHalf : y + innerTranslate + columnDefaultSizeHalf

  return {
    x: xPosition + left,
    y: yPosition + top,
  }
}

const getDirection = (
  uniqueInnerColumns: UniqueInnerColumns,
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
  uniqueInnerColumns,
  isVisible,
  svgParentRef,
  color,
  formatValue = String,
}) => {
  const { baseSize } = useBaseSize()
  const { columnName, params, values, innerTranslate } = barColumn

  const direction = getDirection(uniqueInnerColumns, columnName, isVertical)
  const position = getOffsetPosition({
    innerTranslate,
    svgRef: svgParentRef,
    isVertical,
    baseSize,
    params,
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
