import React, { useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { XLabelsPosition, YLabelsPosition } from '../../'

import css from './index.css'

const TICK_PADDING = 15

type GridConfigItem<Position> = {
  labels?: Position
  labelTicks?: number
  gridTicks?: number
  guide?: boolean
}

export type GridConfig = {
  x: GridConfigItem<XLabelsPosition>
  y: GridConfigItem<YLabelsPosition>
}

type Props = {
  width: number
  height: number
  lineClipPath: string
  scales: {
    [key in 'x' | 'y']: d3.ScaleLinear<number, number>
  }
  gridConfig: GridConfig
  onAxisSizeChange: (sizes: { xAxisHeight: number; yAxisWidth: number }) => void
}

export const Axis: React.FC<Props> = ({
  width,
  height,
  lineClipPath,
  scales: { x: scaleX, y: scaleY },
  gridConfig: {
    x: { labels: xLabelsPos, labelTicks: xLabelTicks, gridTicks: xGridTicks, guide: xGuide },
    y: { labels: yLabelsPos, labelTicks: yLabelTicks, gridTicks: yGridTicks, guide: yGuide },
  },
  onAxisSizeChange,
}) => {
  const xLabelsRef = React.createRef<SVGGElement>()
  const yLabelsRef = React.createRef<SVGGElement>()
  const xGridRef = React.createRef<SVGGElement>()
  const yGridRef = React.createRef<SVGGElement>()

  const xOnBottom = xLabelsPos === 'bottom'
  const yOnLeft = yLabelsPos === 'left'

  useLayoutEffect(() => {
    // Labels
    if (xLabelsPos) {
      d3.select(xLabelsRef.current!).call(
        d3[xOnBottom ? 'axisBottom' : 'axisTop'](scaleX)
          .ticks(xLabelTicks)
          .tickSizeInner(4)
          .tickPadding(TICK_PADDING)
      )
    }
    if (yLabelsPos) {
      d3.select(yLabelsRef.current!).call(
        d3[yOnLeft ? 'axisLeft' : 'axisRight'](scaleY)
          .ticks(yLabelTicks)
          .tickSizeInner(4)
          .tickPadding(TICK_PADDING)
      )
    }

    // Grid lines
    const xGridBase = d3
      .axisBottom(scaleX)
      .tickSize(height)
      .tickFormat(() => '')
    const yGridBase = d3
      .axisLeft(scaleY)
      .tickSize(-width)
      .tickFormat(() => '')
    const grids = [
      xGridTicks || xGuide
        ? {
            el: xGridRef.current!,
            axis: xGridTicks ? xGridBase.ticks(xGridTicks) : xGridBase.tickValues([0]),
          }
        : null,
      yGridTicks || yGuide
        ? {
            el: yGridRef.current!,
            axis: yGridTicks ? yGridBase.ticks(yGridTicks) : yGridBase.tickValues([0]),
          }
        : null,
    ] as const
    grids.forEach(grid => {
      if (grid) {
        d3.select(grid.el)
          .call(grid.axis)
          .selectAll('.tick')
          .filter(d => d === 0)
          .select('line')
          .attr('class', css.axisLine)
      }
    })
  })

  useLayoutEffect(() => {
    const xAxisHeight = xLabelsRef.current!.getBoundingClientRect().height
    const yAxisWidth = yLabelsRef.current!.getBoundingClientRect().width

    onAxisSizeChange({ xAxisHeight, yAxisWidth })
  })

  return (
    <g className={css.main}>
      <g clipPath={lineClipPath}>
        <g className={css.grid} ref={xGridRef} />
        <g className={css.grid} ref={yGridRef} />
      </g>

      <g
        className={classnames(
          css.labels,
          css.labels_x,
          xLabelsPos &&
            {
              bottom: css.labels_bottom,
              top: css.labels_top,
            }[xLabelsPos]
        )}
        ref={xLabelsRef}
        style={xOnBottom ? { transform: `translateY(${height}px)` } : undefined}
      />

      <g
        className={classnames(
          css.labels,
          css.labels_y,
          yLabelsPos &&
            {
              left: css.labels_left,
              right: css.labels_right,
            }[yLabelsPos]
        )}
        ref={yLabelsRef}
        style={yOnLeft ? undefined : { transform: `translateX(${width}px)` }}
      />
    </g>
  )
}
