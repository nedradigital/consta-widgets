import * as React from 'react'
import ReactDOMServer from 'react-dom/server'

import * as d3 from 'd3'
import { BaseType } from 'd3-selection'
import { isUndefined } from 'lodash'

import { Direction, Hint } from '@/ui/Hint'

import { Layer } from '../..'
import { defaultColumnSize } from '../MultiBar'

type Props = {
  isVertical: boolean
}

type Position = {
  x: number
  y: number
}

type LayerWithPosition = Layer & {
  position: Position
}

type Data = readonly LayerWithPosition[]

export const displayTooltip = (showValues?: boolean) =>
  !showValues && d3.select('.tooltip').style('display', 'block')

export const hideTooltip = () => d3.select('.tooltip').style('display', 'none')

const getTooltipSize = (
  element: string,
  isVertical: boolean
): { width: number; height: number } => {
  const tooltip = d3.select(element).node() as HTMLDivElement
  const computedStyle = getComputedStyle(tooltip, ':after')
  const borderTopWidth = parseInt(String(computedStyle.borderTopWidth || 0), 10)
  const borderRightWidth = parseInt(String(computedStyle.borderRightWidth || 0), 10)
  const borderWidth = borderTopWidth || borderRightWidth || 0
  let { width, height } = tooltip && tooltip.getBoundingClientRect()

  if (!isVertical) {
    height += borderWidth
  } else {
    width += borderWidth
  }

  return { height, width }
}

export const getTooltipPosition = (
  self: HTMLElement,
  barSize: number,
  isVertical: boolean,
  paddingX: number,
  positionByXScale: number,
  additionalKeyGroup?: string
) => {
  const { width, height } = getTooltipSize('.tooltip', isVertical)
  let xPosition
  let yPosition
  const tooltip = d3.select(self)
  const tooltipAttributeX = parseInt(tooltip.attr('x'), 10)
  const tooltipAttributeY = parseInt(tooltip.attr('y'), 10)
  const tooltipAttributeWidth = parseInt(tooltip.attr('width'), 10)
  const tooltipAttributeHeight = parseInt(tooltip.attr('height'), 10)

  if (isVertical) {
    xPosition = tooltipAttributeX + barSize + defaultColumnSize + paddingX
    yPosition = tooltipAttributeY + tooltipAttributeHeight / 2

    xPosition = (!isUndefined(additionalKeyGroup) && xPosition + positionByXScale) || xPosition
  } else {
    xPosition = tooltipAttributeX + (tooltipAttributeWidth - width) / 2 + paddingX
    yPosition = tooltipAttributeY + barSize - height + defaultColumnSize / 2

    yPosition = (!isUndefined(additionalKeyGroup) && yPosition + positionByXScale) || yPosition
  }

  return { xPosition, yPosition }
}

export const updateTooltipStyleAndPosition = (
  value: string,
  colorValue: string,
  xPosition: number,
  yPosition: number
) => {
  d3.select('.tooltip')
    .html(value)
    .style('color', colorValue)
    .style('transform', 'translate(0, -50%)')
    .style('left', xPosition + 'px')
    .style('top', yPosition + 'px')
    .style('display', 'block')
}

export const displayStaticTooltips = (
  transform: string,
  staticTooltipsRef: React.RefObject<SVGGElement>,
  data: Data,
  key: string,
  isVertical: boolean,
  color: string,
  additionalKeyGroupDomain: Set<string>,
  additionalKeyGroup: string
) => {
  d3.select(staticTooltipsRef.current)
    .attr('transform', transform)
    .selectAll('foreignObject')
    .data([...data])
    .join('foreignObject')
    .each((d, idx, nodes) => {
      const isLeftColumn =
        additionalKeyGroupDomain.size > 1 &&
        [...additionalKeyGroupDomain].indexOf(String(d.data[additionalKeyGroup])) === 0
      const self = d3.select(nodes[idx])
      const tooltipName = 'tooltip_' + idx + key
      const value = d.data[key] || 0

      const { direction, translate } = getTooltipDirectionWithTranslate(isVertical, isLeftColumn)

      addHtmlContent(self, color, value, tooltipName, direction, translate)
      setTooltipSizeAndCoordinate(self, d.position, tooltipName, isVertical, isLeftColumn)
    })
}

const getTooltipDirectionWithTranslate = (isVertical: boolean, isLeftColumn: boolean) => {
  let direction: Direction
  let translate

  if (isLeftColumn) {
    translate = 5
    direction = isVertical ? 'left' : 'top'
  } else {
    translate = 15
    direction = isVertical ? 'right' : 'bottom'
  }

  translate = isVertical
    ? `translateX(${translate}%) translateY(0)`
    : `translateX(0) translateY(${translate}%)`

  return {
    direction,
    translate,
  }
}

const addHtmlContent = (
  self: d3.Selection<BaseType, unknown, null, undefined>,
  color: string,
  value: string | number,
  tooltipName: string,
  direction: Direction,
  translate: string
) => {
  self.html(
    ReactDOMServer.renderToString(
      <Hint
        direction={direction}
        className={tooltipName}
        styles={{
          color,
          transform: translate,
        }}
        children={value}
      />
    )
  )
}

const setTooltipSizeAndCoordinate = (
  self: d3.Selection<BaseType, unknown, null, undefined>,
  position: Position,
  tooltipName: string,
  isVertical: boolean,
  isLeftColumn: boolean
) => {
  const { width, height } = getTooltipSize('.' + tooltipName, isVertical)
  let x = isVertical ? position.x : position.x - width / 2
  let y = isVertical ? position.y - height / 2 : position.y - height

  if (isLeftColumn && isVertical) {
    x = x - width - defaultColumnSize
  }

  if (!isLeftColumn && !isVertical) {
    y = y + height + defaultColumnSize
  }

  self
    .attr('width', width)
    .attr('height', height)
    .attr('x', x)
    .attr('y', y)
}

export const Tooltip: React.FC<Props> = ({ isVertical }) => (
  <Hint
    direction={isVertical ? 'right' : 'top'}
    children={''}
    styles={{ display: 'none', transform: isVertical ? 'inherit' : 'translate(0, 0)' }}
    className="tooltip"
  />
)
