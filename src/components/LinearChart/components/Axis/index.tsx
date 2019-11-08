import React, { useLayoutEffect } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'

import { MainTickValues } from '../..'

import css from './index.css'

const TICK_PADDING = 15

export type XLabelsPosition = 'top' | 'bottom'
export type YLabelsPosition = 'left' | 'right'

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

enum AxisDirections {
  top = 'axisTop',
  bottom = 'axisBottom',
  left = 'axisLeft',
  right = 'axisRight',
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
  mainTickValues: MainTickValues
  isVertical?: boolean
  formatLabel: (n: number) => string
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
  mainTickValues,
  isVertical,
  formatLabel,
}) => {
  const xLabelsRef = React.createRef<SVGGElement>()
  const yLabelsRef = React.createRef<SVGGElement>()
  const xGridRef = React.createRef<SVGGElement>()
  const yGridRef = React.createRef<SVGGElement>()

  const xOnBottom = xLabelsPos === 'bottom'
  const yOnLeft = yLabelsPos === 'left'
  const showXGrid = xGridTicks || xGuide
  const showYGrid = yGridTicks || yGuide

  const labelsAxis = [
    {
      getEl: () => xLabelsRef.current,
      visible: Boolean(xLabelsPos),
      direction: xOnBottom ? AxisDirections.bottom : AxisDirections.top,
      scale: scaleX,
      ticks: xLabelTicks,
      classes: classnames(
        css.labels,
        css.labels_x,
        xLabelsPos &&
          {
            bottom: css.labels_bottom,
            top: css.labels_top,
          }[xLabelsPos]
      ),
      transform: xOnBottom ? `translateY(${height}px)` : '',
      values: isVertical ? null : mainTickValues,
    },
    {
      getEl: () => yLabelsRef.current,
      visible: Boolean(yLabelsPos),
      direction: yOnLeft ? AxisDirections.left : AxisDirections.right,
      scale: scaleY,
      ticks: yLabelTicks,
      classes: classnames(
        css.labels,
        css.labels_y,
        yLabelsPos &&
          {
            left: css.labels_left,
            right: css.labels_right,
          }[yLabelsPos]
      ),
      transform: yOnLeft ? '' : `translateX(${width}px)`,
      values: isVertical ? mainTickValues : null,
    },
  ] as const

  // d3 некорректно обновляет направление оси, поэтому приходится удалять ось и пересоздавать заново
  // @see https://github.com/d3/d3-axis/issues/45
  useLayoutEffect(() => {
    labelsAxis.forEach(labels => {
      const labelsSelection = d3.select(labels.getEl())

      labelsSelection.select('g').remove()

      if (labels.visible) {
        labelsSelection.append('g')
      }
    })
  }, [xLabelsPos, yLabelsPos])

  useLayoutEffect(() => {
    // Labels
    labelsAxis.forEach(labels => {
      if (labels.visible) {
        const axisSelection = d3.select(labels.getEl()).select('g') as d3.Selection<
          SVGGElement,
          unknown,
          null,
          undefined
        >
        const axis =
          labels.values && labels.ticks
            ? d3[labels.direction](labels.scale)
                .tickValues([...labels.values])
                .tickPadding(TICK_PADDING)
                .tickFormat(v => formatLabel(v as number))
            : d3[labels.direction](labels.scale)
                .ticks(labels.ticks)
                .tickSize(4)
                .tickPadding(TICK_PADDING)

        axisSelection
          .attr('class', labels.classes)
          .style('transform', labels.transform)
          .call(axis)
      }
    })

    // Grid lines
    const xGridBase = d3
      .axisBottom(scaleX)
      .tickSize(height)
      .tickFormat(() => '')
    const yGridBase = d3
      .axisLeft(scaleY)
      .tickSize(-width)
      .tickFormat(() => '')

    const xAxis = xGridTicks ? xGridBase.ticks(xGridTicks) : xGridBase.tickValues([0])
    const yAxis = yGridTicks ? yGridBase.ticks(yGridTicks) : yGridBase.tickValues([0])

    const xTicks = !xGridTicks && xGuide ? [0] : [...mainTickValues]
    const yTicks = !yGridTicks && yGuide ? [0] : [...mainTickValues]

    const grids = [
      {
        el: xGridRef.current,
        axis: isVertical ? xAxis : xGridBase.tickValues(xTicks),
        withGuide: xGuide,
      },
      {
        el: yGridRef.current,
        axis: isVertical ? yGridBase.tickValues(yTicks) : yAxis,
        withGuide: yGuide,
      },
    ] as const
    grids.forEach(grid => {
      if (grid.el) {
        d3.select(grid.el)
          .call(grid.axis)
          .selectAll('.tick')
          .filter(d => d === 0)
          .select('line')
          .attr('class', grid.withGuide ? css.axisLine : '')
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
        {showXGrid && <g className={css.grid} ref={xGridRef} />}
        {showYGrid && <g className={css.grid} ref={yGridRef} />}
      </g>

      <g ref={xLabelsRef} />
      <g ref={yLabelsRef} />
    </g>
  )
}
