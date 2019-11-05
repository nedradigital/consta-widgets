import * as React from 'react'

import * as d3 from 'd3'
import { isUndefined } from 'lodash'

import { Hint } from '@/ui/Hint'

import { defaultColumnSize } from '../MultiBar'

type Props = {
  isVertical: boolean
}

export const displayTooltip = (showValues?: boolean) =>
  !showValues && d3.select('.tooltip').style('display', 'block')

export const hideTooltip = () => d3.select('.tooltip').style('display', 'none')

const getTooltipSize = (
  element: string,
  isVertical: boolean
): { width: number; height: number } => {
  const tooltip = d3.select(element).node() as HTMLDivElement
  const computedStyle = getComputedStyle(tooltip, 'after')
  const borderTopWidth = parseInt(computedStyle.borderTopWidth!, 10)
  let { width, height } = tooltip && tooltip.getBoundingClientRect()

  if (!isVertical) {
    height += borderTopWidth
  } else {
    width += borderTopWidth
  }

  return { height, width }
}

const getTooltipPosition = (
  self: HTMLElement,
  barSize: number,
  isVertical: boolean,
  paddingX: number,
  positionByXScale: number,
  additionalKeyGroup?: string
) => {
  const size = getTooltipSize('.tooltip', isVertical)
  let xPosition
  let yPosition
  const selfAttributeX = parseInt(d3.select(self).attr('x'), 10)
  const selfAttributeY = parseInt(d3.select(self).attr('y'), 10)
  const selfAttributeWidth = parseInt(d3.select(self).attr('width'), 10)
  const selfAttributeHeight = parseInt(d3.select(self).attr('height'), 10)

  if (!isVertical) {
    xPosition = selfAttributeX + selfAttributeWidth / 2 - size.width / 2 + paddingX
    yPosition = selfAttributeY + barSize - size.height + defaultColumnSize / 2
  } else {
    xPosition = selfAttributeX + barSize + defaultColumnSize + paddingX
    yPosition = selfAttributeY + selfAttributeHeight / 2
  }

  if (!isUndefined(additionalKeyGroup) && isVertical) {
    xPosition += positionByXScale
  }

  if (!isUndefined(additionalKeyGroup) && !isVertical) {
    yPosition += positionByXScale
  }

  return { xPosition, yPosition }
}

export const updateTooltipStyle = (
  value: string,
  isVertical: boolean,
  barSize: number,
  self: HTMLElement,
  colorValue: string,
  paddingX: number,
  positionByXScale: number,
  additionalKeyGroup?: string
) => {
  const tooltip = d3
    .select('.tooltip')
    .style('color', colorValue)
    .style('transform', 'translate(0, -50%)')
    .html(() => value)

  const { xPosition, yPosition } = getTooltipPosition(
    self,
    barSize,
    isVertical,
    paddingX,
    positionByXScale,
    additionalKeyGroup
  )

  tooltip
    .style('left', xPosition + 'px')
    .style('top', yPosition + 'px')
    .style('display', 'block')
}

export const Tooltip: React.FC<Props> = ({ isVertical }) => (
  <Hint
    direction={isVertical ? 'right' : 'top'}
    children={''}
    styles={{ display: 'none', transform: isVertical ? 'inherit' : 'translate(0, 0)' }}
    className="tooltip"
  />
)
