import * as React from 'react'
import { createRef, useLayoutEffect } from 'react'

import * as d3 from 'd3'
import { isUndefined } from 'lodash'

import { Layer, Layers, Value } from '../../'
import {
  displayStaticTooltips,
  displayTooltip,
  getTooltipPosition,
  hideTooltip,
  updateTooltipStyleAndPosition,
} from '../Tooltip'

import * as css from './index.css'

type XScale = d3.ScaleBand<string>

type Props = {
  clipId: string
  showValues?: boolean
  data: Layers
  keyGroup: string
  isVertical: boolean
  xScale: XScale
  yScale: d3.ScaleLinear<number, number>
  color: string
  paddingX: number
  svgWidth: number
  svgHeight: number
  countLayers: number
  additionalKeyGroup?: string
}

const mouseMoveAction = (
  self: HTMLElement,
  d: Layer,
  isVertical: boolean,
  barSize: number,
  colorValue: string,
  paddingX: number,
  key: string,
  showValues?: boolean,
  additionalKeyGroup?: string,
  positionByXScale?: number
) => {
  if (showValues) {
    return false
  }

  const { xPosition, yPosition } = getTooltipPosition(
    self,
    barSize,
    isVertical,
    paddingX,
    positionByXScale || 0,
    additionalKeyGroup
  )

  updateTooltipStyleAndPosition(String(d.data[key] || 0), colorValue, xPosition, yPosition)
}

export const defaultColumnSize = 12

const getXPosition = (
  data: Value,
  keyGroup: string,
  xScale: XScale,
  xByAdditionalKeyGroup: XScale,
  additionalKeyGroup?: string
) => {
  if (!isUndefined(additionalKeyGroup)) {
    return xByAdditionalKeyGroup(String(data[additionalKeyGroup])) || 0
  }

  return xScale(String(data[keyGroup])) || 0
}

const getRectSizeAndPosition = (
  d: Layer,
  isVertical: boolean,
  xPosition: number,
  yScale: d3.ScaleLinear<number, number>
) => {
  const x = isVertical ? xPosition : yScale(d[0])
  const y = isVertical ? yScale(d[1]) : xPosition
  const width = isVertical ? defaultColumnSize : yScale(d[1]) - yScale(d[0])
  const height = isVertical ? yScale(d[0]) - yScale(d[1]) : defaultColumnSize

  return {
    x,
    y,
    width,
    height,
  }
}

export const MultiBar: React.FC<Props> = ({
  data,
  clipId,
  showValues,
  keyGroup,
  isVertical,
  xScale,
  yScale,
  color,
  paddingX,
  svgWidth,
  svgHeight,
  countLayers,
  additionalKeyGroup,
}) => {
  const ref = createRef<SVGGElement>()
  const staticTooltipsRef = createRef<SVGGElement>()
  const barSize =
    ((isVertical ? svgWidth : svgHeight) - defaultColumnSize * countLayers) / countLayers / 2 -
    defaultColumnSize / countLayers / 2

  const { key } = data
  const additionalKeyGroupDomain = new Set(data.map(d => String(d.data[additionalKeyGroup || 0])))

  const xByAdditionalKeyGroup = d3
    .scaleBand()
    .padding(0.05)
    .domain([...additionalKeyGroupDomain])
    .rangeRound([0, barSize])
    .padding(0.05)

  const dataWithPositionTooltip = data.map(d => {
    let xScaleByKeyGroup = xScale(String(d.data[keyGroup])) || 0

    if (!isUndefined(additionalKeyGroup)) {
      xScaleByKeyGroup += xByAdditionalKeyGroup(String(d.data[additionalKeyGroup])) || 0
    }

    const xBar = (isVertical ? xScaleByKeyGroup : yScale(d[0])) || 0
    const yBar = (isVertical ? yScale(d[1]) : xScaleByKeyGroup) || 0
    const middleSizeBar = yScale(d[1]) + (yScale(d[0]) - yScale(d[1])) / 2

    return {
      ...d,
      position: {
        x: isVertical ? xBar + defaultColumnSize : middleSizeBar,
        y: isVertical ? middleSizeBar : yBar,
      },
    }
  })

  useLayoutEffect(() => {
    d3.select(staticTooltipsRef.current)
      .selectAll('foreignObject')
      .remove()
  }, [isVertical, showValues])

  useLayoutEffect(() => {
    if (ref) {
      const svgOffset = isUndefined(additionalKeyGroup)
        ? barSize
        : xScale.bandwidth() / 2 - barSize / 2
      const transform = isVertical ? `translate(${svgOffset}, 0)` : `translate(0, ${svgOffset})`

      d3.select(ref.current).attr('transform', transform)

      const rect = d3
        .select(ref.current)
        .selectAll('rect')
        .data([...data])
        .join('rect')
        .attr('class', css.rectBarChart)
        .each((d, idx, nodes) => {
          const xPosition = getXPosition(
            d.data,
            keyGroup,
            xScale,
            xByAdditionalKeyGroup,
            additionalKeyGroup
          )
          const { x, y, width, height } = getRectSizeAndPosition(d, isVertical, xPosition, yScale)

          d3.select(nodes[idx])
            .attr('x', x)
            .attr('y', y)
            .attr('height', height)
            .attr('width', width)
        })

      if (!isUndefined(additionalKeyGroup)) {
        rect.attr('transform', d => {
          const rectOffset = xScale(String(d.data[keyGroup]))
          return isVertical ? `translate(${rectOffset}, 0)` : `translate(0, ${rectOffset})`
        })
      }

      rect
        .on('mouseover', () => displayTooltip(showValues))
        .on('mouseout', () => hideTooltip())
        .on('mousemove', (d, i, nodes) =>
          mouseMoveAction(
            nodes[i] as HTMLElement,
            d as Layer,
            isVertical,
            svgOffset,
            color,
            paddingX,
            key,
            showValues,
            additionalKeyGroup,
            xScale(String(d.data[keyGroup]))
          )
        )

      if (showValues) {
        displayStaticTooltips(
          transform,
          staticTooltipsRef,
          dataWithPositionTooltip,
          key,
          isVertical,
          color,
          additionalKeyGroupDomain,
          additionalKeyGroup || ''
        )
      }
    }
  })

  return (
    <g>
      <g clipPath={`url(#${clipId})`} ref={ref} fill={color} />
      <g ref={staticTooltipsRef} />
    </g>
  )
}
