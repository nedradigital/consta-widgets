import React from 'react'

import { Tooltip } from '@/components/Tooltip'
import { TooltipContentForMultipleValues } from '@/components/TooltipContentForMultipleValues'

import { Axis, Figure, FigureColor } from '../..'

type Props = {
  colors: readonly FigureColor[]
  figures: readonly Figure[]
  position: {
    x: number
    y: number
  }
  values: readonly string[]
  axis?: Axis
}

export const AxisTooltip: React.FC<Props> = ({ colors, figures, position, values, axis }) => {
  return (
    <Tooltip isVisible={!!axis} x={position.x} y={position.y} direction="top">
      {axis ? (
        <TooltipContentForMultipleValues
          colors={colors.map(obj => obj.lineColor)}
          nameLines={figures.map(obj => obj.name)}
          title={axis.label}
          values={values}
        />
      ) : null}
    </Tooltip>
  )
}
