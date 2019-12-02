import React from 'react'

import { Tooltip } from '@/components/Tooltip'
import { TooltipContentForMultipleValues } from '@/components/TooltipContentForMultipleValues'

import { Item } from '../..'

export type HoverLine = {
  color: string
  value: Item
  name: string
}

type Props = {
  isVisible: boolean
  position: Item
  secondaryScaleUnit?: string
  linesOnTheActiveHoverLine: readonly HoverLine[]
  title: string
  isVertical?: boolean
}

export const LineTooltip: React.FC<Props> = ({
  isVisible,
  position,
  linesOnTheActiveHoverLine,
  secondaryScaleUnit,
  title,
  isVertical,
}) => {
  const direction = isVertical ? 'right' : 'top'
  const lineType = isVertical ? 'x' : 'y'

  return (
    <Tooltip isVisible={isVisible} x={position.x} y={position.y} direction={direction}>
      <TooltipContentForMultipleValues
        colors={linesOnTheActiveHoverLine.map(obj => obj.color)}
        nameLines={linesOnTheActiveHoverLine.map(obj => obj.name)}
        title={title}
        values={linesOnTheActiveHoverLine.map(obj => obj.value[lineType].toString())}
        secondaryScaleUnit={secondaryScaleUnit}
      />
    </Tooltip>
  )
}
