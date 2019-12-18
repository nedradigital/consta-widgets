import React from 'react'

import { Tooltip } from '@/components/Tooltip'
import { TooltipContentForMultipleValues } from '@/components/TooltipContentForMultipleValues'

import { Item } from '../..'

export type HoverLine = {
  color: string
  formattedValue: string
  name: string
}

type Props = {
  isVisible: boolean
  position: Item
  linesOnTheActiveHoverLine: readonly HoverLine[]
  title: string
  direction: 'right' | 'top'
  isVertical?: boolean
}

export const LineTooltip: React.FC<Props> = ({
  isVisible,
  position,
  linesOnTheActiveHoverLine,
  title,
  direction,
}) => (
  <Tooltip isVisible={isVisible} x={position.x} y={position.y} direction={direction}>
    <TooltipContentForMultipleValues
      colors={linesOnTheActiveHoverLine.map(obj => obj.color)}
      nameLines={linesOnTheActiveHoverLine.map(obj => obj.name)}
      title={title}
      values={linesOnTheActiveHoverLine.map(obj => obj.formattedValue)}
    />
  </Tooltip>
)
