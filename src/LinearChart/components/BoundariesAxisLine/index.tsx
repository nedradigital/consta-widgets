import React from 'react'

import { Axis } from '../..'
import { isBoundariesHorizontal as getIsBoundariesHorizontal } from '../../helpers'
import { XLabelsPosition, YLabelsPosition } from '../Axis'

const getLinePosition = ({
  axis,
  isHorizontal,
  xLabelsPos,
  yLabelsPos,
}: {
  axis: Axis
  isHorizontal: boolean
  xLabelsPos?: XLabelsPosition
  yLabelsPos?: YLabelsPosition
}) => {
  const isBoundariesHorizontal = getIsBoundariesHorizontal(axis, isHorizontal)

  if (isBoundariesHorizontal && xLabelsPos === 'top') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '0%',
    }
  }

  if (isBoundariesHorizontal && xLabelsPos === 'bottom') {
    return {
      x1: '0%',
      y1: '100%',
      x2: '100%',
      y2: '100%',
    }
  }

  if (!isBoundariesHorizontal && yLabelsPos === 'right') {
    return {
      x1: '100%',
      y1: '0%',
      x2: '100%',
      y2: '100%',
    }
  }

  if (!isBoundariesHorizontal && yLabelsPos === 'left') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '100%',
    }
  }
}

type Props = {
  axis: Axis
  isHorizontal: boolean
  xLabelsPos?: XLabelsPosition
  yLabelsPos?: YLabelsPosition
  boundariesGradientId: string
}

export const BoundariesAxisLine: React.FC<Props> = ({
  axis,
  isHorizontal,
  xLabelsPos,
  yLabelsPos,
  boundariesGradientId,
}) => {
  const position = getLinePosition({ axis, isHorizontal, xLabelsPos, yLabelsPos })

  if (!position) {
    return null
  }

  return <line stroke={`url(#${boundariesGradientId})`} strokeWidth="2" {...position} />
}
