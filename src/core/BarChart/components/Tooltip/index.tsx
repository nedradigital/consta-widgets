import * as React from 'react'

import { getCalculatedSize } from '@csssr/gpn-utils/lib/css'

import { ColorGroups, FormatValue } from '@/common/types'
import { PositionState } from '@/common/utils/tooltips'
import { useBaseSize } from '@/BaseSizeContext'
import { Tooltip } from '@/Tooltip'

import { ColumnSize } from '../../helpers'
import { COLUMN_WIDTHS, TooltipData } from '../Bar'

type Props = {
  data: TooltipData
  isHorizontal: boolean
  isVisible: boolean
  svgParentRef: React.RefObject<SVGGElement>
  color: ColorGroups
  formatValue?: FormatValue
  size: ColumnSize
}

const getOffsetPosition = (parameters: {
  innerTranslate: number
  svgRef: React.RefObject<SVGGElement>
  isHorizontal: boolean
  baseSize: number
  params?: TooltipData['params']
  size: ColumnSize
}): PositionState => {
  const { innerTranslate, svgRef, isHorizontal, baseSize, params, size } = parameters

  if (!svgRef.current || !params) {
    return undefined
  }

  const { x, y, columnSize } = params
  const { left, top } = svgRef.current.getBoundingClientRect()
  const columnDefaultSizeHalf = getCalculatedSize(COLUMN_WIDTHS[size], baseSize) / 2
  const columnSizeHalf = columnSize / 2

  const xPosition = isHorizontal ? x + columnSizeHalf : x + innerTranslate + columnDefaultSizeHalf

  const yPosition = isHorizontal ? y + innerTranslate + columnDefaultSizeHalf : y + columnSizeHalf

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
  isHorizontal,
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
    isHorizontal,
    baseSize,
    params,
    size,
  })
  const layout = getLayout({ values, color, formatValue })

  return (
    <Tooltip
      isVisible={isVisible}
      position={position}
      direction={isHorizontal ? 'upCenter' : 'left'}
      children={layout}
    />
  )
}
