import * as React from 'react'
import { createRef, useLayoutEffect } from 'react'

import * as d3 from 'd3'
import { isUndefined } from 'lodash'

import { Layer, Layers } from '../../'
import { displayTooltip, hideTooltip, updateTooltipStyle } from '../Tooltip'

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

  return updateTooltipStyle(
    String(d.data[key] || 0),
    isVertical,
    barSize,
    self,
    colorValue,
    paddingX,
    positionByXScale || 0,
    additionalKeyGroup
  )
}

export const defaultColumnSize = 12

const getXPosition = (
  data: Layers,
  rect: Layer,
  keyGroup: string,
  barSize: number,
  xScale: XScale,
  additionalKeyGroup?: string
) => {
  if (!isUndefined(additionalKeyGroup)) {
    const x1 = d3
      .scaleBand()
      .padding(0.05)
      .domain(data.map(d => String(d.data[additionalKeyGroup])))
      .rangeRound([0, barSize])
      .padding(0.05)

    return x1(String(rect.data[additionalKeyGroup])) || 0
  }

  return xScale(String(rect.data[keyGroup])) || 0
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

      if (!isVertical) {
        rect
          .attr('x', d => yScale(d[0]))
          .attr('y', d => getXPosition(data, d, keyGroup, barSize, xScale, additionalKeyGroup))
          .attr('height', () => defaultColumnSize)
          .attr('width', d => yScale(d[1]) - yScale(d[0]))
      } else {
        rect
          .attr('x', d => getXPosition(data, d, keyGroup, barSize, xScale, additionalKeyGroup))
          .attr('y', d => yScale(d[1]) || 0)
          .attr('height', d => yScale(d[0]) - yScale(d[1]))
          .attr('width', () => defaultColumnSize)
      }

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
            data.key,
            showValues,
            additionalKeyGroup,
            xScale(String(d.data[keyGroup]))
          )
        )
    }
  })

  return (
    <g>
      <g clipPath={`url(#${clipId})`} ref={ref} fill={color} />
      <g ref={staticTooltipsRef} />
    </g>
  )
}
