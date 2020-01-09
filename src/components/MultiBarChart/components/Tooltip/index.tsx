import * as React from 'react'

import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { ColorGroups } from '@/dashboard/types'

import { UniqueInnerColumns } from '../..'
import { ColumnWithGeometry, GeometryParams, getColumnSize, MouseActionParams } from '../MultiBar'

import * as css from './index.css'

type Props = {
  barColumn: MouseActionParams
  isVertical: boolean
  uniqueInnerColumns: UniqueInnerColumns
  isVisible: boolean
  svgParentRef: React.RefObject<SVGGElement>
  color: ColorGroups
}

const defaultPosition = {
  x: 0,
  y: 0,
}

const getOffsetPosition = (parameters: {
  innerTranslate: number
  svgRef: React.RefObject<SVGGElement>
  isVertical: boolean
  params?: GeometryParams
}) => {
  const { innerTranslate, svgRef, isVertical, params } = parameters

  if (!svgRef.current || !params) {
    return defaultPosition
  }

  const { x, y, columnSize } = params
  const { left, top } = svgRef.current.getBoundingClientRect()
  const columnDefaultSizeHalf = getColumnSize() / 2
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
) => {
  const columnCategoryIndex = uniqueInnerColumns.indexOf(columnName)
  const tooltipDirectionVertical =
    columnCategoryIndex === uniqueInnerColumns.length - 1 ? 'right' : 'left'
  const tooltipDirectionHorizontal = columnCategoryIndex === 0 ? 'top' : 'bottom'

  return isVertical ? tooltipDirectionVertical : tooltipDirectionHorizontal
}

const getLayout = (
  values: readonly ColumnWithGeometry[],
  isVertical: boolean,
  color: ColorGroups
) => {
  return values.map((obj, idx) => (
    <div
      key={idx}
      style={{ color: color[obj.category] }}
      className={classnames(isVertical ? undefined : css.tooltipHorizontal)}
    >
      {obj.value}
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
}) => {
  const { columnName, params, values, innerTranslate } = barColumn

  const direction = getDirection(uniqueInnerColumns, columnName, isVertical)
  const position = getOffsetPosition({ innerTranslate, svgRef: svgParentRef, isVertical, params })
  const layout = getLayout(values, isVertical, color)

  return (
    <Tooltip
      direction={direction}
      isVisible={isVisible}
      {...position}
      children={layout}
      className={css.tooltip}
    />
  )
}
