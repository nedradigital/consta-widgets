import * as React from 'react'

import { getCalculatedSize } from '@csssr/gpn-utils/lib/css'

import { ColorGroups, FormatValue } from '@/common/types'
import { PositionState } from '@/common/utils/tooltips'
import { useBaseSize } from '@/BaseSizeContext'
import { Tooltip } from '@/Tooltip'

import { Size } from '../..'
import { COLUMN_WIDTHS, TooltipData } from '../Bar'

type Props = {
  data: TooltipData
  isVertical: boolean
  isVisible: boolean
  svgParentRef: React.RefObject<SVGGElement>
  color: ColorGroups
  formatValue?: FormatValue
  size: Size
}

const getOffsetPosition = (parameters: {
  innerTranslate: number
  svgRef: React.RefObject<SVGGElement>
  isVertical: boolean
  baseSize: number
  params?: TooltipData['params']
  size: Size
}): PositionState => {
  const { innerTranslate, svgRef, isVertical, baseSize, params, size } = parameters

  if (!svgRef.current || !params) {
    return undefined
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

const getLayout = ({
  values,
  color,
  formatValue,
}: {
  values: TooltipData['values']
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
  data,
  isVertical,
  isVisible,
  svgParentRef,
  color,
  formatValue = String,
  size,
}) => {
  const { baseSize } = useBaseSize()
  const { params, values, innerTranslate } = data

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
      position={position}
      direction={isVertical ? 'left' : 'upCenter'}
      children={layout}
    />
  )
}
