import * as React from 'react'
import { createRef, useLayoutEffect } from 'react'
import ReactDOMServer from 'react-dom/server'

import * as d3 from 'd3'
import { isUndefined } from 'lodash'

import { Hint } from '@/ui/Hint'

import { ComplexValue, defaultColumnSize, GroupByKeys, Layer, Layers } from '../../'

import * as css from './index.css'

type Props = {
  barSize: number
  clipId: string
  columnSize: number
  showValues?: boolean
  data: Layers
  hasRatio?: boolean
  groupByKeys: GroupByKeys
  keyGroup: string
  isVertical: boolean
  xScale: d3.ScaleBand<string>
  yScale: d3.ScaleLinear<number, number>
  color: string
  paddingX: number
}

const getLayerIndex = (d: Layer) => {
  const layerFromGroup = d.layerFromGroup as Layer
  return (layerFromGroup && layerFromGroup.layerIndex) || 0
}

const getTooltipComplexSize = (
  d: Layer,
  element: string,
  isVertical: boolean
): { width: number; height: number } => {
  const layerIndex = getLayerIndex(d)
  return getTooltipSize(element + layerIndex, isVertical)
}

const getTooltipSize = (
  element: string,
  isVertical: boolean
): { width: number; height: number } => {
  const tooltip = d3.select(element).node() as HTMLDivElement
  const computedStyle = getComputedStyle(tooltip, 'after')
  let { width, height } = tooltip && tooltip.getBoundingClientRect()

  if (!isVertical) {
    height += parseInt(computedStyle.borderTopWidth as string, 10)
  } else {
    width += parseInt(computedStyle.borderTopWidth as string, 10)
  }

  return { height, width }
}

const renderComplexTooltip = (complexValue: readonly ComplexValue[], isVertical: boolean) => {
  return (
    <>
      {complexValue.map((obj, idx) => (
        <span
          key={idx}
          className={!isVertical ? css.tooltipHorizontal : css.tooltipVertical}
          style={{
            color: obj.layerColor,
          }}
        >
          {obj.value}
        </span>
      ))}
    </>
  )
}

const getDynamicTooltipPosition = (
  layerFromGroup: Layer,
  self: HTMLElement,
  barSize: number,
  isVertical: boolean,
  paddingX: number
) => {
  const size = getTooltipSize('.multibarTooltip', isVertical)
  let xPosition
  let yPosition

  if (
    layerFromGroup.hasComplexTooltip &&
    layerFromGroup.complexBarYStart &&
    layerFromGroup.complexHeight
  ) {
    xPosition = layerFromGroup.complexBarYStart + layerFromGroup.complexHeight / 2 - size.width / 2
    yPosition = layerFromGroup.complexBarYStart - layerFromGroup.complexHeight / 2
  } else {
    xPosition =
      parseInt(d3.select(self).attr('x'), 10) +
      parseInt(d3.select(self).attr('width'), 10) / 2 -
      size.width / 2
    yPosition =
      parseInt(d3.select(self).attr('y'), 10) + parseInt(d3.select(self).attr('height'), 10) / 2
  }

  if (!isVertical) {
    yPosition =
      parseInt(d3.select(self).attr('y'), 10) + barSize - size.height + defaultColumnSize / 2
    xPosition = xPosition + paddingX
  } else {
    xPosition = parseInt(d3.select(self).attr('x'), 10) + barSize + defaultColumnSize + paddingX
  }

  return { xPosition, yPosition }
}

const createTooltipDynamic = (
  complexValue: readonly ComplexValue[],
  value: number,
  layerFromGroup: Layer,
  isVertical: boolean,
  barSize: number,
  self: HTMLElement,
  colorValue: string,
  paddingX: number
) => {
  const tooltip = d3
    .select('.multibarTooltip')
    .style('color', colorValue)
    .style('transform', 'translate(0, -50%)')
    .html(() =>
      complexValue.length > 0
        ? ReactDOMServer.renderToString(renderComplexTooltip(complexValue, isVertical))
        : value.toString()
    )

  const { xPosition, yPosition } = getDynamicTooltipPosition(
    layerFromGroup,
    self,
    barSize,
    isVertical,
    paddingX
  )

  tooltip
    .style('left', xPosition + 'px')
    .style('top', yPosition + 'px')
    .style('display', 'block')
}

const mouseOverAction = (showValues?: boolean) =>
  !showValues && d3.select('.multibarTooltip').style('display', 'block')

const mouseOutAction = () => d3.select('.multibarTooltip').style('display', 'none')

const mouseMoveAction = (
  self: HTMLElement,
  d: Layer,
  isVertical: boolean,
  barSize: number,
  colorValue: string,
  paddingX: number,
  showValues?: boolean
) => {
  if (showValues) {
    return false
  }

  const { layerFromGroup, complexValue, value } = d

  createTooltipDynamic(
    complexValue as readonly ComplexValue[],
    value || 0,
    layerFromGroup as Layer,
    isVertical,
    barSize,
    self,
    colorValue,
    paddingX
  )
}

export const MultiBar: React.FC<Props> = ({
  data,
  barSize,
  clipId,
  columnSize,
  showValues,
  hasRatio,
  groupByKeys,
  keyGroup,
  isVertical,
  xScale,
  yScale,
  color,
  paddingX,
}) => {
  const ref = createRef<SVGGElement>()
  const staticTooltipsRef = createRef<SVGGElement>()

  const rectData = data.map(row => {
    let x
    let y
    let width
    let h

    if (!isVertical) {
      x = row[0] ? yScale(row[0]) : 0
      y = xScale(row.data[keyGroup] as string)
      width = yScale(row[1]) - yScale(row[0]) > 0 ? yScale(row[1]) - yScale(row[0]) : 0
      h = columnSize
    } else {
      x = xScale(row.data[keyGroup] as string)
      y = yScale(row[1])
      h = yScale(row[0]) - yScale(row[1]) > 0 ? yScale(row[0]) - yScale(row[1]) : 0
      width = columnSize
    }

    const layerFromGroup = groupByKeys[row.data[keyGroup] as string].find(
      obj => obj[0] === row[0] && obj[1] === row[1]
    ) || {
      complexValue: [],
    }

    const value =
      hasRatio && !isUndefined(row.original1) && !isUndefined(row.original0)
        ? row.original1 - row.original0
        : row[1] - row[0]

    return {
      ...row,
      layerFromGroup,
      complexValue: (layerFromGroup && layerFromGroup.complexValue) || [],
      value,
      paramsRect: {
        x,
        y,
        width,
        height: h,
      },
    }
  })

  const getStaticTooltips = (transform: string) => {
    d3.select(staticTooltipsRef.current).attr('transform', transform)

    const l = d3
      .select(staticTooltipsRef.current)
      .selectAll('foreignObject')
      .data([...rectData])
      .join('foreignObject')
      .html((d, idx: number) => {
        const { complexValue, value } = d
        const layerFromGroup = d.layerFromGroup as Layer
        const complexValueLength = (complexValue && complexValue.length) || 0
        const layerIndex = (layerFromGroup && layerFromGroup.layerIndex) || 0

        return ReactDOMServer.renderToString(
          <Hint
            direction={!isVertical ? 'top' : 'right'}
            className={'tooltip_' + idx + layerIndex}
            styles={{
              color,
              transform: !isVertical
                ? 'translateX(0) translateY(0)'
                : 'translateX(15%) translateY(0)',
              display: layerFromGroup && layerFromGroup.isDisplayTooltip ? 'block' : 'none',
            }}
          >
            {complexValueLength > 0 && renderComplexTooltip(complexValue || [], isVertical)}
            {complexValueLength === 0 && <span>{value}</span>}
          </Hint>
        )
      })
      .attr('width', (d, idx: number) => {
        return getTooltipComplexSize(d as Layer, '.tooltip_' + idx, isVertical).width
      })
      .attr('height', (d, idx: number) => {
        return getTooltipComplexSize(d as Layer, '.tooltip_' + idx, isVertical).height
      })

    if (!isVertical) {
      l.attr('x', (d, idx: number) => {
        const x = yScale(d[1]) + (yScale(d[0]) - yScale(d[1])) / 2
        return x - getTooltipComplexSize(d as Layer, '.tooltip_' + idx, isVertical).width / 2
      }).attr('y', (d, idx: number) => {
        const y = (d.paramsRect && d.paramsRect.y) || 0
        return y - getTooltipComplexSize(d as Layer, '.tooltip_' + idx, isVertical).height
      })
    } else {
      l.attr('x', d => {
        const x = (d.paramsRect && d.paramsRect.x) || 0
        return x + defaultColumnSize
      }).attr('y', (d, idx: number) => {
        const yPosition = yScale(d[1]) + (yScale(d[0]) - yScale(d[1])) / 2
        return (
          yPosition - getTooltipComplexSize(d as Layer, '.tooltip_' + idx, isVertical).height / 2
        )
      })
    }
  }

  useLayoutEffect(() => {
    d3.select(staticTooltipsRef.current)
      .selectAll('foreignObject')
      .remove()
  }, [isVertical, showValues, hasRatio])

  useLayoutEffect(() => {
    if (ref) {
      const transform = !isVertical ? `translate(0, ${barSize})` : `translate(${barSize}, 0)`

      d3.select(ref.current).attr('transform', transform)

      d3.select(ref.current)
        .selectAll('rect')
        .data([...rectData])
        .join('rect')
        .attr('class', css.rectBarChart)
        .attr('x', d => (d.paramsRect && d.paramsRect.x) || 0)
        .attr('y', d => (d.paramsRect && d.paramsRect.y) || 0)
        .attr('height', d => d.paramsRect && d.paramsRect.height)
        .attr('width', d => d.paramsRect && d.paramsRect.width)
        .on('mouseover', () => mouseOverAction(showValues))
        .on('mouseout', () => mouseOutAction())
        .on('mousemove', (d, i, nodes) =>
          mouseMoveAction(
            nodes[i] as HTMLElement,
            d as Layer,
            isVertical,
            barSize,
            color,
            paddingX,
            showValues
          )
        )

      if (showValues) {
        getStaticTooltips(transform)
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
